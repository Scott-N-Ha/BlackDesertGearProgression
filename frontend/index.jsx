import React from 'react';
import ReactDOM from 'react-dom';

import Root from '../lib/components/root';


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  ReactDOM.render(<Root />, app);
});
