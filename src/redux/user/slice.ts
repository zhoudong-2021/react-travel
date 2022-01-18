import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    token: string | null,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    token: null,
    loading: false,
    error: null
}

export const signIn = createAsyncThunk(
    'user/signIn',
    async (parameters: {
        email: string,
        password: string,
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`, {
            email: parameters.email,
            password: parameters.password
        });
        return data.token;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.payload;
        });
        builder.addCase(signIn.rejected.type, (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})

// export const { fetchFail, fetchSuccess, fetchStart } = userSlice.actions;

// export default productDetailSlice.reducer;