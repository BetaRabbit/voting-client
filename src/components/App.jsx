import { Component, PropTypes } from 'react';

const propTypes = {
  children: PropTypes.object,
};

export default class App extends Component {
  render() {
    return this.props.children;
  }
}

App.propTypes = propTypes;
