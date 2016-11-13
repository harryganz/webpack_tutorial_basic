import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

window.onload = function () {
  let root = document.getElementById('root');
  render(<App />, root);
};
