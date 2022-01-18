import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
    items: any[],
    loading: boolean,
    error: string | null
}

const initialState: ShoppingCartState = {
    items: [],
    loading: true,
    error: null
}

export const getShoppingCart = createAsyncThunk(
    'ShoppingCart/getShoppingCart',
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/shoppingCart`,
            {
                headers:
                {
                    Authorization: `bearer ${jwt}`
                }
            });
        return data.shoppingCartItems;
    }
)

export const addShoppingCartItem = createAsyncThunk(
    'ShoppingCart/addShoppingCartItem',
    async (paramaters:{
        jwt: string,
        touristRouteId: string
    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/api/shoppingCart/items`,
            {
                touristRouteId:paramaters.touristRouteId
            },
            {
                headers:
                {
                    Authorization: `bearer ${paramaters.jwt}`
                }
            });
        return data.shoppingCartItems;
    }
)

export const deleteShoppingCartItems = createAsyncThunk(
    'ShoppingCart/deleteShoppingCartItems',
    async (paramaters:{
        jwt: string,
        id: number[]
    }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${paramaters.id.join()})`,
            {
                headers:
                {
                    Authorization: `bearer ${paramaters.jwt}`
                }
            });
    }
)


export const shoppingCartSlice = createSlice({
    name: 'ShoppingCart',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // getShoppingCart reducer
        builder.addCase(getShoppingCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getShoppingCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(getShoppingCart.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // addShoppingCartItem reducer
        builder.addCase(addShoppingCartItem.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addShoppingCartItem.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(addShoppingCartItem.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        });

        // deleteShoppingCartItems
        builder.addCase(deleteShoppingCartItems.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteShoppingCartItems.fulfilled, (state) => {
            state.loading = false;
            state.items = [];    
        });
        builder.addCase(deleteShoppingCartItems.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})
