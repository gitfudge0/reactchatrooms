import { combineReducers } from 'redux';

import ConnectionReducer from './reducer_connection';
import ChatroomReducer from './reducer_chatroom';

const rootReducer = combineReducers({
  connection: ConnectionReducer,
  chatroom: ChatroomReducer
});

export default rootReducer;
