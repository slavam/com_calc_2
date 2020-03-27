import React from 'react';
import ReactDOM from 'react-dom';
import TariffsByCategory from './tariffs_by_category';
import { Provider } from 'react-redux';
import store from './redux/store'

// const node = document.getElementById('tariffs_data');
// const tariffs = JSON.parse(node.getAttribute('tariffs'));
// const categories = JSON.parse(node.getAttribute('categories'));

ReactDOM.render(
  <Provider store={store}>
    <TariffsByCategory />
  </Provider>,
  document.getElementById('tariffs')
);