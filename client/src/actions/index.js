import axios from 'axios';
import io from 'socket.io-client';

export const CHECK_CONNECTION = 'CHECK_CONNECTION';
export const ERROR_NETWORK = 'ERROR_NETWORK';
export const GET_ROOM_MESSAGES = 'GET_ROOM_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const BASE_URL = 'http://localhost:3000';

export function checkConnection () {
    const REQUEST = axios.get(`${BASE_URL}/`);

    return (dispatch) => {
        REQUEST.then(data => {
            dispatch({
                type: CHECK_CONNECTION,
                payload: data.data
            })
        }, err => {
            dispatch({
                type: ERROR_NETWORK,
                payload: err
            })
        })
    }
}

export function addUserAndGetMessagesOfRoom(room, user) {
    const REQUEST = axios.get(`${BASE_URL}/messages/${room}`);

    return (dispatch) => {
        REQUEST.then(data => {
            dispatch({
                type: GET_ROOM_MESSAGES,
                payload: data.data
            }, err => {
                dispatch({
                    type: ERROR_NETWORK,
                    payload: err
                })
            })
        })
    }
}

export function sendMessage(payload) {
    return (dispatch) => {
        dispatch({
            type: SEND_MESSAGE,
            payload
        })
    }
    
}

export function addMessageToConversation(payload) {
    return (dispatch) => {
        dispatch({
            type: SEND_MESSAGE,
            payload
        })
    }
}