import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

const pair = fromJS(['a', 'b']);

const propTypes = {
  children: PropTypes.object,
};

export default class App extends Component {
  render() {
    return React.cloneElement(this.props.children, { pair: pair });
  }
}

App.propTypes = propTypes;
