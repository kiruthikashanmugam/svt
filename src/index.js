import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './component/page/Addtocart/Store/Store';
import App from './App'; // Your root component

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);