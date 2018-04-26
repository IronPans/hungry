import {CLEAR_ORDER, DELETE_ORDER, EDIT_ORDER, SAVE_ORDER, SELECT_ORDER} from './actionType';
import * as Immutable from 'immutable';

const defaultState = {
    /**
     * 订单数据
     * @type {Array}
     * example: [{
     *    id: A1, 商品ID
     *    product_name: "React", 商品名称
     *    product_price: 99, 商品价格
     *    selectNum: 0, 选择数量
     * }]
     * */
    dataList: []
};

export const orderData = (state = defaultState, action) => {
    let imuDataList;
    let imuItem;
    switch (action.type) {
        case SAVE_ORDER:
            return {...state, ...action};
        case SELECT_ORDER:
            //避免引用类型数据，使用immutable进行数据转换
            imuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(action.item);
            imuDataList = imuDataList.push(imuItem);
            // redux必须返回一个新的state
            return {...state, ...{dataList: imuDataList.toJS()}};
        case EDIT_ORDER:
            //避免引用类型数据，使用immutable进行数据转换
            imuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectNum', action.selectNum);
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return {...state, ...{dataList: imuDataList.toJS()}};
        case DELETE_ORDER:
            imuDataList = Immutable.List(state.dataList);
            imuDataList.delete(action.index);
            return {...state, ...{dataList: imuDataList.toJS()}};
        // 清空数据
        case CLEAR_ORDER:
            imuDataList = Immutable.fromJS(state.dataList);
            imuDataList.clear();
            return {...state, ...{dataList: imuDataList.toJS()}};
        default:
            return state;
    }
};