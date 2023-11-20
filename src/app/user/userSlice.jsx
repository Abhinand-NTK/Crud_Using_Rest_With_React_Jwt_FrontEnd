import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { jwtDecode } from 'jwt-decode';


export const userRegistation = createAsyncThunk('user/register', async (userData) => {
    const response = await userApi.register(userData)


    return response

});

export const userLogin = createAsyncThunk('user/login', async (userData, { dispatch }) => {
    try {

        const response = await userApi.login(userData);
        const accessToken = response.access;
        localStorage.setItem('jwtToken', accessToken);
        const decodedToken = jwtDecode(accessToken);

        dispatch(login(decodedToken));
    } catch (error) {
    }




});

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, error: (null) },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            console.log(action)
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegistation.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userRegistation.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message;
            })


    }
})

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;