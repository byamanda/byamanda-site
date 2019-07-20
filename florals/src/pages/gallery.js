import React from "react"

import SEO from "../components/SEO"
import Title from "../components/Title"
import Layout from "../components/Layout"
import Gallery from "../components/Gallery"
import { graphql } from "gatsby"

const GalleryPage = ({ data }) => (
  <Layout social={data.site.siteMetadata.social}>
    {(window, Container) => (
      <Container>
        <SEO title="Gallery" path="/gallery" />
        <Title>Gallery</Title>
        <Gallery
          pieces={data.gallery.edges.map(({ node }) => ({
            ...node.data,
          }))}
          cols={window.width > 600 ? 2 : 1}
        />
      </Container>
    )}
  </Layout>
)

export default GalleryPage

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

    gallery: allAirtable(filter: { queryName: { eq: "floralGallery" } }) {
      edges {
        node {
          data {
            path
            title
            published
            size
            medium
            stock
            image {
              localFiles {
                childImageSharp {
                  fluid(
                    maxWidth: 1000
                    maxHeight: 1000
                    cropFocus: CENTER
                    quality: 100
                  ) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
