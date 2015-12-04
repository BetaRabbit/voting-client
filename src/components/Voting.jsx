import React, { Component, PropTypes } from 'react';
import Winner from './Winner';
import Vote from './Vote';

const propTypes = {
  winner: PropTypes.string,
};

export default class Voting extends Component {
  render() {
    return (
      <div>
        { this.props.winner ?
          <Winner ref="winner" winner={ this.props.winner } /> :
          <Vote { ...this.props } />
        }
      </div>
    );
  }
}

Voting.propTypes = propTypes;
