export function setState(state) {
  return {
    type: 'SET_STATE',
    state,
  };
}

export function vote(vote) {
  return {
    type: 'VOTE',
    vote,
  };
}
