// Fixes isomorphic-fetch
global.self = global;

const webpack = require('webpack')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const frontmatter = require('front-matter')

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case 'develop':
      config.plugin('ContextReplacementPlugin', // needed due to https://github.com/graphql/graphql-language-service/issues/128
        webpack.ContextReplacementPlugin,
        [/graphql-language-service-interface[\\/]dist$/,  new RegExp(`^\\./.*\\.js$`)]
      )
      break;

    case 'build-html':
      config.loader('null', {
        test: /graphql-language-service-interface/,
        loader: 'null-loader'
      })
    break;

    case 'build-javascript':
      config.plugin('ContextReplacementPlugin', // needed due to https://github.com/graphql/graphql-language-service/issues/128
        webpack.ContextReplacementPlugin,
        [/graphql-language-service-interface[\\/]dist$/,  new RegExp(`^\\./.*\\.js$`)]
      )
      break;
  }

  return config;
};

exports.onCreateNode = ({ node, getNode, getNodes, boundActionCreators }) => {
  const { createNodeField, createParentChildLink } = boundActionCreators;  
  return new Promise((resolve, reject) => {
    if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode, basePath: `pages` });
      const child = (slug.split('/').filter(p => p).length > 1);

      createNodeField({
        node: node,
        name: `slug`,
        value: slug,
      })

      createNodeField({
        node: node,
        name: `rootDir`,
        value: slug.split('/').filter(p => p).length === 1,
      })

      if (child) {
        const parentPath = node.fields.slug.split('/').slice(0, -2).join('/') + '/';
        const parentNode = getNodes().filter(n => n.fields && n.fields.slug === parentPath)[0];

        if (parentNode && node) {
          createParentChildLink({
            parent: parentNode,
            child: node
          })
        }
      }
    }
    resolve();
  })
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