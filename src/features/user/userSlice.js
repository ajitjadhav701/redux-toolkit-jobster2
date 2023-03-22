import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (user, thunkAPI) => {
        try {
            const res = await customFetch.post('/auth/register', user);
            return res.data;
            // console.log(res);
        } catch (error) {
            // console.log(error.response);
            // toast.error(error.response.data.msg)
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (user, thunkAPI) => {
        try {
            const res = await customFetch.post('/auth/login', user);
            // console.log(res);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: {
        //register
        [registerUser.pending]: (state) => {
            state.isLoading = true;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Hello there ${user.name}`);
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false;
            toast.error(action.payload)
        },
        // login
        [loginUser.pending]: (state) => {
            state.isLoading = true;
        },
        [loginUser.fulfilled]: (state, { payload }) => {
            const { user } = payload;
            state.isLoading = false;
            state.user = user;
            addUserToLocalStorage(user);
            toast.success(`Welcome Back ${user.name}`);
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            toast.error(action.payload)
        },
    }
});

export default userSlice.reducer;
