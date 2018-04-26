import {CLEAR_PRODUCT, EDIT_PRODUCT, SAVE_PRODUCT, SELECT_PRODUCT} from './actionType';
import * as Immutable from 'immutable';

const defaultState = {
    /**
     * 商品数据
     * @type {Array}
     * example: [{
     *    product_id: A1, 商品ID
     *    product_name: "React", 商品名称
     *    product_price: 99, 商品价格
     *    selectNum: 0, 选择数量
     * }]
     * */
    dataList: []
};

export const messageData = (state = defaultState, action) => {
    let imuDataList;
    let imuItem;
    switch (action.type) {
        case SAVE_PRODUCT:
            return {...state, ...action};
        case SELECT_PRODUCT:
            //避免引用类型数据，使用immutable进行数据转换
            imuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return {...state, ...{dataList: imuDataList.toJS()}};
        case EDIT_PRODUCT:
            //避免引用类型数据，使用immutable进行数据转换
            imuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuItem = imuItem.set('selectNum', action.selectNum);
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return {...state, ...{dataList: imuDataList.toJS()}};
        // 清空数据
        case CLEAR_PRODUCT:
            imuDataList = Immutable.fromJS(state.dataList);
            for (let i = 0; i < state.dataList.length; i++) {
                imuDataList = imuDataList.update(i, item => {
                    item = item.set('selectNum', 0);
                    return item
                })
            }
            return {...state, ...{dataList: imuDataList.toJS()}};
        default:
            return state;
    }
};