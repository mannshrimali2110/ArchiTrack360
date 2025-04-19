import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

// Helper function to get the token
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return { Authorization: `Bearer ${token}` };
};

// Async actions
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    const response = await axios.get(`${baseUrl}/api/orders/`, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const addOrder = createAsyncThunk('order/addOrder', async (order) => {
    const response = await axios.post(`${baseUrl}/api/orders/add`, order, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const updateOrder = createAsyncThunk('order/updateOrder', async ({ id, item }) => {
    const response = await axios.put(`${baseUrl}/api/orders/update/${id}`, item, {
        headers: getAuthHeader(), // Ensure token is included in the request
    });
    return response.data; // Ensure the updated order is returned
});

export const deleteOrder = createAsyncThunk('order/deleteOrder', async (id) => {
    await axios.delete(`${baseUrl}/api/orders/delete/${id}`, {
        headers: getAuthHeader(),
    });
    return id;
});

// Slice
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        data: [], // Ensure `data` is initialized as an empty array
        status: 'idle',
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                console.log('fetchOrders fulfilled:', action.payload); // Debugging log
                state.status = 'succeeded';
                state.loading = false;
                state.data = action.payload; // Populate `data` with fetched orders
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch orders'; // Improved error handling
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                const index = state.data.findIndex((order) => order._id === action.payload._id);
                if (index !== -1) state.data[index] = action.payload;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.data = state.data.filter((order) => order._id !== action.payload);
            });
    },
});

export default orderSlice.reducer;
