import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { apiPortalInterviewsResponse } from '@/app/api/candidate_portal/get_interviews/route';
// import { apiResponsePortalMessage } from '@/app/api/candidate_portal/get_message/route';
import { apiResponsePortalNavBar } from '@/app/api/candidate_portal/get_navbar/route';
import { candidatePortalProfileType } from '@/app/api/candidate_portal/get_profile/route';
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
// messages ----------------------------------------------------
export const usePortalMessage = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = useQuery({
    queryKey: ['candidate_portal-message', application_id],
    refetchOnMount: true,
    queryFn: () => null,
    enabled: !!application_id,
    retry: false,
  });

  return { ...query };
};

// const fetchMessage = async (application_id: string) => {
//   const { data } = await axios.post<apiResponsePortalMessage>(
//     '/api/candidate_portal/get_message',
//     {
//       application_id,
//     },
//   );

//   return data;
// };

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
    retry: false,
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
export const usePortalProfile = ({
  application_id,
}: {
  application_id: string;
}) => {
  const query = useQuery({
    queryKey: ['candidate_portal-interview', application_id],
    refetchOnMount: true,
    queryFn: () => fetchProfile(application_id),
    enabled: !!application_id,
    retry: false,
  });

  return { ...query };
};

const fetchProfile = async (application_id: string) => {
  const { data } = await axios.post<candidatePortalProfileType>(
    '/api/candidate_portal/get_profile',
    {
      application_id,
    },
  );

  return data;
};

// Nav ----------------------------------------------------
export const useNavbar = ({ application_id }: { application_id: string }) => {
  const query = useQuery({
    queryKey: ['candidate_portal_navbar', application_id],
    refetchOnMount: true,
    queryFn: () => fetchNav(application_id),
    enabled: !!application_id,
  });

  return { ...query };
};

const fetchNav = async (application_id: string) => {
  const { data } = await axios.post<apiResponsePortalNavBar>(
    '/api/candidate_portal/get_navbar',
    {
      application_id,
    },
  );

  return data;
};
