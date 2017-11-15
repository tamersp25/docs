import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Breakpoint from 'components/Breakpoint'
import Sidebar from 'components/Sidebar'
import find from 'lodash/find'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

import typography from 'utils/typography'
const { rhythm } = typography

class Template extends Component {
  render () {
    return (
      <div>
        <Breakpoint
          mobile
        >
          <Sidebar {...this.props} />
          <div
            style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
            }}
          >
            {this.props.children}
          </div>
        </Breakpoint>
      </div>
    )
  }
}

Template.contextTypes = {
    router: PropTypes.object.isRequired
}

Template.propTypes = {
  route: PropTypes.object
}

export default Template;
