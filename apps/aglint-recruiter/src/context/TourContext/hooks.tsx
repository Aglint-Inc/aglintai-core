import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { tourQuery, useCreateTourLog } from '@/src/queries/tour';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useTourContext = () => {
  const {
    recruiterUser: { user_id },
  } = useAuthDetails();
  const tour = useQuery(tourQuery.tours(user_id));
  const { mutate } = useCreateTourLog();
  const handleCreateTourLog = useCallback(
    (payload: Omit<Parameters<typeof mutate>[0], 'user_id'>) =>
      mutate({ user_id, ...payload }),
    [user_id],
  );
  return {
    tour,
    handleCreateTourLog,
  };
};
