import { type DatabaseTable } from '@aglint/shared-types';
import { Alert, Box, Stack, Typography } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { CandidateFeedback as CandidateFeedbackDev } from '@/devlink3/CandidateFeedback';
import { supabase } from '@/src/utils/supabase/client';

import { setApplicationCandidateFeedback } from '../store';

const CandidateFeedback = ({
  feedback,
  id,
}: {
  feedback: DatabaseTable['applications']['feedback'];
  id: string;
}) => {
  const handleRequestFeedback = () => {
    requestFeedback(id).then((data) => {
      setApplicationCandidateFeedback(data);
    });
  };
  return (
    <Stack p={3}>
      {feedback?.schedule ? (
        (() => {
          const temp = getRatingDetails(feedback.schedule.rating);
          return (
            <CandidateFeedbackDev
              isFeedbackSubmitted={true}
              isFeedbackNotSubmitted={false}
              textAdditionalFeedback={feedback.schedule.feedback}
              slotEmoji={
                <Box
                  width={'16px'}
                  height={'16px'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  {temp.icon}
                </Box>
              }
              textSatisfactionLevel={temp.text}
            />
          );
        })()
      ) : (
        <Stack gap={2}>
          <Alert
            severity='info'
            icon={false}
            action={
              <ButtonSoft
                onClickButton={{ onClick: handleRequestFeedback }}
                isLeftIcon={false}
                isRightIcon={false}
                size={1}
                color={'neutral'}
                textButton={feedback ? 'Ask Again' : 'Request Feedback'}
              />
            }
          >
            <Typography variant='body1'>
              {feedback
                ? "You have requested feedback. The candidate hasn't submitted any yet. Would you like to ask again?"
                : "The candidate hasn't submitted any feedback"}
            </Typography>
          </Alert>
        </Stack>
      )}
    </Stack>
  );
};

export default CandidateFeedback;

const requestFeedback = (id: string) => {
  return supabase
    .from('applications')
    .update({ feedback: { schedule: null } })
    .eq('id', id)
    .select('feedback')
    .single()
    .then(({ data, error }) => {
      if (error) {
        throw new Error(error.message);
      }
      return data.feedback;
    });
};

const getRatingDetails = (index: number) => {
  const ratingDetails = {
    1: {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <circle cx='32' cy='32' fill='#ffdd67' r='30' />
          <g fill='#664e27'>
            <circle cx='20.5' cy='24.6' r='5' />
            <circle cx='43.5' cy='24.6' r='5' />
            <path d='m19.4 45.8c8.1-5.7 17.1-5.6 25.2 0 1 .7 1.8-.5 1.2-1.6-2.5-4-7.4-7.7-13.8-7.7s-11.3 3.6-13.8 7.7c-.6 1.1.2 2.3 1.2 1.6' />
          </g>
        </svg>
      ),
      text: 'Not satisfied',
    },
    2: {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <circle cx='32' cy='32' fill='#ffdd67' r='30' />
          <g fill='#664e27'>
            <circle cx='20.5' cy='26.6' r='5' />
            <circle cx='43.5' cy='26.6' r='5' />
            <path d='m44.6 40.3c-8.1 5.7-17.1 5.6-25.2 0-1-.7-1.8.5-1.2 1.6 2.5 4 7.4 7.7 13.8 7.7s11.3-3.6 13.8-7.7c.6-1.1-.2-2.3-1.2-1.6' />
          </g>
        </svg>
      ),
      text: 'Neutral',
    },
    3: {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <circle cx='32' cy='32' fill='#ffdd67' r='30' />
          <path
            d='m28.5 27.9c-1.9-5.1-4.7-7.7-7.5-7.7s-5.6 2.6-7.5 7.7c-.2.5.8 1.4 1.3.9 1.8-1.9 4-2.7 6.2-2.7s4.4.8 6.2 2.7c.6.6 1.5-.4 1.3-.9m21.9 0c-1.9-5.1-4.7-7.7-7.5-7.7s-5.6 2.6-7.5 7.7c-.2.5.8 1.4 1.3.9 1.8-1.9 4-2.7 6.2-2.7s4.4.8 6.2 2.7c.5.6 1.5-.4 1.3-.9m3.6 9.5c0-.8-.6-1.8-2.4-2.1-4.4-.6-11.1-1.3-19.6-1.3s-15.2.7-19.6 1.3c-1.7.3-2.4 1.3-2.4 2.1 0 9.6 3.5 12.6 17.8 12.6h8.4c14.3 0 17.8-3 17.8-12.6'
            fill='#664e27'
          />
          <path
            d='m48.9 38.2c.2-.5-.1-1-.5-1.1 0 0-7.4-1.1-16.4-1.1s-16.4 1.1-16.4 1.1c-.5.1-.7.6-.5 1.1l1.1 2.9c.2.5.8.9 1.3.9h29.1c.5 0 1.1-.4 1.3-.9zm-16.9 9.8c6.4 0 15.5 0 15.2-2.1 0-.4-.1-.8-.3-1.3s-.3-.7-1.4-.7h-27.1c-1.1 0-1.2.1-1.4.7-.1.5-.2.9-.3 1.3-.2 2.1 8.9 2.1 15.3 2.1'
            fill='#fff'
          />
        </svg>
      ),
      text: 'Satisfied',
    },
    4: {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
          <path
            d='m62 32c0 16.6-13.4 30-30 30s-30-13.4-30-30 13.4-30 30-30 30 13.4 30 30z'
            fill='#ffdd67'
          />
          <path
            d='m61.8 13.2c-.5-2.7-2-4.9-4.5-5.6-2.7-.7-5.1.3-7.4 2.7-1.3-3.6-3.3-6.3-6.5-7.7s-6.4-.4-8.4 2.1c-2.1 2.6-2.9 6.7-.7 12 2.1 5 11.4 15 11.7 15.3.4-.2 10.8-6.7 13.3-9.9 2.5-3.1 3-6.2 2.5-8.9m-32.8-8.5c-2-2.5-5.2-3.5-8.4-2.1s-5.2 4.1-6.5 7.7c-2.4-2.3-4.8-3.4-7.5-2.6-2.4.7-4 2.9-4.5 5.6-.5 2.6.1 5.8 2.5 8.9 2.6 3.1 13 9.6 13.4 9.8.3-.3 9.6-10.3 11.7-15.3 2.2-5.3 1.4-9.3-.7-12'
            fill='#f46767'
          />
          <path
            d='m49 38.1c0-.8-.5-1.8-1.8-2.1-3.5-.7-8.6-1.3-15.2-1.3s-11.7.7-15.2 1.3c-1.4.3-1.8 1.3-1.8 2.1 0 7.3 5.6 14.6 17 14.6 11.4-.1 17-7.4 17-14.6'
            fill='#664e27'
          />
          <path
            d='m44.7 38.3c-2.2-.4-6.8-1-12.7-1s-10.5.6-12.7 1c-1.3.2-1.4.7-1.3 1.5.1.4.1 1 .3 1.6.1.6.3.9 1.3.8 1.9-.2 23-.2 24.9 0 1 .1 1.1-.2 1.3-.8.1-.6.2-1.1.3-1.6 0-.8-.1-1.3-1.4-1.5'
            fill='#fff'
          />
        </svg>
      ),
      text: 'Very Satisfied',
    },
  };

  // eslint-disable-next-line security/detect-object-injection
  return ratingDetails[index] as (typeof ratingDetails)[1];
};
