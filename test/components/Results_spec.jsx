import React from 'react';
import ReactDOM from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import { expect } from 'chai';

import Results from '../../src/components/Results';

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
});
