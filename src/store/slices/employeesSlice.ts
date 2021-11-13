import { Api } from './../../services/api';
import { RootState } from '../index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'utils/loadState';

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
}

export enum LoadingState {
  LOADED = 'LOADED',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  NEVER = 'NEVER',
}

interface EmployeesState {
  items: IEmployee[];
  activeIds: string[];
  loadingState: LoadingState;
}

const initialState: EmployeesState = {
  items: [],
  activeIds: loadState() ?? [],
  loadingState: LoadingState.NEVER,
};

export const fetchEmployees = createAsyncThunk<IEmployee[]>(
  'employees/fetchEmployees',
  async () => {
    const assets = await Api.getEmployees();
    return assets;
  }
);

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addActiveEmployee: (state, action: PayloadAction<string>) => {
      state.activeIds.push(action.payload);
    },
    removeActiveEmployee: (state, action: PayloadAction<string>) => {
      const index = state.activeIds.indexOf(action.payload);
      state.activeIds.splice(index, 1);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchEmployees.fulfilled.type, (state, action: PayloadAction<IEmployee[]>) => {
        state.items = action.payload.sort((a, b) => a.firstName.localeCompare(b.firstName));
        state.loadingState = LoadingState.LOADED;
      })
      .addCase(fetchEmployees.pending.type, (state) => {
        state.loadingState = LoadingState.LOADING;
      })
      .addCase(fetchEmployees.rejected.type, (state) => {
        state.loadingState = LoadingState.ERROR;
      }),
});

export const { addActiveEmployee, removeActiveEmployee } = employeesSlice.actions;

export const selectEmployees = (state: RootState) => state.employees.items;
export const selectEmployeesLoadingState = (state: RootState) => state.employees.loadingState;
export const selectActiveEmployeeIds = (state: RootState) => state.employees.activeIds;

export default employeesSlice.reducer;
