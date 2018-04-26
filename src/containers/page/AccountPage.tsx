import * as React from 'react';
import {withRouter} from 'react-router';
import {
    Avatar, NavBar, Content, Page, Icon, Button, MessageBox,
    List, ListItem, ListItemText, ListItemAction } from 'bee-mobile';

interface AccountPageProps {
    onClose?: Function;
}

export default class AccountPage extends React.PureComponent<AccountPageProps, {}> {

    goBack = () => {
        // const {history}: any = this.props;
        // history.goBack();
        if (this.props.onClose) {
            (this.props.onClose as Function)();
        }
    };

    handleOpenConfirm() {
        MessageBox.confirm({
            message: '是否退出登录!',
            confirmButtonText: '确认退出',
            onConfirm: () => {}
        });
    }

    render() {
        return (<Page className="bm-Page-search">
            <NavBar className="bm-header"
                    center="帐号信息" left={
                <Icon onClick={this.goBack} icon="keyboard_arrow_left"/>
            } fixed={true}/>
            <Content>
                <List className="margin-top-10">
                    <ListItem>
                        <ListItemText>
                            头像
                        </ListItemText>
                        <ListItemAction>
                            <Avatar shape="circle" className="bm-default-user">
                                <Icon icon="person" size="1x" className="no-margin"/>
                            </Avatar>
                            <Icon icon="chevron_right"/>
                        </ListItemAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText>
                            用户名
                        </ListItemText>
                        <ListItemAction>
                            <span className="gray">v0.1.0</span>
                            <Icon icon="chevron_right"/>
                        </ListItemAction>
                    </ListItem>
                </List>
                <List className="margin-top-10">
                    <ListItem>
                        <ListItemText>
                            手机号
                        </ListItemText>
                        <ListItemAction>
                            <span className="gray">v0.1.0</span>
                            <Icon icon="chevron_right"/>
                        </ListItemAction>
                    </ListItem>
                </List>
                <List className="margin-top-10">
                    <ListItem>
                        <ListItemText>
                            修改密码
                        </ListItemText>
                        <ListItemAction>
                            <Icon icon="chevron_right"/>
                        </ListItemAction>
                    </ListItem>
                </List>
                <div className="padding-10 padding-top-20">
                    <Button theme="danger" block onClick={this.handleOpenConfirm}>退出登录</Button>
                </div>
            </Content>
        </Page>)
    }
}

// const AccountContainer = withRouter(AccountPage);
//
// export default AccountContainer;