import { RequestContext } from '@request/contexts/requestContext';
import { useContext } from 'react';

export const useRequest = () => {
  const value = useContext(RequestContext);
  if (!value) throw new Error('Request Provider not found');
  return value;
};
