import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

// Helper function to get the token
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return { Authorization: `Bearer ${token}` };
};

// Async actions
export const fetchInventory = createAsyncThunk('inventory/fetchInventory', async () => {
    const response = await axios.get(`${baseUrl}/api/inventory/`, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const addInventoryItem = createAsyncThunk('inventory/addInventoryItem', async (item) => {
    const response = await axios.post(`${baseUrl}/api/inventory/add`, item, {
        headers: getAuthHeader(),
    });
    return response.data; // Ensure only serializable data is returned
});

export const updateInventoryItem = createAsyncThunk('inventory/updateInventoryItem', async ({ id, item }) => {
    const response = await axios.put(`${baseUrl}/api/inventory/${id}`, item, {
        headers: getAuthHeader(),
    });
    return response.data;
});

export const deleteInventoryItem = createAsyncThunk('inventory/deleteInventoryItem', async (id) => {
    await axios.delete(`${baseUrl}/api/inventory/${id}`, {
        headers: getAuthHeader(),
    });
    return id;
});

// Slice
const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload; // Ensure correct data structure
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch inventory';
            })
            .addCase(addInventoryItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateInventoryItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item._id === action.payload._id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(deleteInventoryItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item._id !== action.payload);
            });
    },
});

export default inventorySlice.reducer;
