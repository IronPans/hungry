import * as React from 'react';
import {withRouter} from 'react-router';
import {
    Avatar, Content, NavBar, Icon, Badge, Spin, Rate,
    List, ListItem, ListItemText, ListItemAction, Page} from 'bee-mobile';
import BaseRequest from "../../common/BaseRequest";
import {getJsonp} from '../../common/utils';

interface ListPageState {
    end?: boolean;
    type?: '' | 'menu' | 'sort' | 'filter';
    menuList?: Array<any>;
    shops?: Array<any>;
}

export class ListPage extends React.PureComponent<{}, ListPageState> {
    page: number = 1;
    limit: number = 10;
    restaurantService: any;

    constructor(props) {
        super(props);
        this.state = {
            end: false,
            type: '',
            shops: []
        };
        this.restaurantService = new BaseRequest();
    }

    componentDidMount() {
        this.getRestaurants();
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

    handleInfinite = (event: any) => {
        this.getRestaurants();
        event.done();
    };

    toShop = () => {
        const {history}: any = this.props;
        history.push('/shop', 'shop');
    };

    goBack = () => {
        const {history}: any = this.props;
        history.goBack();
    };

    getFilterBoard(type) {
        const sortList = [{
            title: '智能排序'
        }, {
            title: '距离最近'
        }, {
            title: '评分最高'
        }, {
            title: '销量最高'
        }, {
            title: '起送价最低'
        }, {
            title: '最早送达'
        }];
        const menuList = [{
            title: '快餐便当',
            icon: '//gw.alicdn.com/tps/TB1virRMpXXXXavXXXXXXXXXXXX-35-36.png'
        }, {
            title: '特色菜系',
            icon: '//gw.alicdn.com/tps/TB1as_kMpXXXXanaXXXXXXXXXXX-37-35.png'
        }, {
            title: '异国料理',
            icon: '//gw.alicdn.com/tps/TB1nJnBKXXXXXc8aXXXXXXXXXXX-66-66.png'
        }, {
            title: '快餐便当',
            icon: '//gw.alicdn.com/tps/TB1virRMpXXXXavXXXXXXXXXXXX-35-36.png'
        }, {
            title: '快餐便当',
            icon: '//gw.alicdn.com/tps/TB1virRMpXXXXavXXXXXXXXXXXX-35-36.png'
        }];
        switch (type) {
            case 'menu':
                return (<div className="menu-wrap">
                    <div className="menu">
                        <span className="menu-item">
                            <img className="icon" src="https://gw.alicdn.com/tps/TB1P6buMpXXXXajXVXXXXXXXXXX-33-33.png"/>
                            <span className="txt">全部</span>
                        </span>
                        <span className="menu-item active">
                            <img className="icon" src="//gw.alicdn.com/tps/TB1virRMpXXXXavXXXXXXXXXXXX-35-36.png"/>
                            <span className="txt">快餐便当</span>
                            <span className="count">3</span>
                        </span>
                    </div>
                    <div className="sub-menu">
                        <div className="sub-menu-item">
                            全部
                            <span className="count">3</span>
                        </div>
                    </div>
                </div>);
            case 'sort':
                return (<div className="sort">
                    {
                        sortList.map((item, index) => {
                            return (<span className="sort-item" key={index}>{item.title}</span>);
                        })
                    }
                </div>);
            case 'filter':
                return (<div className="filter-warp">
                    <div className="filter-group">
                        <div className="group-title">优惠与活动</div>
                        <div className="filter-list">
                            <div className="filter-row">
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: `url(https://gw.alicdn.com/tfs/TB1gQx4QpXXXXXPXVXXXXXXXXXX-42-42.png)`}}/>
                                    <span className="filter-title">满减优惠</span>
                                </div>
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: "url(https://gw.alicdn.com/tfs/TB1AadRQpXXXXaHaXXXXXXXXXXX-42-42.png)"}}/>
                                    <span className="filter-title">特价秒杀</span>
                                </div>
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: "url(https://gw.alicdn.com/tfs/TB1kIhQQpXXXXcCaXXXXXXXXXXX-42-42.png)"}}/>
                                    <span className="filter-title">赠品优惠</span>
                                </div>
                            </div>
                            <div className="filter-row">
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: "url(https://gw.alicdn.com/tfs/TB1DYmaQpXXXXX1XFXXXXXXXXXX-42-42.png)"}}/>
                                    <span className="filter-title">折扣活动</span>
                                </div>
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: "url(https://gw.alicdn.com/tfs/TB1SiSdQpXXXXb0XpXXXXXXXXXX-42-42.png)"}}/>
                                    <span className="filter-title">进店领券</span>
                                </div>
                                <div className="filter-item">
                                    <i className="icon" style={{backgroundImage: "url(https://gw.alicdn.com/tfs/TB19yhPQpXXXXb4aXXXXXXXXXXX-42-42.png)"}}/>
                                    <span className="filter-title">下单返券</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-btns">
                        <span className="reset">重置</span>
                        <span className="ok">确定</span>
                    </div>
                </div>);
        }
    }

    close = () => {
        this.setState({
            type: ''
        })
    };

    menuClick = (type) => {
      this.setState({
          type
      });
    };

    render() {
        const {shops = [], type}: any = this.state;
        return (<Page className="bm-Page-list">
            <NavBar className="bm-header"
                    center="分类" left={
                <Icon icon="keyboard_arrow_left" onClick={this.goBack}/>
            } fixed={true}/>
            <div className="bm-Page-list-content">
                <div className="filter">
                    <div className="filter-bar">
                        <span className={`bar-item ${type === 'menu' ? 'active' : ''}`} onClick={this.menuClick.bind(this, 'menu')}>美食外卖</span>
                        <span className={`bar-item ${type === 'sort' ? 'active' : ''}`} onClick={this.menuClick.bind(this, 'sort')}>排序</span>
                        <span className={`bar-item ${type === 'filter' ? 'active' : ''}`} onClick={this.menuClick.bind(this, 'filter')}>筛选</span>
                    </div>
                    {
                        type ? (<div className="expanding">
                            {
                                this.getFilterBoard(type)
                            }
                        </div>) : null
                    }
                    {
                        type ? (<div className="mask" onClick={this.close}/>) : null
                    }
                </div>
                <Content infiniteScroll={true} onInfinite={this.handleInfinite}>
                    <List>
                        {
                            shops.map((menu, index) => (
                                <ListItem onClick={this.toShop} key={index.toString()}>
                                    <Avatar src={`assets/restaurants/${menu.image_path}`} alt={menu.name}
                                            style={{width: 70, height: 'auto'}}/>
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
                    <div className='bm-Content-infinite-scroll-preloader'>
                        {this.state.end ? '已经到底了' : (<div className="bm-preloader">
                            <Spin size="xs"/> 数据加载中...
                        </div>)}
                    </div>
                </Content>
            </div>
        </Page>)
    }
}

const ListContainer = withRouter(ListPage);

export default ListContainer;