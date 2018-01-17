import React from 'react';

class htmlRender extends React.Component {
  render() {
    console.log('this', this.props)
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.value}} />
    )
  }
}

export default htmlRender;