import { JobApplication } from '@context/JobApplicationsContext/types';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { JobCandidateCard } from '@/devlink2';
import { useJobApplications } from '@/src/context/JobApplicationsContext';

import ApplicationDetails from './ApplicationDetails';
import { getInterviewScore, getScoreColor, getStatusColor } from './utils';
import CircularScore from '../Common/CircularScore';
import { capitalize, formatTimeStamp } from '../utils';
import MuiAvatar from '../../Common/MuiAvatar';

const ApplicationCard = ({
  application,
  index,
  checkList,
  setCheckList,
}: {
  application: JobApplication;
  index: number;
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
}) => {
  const { circularScoreAnimation } = useJobApplications();

  const [openSidePanel, setOpenSidePanel] = useState(false);
  const [applicationDetails, setApplicationDetails] = useState({});

  const interviewScore = useMemo(() => {
    return application.feedback ? getInterviewScore(application.feedback) : 0;
  }, [application.feedback]);

  const statusColors = useMemo(() => {
    return getStatusColor(application.status);
  }, [application.status]);

  const creationDate = useMemo(() => {
    return formatTimeStamp(application.created_at);
  }, [application.created_at]);
  const appliedOn = `Applied on ${creationDate}`;

  const handleCheck = () => {
    setCheckList((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(application.application_id))
        newSet.delete(application.application_id);
      else newSet.add(application.application_id);
      return newSet;
    });
  };

  const triggerCircularAnimation = circularScoreAnimation.current && index < 10;

  const handleOpenSidePanel = (application) => {
    setApplicationDetails(application);
    setOpenSidePanel((pre) => !pre);
  };
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
          <CircularScore
            level='Resume match'
            fontSize='6px'
            finalScore={application.score}
            triggerAnimation={triggerCircularAnimation}
          />
        }
        textScore={interviewScore}
        scoreTextColor={{ style: { color: getScoreColor(interviewScore) } }}
        onClickCard={{
          onClick: () => {
            handleOpenSidePanel(application);
          },
        }}
        textStatus={capitalize(getJobStatus(application.status))}
        statusTextColor={{ style: { color: statusColors?.color } }}
        statusBgColor={{ style: { color: statusColors?.backgroundColor } }}
        textAppliedOn={appliedOn}
        onClickCheckbox={{ onClick: handleCheck }}
      />
    </>
  );
};

const getJobStatus = (status: string) => {
  switch (status) {
    case 'applied':
      return 'new';
    case 'interviewing':
      return 'interviewing';
    case 'selected':
      return 'qualified';
    case 'rejected':
      return 'disqualified';
  }
};

export default ApplicationCard;

export function getGravatar(email: string, name: string) {
  return `https://www.gravatar.com/avatar/${require('crypto')
    .createHash('md5')
    .update(email.trim().toLowerCase())
    .digest('hex')}?d=${encode(name)}`;
}

function encode(name: any) {
  return encodeURIComponent(
    `https://ui-avatars.com/api/background=random&name=${name}`,
  );
}
