import * as user from './actionType';

const defaultState = {
    user: {}
};

export const userData = (state = defaultState, action) => {
    switch (action.type) {
        case user.SAVE_USER:
        case user.CHANGE_USER:
            return {...state, ...{user: action.user}};
        case user.DELETE_USER:
            return {...state, ...{username: ''}};
        default:
            return {...state};
    }
}