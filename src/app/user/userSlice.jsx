import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { jwtDecode } from 'jwt-decode';
// import { login } from './userSlice';


export const userRegistation = createAsyncThunk('user/register', async (userData) => {
    const response = await userApi.register(userData)

    console.log("This is the data from the backend", response)

    return response

});

export const userLogin = createAsyncThunk('user/login', async (userData, { dispatch }) => {
    // const response = await userApi.login(userData)


    // // Store the token in local storage



    // return response.access

    try {
        // Make API call to login
        const response = await userApi.login(userData);
        const accessToken = response.access;
        localStorage.setItem('jwtToken', accessToken);
        // console.log(jwtDecode(response.data))
        // const token = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(accessToken);
        console.log(decodedToken)

        // Assuming the response includes user data upon successful login
        dispatch(login(decodedToken));
    } catch (error) {
        // Handle login failure, e.g., show an error message
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