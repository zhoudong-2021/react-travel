import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
    data: any,
    loading: boolean,
    error: string | null
}

const initialState: ProductDetailState = {
    data: undefined,
    loading: true,
    error: null
}

export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    async (touristRouteId: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`);
        return data;
    }

)

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getProductDetail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(getProductDetail.rejected.type, (state, action: PayloadAction<string|null>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

export const { fetchFail, fetchSuccess, fetchStart } = productDetailSlice.actions;

export default productDetailSlice.reducer;