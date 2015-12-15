import { fromJS } from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function resetVote(state) {
  let nextState = state;
  const currentPair = state.getIn(['vote', 'pair'], fromJS([]));
  const tally = state.getIn(['vote', 'tally'], fromJS({})).keys();
  const hasVoted = state.get('hasVoted');
  if (hasVoted && !currentPair.includes(hasVoted)) {
    nextState = state.remove('hasVoted');
  }

  if (hasVoted && tally.includes(hasVoted)) {
    nextState = state.removeIn(['vote', 'tally']);
  }

  return nextState;
}

function vote(state, entry) {
  const pair = state.getIn(['vote', 'pair']);
  if (pair && pair.includes(entry)) {
    return state.set('hasVoted', entry);
  }

  return state;
}

export default function(state = fromJS({}), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}
