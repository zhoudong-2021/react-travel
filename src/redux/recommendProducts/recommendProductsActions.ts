import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductsAction = FetchRecommendProductsSuccessAction
    | FetchRecommendProductsStartAction | FetchRecommendProductsFailAction;

export const fetchRecommendProductsStartActionCreator = (): FetchRecommendProductsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductsSuccessActionCreator = (data: any): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductsFailActionCreator = (error: any): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

export const fetchRecommendProductsActionCreator = (): ThunkAction<void, RootState, undefined, RecommendProductsAction> =>
    async (dispatch, getState) => {
        dispatch(fetchRecommendProductsStartActionCreator());
        try {
            const { data } = await axios.get('http://123.56.149.216:8080/api/productCollections');
            dispatch(fetchRecommendProductsSuccessActionCreator(data));
        } catch (error) {
            dispatch(fetchRecommendProductsFailActionCreator(error));
        }
    }


