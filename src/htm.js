import React from "react"

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.log(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          <link rel="apple-touch-icon"
            sizes="180x180"
            href="https://static.veritone.com/assets/favicon/apple-touch-icon.png?v=lkgpRBRLYl"
          />
          <link rel="icon"
            type="image/png"
            href="https://static.veritone.com/assets/favicon/favicon-32x32.png?v=lkgpRBRLYl"
            sizes="32x32"
          />
          <link rel="icon"
            type="image/png"
            href="https://static.veritone.com/assets/favicon/favicon-16x16.png?v=lkgpRBRLYl"
            sizes="16x16"
          />
          <link rel="mask-icon"
            href="https://static.veritone.com/assets/favicon/safari-pinned-tab.svg?v=lkgpRBRLYl"
            color="#597cb1"
          />
          <link rel="shortcut icon"
            href="https://static.veritone.com/assets/favicon/favicon.ico"
            type="image/x-icon"
          />
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
