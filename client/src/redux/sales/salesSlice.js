import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

// Helper function to get the token
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return { Authorization: `Bearer ${token}` };
};

// Async actions
export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get(`${baseUrl}/api/sales/`, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const addSale = createAsyncThunk('sales/addSale', async (sale) => {
    const response = await axios.post(`${baseUrl}/api/sales/add`, sale, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const updateSale = createAsyncThunk('sales/updateSale', async ({ id, sale }) => {
    const response = await axios.put(`${baseUrl}/api/sales/${id}`, sale, {
        headers: getAuthHeader(),
    });
    return response.data;
});

export const deleteSale = createAsyncThunk('sales/deleteSale', async (id) => {
    await axios.delete(`${baseUrl}/api/sales/${id}`, {
        headers: getAuthHeader(),
    });
    return id;
});

// Slice
const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; // Ensure correct data structure
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch sales';
            })
            .addCase(addSale.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    },
});

export default salesSlice.reducer;
