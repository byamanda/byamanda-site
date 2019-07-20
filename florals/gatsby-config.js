require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Amanada Desiree Evelyn`,
    description: `Botanical artist and face painter based in the pacific northwest`,
    siteUrl: `https://byamanda.design`,
    social: {
      instagram: `http://instagram.com/floralsbyamanda`,
      youtube: `https://www.youtube.com/channel/UCvBizVmlOTlE87GTnSAtPUw`,
      facebook: `http://www.facebook.com/amandadesireeevelyn`,
      email: `desireeevelynart@gmail.com`,
      thumbtack: `https://www.thumbtack.com/-Mukilteo-WA/service/3483000`
    },
    keys: {
      gmaps: process.env.GMAPS_KEY,
      google_site_verification: process.env.GOOGLE_SITE_VERIFICATION
    }
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-133566425-1`,
        head: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`, 
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-instagram`,
      options: {
        type: `user-profile`,
        username: `floralsbyamanda`
      }
    }, 
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `floralsbyamanda`
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        type: `user-profile`,
        username: `facepaintingbyamanda`
      }
    }, 
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `facepaintingbyamanda`
      }
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT
      }
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_KEY, 
        tables: [
          {
            baseId: process.env.AIRTABLE_FLORAL_BASEID,
            tableName: `events`,
            tableView: `Published Events`,
            queryName: `floralEvents`,
            mapping: {'content': 'text/markdown'}
          },
          {
            baseId: process.env.AIRTABLE_FLORAL_BASEID,
            tableName: `gallery`,
            tableView: `Published Gallery`,
            queryName: `floralGallery`,
            mapping: {'image': 'fileNode'}
          },
          {
            baseId: process.env.AIRTABLE_FACEPAINT_BASEID,
            tableName: `comments`,
            queryName: `facepaintComments`,
            tableView: `Published Comments`
          },
          {
            baseId: process.env.AIRTABLE_FACEPAINT_BASEID,
            tableName: `gallery`,
            tableView: `Published Gallery`,
            queryName: `facepaintGallery`,
            mapping: {'image': 'fileNode'}
          }
        ]
      }
    }, 
  ],
}