import preloader from 'assets/preloader.svg';
import { EmployeesBirthday } from 'components/EmployeesBirthday';
import { EmployeesList } from 'components/EmployeesList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchEmployees,
  LoadingState,
  selectEmployeesLoadingState,
} from 'store/slices/employeesSlice';
import styles from './Employees.module.scss';

export const Employees: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const loadingState = useSelector(selectEmployeesLoadingState);

  return (
    <>
      {loadingState === LoadingState.LOADED ? (
        <div className={styles.container}>
          <EmployeesList />
          <EmployeesBirthday />
        </div>
      ) : (
        <div className={styles.preloaderContainer}>
          {loadingState === LoadingState.ERROR ? (
            <h1>Oops! Something went wrong.</h1>
          ) : (
            <img src={preloader} alt="preloader icon" />
          )}
        </div>
      )}
    </>
  );
};
