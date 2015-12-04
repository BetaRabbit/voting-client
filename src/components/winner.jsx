import React, { Component, PropTypes } from 'react';

const propTypes = {
  winner: PropTypes.string,
};

export default class Winner extends Component {
  render() {
    return <div className="winner">Winner is { this.props.winner }!</div>;
  }
}

Winner.propTypes = propTypes;
