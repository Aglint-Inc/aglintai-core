import { Stack } from '@mui/material';
import { useState } from 'react';

import { JobCandidateCard } from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import { calculateOverallScore } from '@/src/utils/support/supportUtils';

import ApplicationDetails from './ApplicationDetails';
import JdFetching from './JdFetching';
import { getScoreColor, getStatusColor } from './utils';
import { capitalize, formatTimeStamp, getInterviewScore } from '../utils';
import MuiAvatar from '../../Common/MuiAvatar';
import ScoreWheel, { ScoreWheelParams } from '../../Common/ScoreWheel';

const ApplicationCard = ({
  application,
  index,
  checkList,
  handleSelect,
  isInterview,
}: {
  application: JobApplication;
  index: number;
  checkList: Set<string>;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (index: number) => void;
  isInterview: boolean;
}) => {
  // this variable is for type change
  const { job } = useJobApplications();
  const jobDetails = application as unknown as {
    jd_score: { summary: { feedback: undefined } };
  };
  const [openSidePanel, setOpenSidePanel] = useState(false);

  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;

  const statusColors = getStatusColor(application.status);

  const creationDate = formatTimeStamp(application.created_at);
  const appliedOn = `Applied on ${creationDate}`;

  const handleCheck = () => {
    handleSelect(index);
  };

  const handleOpenSidePanel = () => {
    setOpenSidePanel((pre) => !pre);
  };

  const jdScoreObj = application.jd_score as any;

  const jdScore = jdScoreObj
    ? calculateOverallScore({
        qualification: jdScoreObj.qualification,
        skills: jdScoreObj.skills_score,
      })
    : null;

  const resumeScoreWheel =
    jobDetails?.jd_score?.summary?.feedback !== 'Resume not Parseble' &&
    application.resume &&
    application.jd_score === null ? (
      <Stack justifyContent={'center'} alignItems={'center'}>
        <JdFetching />
        Calculating
      </Stack>
    ) : (
      <ScoreWheel
        id={`ScoreWheelApplicationCard${index + 1}`}
        weights={job.parameter_weights as ScoreWheelParams}
        score={jdScore}
        fontSize={7}
      />
    );

  return (
    <>
      <ApplicationDetails
        openSidePanel={openSidePanel}
        setOpenSidePanel={setOpenSidePanel}
        applicationDetails={application}
      />

      <JobCandidateCard
        textOrder={index + 1}
        isChecked={checkList.has(application.application_id)}
        slotProfilePic={
          <MuiAvatar
            level={application.first_name}
            src={
              !application.profile_image
                ? getGravatar(application.email, application?.first_name)
                : application.profile_image
            }
            variant={'rounded'}
            width={'78px'}
            height={'78px'}
            fontSize={'28px'}
          />
        }
        textName={capitalize(
          application.first_name + ' ' + application?.last_name,
        )}
        textRole={capitalize(application.job_title)}
        textMail={application.email}
        textPhone={application.phone}
        slotScore={resumeScoreWheel}
        textScore={interviewScore}
        scoreTextColor={{ style: { color: getScoreColor(interviewScore) } }}
        onClickCard={{
          onClick: () => {
            handleOpenSidePanel();
          },
        }}
        textStatus={capitalize(application.status)}
        statusTextColor={{ style: { color: statusColors?.color } }}
        statusBgColor={{ style: { color: statusColors?.backgroundColor } }}
        textAppliedOn={appliedOn}
        onClickCheckbox={{ onClick: handleCheck }}
        isInterview={isInterview}
      />
    </>
  );
};

export default ApplicationCard;

export function getGravatar(email, name) {
  return `https://www.gravatar.com/avatar/${require('crypto')
    .createHash('md5')
    .update(email ? email.trim().toLowerCase() : '')
    .digest('hex')}?d=${encode(name)}`;
}

function encode(name) {
  return encodeURIComponent(
    `https://ui-avatars.com/api/background=random&name=${name}`,
  );
}
