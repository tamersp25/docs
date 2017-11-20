import React, { Component } from 'react'
import Link from 'gatsby-link'
import { intersection } from 'lodash'

import './Sidebar.css'

class Sidebar extends Component {

  state = {
    open: []
  }

  handleOnClick = (node) => {
    this.setState({
      open: node.fields.slug.split('/').filter(p => p && p !== 'docs')
    })
  }

  componentDidMount() {
    this.setState({
      open: this.props.location.pathname.split('/').filter(p => p && p !== 'docs')
    })
  }

  mapSidebarItems = (node, pages, isChildNode) => {
    const isActive = this.props.location.pathname.includes(node.fields.slug);
    const isOpen = !!(intersection(this.state.open, node.fields.slug.split('/').filter(p => p && p !== 'docs')).length)

    return (
      <li
        key={node.id}
        style={{
          display: (!isChildNode || isChildNode && isOpen) ? 'block' : 'none'
        }}
      >
        <Link
          to={node.fields.slug}
          onClick={() => this.handleOnClick(node)}
        >
          {isActive ? <strong>{node.frontmatter.title}</strong> : node.frontmatter.title}
        </Link>
        {node.children.length > 0 &&
            <ul>
              {node.children.map(child => {
                const childNode = pages.find(n => n.node.id === child.id);
                return this.mapSidebarItems(childNode.node, pages, true);
              })}
            </ul>
          }
      </li>
    )
  }

  render () {
    const order = ['Introduction', 'Getting Started', 'Authentication', 'Tutorials', 'Api', 'FAQ'];
    const pages = this.props.data.allMarkdownRemark.edges.sort(function(a, b) {
      return order.indexOf(a.node.frontmatter.title) - order.indexOf(b.node.frontmatter.title);
    }); // TODO graphql sort
    return <ul className="sidebar">
      {pages.filter(({ node }) => node.fields.rootDir).map(({ node }) => this.mapSidebarItems(node, pages))}
    </ul>
  }
}

export default Sidebar;
