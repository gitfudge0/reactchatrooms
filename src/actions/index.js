import axios from 'axios';

export const CHECK_CONNECTION = 'CHECK_CONNECTION';
export const ERROR_NETWORK = 'ERROR_NETWORK';

const BASE_URL = 'http://localhost:3000/'

export function checkConnection () {
    const REQUEST = axios.get(`${BASE_URL}`);

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