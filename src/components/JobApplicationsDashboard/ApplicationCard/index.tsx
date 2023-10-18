import { Stack } from '@mui/material';
import { useState } from 'react';

import { JobCandidateCard } from '@/devlink2';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';

import ApplicationDetails from './ApplicationDetails';
import JdFetching from './JdFetching';
import { getScoreColor, getStatusColor } from './utils';
import { capitalize, formatTimeStamp, getInterviewScore } from '../utils';
import CustomProgress from '../../Common/CustomProgress';
import MuiAvatar from '../../Common/MuiAvatar';

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
  const jobDetails = application as unknown as {
    jd_score: { summary: { feedback: undefined } };
  };
  const [openSidePanel, setOpenSidePanel] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({});

  const interviewScore = application?.feedback
    ? getInterviewScore(application.feedback)
    : 0;

  const statusColors = getStatusColor(application.status);

  const creationDate = formatTimeStamp(application.created_at);
  const appliedOn = `Applied on ${creationDate}`;

  const handleCheck = () => {
    handleSelect(index);
  };

  const handleOpenSidePanel = (application) => {
    setApplicationDetails(application);
    setOpenSidePanel((pre) => !pre);
  };

  const jdScoreObj = application.jd_score as any;
  const jdScore = Math.floor(jdScoreObj?.over_all?.score) ?? 0;

  return (
    <>
      <ApplicationDetails
        openSidePanel={openSidePanel}
        setOpenSidePanel={setOpenSidePanel}
        applicationDetails={applicationDetails}
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
        slotScore={
          <>
            {jobDetails?.jd_score?.summary?.feedback !==
              'Resume not Parseble' &&
            application.resume &&
            application.jd_score !== null ? (
              application.jd_score === 'loading' ? (
                <Stack justifyContent={'center'} alignItems={'center'}>
                  <JdFetching />
                  Calculating
                </Stack>
              ) : (
                <CustomProgress
                  progress={jdScore}
                  rotation={270}
                  fillColor={
                    jdScore >= 90
                      ? '#228F67'
                      : jdScore >= 70
                      ? '#f79a3e'
                      : jdScore >= 50
                      ? '#de701d'
                      : '#d93f4c'
                  }
                  bgFill={
                    jdScore >= 90
                      ? '#edf8f4'
                      : jdScore >= 70
                      ? '#fff7ed'
                      : jdScore >= 50
                      ? '#ffeedb'
                      : '#fff0f1'
                  }
                  size={30}
                  strokeWidth={3}
                  label={jdScore}
                  fontSize={20}
                />
              )
            ) : (
              <Stack>Not found</Stack>
            )}
          </>
        }
        textScore={interviewScore}
        scoreTextColor={{ style: { color: getScoreColor(interviewScore) } }}
        onClickCard={{
          onClick: () => {
            handleOpenSidePanel(application);
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
