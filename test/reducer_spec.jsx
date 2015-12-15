import { fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = fromJS({});
    const action = {
      type: 'SET_STATE',
      state: fromJS({
        vote: {
          pair: ['a', 'b'],
          tally: {
            a: 1,
          },
        },
      }),
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = fromJS({});
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['a', 'b'],
          tally: {
            a: 1,
          },
        },
      },
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['a', 'b'],
          tally: {
            a: 1,
          },
        },
      },
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    });

    const action = { type: 'VOTE', entry: 'a' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
      hasVoted: 'a',
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    });

    const action = { type: 'VOTE', entry: 'xxxx' };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const state = fromJS({
      vote: {
        pair: ['a', 'b'],
        tally: {
          a: 1,
        },
      },
    });

    const action = { type: 'SET_STATE', entry: ['c', 'd'] };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['c', 'd'],
      },
    }));
  });
});
