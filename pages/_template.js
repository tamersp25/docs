import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Container, Grid, Span } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'
import Breakpoint from 'components/Breakpoint'
import Sidebar from 'components/Sidebar'

import typography from 'utils/typography'
import { config } from 'config'
import veritoneLogo from '../images/veritone-logo-white.svg'

// Import styles.
import 'css/main.css'
import 'css/github.css'

const { rhythm, adjustFontSizeTo } = typography

class Template extends Component {
  render () {
    const docsActive = includes(this.props.location.pathname, '/docs/')
    const examplesActive = includes(this.props.location.pathname, '/examples/')

    return (
      <div>
        <div
          style={{
            background: colors.bg,
            color: colors.fg,
            marginBottom: rhythm(1.5),
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingLeft: rhythm(3/4),
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `${rhythm(3/4)} 0`,
              }}
            >
              <Span
                columns={4}
                style={{
                  height: 24, // Ugly hack. How better to constrain height of div?
                }}
              >
                <Link
                  to={prefixLink('/')}
                  style={{
                    textDecoration: 'none',
                    color: colors.fg,
                    fontSize: adjustFontSizeTo('25.5px').fontSize,
                  }}
                >
                  <img src={veritoneLogo} />
                </Link>
              </Span>
              <Span columns={8} last>
                <Link
                  to={prefixLink('/examples/')}
                  style={{
                    background: examplesActive ? activeColors.bg : colors.bg,
                    color: examplesActive ? activeColors.fg : colors.fg,
                    float: 'right',
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Examples
                </Link>
                <Link
                  to={prefixLink('/docs/')}
                  style={{
                    background: docsActive ? activeColors.bg : colors.bg,
                    color: docsActive ? activeColors.fg : colors.fg,
                    float: 'right',
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Documentation
                </Link>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
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
        </Container>
      </div>
    )
  }
}

Template.contextTypes = {
  router: PropTypes.object.isRequired
}

Template.propTypes = {
  children: PropTypes.object,
}

export default Template
