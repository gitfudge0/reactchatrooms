import { CHECK_CONNECTION } from '../actions/index';

export default function(state = [], action) {
    switch(action.type) {
        case CHECK_CONNECTION:
            return {...state, isConnectionLive: action.payload}
        default: 
            return state;
    }
}