import { Stack, Tooltip } from '@mui/material';

import { CandidateListItem, ScoreErrorIcon } from '@/devlink2';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

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
  // const { job } = useJobApplications();

  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;

  const creationDate = formatTimeStamp(application.created_at);

  const handleCheck = () => {
    handleSelect(index);
  };
  const resumeScore = application.resume_score;

  return (
    <CandidateListItem
      onclickSelect={{ onClick: handleCheck }}
      isChecked={checkList.has(application.application_id)}
      slotProfileImage={
        <MuiAvatar
          level={getName(
            application.candidates.first_name,
            application.candidates.last_name,
          )}
          src={application.candidates.profile_image}
          variant={'rounded'}
          width={'100%'}
          height={'100%'}
          fontSize={'12px'}
        />
      }
      name={getName(
        application.candidates.first_name,
        application.candidates.last_name,
      )}
      jobTitle={
        application.candidates.job_title
          ? capitalize(application.candidates.job_title)
          : '---'
      }
      slotResumeScore={
        application.json_resume || application.resume ? (
          intactConditionFilter(application) !== ApiLogState.PROCESSING ? (
            application.jd_score ? (
              <SmallCircularScore
                score={resumeScore}
                scale={0.5}
                showScore={true}
              />
            ) : (
              <Tooltip
                title="Oops! It looks like we're having trouble reading the resume. This could be because the PDF file contains an image instead of text. Please make sure the file is in a supported format and try again."
                placement='right'
                arrow={true}
              >
                <Stack>
                  <ScoreErrorIcon />
                </Stack>
              </Tooltip>
            )
          ) : (
            <Tooltip title='Ongoing scoring' placement='right' arrow={true}>
              <Stack style={{ scale: '0.3' }}>
                <Calculating />
              </Stack>
            </Tooltip>
          )
        ) : (
          <Tooltip title='No resume available.' placement='right' arrow={true}>
            <Stack>---</Stack>
          </Tooltip>
        )
      }
      email={application.candidates.email || '---'}
      phone={application.candidates.phone || '---'}
      isInterviewVisible={isInterview}
      slotInterviewScore={
        application?.feedback ? (
          <SmallCircularScore
            score={interviewScore}
            scale={0.5}
            showScore={true}
          />
        ) : (
          <Tooltip title='Yet to be interviewed' placement='right' arrow={true}>
            <Stack>
              <ScoreErrorIcon />
            </Stack>
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

export const getName = (first_name: string, last_name: string) => {
  return first_name || last_name
    ? capitalize(first_name || '' + ' ' + last_name || '')
    : '---';
};
