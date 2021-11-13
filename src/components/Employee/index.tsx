import clsx from 'clsx';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useState } from 'react';
import { addActiveEmployee, IEmployee, removeActiveEmployee } from 'store/slices/employeesSlice';
import styles from './Employee.module.scss';

type PropTypes = IEmployee & { active: boolean };

export const Employee: React.FC<PropTypes> = React.memo(
  ({ id, firstName, lastName, active = false }) => {
    const [isActive, setIsActive] = useState(active);
    const dispatch = useAppDispatch();

    const toggleIsActive = () => {
      if (isActive) {
        dispatch(removeActiveEmployee(id));
      } else {
        dispatch(addActiveEmployee(id));
      }
      setIsActive(!isActive);
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
            <input
              type="radio"
              checked={isActive === true}
              onChange={toggleIsActive}
              name="active"
            />
            <label htmlFor="active">Active</label>
          </div>
        </form>
      </div>
    );
  }
);
