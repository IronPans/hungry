import {LOGIN_FAIL, LOGIN_SUCCESS, SAVE_DATA} from './actionType';

/**
 * action可以看作是描述行为的对象，必须有一个type，且可以附加数据
 * action函数就是返回action的函数
 * @returns {{type: string, isLogin?: boolean}}
 */

// 保存登录成功
export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
        isLogin: true
    }
}

// 保存登录失败
export function loginFail(error) {
    return {
        type: LOGIN_FAIL,
        isLogin: false,
        error
    }
}

// 保存登录信息
export function saveData(value, dataType) {
    return {
        type: SAVE_DATA,
        value,
        dataType
    }
}