import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import { translateText } from './middlewares/translateText';
import productDetailReducer from './productDetail/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSearchSlice } from './productSearch/slice';
import { userSlice } from './user/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { shoppingCartSlice } from './shoppingCart/slice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailReducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, translateText));
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), translateText],
    devTools: true,
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };
