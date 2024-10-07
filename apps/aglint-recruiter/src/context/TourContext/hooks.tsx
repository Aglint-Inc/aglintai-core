import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useTenant } from '@/company/hooks';
import { tourQuery, useCreateTourLog } from '@/queries/tour';

export const useTourContext = () => {
  const {
    recruiter_user: { recruiter_relation_id },
  } = useTenant();
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
