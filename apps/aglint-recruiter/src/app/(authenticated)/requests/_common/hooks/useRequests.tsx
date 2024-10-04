import { RequestsContext } from '@requests/contexts/requestsContext';
import { useContext } from 'react';

export const useRequests = () => {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('RequestsContext not found as a provider');
  return value;
};
