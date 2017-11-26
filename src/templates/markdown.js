import React from 'react'
const Markdown = require('react-markdown')
import Playground from './playground';

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <Markdown
        source={post.internal.content}
        renderers={{
          code: Playground
        }}
        allowNode={(node, index, parent) => {
          if (!node.type === 'heading' || !node.value || !node.value.includes('title:')) { // ensure not attribute
            return true;
          }
        }}
      />
    </div>
  )
}

export const query = graphql`
  query queryMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      internal {
        content
      }
      frontmatter {
        title
      }
    }
  }
`
