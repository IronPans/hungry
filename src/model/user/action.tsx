import * as user from './actionType';
import {LOGIN_SUCCESS} from '../login/actionType';

export function initUserData() {
    return (dispatch) => {
        const userData = localStorage.getItem('hungry_user');
        if (userData) {
            dispatch({
                type: user.SAVE_USER,
                user: JSON.parse(userData)
            });
            dispatch({
                type: LOGIN_SUCCESS
            });
        }
    }
}

export function saveUserData(value) {
    localStorage.setItem('hungry_user', JSON.stringify(value));
    return {
        type: user.SAVE_USER,
        user: value
    }
}

export function deleteUserData() {
    localStorage.removeItem('hungry_user');
    return {
        type: user.DELETE_USER
    }
}

export function changeUserData(value) {
    localStorage.setItem('hungry_user', JSON.stringify(value));
    return {
        type: user.CHANGE_USER,
        user: value
    }
}
