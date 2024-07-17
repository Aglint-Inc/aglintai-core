import { useQuery } from '@tanstack/react-query';

import { tourQuery, useCreateTourLog } from '@/src/queries/tour';

import { useAuthDetails } from '../AuthContext/AuthContext';

export const useTourContext = () => {
  const { recruiter_id } = useAuthDetails();
  const tour = useQuery(tourQuery.tours(recruiter_id));
  const { mutate: handleCreateTourLog } = useCreateTourLog();
  return {
    tour,
    handleCreateTourLog,
  };
};
