import * as history from './actionType';
import * as Immutable from 'immutable';

const defaultState = {
    /**
     * 历史数据
     * @type {Array}
     * example: [{
     *    history_name: "React", 名称
     * }]
     * */
    dataList: []
};

const historyData = (state = defaultState, action) => {
    let imuDataList;
    let imuItem;
    switch (action.type) {
        case history.SAVE_SEARCH_HISTORY:
            return {...state, ...action};
        case history.ADD_SEARCH_HISTORY:
            //避免引用类型数据，使用immutable进行数据转换
            imuDataList = Immutable.List(state.dataList);
            imuItem = Immutable.Map(state.dataList[action.index]);
            imuDataList = imuDataList.set(action.index, imuItem);
            // redux必须返回一个新的state
            return {...state, ...{dataList: imuDataList.toJS()}};
        case history.CLEAR_SEARCH_HISTORY:
            return {...state, ...{dataList: []}};
        default:
            return state;
    }
};