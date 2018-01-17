import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { prism } from 'react-syntax-highlighter/styles/prism';

/**
 * SyntaxHighlighter by default wraps the code this way <pre><code>...</code></pre>
 * For inline code we just want to render the code without the <pre> tag
 */
function Pre(props) {
  return <code>{props.children}</code>
}

export default ({ codeString, language, inline }) => {
  return (
    <SyntaxHighlighter
      language={language || 'none'}
      style={prism}
      customStyle={{ backgroundColor: '#f6f7f7' }}
      PreTag={inline ? Pre : undefined}
    >
      {codeString}
    </SyntaxHighlighter>)
}
