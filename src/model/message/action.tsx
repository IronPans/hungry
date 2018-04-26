import * as pro from './actionType';

// 初始化获取商品数据，保存至redux
export const getProData = () => {
    // 返回函数，异步dispatch
    return dispatch => {
        try{
            let result = [{
                product_id: 'a1',
                product_name: 'React',
                product_price: '99',
                selectNum: 1
            }, {
                product_id: 'a2',
                product_name: 'React',
                product_price: '99',
                selectNum: 1
            }, {
                product_id: 'a2',
                product_name: 'React',
                product_price: '99',
                selectNum: 1
            }];
            dispatch({
                type: pro.SAVE_PRODUCT,
                dataList: result,
            })
        }catch(err){
            console.error(err);
        }
    }
};

export function selectProData(item) {
    return {
        type: pro.SELECT_PRODUCT,
        item
    }
}

export function editProData(index, selectNum) {
    return {
        type: pro.EDIT_PRODUCT,
        index,
        selectNum
    }
}

export function deleteProData(index) {
    return {
        type: pro.DELETE_PRODUCT,
        index
    }
}

export function clearProData() {
    return {
        type: pro.CLEAR_PRODUCT
    }
}