import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { apiResponsePortalCompany } from '@/src/app/api/candidate_portal/get_company/route';
import { apiPortalInterviewsResponse } from '@/src/app/api/candidate_portal/get_interviews/route';
import { apiResponsePortalMessage } from '@/src/app/api/candidate_portal/get_message/route';
import { apiHomepageResponse } from '@/src/app/api/candidate_portal/home_page/route';

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
// messages ----------------------------------------------------
export const usePortalMessage = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = useQuery({
    queryKey: ['candidate_portal-message', application_id],
    refetchOnMount: true,
    queryFn: () => fetchMessage(application_id),
    enabled: !!application_id,
  });

  return { ...query };
};

const fetchMessage = async (application_id: string) => {
  const { data } = await axios.post<apiResponsePortalMessage>(
    '/api/candidate_portal/get_message',
    {
      application_id,
    },
  );

  return data;
};

// interviews ----------------------------------------------------
export const usePortalInterviews = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = useQuery({
    queryKey: ['candidate_portal-interview', application_id],
    refetchOnMount: true,
    queryFn: () => fetchInterviews(application_id),
    enabled: !!application_id,
  });

  return { ...query };
};

const fetchInterviews = async (application_id: string) => {
  const { data } = await axios.post<apiPortalInterviewsResponse>(
    '/api/candidate_portal/get_interviews',
    {
      application_id,
    },
  );

  return data;
};

// interviews ----------------------------------------------------
export const useCompany = ({ application_id }: { application_id: string }) => {
  const query = useQuery({
    queryKey: ['candidate_portal-company', application_id],
    refetchOnMount: true,
    queryFn: () => fetchCompany(application_id),
    enabled: !!application_id,
  });

  return { ...query };
};

const fetchCompany = async (application_id: string) => {
  const { data } = await axios.post<apiResponsePortalCompany>(
    '/api/candidate_portal/get_company',
    {
      application_id,
    },
  );

  return data;
};
