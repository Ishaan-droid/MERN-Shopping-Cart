import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// REDUX
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mainContainerReducer from './containers/MainContainer/store/mainContainerReducer';
import productsReducer from './containers/ProductsContainer/store/productsReducer';
import authReducer from './containers/AuthContainer/Store/AuthContainerReducer';

import './index.css';

// IMPORTING ROOT APP
import App from './containers/app/app';

const rootReducer = combineReducers({ mainContainerReducer, productsReducer, authReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
