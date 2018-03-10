import { GET_ROOM_MESSAGES, SEND_MESSAGE } from '../actions/index';

export default function (state = [], action) { 
    switch(action.type) {
        case GET_ROOM_MESSAGES:
            return {...state, allMessages: action.payload}
        case SEND_MESSAGE:
            const newMessages = [...state.allMessages, action.payload]
            return {...state, allMessages: newMessages}
        default:
            return state;
    }
}