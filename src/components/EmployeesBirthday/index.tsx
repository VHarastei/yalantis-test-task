import { Paper } from 'components/Paper';
import React from 'react';
import { useAppSelector } from 'store/hooks';
import { selectActiveEmployeesId, selectEmployees } from 'store/slices/employeesSlice';
import { getMonths } from 'utils/getMonths';
import styles from './EmployeesBirthday.module.scss';

type PropTypes = {};
const months = getMonths();

export const EmployeesBirthday: React.FC<PropTypes> = ({ children }) => {
  const activeEmployees = useAppSelector(selectActiveEmployeesId);

  if (!activeEmployees) return <div>loading</div>;

  return (
    <Paper title="Employees Birthday">
      {activeEmployees.length ? (
        months.map((month) => {
          let isEmpty = true;
          return (
            <div>
              <h2>{month}</h2>
              <ul>
                {activeEmployees.map((emp) => {
                  const empMonth = new Date(emp.dob).toLocaleString('en', { month: 'long' });
                  if (empMonth === month) {
                    isEmpty = false;
                    return <li key={emp.id}>{emp.lastName}</li>;
                  }
                })}
              </ul>
              {isEmpty && <h4>No Employees</h4>}
            </div>
          );
        })
      ) : (
        <h2>Employees List is empty</h2>
      )}
    </Paper>
  );
};
