import { combineReducers } from 'redux';

import ConnectionReducer from './reducer_connection';

const rootReducer = combineReducers({
  connection: ConnectionReducer
});

export default rootReducer;
