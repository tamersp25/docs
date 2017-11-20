const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  const { createNodeField, createParentChildLink } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const child = (slug.split('/').filter(p => p).length > 2);

    createNodeField({
      node: node,
      name: `slug`,
      value: slug,
    })

    createNodeField({
      node: node,
      name: `rootDir`,
      value: slug.split('/').filter(p => p).length === 2,
    })

    if (child) {
      const childTitleCharCount = node.frontmatter.title.length + 1;;
      const parentPath = node.fields.slug.substring(0, node.fields.slug.length - childTitleCharCount);
      const parentNode = getNodes().filter(n => n.fields && n.fields.slug === parentPath)[0];

      createParentChildLink({
        parent: parentNode,
        child: node
      })
    }
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug.toLowerCase(),
          component: path.resolve(`./src/templates/markdown.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}