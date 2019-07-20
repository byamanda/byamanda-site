import React from "react"
import { graphql } from "gatsby"
import moment from "moment"

import Layout from "../components/Layout"
import Event from "../components/Event"
import Title from "../components/Title"
import Map from "../components/Map"
import Breadcrumb from "../components/Breadcrumb"
import SEO from "../components/SEO";

const EventTemplate = ({ data }) => {
  let event = {
    ...data.event.data,
    startDate: moment(data.event.data.startDate),
    endDate: moment(data.event.data.endDate),
    content: data.event.data.content.childMarkdownRemark.html,
  }

  return (
    <Layout social={data.site.siteMetadata.social}>
      <SEO title={event.title} path={event.path} />
      <Breadcrumb to="/events">Go Back To Events</Breadcrumb>
      <Title>{event.title}</Title>
      <Event {...event} />
      <Map
        locationName={event.locationName}
        address={event.address}
        apiKey={data.site.siteMetadata.keys.gmaps}
      />
    </Layout>
  )
}

export default EventTemplate

export const pageQuery = graphql`
  query($path: String!) {
    event: airtable(
      queryName: { eq: "floralEvents" }
      data: { path: { eq: $path } }
    ) {
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
            html
          }
        }
      }
    }
    site {
      siteMetadata {
        social {
          instagram
          email
          facebook
          youtube
        }
        keys {
          gmaps
        }
      }
    }
  }
`
