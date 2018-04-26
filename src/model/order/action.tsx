import * as order from './actionType';
import BaseRequest from '../../common/BaseRequest';

const proRequest = new BaseRequest();

// 初始化获取购物车商品数据，保存至redux
export const getProData = () => {
    // 返回函数，异步dispatch
    return async dispatch => {
        try {
            const result: any = await proRequest.setHeaderCode('json').post(process.env.HUNGRY_URL + '/orders', {
                data: {
                    userId: 1
                }
            });
            dispatch({
                type: order.SAVE_ORDER,
                dataList: result.data,
            });
        } catch (err) {
            console.error(err);
        }
    }
};

export function selectProData(item) {
    return {
        type: order.SELECT_ORDER,
        item
    }
}

export function editProData(index, selectNum) {
    return {
        type: order.EDIT_ORDER,
        index,
        selectNum
    }
}

export function deleteProData(index) {
    return {
        type: order.DELETE_ORDER,
        index
    }
}

export function clearProData() {
    return {
        type: order.CLEAR_ORDER
    }
}