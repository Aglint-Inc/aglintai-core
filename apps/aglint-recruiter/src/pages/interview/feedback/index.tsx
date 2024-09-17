import { type DatabaseTable } from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Textarea } from '@components/ui/textarea';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2, Star } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import Seo from '@/components/Common/Seo';

import { type API_get_interview_feedback_details } from '../../api/get_interview_feedback_details/types';
import { type API_save_interview_feedback } from '../../api/save_interview_feedback/types';

const InterviewFeedbackPage = () => {
  const [form, setForm] = React.useState({ rating: 0, feedback: '' });
  const { details, isLoadingDetails, submitFeedback } = useInterviewFeedback(
    useSearchParams().get('interview'),
  );

  const handleRatingChange = (rating: number) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = () => {
    submitFeedback({ rating: form.rating * 2, feedback: form.feedback });
  };

  if (isLoadingDetails) {
    return (
      <>
        <Seo title='Feedback - Interview | Aglint AI' />
        <div className='flex min-h-screen items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title='Feedback - Interview | Aglint AI' />
      <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white px-4 py-12 sm:px-6 lg:px-8'>
        <Card className='mx-auto max-w-2xl'>
          <CardHeader className='text-center'>
            <div className='mb-4'>
              {details.company_logo && (
                <Image
                  src={details.company_logo}
                  alt={`${details.company_name} logo`}
                  width={100}
                  height={100}
                  className='mx-auto rounded-lg'
                />
              )}
            </div>
            <CardTitle className='text-2xl font-bold text-gray-800'>
              {details.candidate_feedback === null
                ? 'How was your interview experience?'
                : 'Thank you for your feedback!'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {details.candidate_feedback === null ? (
              <div className='space-y-6'>
                <div className='flex justify-center space-x-2'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-10 w-10 cursor-pointer ${
                        star <= form.rating
                          ? 'fill-current text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      onClick={() => handleRatingChange(star)}
                    />
                  ))}
                </div>
                <Textarea
                  placeholder='Please share your thoughts about the interview...'
                  value={form.feedback}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      feedback: e.target.value.trim(),
                    }))
                  }
                  rows={5}
                  className='w-full rounded-md border p-2'
                />
                <Button
                  onClick={handleSubmit}
                  className='w-full'
                  disabled={form.rating === 0}
                >
                  Submit Feedback
                </Button>
              </div>
            ) : (
              <p className='text-center text-lg text-gray-600'>
                We appreciate your input. It helps us improve our interview
                process.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InterviewFeedbackPage;

const useInterviewFeedback = (interview_id: string) => {
  const { toast } = useToast();
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
    onSuccess(_data, feedback) {
      queryClient.setQueryData(
        [`interview_feedback_${interview_id}`],
        (prevData: Awaited<ReturnType<typeof getInterviewDetails>>) => {
          return { ...prevData, candidate_feedback: feedback };
        },
      );
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Feedback submitted successfully',
      });
    },
    onError() {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit feedback',
      });
    },
  });
  const submitFeedback = (...pera: Parameters<typeof mutateAsync>) =>
    mutateAsync(...pera).catch(() => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit feedback',
      });
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
