import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<h1>TRUE</h1>, div);
  ReactDOM.unmountComponentAtNode(div);
});
