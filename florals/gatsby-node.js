const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const eventTemplate = path.resolve(`src/templates/eventTemplate.js`)

  return graphql(`
  {
    events: allAirtable(filter:{queryName:{eq:"floralEvents"}}, sort:{order:DESC, fields:[data___startDate]}) {
      edges {
        node {
          data {
            path
          }
        }
      }
    } 
  }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.events.edges.forEach(({ node }) => {
      createPage({
        path: node.data.path,
        component: eventTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}