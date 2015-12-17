import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Winner from './Winner';

const propTypes = {
  pair: PropTypes.object,
  tally: PropTypes.tally,
};

export class Results extends Component {
  getPair() {
    return this.props.pair || [];
  }

  getVotes(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }

    return 0;
  }

  render() {
    return (
      this.props.winner ? <Winner ref="winner" winner={ this.props.winner } /> :
        <div className="results">
          <div className="tally">
            { this.getPair().map(entry =>
              <div key={entry} className="entry">
                <h1>{ entry }</h1>
                <div className="voteCount">
                  { this.getVotes(entry) }
                </div>
              </div>
              ) }
          </div>
          <div className="management">
            <button className="next" ref="next" onClick={ this.props.next }>Next</button>
          </div>
        </div>
    );
  }
}

Results.propTypes = propTypes;

function select(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner'),
  };
}

export default connect(select)(Results);
