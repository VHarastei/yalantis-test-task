import { Employee } from 'components/Employee';
import { Paper } from 'components/Paper';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { selectActiveEmployeeIds, selectEmployees } from 'store/slices/employeesSlice';
import styles from './EmployeesList.module.scss';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const EmployeesList: React.FC = () => {
  const employees = useAppSelector(selectEmployees);
  const activeEmployeesId = useAppSelector(selectActiveEmployeeIds);

  return (
    <Paper title="Employees">
      <div className={styles.alphabet}>
        {alphabet.map((letter, index) => {
          let isEmpty = true;
          return (
            <div className={styles.letterContainer} key={index}>
              <h2>{letter}</h2>
              {employees
                .filter((emp) => letter === emp.firstName[0])
                .map((emp) => {
                  isEmpty = false;
                  return (
                    <Employee key={emp.id} active={activeEmployeesId.includes(emp.id)} {...emp} />
                  );
                })}
              {isEmpty && <h4>No Employees</h4>}
            </div>
          );
        })}
      </div>
    </Paper>
  );
};
