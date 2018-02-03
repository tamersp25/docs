import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import Playground from './playground';

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
      if (node.type === 'tag' && node.name === 'code') {
        const language = node.parent.attribs.class && node.parent.attribs.class.split('language-');
        const props = {
          language: language && language[1],
          codeString: buildCodeString(node),
          inline: node.parent.type === 'tag' && (node.parent.name === 'p' || node.parent.name === 'li' || node.parent.name === 'td')
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
