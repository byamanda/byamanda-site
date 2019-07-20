import React from "react"
import SEO from "../components/SEO"
import Title from "../components/Title"
import Layout from "../components/Layout"
import BaseLink from "../components/BaseLink"
import FlexLayout from "../components/FlexLayout"
import ThumbtackProfileWidget from "../components/ThumbtackProfileWidget"
import ThumbtackStarWidget from "../components/ThumbtackStarWidget"
import Instagram from "../components/Instagram"
import Quotes from "../components/Quotes"
import Collage from "../components/Collage"

import { graphql } from "gatsby"

const FacepaintingPage = ({ data }) => (
  <Layout social={data.site.siteMetadata.social}>
    {(window, Container) => (
      <Container>
        <SEO title="Facepainting" path="/facepainting"/>
        <Title> Face Painting </Title>
        <p>
          I’d love to come and be a part of your next event! I fell in love with
          face painting while I was living in Orlando and working at Disney
          World. I have 3 years of experience in the field. Send me an
          <BaseLink to={`mailto:${data.site.siteMetadata.social.email}`}>
            {" "}
            email{" "}
          </BaseLink>
          or send me a message through the{" "}
          <BaseLink to="/contact"> Contact </BaseLink>
          tab and we’ll get it set up!
        </p>

        <FlexLayout>
          <ThumbtackProfileWidget />
          <ThumbtackStarWidget />
        </FlexLayout>

        <Title>What Clients are Saying</Title>
        <Quotes
          expandable={window.width < 600}
          list={data.comments.edges.map(({ node }) => ({
            ...node.data,
          }))}
        />

        <Title>Pictures From Past Events</Title>
        <Collage
          images={data.gallery.edges.map(({ node }) => ({
            name: node.data.name,
            image: node.data.image.localFiles[0].childImageSharp.fluid,
          }))}
        />

        <Title>Instagram Profile</Title>
        <Instagram
          images={data.allInstaNode.edges.map(({ node }) => ({
            id: node.id,
            image: node.localFile.childImageSharp.fluid,
          }))}
          user={data.instaUserNode}
          handle="http://instagram.com/facepaintingbyamanda"
          cols={window.width > 600 ? 3 : 2}
        />
      </Container>
    )}
  </Layout>
)

export default FacepaintingPage

export const query = graphql`
  {
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
    comments: allAirtable(filter: { queryName: { eq: "facepaintComments" } }) {
      edges {
        node {
          data {
            id
            name
            quote
          }
        }
      }
    }
    gallery: allAirtable(filter: { queryName: { eq: "facepaintGallery" } }) {
      edges {
        node {
          data {
            name
            image {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 500, maxHeight: 500, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
    allInstaNode(
      filter: { username: { eq: "facepaintingbyamanda" } }
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
    instaUserNode(username: { eq: "facepaintingbyamanda" }) {
      username
      edge_followed_by {
        count
      }
      profile_pic_url
    }
  }
`
