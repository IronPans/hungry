import * as React from 'react';
import * as classNames from 'classnames';
import {connect} from 'react-redux';
import {BaseProps} from 'bee-mobile/lib/common/BaseProps';
import {
    Avatar, Card, CardHeader, CardContent, CardFooter, Content,
    List, ListItem, ListItemText, ListItemAction,
    Badge, Button, Icon, NavBar, Page, Popup, Rate, SearchBar,
    Tab, TabContainer, TabsGroup, Tabs
} from 'bee-mobile';
import {clearHistoryData, getHistoryData} from '../../model/search-history/action';

interface VipCardProps extends BaseProps {
    clearHistoryData?: Function;
    getHistoryData?: Function;
}

interface VipCardState {
    detailVisible?: boolean;
}

export class VipCard extends React.PureComponent<VipCardProps, VipCardState> {
    static defaultProps = {
        prefixCls: 'bm-Page-vipCard'
    };

    constructor(props) {
        super(props);
        this.state = {
            detailVisible: false
        }
    }

    componentDidMount() {
        (this.props.getHistoryData as Function)();
    }

    render() {
        const {className, prefixCls} = this.props;
        const styleClass = classNames(
            prefixCls, className
        );
        const {shops}: any = this.state;
        return (
            <Page className={styleClass}>
                <NavBar className="bm-header" left={
                    <Icon icon="keyboard_arrow_left"/>
                }  fixed={true} center="会员卡"/>
                <Content className={styleClass}>
                </Content>
            </Page>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.dataList
    }
};

const mapDispatchToProps = ({
    clearHistoryData,
    getHistoryData
});

const VipCardPage = connect(mapStateToProps, mapDispatchToProps)(VipCard);

export default VipCardPage;