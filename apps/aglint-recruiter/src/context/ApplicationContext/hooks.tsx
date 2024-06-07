import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { applicationQuery } from '@/src/queries/application';

import { useApplicationStore } from './store';

export const useApplicationContext = (
  props: Parameters<(typeof applicationQuery)['application']>[0],
) => {
  const { resetTab } = useApplicationStore(({ resetTab }) => ({
    resetTab,
  }));
  const application = useQuery(applicationQuery.application(props));
  useEffect(() => {
    resetTab();
    return () => resetTab();
  }, []);
  return { application };
};
