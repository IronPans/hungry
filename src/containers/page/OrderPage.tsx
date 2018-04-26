import * as React from 'react';
import * as classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    ActionSheet, Avatar, Button, Content, Checkbox, Icon, KeyBoard, InputNumber, Page,
    List, ListItem, ListItemText, ListItemAction, NavBar
} from 'bee-mobile';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';
import {
    clearProData, deleteProData, editProData, getProData, selectProData
} from '../../model/order/action';

interface OrderProps extends BaseProps {
    orderData?: any;
    userData?: any;
    loginData?: any;
    clearProData?: Function;
    deleteProData?: Function;
    editProData?: Function;
    getProData?: Function;
    selectProData?: Function;
}

interface OrderState {
    password?: string;
}

export class Order extends React.Component<OrderProps, OrderState> {
    static defaultProps: OrderProps = {
        prefixCls: 'bm-Page-Order',
        orderData: {
            dataList: []
        }
    };
    password: string = '12345';

    handleFinish = (value: string) => {
        if (this.password === value) {
            console.log(1);
        }
    };

    sortOrders() {
        const {orderData}: any = this.props;
        const lists: any[] = [];
        const rest = new Map();
        for (const order of orderData.dataList) {
            const id = order['restaurant_id'];
            if (!rest.has(id)) {
                rest.set(id, []);
            }
            rest.set(id, [...rest.get(id), order]);
        }
        rest.forEach((value, key) => {
            const list: any = {
                restaurant_id: key,
                foods: []
            };
            for (const item of value) {
                list.foods.push(item);
            }
            lists.push(list);
        });
        return lists;
    }

    handleClose = () => {
        ActionSheet.close();
    };

    componentDidMount() {
        (this.props.getProData as Function)();
    }

    handleChange = (index: number, event: any) => {
        (this.props.editProData as Function)(index, event);
    };

    handleCount = () => {
        ActionSheet.show({
            actionClass: 'bm-KeyBoard-group',
            element: (<KeyBoard action={<a href="">忘记密码</a>} random={true} onClose={this.handleClose} onFinish={this.handleFinish}/>),
            onClose: () => {
                console.log(2);
            }
        })
    };

    render() {
        const {className, loginData, prefixCls}: any = this.props;
        const styleClass = classNames(
            'height-100', prefixCls, className
        );
        let num = -1;
        return (
            <Page className={styleClass}>
                <NavBar className="bm-header" center="订单" left={
                    <Icon icon="keyboard_arrow_left"/>
                } right={loginData.isLogin ? (<span className="bm-Order-edit">管理</span>) : null}
                        fixed={true}/>
                <Content>
                    {loginData.isLogin ? (this.sortOrders().length > 0 ? this.sortOrders().map((item, index) => {
                        return (
                            <div key={index} className="bm-Order-wrapper">
                                <h4>
                                    <Checkbox/>
                                    <span>非常虾小龙虾外卖</span>
                                    <Icon icon="chevron_right"/>
                                </h4>
                                <List className="bm-Order-list">
                                    {
                                        item.foods.map((food) => {
                                            num++;
                                            return (<ListItem key={num}>
                                                <Checkbox/>
                                                <Avatar src={`assets/restaurants/${food['image_path']}`}
                                                        style={{width: 70, height: 70}}/>
                                                <ListItemText>
                                                    <h5 className="bm-Order-item-name">
                                                        {food['name']}
                                                    </h5>
                                                    <p className="bm-Order-item-price">
                                                        ￥{food['price']}
                                                    </p>
                                                </ListItemText>
                                                <ListItemAction>
                                                    <InputNumber defaultValue={food['selectNum']} min={0}
                                                                 onChange={this.handleChange.bind(this, num)}/>
                                                </ListItemAction>
                                            </ListItem>)
                                        })
                                    }
                                </List>
                            </div>
                        )
                    }) : <div className="order-remind">
                        <Avatar src="http://gw.alicdn.com/tps/TB1tcntMpXXXXcAXVXXXXXXXXXX-236-211.png" alt=""/>
                        <p>没有订单</p>
                    </div>) : (<div className="order-remind">
                        <Avatar src="http://gw.alicdn.com/tps/TB1OUUUNVXXXXXTXpXXXXXXXXXX-240-240.png"/>
                        <p>请登录</p>
                        <p>
                            <NavLink to="/login">登录</NavLink>
                        </p>
                    </div>)}
                </Content>
                {
                    (loginData.isLogin && this.sortOrders().length > 0) ? (<footer className="bm-Order-footer bm-Paper-8dp">
                        <Checkbox>全选</Checkbox>
                        <div className="bm-Order-count">
                            合计：￥0
                            <Button onClick={this.handleCount}>结算(0)</Button>
                        </div>
                    </footer>) : null
                }
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
    loginData: state.loginData,
    userData: state.userData,
    orderData: state.orderData
});

const mapDispatchToProps = (
    {
        clearProData,
        deleteProData,
        editProData,
        getProData,
        selectProData
    }
);

const OrderPage = connect(mapStateToProps, mapDispatchToProps)(Order);

export default OrderPage;