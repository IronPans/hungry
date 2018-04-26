import * as history from './actionType';

export const getHistoryData = () => {
    return (dispatch) => {
        try {
            const dataList = [];
            dispatch({
                type: history.SAVE_SEARCH_HISTORY,
                dataList
            })
        } catch(e) {}
    }
};

export const addHistoryData = (item) => {
    return {
        type: history.ADD_SEARCH_HISTORY,
        item
    }
};

export const clearHistoryData = () => {
    return {
        type: history.CLEAR_SEARCH_HISTORY
    }
};