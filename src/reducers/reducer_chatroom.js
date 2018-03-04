import { GET_ROOM_MESSAGES } from '../actions/index';

export default function (state = [], action) { 
    switch(action.type) {
        case GET_ROOM_MESSAGES:
            return {...state, allMessages: action.payload}
        default:
            return state;
    }
}