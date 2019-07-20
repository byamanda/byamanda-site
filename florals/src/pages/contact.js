import React from "react"

import SEO from "../components/SEO"
import Title from "../components/Title"
import Layout from "../components/Layout"
import ContactForm from "../components/ContactForm"
import SubscribeForm from "../components/SubscribeForm"
import { graphql } from "gatsby"

const ContactPage = ({ data }) => {
  return (
    <Layout social={data.site.siteMetadata.social}>
      <SEO title="Contact" path="/contact" />
      <Title>Subscribe to stay up to date with what I'm doing!</Title>
      <SubscribeForm />
      <Title>Contact Me</Title>
      <ContactForm email={data.site.siteMetadata.social.email} />
    </Layout>
  )
}

export default ContactPage

export const query = graphql`
  query {
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
  }
`
