import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
          state.loading = true;
          state.error = null;
        },
        loginSuccess: (state, action) => {
          state.loading = false;
          state.user = action.payload.data.user; // Payload contains user data
          state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload; // Payload contains error message
        },
        logout: (state) => {
          state.user = null;
          state.isAuthenticated = false;
        },
    }    
})


export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
