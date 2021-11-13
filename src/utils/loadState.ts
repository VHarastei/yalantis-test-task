export const loadState = () => {
  try {
    const serializableState: string | null | undefined =
      window.localStorage.getItem('activeEmployees');
    return serializableState !== null || serializableState === undefined
      ? JSON.parse(serializableState)
      : undefined;
  } catch (error) {
    return undefined;
  }
};
