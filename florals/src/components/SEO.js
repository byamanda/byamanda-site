import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import favicon from "../images/favicon.png"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, title, path}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            keys {
              google_site_verification
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = `${title} | ${site.siteMetadata.title}`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      link={[
        { 
          rel: "shortcut icon", 
          type: "image/png", 
          href: `${favicon}` 
        },
        {
          rel: "canonical",
          href: `${site.siteMetadata.siteUrl}${path}`
        }
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `url`,
          content: `${site.siteMetadata.siteUrl}${path}`
        },
        {
          name: `og:locale`,
          content: lang
        },
        {
          name: `og:site_name`,
          content: site.siteMetadata.siteUrl
        },
        {
          property: `og:title`,
          content: metaTitle
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${path}`
        },
        {
          property: `google-site-verification`,
          content: `${site.siteMetadata.keys.google_site_verification}`
        }
      ].concat(meta)
    }
    />
  )
}

SEO.defaultProps = {
  lang: `en_US`,
  meta: [],
  description: ``,
  path: `/`
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string, 
  title: PropTypes.string.isRequired,
}

export default SEO
