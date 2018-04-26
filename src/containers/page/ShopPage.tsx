import * as React from 'react';
import {withRouter} from 'react-router';
import {
    Avatar, Content, Chip, Icon, Badge, Button, Rate,
    List, ListItem, ListItemText, ListItemAction,
    NavBar, SearchBar, Page, Tabs, Tab, TabContainer, TabsGroup
} from 'bee-mobile';

export class ShopPage extends React.PureComponent {
    headerElem: any;

    getRef = (node) => {
        this.headerElem = node;
        if (this.headerElem) {
            const parent = this.headerElem.parentNode;
            const pHeight = parent.offsetHeight;
            const height = this.headerElem.offsetHeight;
            const nHeight = parent.previousSibling.offsetHeight;
            this.headerElem.nextElementSibling.style.height = (pHeight - height - nHeight - 50) + 'px';
        }
    };

    goBack = () => {
        const {history}: any = this.props;
        history.goBack();
    };

    render() {
        const menu = {
            "activities": [{
                "attribute": "17.0",
                "description": "新用户下单立减17元",
                "icon_color": "70bc46",
                "icon_name": "首",
                "id": 807889066,
                "is_exclusive_with_food_activity": true,
                "name": "新用户立减(不与其他活动共享)",
                "tips": "新用户下单立减17元",
                "type": 103
            }, {
                "attribute": "",
                "description": "满20减2，满30减3，满40减8",
                "icon_color": "f07373",
                "icon_name": "减",
                "id": 282613058,
                "is_exclusive_with_food_activity": true,
                "name": "满减活动",
                "tips": "满20减2，满30减3，满40减8",
                "type": 102
            }],
            "address": "广州市天河区棠东棠德东路2号铺",
            "authentic_id": 1382787261439301,
            "description": "金早绿点，做广州人最喜爱的早餐。",
            "distance": 3529,
            "favored": false,
            "flavors": [{
                "id": 213,
                "name": "米粉面馆"
            }],
            "float_delivery_fee": 5.5,
            "float_minimum_order_amount": 20,
            "has_story": false,
            "id": 147011301,
            "image_path": "r1.webp",
            "is_new": false,
            "is_premium": false,
            "is_stock_empty": 0,
            "is_valid": 1,
            "latitude": 23.131713,
            "longitude": 113.387724,
            "max_applied_quantity_per_order": -1,
            "name": "金早绿点(棠东店)",
            "next_business_time": "",
            "only_use_poi": false,
            "opening_hours": ["06:00/18:30"],
            "order_lead_time": 40,
            "phone": "18520408765 020-23358788",
            "piecewise_agent_fee": {
                "description": "配送费¥5.5",
                "extra_fee": 2.5,
                "is_extra": true,
                "rules": [{
                    "fee": 5.5,
                    "price": 20
                }],
                "tips": "配送费¥5.5"
            },
            "platform": 0,
            "posters": [],
            "promotion_info": "金早绿点，做广州人最喜爱的早点，我们在这里等您",
            "rating": 4.8,
            "rating_count": 0,
            "recent_order_num": 412,
            "recommend": {
                "is_ad": false,
                "reason": ""
            },
            "recommend_reasons": [],
            "regular_customer_count": 0,
            "scheme": "eleme://catering?restaurant_id=147011301",
            "status": 1,
            "support_tags": [],
            "supports": [{
                "description": "该商户食品安全已由中国太平洋保险承保，食品安全有保障",
                "icon_color": "999999",
                "icon_name": "保",
                "id": 7,
                "name": "食安保",
                "two_characters_icon_name": "保险"
            }],
            "type": 0
        };
        return (<Page className="bm-Page-shop">
            <NavBar className="bm-header"
                    center={
                        <SearchBar placeholder="搜索店内商品"/>
                    } left={
                <Icon icon="keyboard_arrow_left" onClick={this.goBack}/>
            } fixed={true}/>
            <Content>
                <div className="header" ref={this.getRef}>
                    <List>
                        <ListItem>
                            <Avatar src={`assets/restaurants/${menu.image_path}`} alt={menu.name}
                                    style={{width: 70, height: 'auto'}}/>
                            <ListItemText>
                                <div className="base-info">
                                    <div>
                                        <h3 className="bm-shopName text-truncate">{menu.name}</h3>
                                        <div className="bm-rateWrap">
                                            <span className="shop-notice">
                                                <Icon icon="volume_down"/>欢迎光临老河间驴肉火烧(娜丽莎店)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="fav-wrap notFav skipClick">
                                        收藏
                                    </span>
                                </div>
                                <div className="multi-items">
                                    <span>27分钟</span><span>蜂鸟配送.准时达</span>
                                </div>
                            </ListItemText>
                        </ListItem>
                    </List>
                </div>
                <div className="main">
                    <TabsGroup>
                        <Tabs>
                            <Tab>商品</Tab>
                            <Tab>评价</Tab>
                            <Tab>店铺</Tab>
                        </Tabs>
                        <TabContainer className="no-padding">
                            <TabsGroup position="left" animated={false}>
                                <Tabs className="type-list">
                                    <Tab>
                                        <p>
                                            <img className="icon" src="https://gw.alicdn.com/tps/TB1oQBBLpXXXXb5XpXXXXXXXXXX-42-42.png"/>
                                            <span className="text">热销</span>
                                            <span className="num">0</span>
                                        </p>
                                    </Tab>
                                    <Tab>
                                        <p>
                                            <img className="icon" src="https://gw.alicdn.com/tfs/TB1L2Y0QXXXXXXsXpXXXXXXXXXX-42-42.png"/>
                                            <span className="text">优惠</span>
                                            <span className="num">0</span>
                                        </p>
                                    </Tab>
                                    <Tab>
                                        <p>
                                            <span className="text">超值套餐</span>
                                            <span className="num">0</span>
                                        </p>
                                    </Tab>
                                </Tabs>
                                {
                                    [0, 1, 2].map((value) => {
                                        return (
                                            <TabContainer key={value} className="padding-10">
                                                <List>
                                                    <ListItem>
                                                        <Avatar src={'http://gw.alicdn.com/TLife/1524299261498/TB1H_tnflmWBuNkSndV.sksApXa_120x120q90s0.jpg_.webp'}
                                                                style={{width: 70, height: 'auto'}}/>
                                                        <ListItemText>
                                                            <h3 className="bm-shopName text-truncate">
                                                                狮王争霸双人套餐
                                                            </h3>
                                                            <p>冬菇肉饼饭+盐焗手撕鸡饭+客家菜干猪骨汤+阿萨姆奶茶</p>
                                                            <div className="bm-rateWrap">
                                                                <span className="bm-font-small">月售{menu.recent_order_num}单</span>
                                                            </div>
                                                            <div className="bm-actRow distance_time delivery">
                                                                <div className="price-wrap">
                                                                    <span className="price promotion-price">￥20</span>
                                                                    <span className="price normal-price">￥80</span>
                                                                </div>
                                                                <div className="Row bm-actRow-right">
                                                                    <Button size="sm" flat={true} shape="circle">
                                                                        <Icon icon="add"/>
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </TabContainer>
                                        );
                                    })
                                }
                            </TabsGroup>
                        </TabContainer>
                        <TabContainer className="no-padding">
                            <div className="padding-10 store-summary">
                                <div>
                                    商家服务: <span className="bm-rate-score">4.5</span>
                                </div>
                                <Rate readOnly allowHalf={true} defaultValue={4.5}/>
                            </div>
                            <div className="tags padding-10">
                                <Chip active={true} label="全部 300"/>
                                <Chip label="满意 200"/>
                                <Chip label="不满意 100"/>
                            </div>
                        </TabContainer>
                        <TabContainer className="no-padding">

                        </TabContainer>
                    </TabsGroup>
                </div>
                <div className="thumb-cart bm-Paper-10dp">
                    <div className="cart-icon dist disable"/>
                    <div className="summary">
                        <span className="null-tip">购物车是空的</span>
                    </div>
                    <Button>结算(0)</Button>
                </div>
            </Content>
        </Page>)
    }
}

const ShopContainer = withRouter(ShopPage);

export default ShopContainer;