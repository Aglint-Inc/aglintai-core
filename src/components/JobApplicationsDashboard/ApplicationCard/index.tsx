import WarningIcon from '@mui/icons-material/Warning';
import { Stack, Tooltip } from '@mui/material';
import md5 from 'blueimp-md5';

import { CandidateListItem } from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { getOverallResumeScore } from '@/src/utils/support/supportUtils';

import {
  ApiLogState,
  capitalize,
  formatTimeStamp,
  getInterviewScore,
  intactConditionFilter,
} from '../utils';
import Calculating from '../../Common/Calculating';
import MuiAvatar from '../../Common/MuiAvatar';
import { SmallCircularScore } from '../../Common/SmallCircularScore';

const ApplicationCard = ({
  application,
  index,
  checkList,
  handleSelect,
  isInterview,
  handleOpenDetails,
  isSelected = false,
}: {
  application: JobApplication;
  index: number;
  checkList: Set<string>;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  isInterview: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpenDetails: () => void;
  isSelected: boolean;
}) => {
  const { job } = useJobApplications();

  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;

  const creationDate = formatTimeStamp(application.created_at);

  const handleCheck = () => {
    handleSelect(index);
  };

  const resumeScore = application.jd_score
    ? getOverallResumeScore(application.jd_score, job.parameter_weights)
    : 0;

  return (
    <CandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      isChecked={checkList.has(application.application_id)}
      slotProfileImage={
        <MuiAvatar
          level={application.candidates.first_name}
          src={
            !application.candidates.profile_image
              ? getGravatar(application.candidates.email)
              : application.candidates.profile_image
          }
          variant='rounded'
          width='100%'
          height='100%'
        />
      }
      name={
        application.candidates.first_name
          ? capitalize(
              application.candidates.first_name +
                ' ' +
                application.candidates.last_name || '',
            )
          : '---'
      }
      jobTitle={
        application.candidates.job_title
          ? capitalize(application.candidates.job_title)
          : '---'
      }
      slotResumeScore={
        intactConditionFilter(application) !== ApiLogState.PROCESSING ? (
          application.candidates.json_resume && application.jd_score ? (
            <SmallCircularScore
              finalScore={resumeScore}
              scale={0.5}
              showScore={true}
            />
          ) : (
            <Tooltip title="Oops! It looks like we're having trouble reading the resume. This could be because the PDF file contains an image instead of text. Please make sure the file is in a supported format and try again." placement='right' arrow>
              <WarningIcon fontSize='small' style={{ color: 'goldenrod' }} />
            </Tooltip>
          )
        ) : (
          <Tooltip title='Ongoing scoring' placement='right' arrow>
            <Stack style={{ scale: '0.3' }}>
              <Calculating />
            </Stack>
          </Tooltip>
        )
      }
      email={application.candidates.email || '---'}
      phone={application.candidates.phone || '---'}
      isInterviewVisible={isInterview}
      slotInterviewScore={
        application?.feedback ? (
          <SmallCircularScore
            finalScore={interviewScore}
            scale={0.5}
            showScore={true}
          />
        ) : (
          <Tooltip title='Yet to be interviewed' placement='right' arrow>
            <WarningIcon fontSize='small' style={{ color: 'goldenrod' }} />
          </Tooltip>
        )
      }
      appliedDate={creationDate}
      onclickCandidate={{
        onClick: () => {
          handleOpenDetails();
        },
      }}
      isHighlighted={isSelected}
    />
  );
};

export default ApplicationCard;

// eslint-disable-next-line no-unused-vars
export function getGravatar(email, first_name = '') {
  let imgUrl = `https://www.gravatar.com/avatar/${md5(
    email ? email.trim().toLowerCase() : '',
  )}?d=blank&s=240&r=g`;

  return imgUrl;
}
