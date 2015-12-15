// jscs:disable validateQuoteMarks
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './components/App';
import Voting from './components/Voting';
import Results from './components/Results';

const store = createStore(reducer);

const socket = io(`${ location.protocol }//${ location.hostname }:8090`);
socket.on('state', state => {
  store.dispatch({
    type: 'SET_STATE',
    state,
  });
});

const routes = (
  <Route component={ App }>
    <Route path="/results" component={ Results } />
    <Route path="/" component={ Voting } />
  </Route>
);

ReactDom.render(
  <Provider store={ store }>
    <Router>{ routes }</Router>
  </Provider>,
  document.getElementById('app')
);
