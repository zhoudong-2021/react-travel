import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductSearchState {
    data: any,
    loading: boolean,
    error: string | null,
    pagination: any
}

const initialState: ProductSearchState = {
    data: undefined,
    loading: true,
    error: null,
    pagination: null
}

export const searchProduct = createAsyncThunk(
    'productSearch/searchProduct`',
    async (paramaters: {
        keywords: string,
        nextPage: number | string,
        pageSize: number | string
    }, thunkAPI) => {
        let url = `http://123.56.149.216:8080/api/touristRoutes?pagenumber=${paramaters.nextPage}&pagesize=${paramaters.pageSize}`
        if(paramaters.keywords){
            url += `&keyword=${paramaters.keywords}`;
        }
        const response = await axios.get(url);
        return {
            data:response.data,
            pagination:JSON.parse(response.headers['x-pagination'])
        };
    }

)

export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {
        // fetchStart: (state) => {
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action) => {
        //     state.loading = false;
        //     state.data = action.payload;
        // },
        // fetchFail: (state, action: PayloadAction<string>) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(searchProduct.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
        });
        builder.addCase(searchProduct.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

// export const { fetchFail, fetchSuccess, fetchStart } = productSearchSlice.actions;

export default productSearchSlice.reducer;