import { type DatabaseTable } from '@aglint/shared-types';
import { Avatar, TextField } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { FeedbackCandidate } from '@/devlink3/FeedbackCandidate';
import Seo from '@/src/components/Common/Seo';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import toast from '@/src/utils/toast';

import { type API_get_interview_feedback_details } from '../../api/get_interview_feedback_details/types';
import { type API_save_interview_feedback } from '../../api/save_interview_feedback/types';

const InterviewFeedbackPage = () => {
  const [form, setForm] = React.useState({ rating: 2, feedback: '' });
  const { details, isLoadingDetails, submitFeedback } = useInterviewFeedback(
    useSearchParams().get('interview'),
  );
  return isLoadingDetails ? (
    <>
      <Seo title='Feedback - Interview | Aglint AI' />
      <DynamicLoader />
    </>
  ) : (
    <>
      <Seo title='Feedback - Interview | Aglint AI' />
      <FeedbackCandidate
        slotLogo={
          <Avatar
            variant='rounded'
            src={details.company_logo}
            sx={{ width: '100%', height: '100px' }}
            alt={`${details.company_name} logo`}
          />
        }
        isNotSatisfiedActive={form.rating === 1}
        onClickNotSatisfied={{
          onClick: () => setForm((pre) => ({ ...pre, rating: 1 })),
        }}
        isSatisfiedActive={form.rating === 2}
        onClickSatisfy={{
          onClick: () => setForm((pre) => ({ ...pre, rating: 2 })),
        }}
        isNeutralActive={form.rating === 3}
        onClickNeutral={{
          onClick: () => setForm((pre) => ({ ...pre, rating: 3 })),
        }}
        isVerySatisfiedActive={form.rating === 4}
        onClickVerySatisfy={{
          onClick: () => setForm((pre) => ({ ...pre, rating: 4 })),
        }}
        onClickSubmit={{
          onClick: () => {
            submitFeedback({ rating: 10, feedback: 'hi' });
          },
        }}
        slotFeedbackInput={
          <TextField
            fullWidth
            multiline
            minRows={7}
            maxRows={7}
            value={form.feedback}
            onChange={(e) =>
              setForm((pre) => ({
                ...pre,
                feedback: (e.target.value || '').trim(),
              }))
            }
          />
        }
        isRatingVisible={details.candidate_feedback === null}
        isThankYouVisible={details.candidate_feedback !== null}
      />
    </>
  );
};

export default InterviewFeedbackPage;

const useInterviewFeedback = (interview_id: string) => {
  const {
    data: details,
    status,
    isError,
  } = useQuery({
    queryKey: [`interview_feedback_${interview_id}`],
    queryFn: () => getInterviewDetails(interview_id),
    enabled: !!interview_id,
    staleTime: Infinity,
  });
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: (
      feedback: Parameters<typeof saveInterviewFeedback>[0]['feedback'],
    ) => saveInterviewFeedback({ id: interview_id, feedback }),
    onSuccess(data, feedback) {
      queryClient.setQueryData(
        [`interview_feedback_${interview_id}`],
        (prevData: Awaited<ReturnType<typeof getInterviewDetails>>) => {
          return { ...prevData, candidate_feedback: feedback };
        },
      );
      toast.success('Feedback submitted successfully');
    },
    onError() {
      toast.error('Failed to submit feedback');
    },
  });
  const submitFeedback = (...pera: Parameters<typeof mutateAsync>) =>
    mutateAsync(...pera).catch(() => {
      toast.error('Failed to submit feedback');
    });
  return {
    details,
    isLoadingDetails: status === 'pending',
    isError,
    submitFeedback,
  };
};

InterviewFeedbackPage.publicProvider = (page) => page;

const getInterviewDetails = async (interview_id: string) => {
  return axios
    .post<
      API_get_interview_feedback_details['response']
    >('/api/get_interview_feedback_details', { interview_id })
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.data;
    });
};

const saveInterviewFeedback = async ({
  id,
  feedback,
}: {
  id: string;
  feedback: DatabaseTable['interview_meeting']['candidate_feedback'];
}) => {
  const body: API_save_interview_feedback['request'] = {
    feedback,
    interview_id: id,
  };
  return axios
    .post<
      API_save_interview_feedback['response']
    >('/api/save_interview_feedback', body)
    .then(({ data }) => {
      if (data.error) throw new Error(data.error);
      return data.data;
    });
};
