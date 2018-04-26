import { LOGIN_SUCCESS, LOGIN_FAIL, SAVE_DATA } from './actionType';

const defaultState = {
    isLogin: false, // 是否登录
};

// reducer描述 action 如何改变 state 树
// 每一个reducer都是纯函数，接收旧的 state 和 action，返回新的 state。

/** 登录页面数据
 * @param state
 * @param action
 * @returns {any}
 */
export const loginData = (state = defaultState, action) => {
    switch (action.type) {
        case SAVE_DATA:
            return {...state, ...{[action.dataType]: action.value}};
        case LOGIN_SUCCESS:
            return {...state, ...{isLogin: true}};
        case LOGIN_FAIL:
            return {...state, ...{isLogin: false, error: action.error}};
        default:
            return state;
    }
};