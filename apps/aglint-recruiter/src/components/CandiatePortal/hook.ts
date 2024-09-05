import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { apiHomepageResponse } from '@/app/api/candidate_portal/home_page/route';

// home page ----------------------------------------------------
export const usePortalHomePage = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = useQuery({
    queryKey: ['candidate_portal-homepage', application_id],
    refetchOnMount: true,
    queryFn: () => fetchHomePage(application_id),
    enabled: !!application_id,
  });

  return { ...query };
};

const fetchHomePage = async (application_id: string) => {
  const { data } = await axios.post<apiHomepageResponse>(
    '/api/candidate_portal/home_page',
    {
      application_id,
    },
  );

  return data;
};
