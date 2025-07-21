import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/themeSlice';
import colorReducer from './features/colorSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    color: colorReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
