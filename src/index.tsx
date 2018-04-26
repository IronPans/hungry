import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import store from './model/store';

/**
 * 通过Provider将store挂载到React中，一般是在根组件
 */
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
