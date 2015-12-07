import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

const pair = fromJS(['a', 'b']);
const tally = fromJS({
  a: 5,
  b: 3,
});

const propTypes = {
  children: PropTypes.object,
};

export default class App extends Component {
  render() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally,
    });
  }
}

App.propTypes = propTypes;
