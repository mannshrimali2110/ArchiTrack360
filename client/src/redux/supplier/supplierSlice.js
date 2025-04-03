import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

// Helper function to get the token
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
};

// Async actions
export const fetchSuppliers = createAsyncThunk('supplier/fetchSuppliers', async () => {
    const response = await axios.get(`${baseUrl}/api/suppliers/`, {
        headers: getAuthHeader(),
    });
    return response.data;
});

export const addSupplier = createAsyncThunk('supplier/addSupplier', async (supplier) => {
    const response = await axios.post(`${baseUrl}/api/suppliers/add`, supplier, {
        headers: getAuthHeader(),
    });
    return response.data;
});

export const updateSupplier = createAsyncThunk('supplier/updateSupplier', async ({ id, supplier }) => {
    const response = await axios.put(`${baseUrl}/api/suppliers/update/${id}`, supplier, {
        headers: getAuthHeader(),
    });
    return response.data;
});

export const deleteSupplier = createAsyncThunk('supplier/deleteSupplier', async (id) => {
    await axios.delete(`${baseUrl}/api/suppliers/delete/${id}`, {
        headers: getAuthHeader(),
    });
    return id;
});

// Initial state
const initialState = {
    suppliers: [],
    isLoading: false,
    error: null,
    selectedSupplier: null, // Add this field
};

// Slice
const supplierSlice = createSlice({
    name: 'supplier',
    initialState,
    reducers: {
        setSelectedSupplier: (state, action) => {
            state.selectedSupplier = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.suppliers = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch suppliers';
            })
            .addCase(addSupplier.fulfilled, (state, action) => {
                state.suppliers.push(action.payload);
            })
            .addCase(updateSupplier.fulfilled, (state, action) => {
                const index = state.suppliers.findIndex((supplier) => supplier._id === action.payload._id);
                if (index !== -1) state.suppliers[index] = action.payload;
            })
            .addCase(deleteSupplier.fulfilled, (state, action) => {
                state.suppliers = state.suppliers.filter((supplier) => supplier._id !== action.payload);
            });
    },
});

export const { setSelectedSupplier } = supplierSlice.actions;

export default supplierSlice.reducer;
