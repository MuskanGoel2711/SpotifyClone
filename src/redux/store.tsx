import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './rootReducer';  
import { persistStore } from 'redux-persist';
// import authReducer from './config/AuthSlice';

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
          },
        }),
});

const persistor = persistStore(store); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
