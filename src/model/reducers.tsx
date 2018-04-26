import {combineReducers} from 'redux';
import * as login from './login/reducer';
import * as product from './order/reducer';
import * as message from './message/reducer';
import * as user from './user/reducer';

// 合并多个reducer
const reducers = combineReducers({
    ...login,
    ...user,
    ...product,
    ...message
});

export default reducers;