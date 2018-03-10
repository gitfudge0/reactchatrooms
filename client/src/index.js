import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import thunk from 'redux-thunk';
import '../style/style.scss';

import reducers from './reducers';

import IndexPage from './components/page_index';
import ChatRoom from './components/page_chatRoom';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="max-height">
        <Route exact path="/" component={IndexPage} />
        <Route path="/chatroom" component={ChatRoom} />
      </div>
    </BrowserRouter>
  </Provider>  
  , document.querySelector('.container-fluid'));
