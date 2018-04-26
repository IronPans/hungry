import * as React from 'react';
import {NavLink} from 'react-router-dom';
import * as classNames from 'classnames';
import {Content, NavBar, Icon, IndexList, IndexSection, SearchBar, Page} from 'bee-mobile';
import BaseRequest from '../../common/BaseRequest';

interface AddressPageState {
    cities?: Array<any>;
    visible?: boolean;
}

export class AddressPage extends React.PureComponent<any, AddressPageState> {
    state = {
        cities: [],
        visible: false
    };
    cityRequest: any;

    constructor(props) {
        super(props);
        this.cityRequest = new BaseRequest();
    }

    componentDidMount() {
        this.getCities();
    }

    togglePage = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    async getCities() {
        const result = await this.cityRequest.get(process.env.HUNGRY_URL + '/cities');
        if (result.message === 'success') {
            const cities = result.data;
            const list = {};
            for (const city of cities) {
                const letter = city.cityNameInitial.slice(0, 1);
                list[letter] = list[letter] || [];
                list[letter].push(city);
            }
            this.setState({
                cities: Object.keys(list).map((c) => {
                    return list[c];
                })
            })
        }
    }

    getFirstLetter(letter) {
        return letter.slice(0, 1).toUpperCase();
    }

    render() {
        const pageStyle = classNames(
            `search-city`,
            {
                'active': this.state.visible
            }
        );
        const {cities}: any = this.state;
        return (<Page className="bm-Page-address">
            <NavBar className="bm-header"
                    center={
                        <div className="search-wrapper">
                            <span className="cur-address" onClick={this.togglePage}>
                                广州<Icon icon="arrow_drop_down"/>
                            </span>
                            <SearchBar placeholder="请输入地址"/>
                        </div>
                    } left={
                <NavLink to="/app/home">
                    <Icon icon="keyboard_arrow_left"/>
                </NavLink>
            } fixed={true}/>
            <Content>
                <section className="padding-10 no-padding-bottom">

                </section>
            </Content>
            <section className={pageStyle}>
                <NavBar className="bm-header"
                        center={
                            <div className="search-wrapper">
                                <SearchBar placeholder="请输入城市名"/>
                            </div>
                        } left={
                    <Icon icon="keyboard_arrow_left" onClick={this.togglePage}/>
                } fixed={true}/>
                <Content>
                    <IndexList>
                        {
                            cities.map((city, index) => {
                                return (<IndexSection key={index} index={this.getFirstLetter(city[0].cityNameInitial)}>
                                    {
                                        city.map((c, k) => {
                                            return (<span key={k}>{c.cityName}</span>)
                                        })
                                    }
                                </IndexSection>);
                            })
                        }
                    </IndexList>
                </Content>
            </section>
        </Page>);
    }
}