import * as React from 'react';
import * as classNames from 'classnames';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {
    Avatar, Button, Content, Icon, NavBar, Popup,
    List, ListItem, ListItemText, ListItemAction, Page, Switch
} from 'bee-mobile';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';
import {AsyncAccount} from '../../router/Routes';

interface SettingProps extends BaseProps {
    loginData?: any;
    userData?: any;
}

interface SettingState {
    accountDetailVisible?: boolean;
}

export class Setting extends React.Component<SettingProps, SettingState> {
    static defaultProps: SettingProps = {
        prefixCls: 'bm-Page-setting'
    };
    state = {
        accountDetailVisible: false
    };

    toggle = () => {
        this.setState({
            accountDetailVisible: !this.state.accountDetailVisible
        })
    };

    render() {
        const {className, loginData, userData, prefixCls}: any = this.props;
        const styleClass = classNames(
            prefixCls,
            className
        );
        const user: any = userData.user;
        return (
            <Page className={styleClass}>
                <NavBar className="bm-header"
                        center="我的" left={
                    <Icon icon="keyboard_arrow_left"/>
                } fixed={true}/>
                <Content>
                    {
                        loginData.isLogin ? (
                            <List className="margin-top-10 margin-bottom-10">
                                <ListItem onClick={this.toggle}>
                                    <Avatar shape="circle" src={user.avatar} className="bm-default-user"/>
                                    <ListItemText>
                                        <p className="bm-Setting-title">{user.name}</p>
                                        <p className="bm-Setting-subtitle">
                                            <Icon icon="phone_android" size="1x" className="no-margin"/>
                                            {user.phone}
                                        </p>
                                    </ListItemText>
                                    <ListItemAction>
                                        <Icon icon="chevron_right"/>
                                    </ListItemAction>
                                </ListItem>
                            </List>
                        ) : (
                            <List className="margin-top-10 margin-bottom-10">
                                <ListItem>
                                    <NavLink to="/login">
                                        <Avatar shape="circle" className="bm-default-user">
                                            <Icon icon="person" size="1x" className="no-margin"/>
                                        </Avatar>
                                        <ListItemText>
                                            <p className="bm-Setting-title">点击登录帐号</p>
                                            <p className="bm-Setting-subtitle">登录后更精彩</p>
                                        </ListItemText>
                                    </NavLink>
                                </ListItem>
                            </List>
                        )
                    }
                    {/*<List>*/}
                    {/*<ListItem>*/}
                    {/*<Avatar shape="circle">*/}
                    {/*<Icon icon="notifications" size="1x" className="no-margin"/>*/}
                    {/*</Avatar>*/}
                    {/*<ListItemText>*/}
                    {/*推送通知*/}
                    {/*</ListItemText>*/}
                    {/*<ListItemAction>*/}
                    {/*<Switch/>*/}
                    {/*</ListItemAction>*/}
                    {/*</ListItem>*/}
                    {/*</List>*/}
                    {
                        loginData.isLogin ? (

                            <List className="margin-top-10">
                                <ListItem>
                                    <ListItemText>
                                        我的收货地址
                                    </ListItemText>
                                    <ListItemAction>
                                        <Icon icon="chevron_right"/>
                                    </ListItemAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        我的收藏
                                    </ListItemText>
                                    <ListItemAction>
                                        <Icon icon="chevron_right"/>
                                    </ListItemAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText>
                                        粮票与代金券
                                    </ListItemText>
                                    <ListItemAction>
                                        <Icon icon="chevron_right"/>
                                    </ListItemAction>
                                </ListItem>
                            </List>
                        ) : null
                    }
                    <List className="margin-top-10">
                        <ListItem>
                            <ListItemText>
                                客服与投诉
                            </ListItemText>
                            <ListItemAction>
                                <Icon icon="chevron_right"/>
                            </ListItemAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText>
                                系统问题反馈
                            </ListItemText>
                            <ListItemAction>
                                <Icon icon="chevron_right"/>
                            </ListItemAction>
                        </ListItem>
                    </List>
                    <List className="margin-top-10">
                        <ListItem>
                            <ListItemText>
                                当前版本
                            </ListItemText>
                            <ListItemAction>
                                <span className="gray">v0.1.0</span>
                                <Icon icon="chevron_right"/>
                            </ListItemAction>
                        </ListItem>
                    </List>
                </Content>
                <Popup className="bm-Page-popup" visible={this.state.accountDetailVisible} direction="right">
                    <AsyncAccount onClose={this.toggle}/>
                </Popup>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loginData: state.loginData,
    userData: state.userData
});

const mapDispatchToProps = (
    {}
);

const SettingPage = connect(mapStateToProps, mapDispatchToProps)(Setting);

export default SettingPage;