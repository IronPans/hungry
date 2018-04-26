import * as React from 'react';
import {connect} from 'react-redux';
import * as classNames from 'classnames';
import {withRouter} from 'react-router';
import {NavLink, Switch as SwitchRoute} from 'react-router-dom';
import {spring} from "react-motion";
import Route from 'react-router-dom/Route';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';
import {
    Avatar, Badge, Button, ButtonNavigation, ButtonNavigationItem, Content, Icon, Page, View
} from 'bee-mobile';
import SettingPage from "./page/SettingPage";
import OrderPage from './page/OrderPage';
import HomePage from './page/HomePage';
import VipCardPage from "./page/VipCardPage";
import {AddressPage} from './page/AddressPage';

interface MainProps extends BaseProps {
    location?: any;
    proData?: any;
}

interface MainState {
    index?: number;
}

export class Main extends React.PureComponent<MainProps, MainState> {
    static defaultProps: MainProps = {
        prefixCls: 'bm-Page-main'
    };
    pageTransitions = {
        enterStyles: {
            y: 300,
            opacity: 0
        },
        leaveStyles: {
            y: 0,
            opacity: 0
        },
        activeStyles: {
            y: spring(0, {
                stiffness: 128,
                damping: 16,
            }),
            opacity: spring(1, {
                stiffness: 128,
                damping: 16,
            })
        }
    };
    routes: Array<string> = ['/app/home', '/app/vipCard', '/app/order', '/app/setting'];

    constructor(props: MainProps) {
        super(props);
       this.checkLocation(props, true);
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.checkLocation(nextProps);
        }
    }

    checkLocation(props, initial = false) {
        const index = this.routes.indexOf(props.location.pathname);
        if (initial) {
            this.state = {
                index
            };
            return;
        }
        this.setState({
            index
        });
    }

    handleChange = (event: any) => {
        this.setState({
            index: event.index
        });
    };

    render() {
        const {className, prefixCls} = this.props;
        const styleClass = classNames(
            prefixCls,
            'height-100',
            className
        );
        const {index}: any = this.state;
        const rootPath = process.env.TAOBAO_URL;
        const btns = [
            {
                path: '/app/home',
                avatar: index === 0 ? 'TB19u_TRXXXXXXdaXXXXXXXXXXX-159-147.png' : 'TB1donBRXXXXXbSapXXXXXXXXXX-159-147.png'
            },
            {
                path: '/app/vipCard',
                avatar: index === 1 ? 'TB1wFzNRXXXXXb1aXXXXXXXXXXX-159-147.png' : 'TB1oD_IRXXXXXXZapXXXXXXXXXX-159-147.png'
            },
            {
                path: '/app/order',
                avatar: index === 2 ? 'TB1D8AdRXXXXXaCXpXXXXXXXXXX-159-147.png' : 'TB1IS_GRXXXXXXlapXXXXXXXXXX-159-147.png'
            },
            {
                path: '/app/setting',
                avatar: index === 3 ? 'TB1cu_1RXXXXXXBXVXXXXXXXXXX-159-147.png' : 'TB1owjTRXXXXXXaaXXXXXXXXXXX-159-147.png'
            }
        ];
        return (
            <div className={styleClass}>
                <SwitchRoute>
                    <Route path="/app/home" exact component={HomePage}/>
                    <Route path="/app/vipCard" exact component={VipCardPage}/>
                    <Route path="/app/order" exact component={OrderPage}/>
                    <Route path="/app/setting" exact component={SettingPage}/>
                    <Route path="/app/address" exact component={AddressPage}/>
                </SwitchRoute>

                <ButtonNavigation activeIndex={index} onChange={this.handleChange}>
                    {
                        btns.map((btn, i) => {
                            return (<ButtonNavigationItem key={i}>
                                <NavLink to={btn.path}>
                                    <Avatar src={rootPath + btn.avatar}/>
                                </NavLink>
                            </ButtonNavigationItem>)
                        })
                    }
                </ButtonNavigation>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    proData: state.proData
});

const mapDispatchToProps = ({

});

const MainPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

export default MainPage;