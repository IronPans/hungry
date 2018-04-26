import {createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducers';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';

const enhancer = compose(
    //你要使用的中间件，放在前面
    applyMiddleware(thunk),
    //必须的！启用带有monitors（监视显示）的DevTools
    DevTools.instrument()
);

// 创建一个store来存放应用的状态 （推荐一个应用只有一个store）
const store = createStore(reducers, enhancer);

export default store;