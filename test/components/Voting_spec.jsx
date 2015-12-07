import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { expect } from 'chai';

import Voting from '../../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={['a', 'b']} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('a');
    expect(buttons[1].textContent).to.equal('b');
  });

  it('invokes callback when a button is clicked', () => {
    let voteWith;
    const vote = (entry) => voteWith = entry;

    const component = renderIntoDocument(
      <Voting pair={['a', 'b']}
              vote={vote} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(voteWith).to.equal('a');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting pair={['a', 'b']}
              hasVoted="a" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={['a', 'b']}
              hasVoted="a" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting winner="a" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);
  });

});
