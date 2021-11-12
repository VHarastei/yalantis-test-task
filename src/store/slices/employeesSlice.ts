import { Api } from './../../services/api';
import { RootState } from '../index';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
}

// Define a type for the slice state
interface EmployeesState {
  items: IEmployee[];
  active: IEmployee[];
}

// Define the initial state using that type
const initialState: EmployeesState = {
  items: [],
  active: [],
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
    addActiveEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.active.push(action.payload);
      state.active = state.active.sort((a, b) => a.lastName.localeCompare(b.lastName));
    },
    removeActiveEmployee: (state, action: PayloadAction<IEmployee>) => {
      const index = state.active.indexOf(action.payload);
      state.active.splice(index, 1);
      //state.active.filter((element) => element !== action.payload);
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchEmployees.fulfilled.type, (state, action: PayloadAction<IEmployee[]>) => {
      state.items = action.payload.sort((a, b) => a.firstName.localeCompare(b.firstName));
    }),
});

export const { addActiveEmployee, removeActiveEmployee } = employeesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEmployees = (state: RootState) => state.employees.items;
export const selectActiveEmployeesId = (state: RootState) => state.employees.active;

export default employeesSlice.reducer;
