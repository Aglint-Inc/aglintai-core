import { interviewerDeclineRequest } from '@/services/requests/interviewerDeclineRequest';

export const createInterviewDeclineRequest = async ({}) => {
  await interviewerDeclineRequest({
    session_id: session_id,
    declined_place: '',
    session_relation_id: '',
  });
};
