import { useContext } from 'react';

import { ApplicationsContext } from '../contexts/applicationsContext';

export const useApplications = () => {
  const value = useContext(ApplicationsContext);
  if (!value) throw new Error('ApplicationsContext not found as a provider');
  return value;
};
