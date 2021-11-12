import { EmployeesBirthday } from 'components/EmployeesBirthday';
import { EmployeesList } from 'components/EmployeesList';
import React from 'react';
import styles from './App.module.scss';
//import { EmployeesBirthday } from './components/EmployeesBirthday';

function App() {
  return (
    <div className={styles.container}>
      <EmployeesList />
      <EmployeesBirthday />
    </div>
  );
}

export default App;
