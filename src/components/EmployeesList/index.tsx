import clsx from 'clsx';
import { Paper } from 'components/Paper';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  addActiveEmployee,
  fetchEmployees,
  IEmployee,
  removeActiveEmployee,
  selectEmployees,
} from 'store/slices/employeesSlice';
import styles from './EmployeesList.module.scss';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const EmployeesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector(selectEmployees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // const employees: Employee[] = [
  //   {
  //     dob: '2019-02-26T16:52:36.244Z',
  //     firstName: 'Ang',
  //     id: '5e00928d91e7feaa9872ec08',
  //     lastName: 'Carson',
  //   },
  //   {
  //     dob: '2019-02-26T16:52:36.244Z',
  //     firstName: 'Ang',
  //     id: '5e00928d91e7feaa9872ec08',
  //     lastName: 'Carson',
  //   },
  //   {
  //     dob: '2019-02-26T16:52:36.244Z',
  //     firstName: 'Bng',
  //     id: '5e00928d91e7feaa9872ec08',
  //     lastName: 'Carson',
  //   },
  // ];
  //console.log(employees);

  return (
    <Paper title="Employees">
      <div className={styles.alphabet}>
        {alphabet.map((letter, index) => {
          let isEmpty = true;
          return (
            <Letter letter={letter} key={index}>
              {employees.map((emp) => {
                if (letter === emp.firstName[0]) {
                  isEmpty = false;
                  return <Employee key={emp.id} {...emp} />;
                }
              })}
              {isEmpty && <span className={styles.alphabetLetterIsEmpty}>No Employees</span>}
            </Letter>
          );
        })}
      </div>
    </Paper>
  );
};

type PropTypes = {
  letter: string;
};

const Letter: React.FC<PropTypes> = ({ letter, children }) => {
  return (
    <div className={styles.letterContainer}>
      <h2 className={styles.letter}>{letter}</h2>
      <div>{children}</div>
    </div>
  );
};

// type EmployeePropTypes = {
//   fullName: string;
// };

const Employee: React.FC<IEmployee> = ({ id, firstName, lastName, dob }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const toggleIsActive = () => {
    setIsActive(!isActive);
    if (isActive) {
      dispatch(removeActiveEmployee({ id, firstName, lastName, dob }));
    } else {
      dispatch(addActiveEmployee({ id, firstName, lastName, dob }));
    }
  };

  return (
    <div className={styles.employeeContainer}>
      <span
        className={clsx(styles.fullname, isActive && styles.active)}
      >{`${firstName} ${lastName}`}</span>
      <form>
        <div>
          <input
            type="radio"
            checked={isActive === false}
            onChange={toggleIsActive}
            name="notActive"
          />
          <label htmlFor="notActive">Not active</label>
        </div>
        <div>
          <input type="radio" checked={isActive === true} onChange={toggleIsActive} name="active" />
          <label htmlFor="active">Active</label>
        </div>
      </form>
    </div>
  );
};
