import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

const propTypes = {
  pair: PropTypes.object,
  winner: PropTypes.string,
};

export class Voting extends Component {
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

function select(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner'),
  };
}

Voting.propTypes = propTypes;

export default connect(
  select,
  actionCreators
)(Voting);
