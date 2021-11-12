import { IEmployee } from 'store/slices/employeesSlice';
import axios from 'axios';

export const Api = {
  getEmployees: (): Promise<IEmployee[]> => {
    return axios
      .get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
      .then(({ data }) => data);
  },
};
