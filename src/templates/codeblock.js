import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { light } from 'react-syntax-highlighter/styles/prism';

export default (codeString) => {
  return <SyntaxHighlighter language='javascript' style={light}>{codeString}</SyntaxHighlighter>;  
}