import{createStore,applyMiddleware} from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middlewares/actionLog';
import { translateText } from './middlewares/translateText';
import productDetailReducer from './productDetail/slice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailReducer,
})

// const store = createStore(rootReducer, applyMiddleware(thunk, translateText));
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), translateText],
    devTools:true,
});

export type RootState = ReturnType<typeof store.getState>

export default store;
