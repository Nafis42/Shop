// import {configureStore} from '@reduxjs/toolkit'
// import authSlice from './auth/authSlice'


// const store=configureStore({
//     reducer:{
//         auth:authSlice,
//     }
// });

// export default store;
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; // ✅ Your authSlice is here
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

// Persist Config
const persistConfig = {
    key: 'root',
    storage,
};

// Combine Reducers (Only auth for now, but scalable)
const rootReducer = combineReducers({
    auth: authReducer,  // ✅ Your authSlice is assigned here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
    reducer: persistedReducer,
});

// Persistor for persisting state
export const persistor = persistStore(store);
export default store;
