import { configureStore } from '@reduxjs/toolkit';

import { api } from './api';
import modalReducer from './modal/slice';

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
