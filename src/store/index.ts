import { configureStore } from '@reduxjs/toolkit';
import { saveState } from 'utils/saveState';
import employeesReducer from './slices/employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
});

store.subscribe(() => {
  saveState(store.getState().employees.activeIds);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
