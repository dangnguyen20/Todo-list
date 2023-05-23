import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './Reducer/reducer'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
    key: "root",
    storage,
}
const pReducer = persistReducer(persistConfig, taskReducer);
export const store = configureStore({
    reducer: {
        store: pReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export const persistor = persistStore(store);