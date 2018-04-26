import * as React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {Button, Inputtext, Indicator, Page, Paper} from 'bee-mobile';
import {loginFail, loginSuccess, saveData} from '../../model/login/action';
import BaseRequest from '../../common/BaseRequest';
import {saveUserData} from '../../model/user/action';

interface LoginProps {
    isLogin?: boolean;
    loginData?: object;
    loginSuccess?: Function;
    loginFail?: Function;
    saveData?: Function;
    userData?: object;
    saveUserData?: Function;
}

interface LoginState {
    username?: String,
    password?: String
}

class Login extends React.PureComponent<LoginProps, LoginState> {
    static defaultProps = {
        isLogin: false
    };
    HUNGRY_URL = process.env.HUNGRY_URL;
    userRequest: any;

    constructor(props) {
        super(props);
        this.state = {
            username: '天下吃货',
            password: '123456'
        };
        this.userRequest = new BaseRequest();
    }

    /**
     * 将表单数据保存到store中
     * @param type
     * @param event
     */
    handleChange = (type: string, event: string) => {
        let value = '';
        switch (type) {
            case 'username':
                value = event.trim();
                break;
            case 'password':
                value = event.trim();
                break;
        }
        this.setState({
            [type]: value
        });
    };

    /**
     * 点击登录按钮，判断是否登录成功，将登录状态保存到store中。
     */
    onClick = async () => {
        const {username, password} = this.state;
        const {history}: any = this.props;
        // 模拟数据查询
        Indicator.show({
            message: '登录中...',
            delay: 0
        });
        const result = await this.userRequest.setHeaderCode('json').request('POST', this.HUNGRY_URL + '/users', {
            data: {
                username,
                password
            }
        });
        if (result && result.message === 'success') {
            (this.props.saveUserData as Function)(result.data);
            (this.props.loginSuccess as Function)();
            history.replace('/app/home');
        } else {
            (this.props.loginFail as Function)('登录失败');
        }
        Indicator.close();

    };

    render() {
        const {loginData}: any = this.props;
        const isLogin: boolean = loginData.isLogin;
        return (
            <Page className="bm-Page-login">
                <section className="padding-20">
                    <Paper depth={12} className="bm-Login-panel">
                        <div className="margin-bottom-30 bm-Login-header">
                            <div className="logo tb-logo"/>
                        </div>
                        {
                            isLogin ? 'Login success' : (<div>
                                <div className="margin-top-20">
                                    <Inputtext placeholder="手机/会员名" defaultValue="天下吃货"
                                               onChange={this.handleChange.bind(this, 'username')}/>
                                </div>
                                <div className="margin-top-20">
                                    <Inputtext type="password" placeholder="请输入密码" defaultValue="123456"
                                               onChange={this.handleChange.bind(this, 'password')}/>
                                </div>
                                <div className="margin-top-10 bm-Login-forget">
                                    <span>忘记密码?</span>
                                </div>
                                <div className="margin-top-20">
                                    <Button block size="lg" theme="primary" onClick={this.onClick}>登录</Button>
                                </div>
                            </div>)
                        }
                    </Paper>
                </section>
                <div className="bm-Login-footer">
                    <span>
                        <NavLink to="/register">注册</NavLink>
                    </span>
                    <span>
                        <NavLink to="/app/home">
                            随便看看
                        </NavLink>
                    </span>
                    <span>登录遇到问题?</span>
                </div>
            </Page>
        );
    }
}

// state是一个包含所有reducer的对象
const mapStateToProps = (state) => {
    return {
        loginData: state.loginData,
        userData: state.userData
    }
};

const mapDispatchToProps = (
    {
        saveData,
        loginSuccess,
        loginFail,
        saveUserData
    }
);

/**
 * 通过connect方法返回一个容器组件
 */
const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));

export default LoginContainer;