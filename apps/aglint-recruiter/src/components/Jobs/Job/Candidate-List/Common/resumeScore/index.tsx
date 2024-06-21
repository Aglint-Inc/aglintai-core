import { Stack, Tooltip } from '@mui/material';

import { ResumeTag } from '@/devlink2/ResumeTag';
import { CalculatingResumeScore } from '@/public/lottie/CalculatingResumeScore';
import { Application } from '@/src/types/applications.types';

import { ScoreTag } from './scoreTag';

const ResumeScore = ({
  resume_processing_state,
  resume_score,
}: Pick<Application, 'resume_processing_state' | 'resume_score'>) => {
  switch (resume_processing_state) {
    case 'unavailable':
      return (
        <Tooltip title='No resume available.' placement='right' arrow={true}>
          <Stack>
            <ResumeTag slotText={<ErrorIcon />} />
          </Stack>
        </Tooltip>
      );
    case 'fetching':
      return (
        <Tooltip title='Fetching resume' placement='right' arrow={true}>
          <Stack>
            <ResumeTag slotText={<Calculating />} />
          </Stack>
        </Tooltip>
      );
    case 'processing':
      return (
        <Tooltip title='Ongoing scoring' placement='right' arrow={true}>
          <Stack>
            <ResumeTag slotText={<Calculating />} />
          </Stack>
        </Tooltip>
      );
    case 'unparsable':
      return (
        <Tooltip
          title="Oops! It looks like we're having trouble reading the resume. This could be because the PDF file contains an image instead of text. Please make sure the file is in a supported format and try again."
          placement='right'
          arrow={true}
        >
          <Stack>
            <ResumeTag slotText={<WarningIcon />} />
          </Stack>
        </Tooltip>
      );
    case 'processed':
      return <ScoreTag score={resume_score} />;
  }
};

// eslint-disable-next-line no-unused-vars
const ErrorIcon = () => {
  return (
    <Stack
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={'4px'}
    >
      <svg
        width='13'
        height='11'
        viewBox='0 0 13 11'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.40039 0.899999C6.73581 0.914583 6.99102 1.06042 7.16602 1.3375L11.891 9.3875C12.0368 9.67917 12.0368 9.97083 11.891 10.2625C11.716 10.5396 11.4608 10.6854 11.1254 10.7H1.67539C1.33997 10.6854 1.08477 10.5396 0.909765 10.2625C0.763932 9.97083 0.763932 9.67917 0.909765 9.3875L5.65664 1.3375C5.83164 1.06042 6.07956 0.914583 6.40039 0.899999ZM6.40039 3.7C6.07956 3.72917 5.90456 3.90417 5.87539 4.225V6.675C5.90456 6.99583 6.07956 7.17083 6.40039 7.2C6.72122 7.17083 6.89622 6.99583 6.92539 6.675V4.225C6.89622 3.90417 6.72122 3.72917 6.40039 3.7ZM7.10039 8.6C7.10039 8.39583 7.03477 8.22812 6.90352 8.09687C6.77227 7.96562 6.60456 7.9 6.40039 7.9C6.19622 7.9 6.02852 7.96562 5.89727 8.09687C5.76602 8.22812 5.70039 8.39583 5.70039 8.6C5.70039 8.80417 5.76602 8.97187 5.89727 9.10312C6.02852 9.23437 6.19622 9.3 6.40039 9.3C6.60456 9.3 6.77227 9.23437 6.90352 9.10312C7.03477 8.97187 7.10039 8.80417 7.10039 8.6Z'
          fill='#D93F4C'
        />
      </svg>
      <Stack style={{ color: '#D93F4C' }}>Not found</Stack>
    </Stack>
  );
};

const WarningIcon = () => {
  return (
    <Stack
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={'4px'}
    >
      <svg
        width='12'
        height='12'
        viewBox='0 0 12 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.40039 11.4C5.37956 11.3854 4.44622 11.1375 3.60039 10.6563C2.75456 10.1604 2.06914 9.475 1.54414 8.6C1.04831 7.71042 0.80039 6.77708 0.80039 5.8C0.80039 4.82292 1.04831 3.88958 1.54414 3C2.06914 2.125 2.75456 1.43958 3.60039 0.943749C4.44622 0.462499 5.37956 0.214583 6.40039 0.199999C7.42122 0.214583 8.35456 0.462499 9.20039 0.943749C10.0462 1.43958 10.7316 2.125 11.2566 3C11.7525 3.88958 12.0004 4.82292 12.0004 5.8C12.0004 6.77708 11.7525 7.71042 11.2566 8.6C10.7316 9.475 10.0462 10.1604 9.20039 10.6563C8.35456 11.1375 7.42122 11.3854 6.40039 11.4ZM5.52539 7.55C5.20456 7.57917 5.02956 7.75417 5.00039 8.075C5.02956 8.39583 5.20456 8.57083 5.52539 8.6H7.27539C7.59622 8.57083 7.77122 8.39583 7.80039 8.075C7.77122 7.75417 7.59622 7.57917 7.27539 7.55H7.10039V5.625C7.07122 5.30417 6.89622 5.12917 6.57539 5.1H5.52539C5.20456 5.12917 5.02956 5.30417 5.00039 5.625C5.02956 5.94583 5.20456 6.12083 5.52539 6.15H6.05039V7.55H5.52539ZM6.40039 3C6.19622 3 6.02852 3.06562 5.89727 3.19687C5.76602 3.32812 5.70039 3.49583 5.70039 3.7C5.70039 3.90417 5.76602 4.07187 5.89727 4.20312C6.02852 4.33437 6.19622 4.4 6.40039 4.4C6.60456 4.4 6.77227 4.33437 6.90352 4.20312C7.03477 4.07187 7.10039 3.90417 7.10039 3.7C7.10039 3.49583 7.03477 3.32812 6.90352 3.19687C6.77227 3.06562 6.60456 3 6.40039 3Z'
          fill='#ED8F1C'
        />
      </svg>
      <Stack style={{ color: '#ED8F1C' }}>Not parsable</Stack>
    </Stack>
  );
};

const Calculating = () => {
  return (
    <Stack style={{ transform: 'translateY(2px)' }} width={'80px'}>
      <CalculatingResumeScore />
    </Stack>
  );
};

export default ResumeScore;
