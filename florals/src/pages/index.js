import React from "react"

import SEO from "../components/SEO"
import Title from "../components/Title"
import Bio from "../components/Bio"
import Instagram from "../components/Instagram"
import Layout from "../components/Layout"
import Banner from "../components/Banner"
import Tagline from "../components/Tagline"
import Carousel from "../components/Carousel"

import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const renderCarousel = ndx => (
    <Banner bgImage={data.banner.childImageSharp.fluid}>
      <Tagline animate hideGradient />
    </Banner>
  )

  return (
    /* Adjust numStates for how many airtable responses we get back */
    <Layout
      header={<Carousel numStates={1} render={renderCarousel} />}
      social={data.site.siteMetadata.social}
    >
      {(window, Container) => (
        <Container>
          <SEO title="Home" />

          <Title>A Little About Me!</Title>
          <Bio headShot={data.headshot.childImageSharp.fluid} />

          <Title>Instagram Profile</Title>
          <Instagram
            images={data.allInstaNode.edges.map(({ node }) => ({
              id: node.id,
              image: node.localFile.childImageSharp.fluid,
            }))}
            user={data.instaUserNode}
            handle={data.site.siteMetadata.social.instagram}
            cols={window.width > 600 ? 3 : 2}
          />
        </Container>
      )}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    headshot: file(name: { eq: "headshot-2019" }) {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    banner: file(name: { eq: "banner-v1" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }

    # get airtable info for banners
    # get banner images from local drive?

    site {
      siteMetadata {
        social {
          instagram
          email
          facebook
          youtube
        }
      }
    }

    allInstaNode(
      filter: { username: { eq: "floralsbyamanda" } }
      sort: { order: DESC, fields: timestamp }
      limit: 12
    ) {
      edges {
        node {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 300, maxHeight: 300, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }

    instaUserNode(username: { eq: "floralsbyamanda" }) {
      username
      edge_followed_by {
        count
      }
      profile_pic_url
    }
  }
`
