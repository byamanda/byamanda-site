import React from "react"
import { graphql } from "gatsby"
import moment from "moment"

import SEO from "../components/SEO"
import Title from "../components/Title"
import Layout from "../components/Layout"
import EventList from "../components/EventList"

const EventsPage = ({ data }) => {
  return (
    <Layout social={data.site.siteMetadata.social}>
      <SEO title="Events" path="/events" />
      <Title>Events and Showcases</Title>
      <EventList
        events={data.events.edges.map(({ node }) => ({
          ...node.data,
          startDate: moment(node.data.startDate),
          endDate: moment(node.data.endDate),
          content: node.data.content.childMarkdownRemark.excerpt,
        }))}
      />
    </Layout>
  )
}

export default EventsPage

export const eventsQuery = graphql`
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
    events: allAirtable(
      filter: { queryName: { eq: "floralEvents" } }
      sort: { order: ASC, fields: [data___startDate] }
    ) {
      edges {
        node {
          data {
            path
            title
            startDate
            endDate
            noTime
            locationName
            address
            content {
              childMarkdownRemark {
                excerpt(pruneLength: 150)
              }
            }
          }
        }
      }
    }
  }
`
