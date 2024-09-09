import { useContext } from 'react';

import { api } from '@/trpc/client';

import { CandidatePortalContext } from './context';

export const useCandidatePortal = () => {
  const value = useContext(CandidatePortalContext);
  if (!value)
    throw new Error('CandidatePortal Context is not available as a parent');
  return value;
};

// interview ------------------------------------
export const useCandidatePortalNavbar = () => {
  const { application_id } = useCandidatePortal();

  return api.candidatePortal.get_navbar.useQuery({
    application_id,
  });
};
// interview ------------------------------------
export const useCandidatePortalInterviews = () => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_interviews.useQuery({
    application_id,
  });
};
// message ------------------------------------
export const useCandidatePortalMessages = () => {
  const { application_id } = useCandidatePortal();
  return api.candidatePortal.get_messages.useQuery({
    application_id,
  });
};

// profile ------------------------------------

export const useCandidatePortalProfile = () => {
  const { application_id } = useCandidatePortal();
  const response = api.candidatePortal.get_profile.useQuery({
    application_id,
  });
  const invalidate = api.useUtils().candidatePortal.get_profile.invalidate;
  return { ...response, invalidate };
};

export const useCandidatePortalProfileUpdate = () => {
  const { invalidate } = useCandidatePortalProfile();
  return api.candidatePortal.update_profile.useMutation({
    // onSuccess: () => console.log('profile update success'),
    // onError: (e) => console.log('Error update profile :', e.message),
    onSettled: () => invalidate(),
  });
};
