import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import IndexPage from './components/page_index';
import ChatRoom from './components/page_chatRoom';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="chatroom" component={ChatRoom} />
    </Route>
);