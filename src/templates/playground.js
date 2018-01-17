import React from 'react';
import fetch from 'isomorphic-fetch';
import { CustomGraphiQL } from 'graphcool-graphiql';
import CodeBlock from './codeblock';

import 'graphiql/graphiql.css'
import './playground.css'


function graphQLFetcher(graphQLParams) {
  return fetch('https://api.aws-dev.veritone.com/v3/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphQLParams),
    credentials: 'include'
  })
  .then(response => response.json())
}

class Playground extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        // REQUIRED:
        // `fetcher` must be provided in order for GraphiQL to operate
        fetcher: graphQLFetcher
      };
    }

    handleEditQuery = (query) => this.setState({ query })

    render() {
      if (this.props.language !== 'graphql') {
        return CodeBlock(this.props);
      }
      return (
        <div style={{ marginBottom: '10px' }}>
          <CustomGraphiQL
            selectedEndpoint={this.props.selectedEndpoint || 'SIMPLE'}
            fetcher={graphQLFetcher}
            query={this.props.codeString}
            schema={null}
            onEditQuery={this.handleEditQuery}
            disableAutofocus={true}
            disableResize={true}
            rerenderQuery={true}
          />
        </div>
      );
    }
  }

export default Playground;
