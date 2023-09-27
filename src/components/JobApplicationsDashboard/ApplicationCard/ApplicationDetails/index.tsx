import { Stack } from '@mui/material';
import React from 'react';

import { JobDetailsSideDrawer } from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';

import CircularScore from '../../Common/CircularScore';

function ApplicationDetails({ applicationDetails }) {
  const overAllScore =
    applicationDetails.feedback &&
    Math.floor(
      applicationDetails.feedback.reduce(
        (sum, entry) =>
          sum +
          Number(
            String(entry.rating).includes('/')
              ? entry.rating.split('/')[0]
              : entry.rating,
          ),
        0,
      ) / applicationDetails.feedback.length,
    );
  return (
    <div>
      <JobDetailsSideDrawer
        slotProfileImage={
          <MuiAvatar
            level={applicationDetails.first_name}
            src={'/'}
            variant={'rounded'}
            width={'78px'}
            height={'78px'}
            fontSize={'28px'}
          />
        }
        textInterviewHeader={
          overAllScore > 90
            ? `You're absolutely incredible! 🌟😍`
            : overAllScore > 70
            ? `You're truly outstanding! 🤩`
            : overAllScore > 50
            ? `You did an excellent job! 👏`
            : `Thank you so much! 😊`
        }
        isInterviewVisible={
          applicationDetails.feedback &&
          Math.floor(
            applicationDetails.feedback.reduce(
              (sum, entry) =>
                sum +
                Number(
                  String(entry.rating).includes('/')
                    ? entry.rating.split('/')[0]
                    : entry.rating,
                ),
              0,
            ) / applicationDetails.feedback.length,
          ) !== 0
        }
        isKeySkillsVisible={false}
        slotResumeScore={
          <Stack width={'100px'}>
            <CircularScore
              fontSize='10px'
              finalScore={applicationDetails.score}
            />
          </Stack>
        }
        isResumeVisible={applicationDetails.score}
        textPhone={applicationDetails.phone ? applicationDetails.phone : '--'}
        textMail={applicationDetails.email ? applicationDetails.email : '--'}
        textSites={applicationDetails.company}
      />
    </div>
  );
}

export default ApplicationDetails;
