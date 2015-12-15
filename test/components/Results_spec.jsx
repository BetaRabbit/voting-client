import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import { expect } from 'chai';

import { Results } from '../../src/components/Results';

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    const pair = fromJS(['a', 'b']);
    const tally = fromJS({
      a: 5,
      b: 3,
    });
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [a, b] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(a).to.contain('a');
    expect(a).to.contain(5);
    expect(b).to.contain('b');
    expect(b).to.contain(3);
  });

  it('invokes next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = ['a', 'b'];

    const component = renderIntoDocument(
      <Results pair={ pair }
               tally={ fromJS({}) }
               next={ next } />
    );

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders a winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="a"
               pair={ ['a', 'b'] }
               tally={ fromJS({}) } />
    );

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('a');
  });
});
