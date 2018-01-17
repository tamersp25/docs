import React from 'react'
import Markdown from 'react-markdown';
import Playground from './playground';
import ReactHtmlParser from 'react-html-parser';

function buildCodeString(node) {
  if (!node) return '';
  if (Array.isArray(node.children)) {
    return node.children.map(buildCodeString).join('');
  }

  return node.data;
}

export default ({ data }) => {
  const post = data.markdownRemark
  const options = {
    transform: (node, idx) => {
      if (node.type === "tag" && node.name === 'code') {
        const props = {
          language: node.parent.attribs.class.split('language-')[1],
          value: buildCodeString(node)
        }

        return <Playground key={idx} {...props} />
      }
    }
  }

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div>
        {ReactHtmlParser(post.html, options)}
      </div>
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
