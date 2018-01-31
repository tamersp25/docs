import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import SideBar from '../components/Sidebar/Sidebar.js';
import SlackLink from '../components/SlackLink/SlackLink.js';
import veritoneLogo from '../assets/veritone-logo-white.svg';

import './reset.css';
import './index.scss';

const Header = () => (
  <div
    style={{
      background: '#4caf50',
      marginBottom: '2.25rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1200,
        padding: '1.02rem 1.0875rem 1.02rem 0',
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <img src={veritoneLogo} />
      </Link>
    </div>
  </div>
)

const TemplateWrapper = ({ children, data, location }) => (
  <div>
    <Helmet
      title="Veritone Docs"
      meta={[
        { name: 'description', content: 'Veritone Docs' },
        { name: 'keywords', content: 'veritone, api, docs, documentation, reference, graphql, ai' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 1200,
        marginBottom: '2.25rem',
        paddingTop: 0,
      }}
    >
      <div className="slackLink-container">
        <SlackLink />
      </div>
      <div className="container">
        <SideBar data={data} location={location} />
        <div className="content">{children()}</div>
      </div>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            rootDir
          }
          children {
            id
          }
        }
      }
    }
  }
`

export default TemplateWrapper
