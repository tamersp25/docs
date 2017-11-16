import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Breakpoint from 'components/Breakpoint'
import find from 'lodash/find'
import lowerCase from 'lodash/lowerCase'
import intersection from 'lodash/intersection'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import typography from 'utils/typography'
const { rhythm } = typography

class Sidebar extends Component {

  state = {
    open: []
  }

  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  }

  handleOnClick = (item) => {
    const path = (item.path !== '/docs/' ? item.path : '').split('/').filter(p => p); // TODO - need better solution -- hacky
    this.setState({
      open: path
    })
  }

  findParentNode = (p, parentRoute) => {
    if (p.path === parentRoute) return p;
    
    for (var i = 0; i < p.subPages.length; i++) {
      const c = this.findParentNode(p.subPages[i], parentRoute);
      if (c) return c;
    }

    return null
  }

  mapSubPages = (routes, p) => {
    const page = find(this.props.route.pages, (_p) => _p.path === p)
    const path = page.path;
    const pathArr = path.split('/').filter(i => i && i !== 'docs');
    const item = {
      title: page.data.title,
      path: page.path,
      parent: null,
      subPages: []
    }

    // parent page
    if (pathArr.length < 2) {
      routes.push(item);
      return routes;
    }
    
    // child page
    const indexOfSecondLastSlash = path.lastIndexOf('/', (path.lastIndexOf('/') -1));
    const parentRoute = path.substr(0, indexOfSecondLastSlash);

    routes.forEach((route, i) => {
      const pageToPush = this.findParentNode(route, `${parentRoute}/`);
      if (pageToPush) {
        item.parent = pageToPush;
        pageToPush.subPages.push(item);
      }
    });

    return routes;
  }

  mapSubPageItem = (child, i, isChild) => {
    const isActive = prefixLink(child.path) === this.props.location.pathname;
    const hasChildren = !!(child.subPages.length);
    const nodesArr = child.path.split('/').filter(p => p);
    const lastTwoNodes = nodesArr.slice(Math.max(nodesArr.length - 2, 1))
    const isOpen = !!(intersection(this.state.open, lastTwoNodes).length)

    return (
      <li
        style={{
          listStyleType: 'none',
          display: (!isChild || isChild && isOpen) ? 'block' : 'none'
        }}
      >
        <Link
          to={prefixLink(child.path)}
          onClick={() => this.handleOnClick(child)}
          style={{
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          {isActive ? <strong>{child.title}</strong> : child.title}
        </Link>
        {hasChildren &&
          <ul
            style={{
              listStyle: 'none',
              marginLeft: '10px',
              marginTop: rhythm(1/2),
            }}
          >
            {child.subPages.map(page => this.mapSubPageItem(page, page.title, true))}
          </ul>
        }
      </li>
    )
  }

  render () {
    const docPages = config.docPages.reduce((filtered, p) => {
      return this.mapSubPages(filtered, p);
    }, []).map(child => this.mapSubPageItem(child, child.title));

    return (
      <div
        style={{
          overflowY: 'auto',
          paddingRight: `calc(${rhythm(1/2)} - 1px)`,
          position: 'absolute',
          width: `calc(${rhythm(8)} - 1px)`,
          borderRight: '1px solid lightgrey',
        }}
        >
          <ul
            style={{
              listStyle: 'none',
              marginLeft: 0,
              marginTop: rhythm(1/2),
            }}
          >
            {docPages}
          </ul>
      </div>
    )
  }
}

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired
}

Sidebar.propTypes = {
  route: PropTypes.object
}

export default Sidebar;
