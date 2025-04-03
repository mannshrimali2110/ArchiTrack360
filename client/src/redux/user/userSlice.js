    import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null; // Clear user data
        },
        setUser: (state, action) => {
            state.currentUser = action.payload; // Update currentUser state
        },
        clearUser: (state) => {
            state.currentUser = null; // Clear currentUser state
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
