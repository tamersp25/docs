import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { prism } from 'react-syntax-highlighter/styles/prism';

export default (codeString) => {
  return (
    <SyntaxHighlighter
      language='javascript'
      style={prism}
      customStyle={{ backgroundColor: '#f6f7f7' }}
    >
      {codeString}
    </SyntaxHighlighter>)
}