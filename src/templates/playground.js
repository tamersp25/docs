import React from 'react';
import fetch from 'isomorphic-fetch';
import { CustomGraphiQL } from 'graphcool-graphiql'
import frontmatter from 'front-matter'
import CodeBlock from './codeblock';

import 'graphiql/graphiql.css'
import './playground.css'


function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/___graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

function parseGraphqlStr(str) {
  if (!str) return '';

  const fm = frontmatter(str)

  const [queryPart, a, b] = fm.body.split('---')
  
  let dataPart;
  let variablesPart;
  
  if (b) {
    dataPart = b
    variablesPart = a
  } else {
    dataPart = a
  }
  
  return {
    data: dataPart.trim(),
    disabled: fm.attributes.disabled || false,
    endpoint: fm.attributes.endpoint,
    query: queryPart.trim(),
    variables: variablesPart ? variablesPart.trim() : null,
  }
}

class Playground extends React.Component {
    constructor(props) {
      super(props);

      const isTypeGraphql = this.props.language === 'graphql';

      this.state = {
        // REQUIRED:
        // `fetcher` must be provided in order for GraphiQL to operate
        fetcher: graphQLFetcher,
  
        // OPTIONAL PARAMETERS
        // GraphQL artifacts
        query: isTypeGraphql ? parseGraphqlStr(props.value).query : '',
        variables: isTypeGraphql ? parseGraphqlStr(props.value).variables : '',
        response: isTypeGraphql ? parseGraphqlStr(props.value).data : '',
        defaultQuery: isTypeGraphql ? parseGraphqlStr(props.value).query : '',
      };
    }
  
    handleEditQuery = (query) => this.setState({ query })
  
    render() {
      if (this.props.language !== 'graphql') {
        return CodeBlock(this.props.value);
      }
      return (
        <CustomGraphiQL
          selectedEndpoint={this.props.selectedEndpoint || 'SIMPLE'}
          fetcher={graphQLFetcher}
          query={this.state.query}
          variables={this.state.variables}
          onEditQuery={this.handleEditQuery}
          disableAutofocus={true}
          disableResize={true}
          rerenderQuery={true}
        />
      );
    }
  }

export default Playground;
