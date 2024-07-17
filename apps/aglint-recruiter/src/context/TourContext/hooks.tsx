import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { tourQuery, useCreateTourLog } from '@/src/queries/tour';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useTourContext = () => {
  const {
    recruiterUser: { recruiter_relation_id },
  } = useAuthDetails();
  const tour = useQuery(tourQuery.tours(recruiter_relation_id));
  const { mutate } = useCreateTourLog();
  const handleCreateTourLog = useCallback(
    (payload: Omit<Parameters<typeof mutate>[0], 'recruiter_relation_id'>) =>
      mutate({ recruiter_relation_id, ...payload }),
    [recruiter_relation_id],
  );
  return {
    tour,
    handleCreateTourLog,
  };
};
