import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Correct for Vite

// Helper function to get the token
const getAuthHeader = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    return { Authorization: `Bearer ${token}` };
};

const initialState = {
    employees: [], // Simplified state structure
    status: 'idle',
    error: null,
};

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employeeData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${baseUrl}/api/employees/add`, employeeData, { headers: getAuthHeader() });
        console.log('addEmployee response:', response.data); // Debugging line
        return response.data;
    } catch (error) {
        console.error('addEmployee error:', error.response?.data || error.message); // Debugging line
        return rejectWithValue(error.response?.data || error.message);
    }
});
export const fetchEmployees = createAsyncThunk(
    'employee/fetchEmployees',
    async (_, rejectWithValue) => {
        try {
            const response = await axios.get(`${baseUrl}/api/employees`, { headers: getAuthHeader() });
            return response.data.employees; // Return only the employees array
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async ({ id, data }, { rejectWithValue }) => {
    try {
        console.log('id:', id); // Debugging line
        console.log('data:', data); // Updated debugging line
        
        const response = await axios.put(`${baseUrl}/api/employees/${id}`, data, { headers: getAuthHeader() });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
});

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/api/employees/${id}`, { headers: getAuthHeader() });
        return id;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data : error.message);
    }
})

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEmployee.fulfilled, (state, action) => {
                if (!Array.isArray(state.employees)) {
                    state.employees = []; // Ensure employees is an array
                }
                state.employees.push(action.payload);
            })
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees = action.payload; // Directly assign the employees array
                state.status = 'succeeded';
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(emp => emp._id !== action.payload);
            });
    }
});

export default employeeSlice.reducer;