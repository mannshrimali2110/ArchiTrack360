import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Reducers
import employeeReducer from './employee/employeeSlice';
import inventoryReducer from './inventory/inventorySlice';
import userReducer from './user/userSlice';
import salesReducer from './sales/salesSlice'; // Import salesSlice reducer
import supplierReducer from './supplier/supplierSlice'; // Import supplierSlice reducer
import orderReducer from './order/orderSlice'; // Import orderSlice reducer

// Root Reducer
const rootReducer = combineReducers({
  employee: employeeReducer,
  inventory: inventoryReducer,
  user: userReducer,
  sales: salesReducer, // Add sales reducer
  supplier: supplierReducer, // Add supplier reducer
  order: orderReducer, // Ensure order reducer is included
});

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['employee', 'user', 'sales', 'order'], // Persist employee, user, sales, order 
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store Configuration
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
