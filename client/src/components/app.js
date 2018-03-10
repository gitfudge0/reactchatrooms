import React, { Component } from 'react';


export default class App extends Component {
  render() {
    return (
      <div className="max-height">{this.props.children}</div>
    );
  }
}
