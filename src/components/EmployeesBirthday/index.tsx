import { Paper } from 'components/Paper';
import { useAppSelector } from 'hooks/useAppSelector';
import React from 'react';
import { selectActiveEmployeeIds, selectEmployees } from 'store/slices/employeesSlice';
import { getBirthdate } from 'utils/getBirthdate';
import { getCurrentMonth } from 'utils/getCurrentMonth';
import { getMonths } from 'utils/getMonths';
import styles from './EmployeesBirthday.module.scss';

const months = getMonths();

export const EmployeesBirthday: React.FC = () => {
  const activeEmployeesId = useAppSelector(selectActiveEmployeeIds);
  const activeEmployees = useAppSelector(selectEmployees)
    .filter((emp) => activeEmployeesId.includes(emp.id))
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <Paper title="Employees Birthday">
      {activeEmployeesId.length ? (
        months.map((month, index) => {
          let isEmpty = true;
          return (
            <div className={styles.employeesContainer} key={index}>
              <h2>{month}</h2>
              <ul>
                {activeEmployees
                  .filter(({ dob }) => month === getCurrentMonth(new Date(dob)))
                  .map(({ id, firstName, lastName, dob }) => {
                    isEmpty = false;
                    return <li key={id}>{`${firstName} ${lastName} - ${getBirthdate(dob)}`}</li>;
                  })}
                {isEmpty && <h4>No Employees</h4>}
              </ul>
            </div>
          );
        })
      ) : (
        <h2>Employees List is empty</h2>
      )}
    </Paper>
  );
};
