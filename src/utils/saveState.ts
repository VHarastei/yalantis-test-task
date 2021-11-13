export const saveState = <T>(state: T) => {
  try {
    const serializableState = JSON.stringify(state);
    window.localStorage.setItem('activeEmployees', serializableState);
  } catch (err) {
    console.log('Redux was not able to persist the state into the localstorage');
  }
};
