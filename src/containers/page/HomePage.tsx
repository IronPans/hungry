import * as React from 'react';
import * as classNames from 'classnames';
import * as ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';
import {
    Avatar, Badge, Card, CardHeader, CardContent, Content, Icon, Button,
    List, ListItem, ListItemText, ListItemAction, NavBar, Spin,
    Rate, Page, Popover, Popup, SearchBar, Swiper
} from 'bee-mobile';
import BaseRequest from "../../common/BaseRequest";
import * as utils from '../../common/utils';

interface HomePageProps extends BaseProps {
}

interface HomePageState {
    searchPageVisible?: boolean;
    anchorEl?: any;
    categories?: Array<any>;
    end?: boolean;
    menuVisible?: boolean;
    opacity?: number;
    shops?: Array<any>;
}

export class HomePage extends React.PureComponent<HomePageProps, HomePageState> {
    static defaultProps = {
        prefixCls: 'bm-Page-home'
    };
    button: any;
    restaurantService: any;
    categoryService: any;
    page: number = 1;
    limit: number = 10;

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            opacity: 0,
            end: false,
            shops: []
        };
        this.restaurantService = new BaseRequest();
        this.categoryService = new BaseRequest();
    }

    componentDidMount() {
        // utils.getLocation(false, (position) => {
        //     console.log(position);
        // });
        this.getCategories();
        this.getRestaurants();
    }

    async getCategories() {
        const result = await this.categoryService.setHeaderCode('json').get(`${process.env.HUNGRY_URL}/categories`);
        if (result.message === 'success') {
            this.setState({
                categories: result.data
            });
        }
    }

    async getRestaurants() {
        const {shops}: any = this.state;
        if (shops.length > 0) {
            this.page++;
        }
        const result = await this.restaurantService.setHeaderCode('json').post(`${process.env.HUNGRY_URL}/restaurants`, {
            data: {
                page: this.page,
                limit: this.limit
            }
        });
        let end = false;
        if (result.total <= this.page * this.limit) {
            end = true;
        }
        this.setState({
            end,
            shops: [...shops, ...result.data]
        })
    }

    viewDetail = () => {
        this.setState({
            searchPageVisible: true
        })
    };

    close = () => {
        this.setState({
            searchPageVisible: false
        })
    };

    handleInfinite = (event: any) => {
        this.getRestaurants();
        event.done();
    };

    handleClickButton = () => {
        this.setState({
            menuVisible: !this.state.menuVisible!,
            anchorEl: ReactDOM.findDOMNode(this.button)
        });
    };

    handleClose = () => {
        this.setState({
            menuVisible: false
        });
    };

    handleScroll = (event) => {
        const scrollTop = event.target.scrollTop;
        this.setState({
            opacity: scrollTop ? 1 : 0
        });
    };

    getCategory(categories, order) {
        return categories.filter((item) => item.order === order);
    }

    toShop = () => {
        const {history}: any = this.props;
        history.push('/shop', 'shop');
    };

    render() {
        const {className, prefixCls}: any = this.props;
        const styleClass = classNames(
            prefixCls, className
        );
        const menus = [{
            text: '扫一扫'
        }, {
            text: '帮助与反馈'
        }
        ];
        const {categories, opacity, shops = []}: any = this.state;
        return (
            <Page className={styleClass}>
                <NavBar className="bm-header" fixed={true}
                        right={ <div className="search-wrapper">
                            <SearchBar onClick={this.viewDetail} disabled={true} placeholder="输入商家/商品名称"/>
                        </div>}
                        center={<div className="location-back" style={{opacity}}/>}
                        left={<Button shape="circle">
                            <NavLink to="/app/address">
                                <Icon icon="location_on"/> <span>广州</span>
                            </NavLink>
                        </Button>}/>
                <Content onContentScroll={this.handleScroll} infiniteScroll={true} onInfinite={this.handleInfinite}>
                    <div className="box">
                        <img style={{width: '100%'}}
                             src="http://img.alicdn.com/tps/TB1wvPXMVXXXXcvXFXXXXXXXXXX-1125-390.png" alt=""/>
                    </div>
                    <section>
                        <Swiper className="bm-bg-white">
                            <div className="bm-category">
                                <div className="Row flex-wrap bm-category-wrapper">
                                    {
                                        this.getCategory(categories, 1).map((item, index) => {
                                            return (
                                                <div key={`category-${index}`} className="bm-category-item">
                                                    <div className="bm-category-item-container">
                                                        <NavLink to="/list">
                                                            <Avatar alt={item['name']}
                                                                    src={`${process.env.TAOBAO_URL}/${item['image_path']}`}
                                                                    shape="circle"/>
                                                            <p className="bm-category-title">{item['name']}</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                            <div className="bm-category">
                                <div className="Row flex-wrap bm-category-wrapper">
                                    {
                                        this.getCategory(categories, 2).map((item, index) => {
                                            return (
                                                <div key={`category-${index}`} className="bm-category-item">
                                                    <div className="bm-category-item-container">
                                                        <NavLink to="/list">
                                                            <Avatar alt={item['name']}
                                                                    src={`${process.env.TAOBAO_URL}/${item['image_path']}`}
                                                                    shape="circle"/>
                                                            <p className="bm-category-title">{item['name']}</p>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Swiper>
                    </section>
                    <section className="bm-bg-white margin-top-10">
                        <p className="bm-title-line">
                            <span>优惠专区</span>
                        </p>
                        <div className="cheap-block">
                            <div/>
                        </div>
                    </section>
                    <section className="bm-bg-white margin-top-10">
                        <p className="bm-title-line">
                            <span>猜你喜欢</span>
                        </p>
                        <List>
                            {
                                shops.map((menu, index) => (
                                    <ListItem onClick={this.toShop} key={index.toString()}>
                                        <Avatar src={`assets/restaurants/${menu.image_path}`} alt={menu.name}
                                                style={{width: '1.75rem', height: 'auto'}}/>
                                        <ListItemText>
                                            <h3 className="bm-shopName text-truncate">{menu.name}</h3>
                                            <div className="bm-rateWrap">
                                                <Rate readOnly allowHalf={true} defaultValue={menu.rating}/>
                                                <span className="bm-rate-score">{menu.rating}</span>
                                                <span className="bm-font-small">月售{menu.recent_order_num}单</span>
                                            </div>
                                            <div className="bm-actRow distance_time delivery">
                                                <div className="bm-font-small">
                                                    <span className="no-padding">起送￥20</span>
                                                </div>
                                                <div className="Row bm-actRow-right bm-font-small">
                                                    <span>48分钟</span>
                                                    <span className="split-line">1577.4公里</span>
                                                </div>
                                            </div>
                                            <div className="bm-actRow activity">
                                                <div className="bm-actRow-left bm-font-small">
                                                    <p className="bm-actRow">
                                                        <Badge text="首" status="success" fixed={false}/> 新用户下单立减20元
                                                    </p>
                                                    <p className="bm-actRow">
                                                        <Badge text="减" status="error" fixed={false}/> 满20减11，满40减20
                                                    </p>
                                                </div>
                                            </div>
                                        </ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </section>
                    <div className='bm-Content-infinite-scroll-preloader'>
                        {this.state.end ? '已经到底了' : (<div className="bm-preloader">
                            <Spin size="xs"/> 数据加载中...
                        </div>)}
                    </div>
                </Content>
                <Popover dir="top-left" anchorEl={this.state.anchorEl!} visible={this.state.menuVisible!}
                         onClose={this.handleClose}>
                    <List>
                        {
                            menus.map((menu, index) => (
                                <ListItem key={index.toString()}>
                                    <ListItemText>
                                        {menu.text}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Popover>
                <Popup className="bm-Page-popup" visible={this.state.searchPageVisible} direction="right">
                    <Page className="bm-Page-search">
                        <NavBar className="bm-header"
                                right={
                                    <SearchBar placeholder="输入商家/商品名称"/>
                                } left={
                            <Icon onClick={this.close} icon="keyboard_arrow_left"/>
                        } fixed={true}/>
                        <Content>
                            <section className="padding-10 no-padding-bottom">
                                <div className="history-word-wrap">
                                    <div className="padding-bottom-10 margin-top-10">
                                        <Badge text="肯德基" fixed={false}/>
                                    </div>
                                    <div className="bm-History-delete">
                                        <Icon icon="delete"/> 删除搜索记录
                                    </div>
                                </div>
                                <div className="hot-word-wrap">
                                    <div className="padding-top-10 padding-bottom-10 word-title">
                                        热门
                                    </div>
                                    <div className="padding-bottom-10 margin-top-10">
                                        <Badge text="肯德基" fixed={false}/>
                                        <Badge text="麻辣烫" fixed={false}/>
                                        <Badge text="麻辣香锅" fixed={false}/>
                                    </div>
                                </div>
                            </section>
                        </Content>
                    </Page>
                </Popup>
            </Page>
        );
    }
}

const HomePageRouter = withRouter(HomePage);

export default HomePageRouter;