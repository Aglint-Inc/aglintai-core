import { JobApplication } from '@context/JobApplicationsContext/types';
import { useMemo, useState } from 'react';

import { JobCandidateCard } from '@/devlink';
import { useJobApplications } from '@/src/context/JobApplicationsContext';

import ApplicationDetails from './ApplicationDetails';
import CircularScore from '../Common/CircularScore';
import { capitalize, formatTimeStamp } from '../utils';
import MuiAvatar from '../../Common/MuiAvatar';

const ApplicationCard = ({
  application,
  index,
}: {
  application: JobApplication;
  index: number;
}) => {
  const { circularScoreAnimation } = useJobApplications();

  const [checked, setChecked] = useState(false);
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

  // eslint-disable-next-line no-unused-vars
  const handleCheck = () => {
    setChecked((prev) => !prev);
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
        isChecked={checked}
        slotProfilePic={
          <MuiAvatar
            level={application.first_name}
            src={'/'}
            variant={'rounded'}
            width={'78px'}
            height={'78px'}
            fontSize={'28px'}
          />
        }
        textName={capitalize(application.first_name)}
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
        textStatus={capitalize(application.status)}
        statusTextColor={{ style: { color: statusColors?.color } }}
        statusBgColor={{ style: { color: statusColors?.backgroundColor } }}
        textAppliedOn={appliedOn}
      />
    </>
  );
};

const getScoreColor = (finalScore: number) => {
  const green = '#228F67';
  const yellow = '#F79A3E';
  const red = '#D93F4C';
  return finalScore > 33 ? (finalScore > 66 ? green : yellow) : red;
};

const getStatusColor = (status: string) => {
  const statusColors = {
    applied: {
      color: '#012b30',
      backgroundColor: '#f5fcfc',
    },
    screening: {
      color: '#0f3554',
      backgroundColor: '#edf7ff',
    },
    shortlisted: {
      color: '#58064e',
      backgroundColor: '#f9e7f6',
    },
    selected: {
      color: '#0b3b29',
      backgroundColor: '#58064e',
    },
  };
  // eslint-disable-next-line security/detect-object-injection
  return statusColors[status];
};

const getInterviewScore = (feedback) => {
  return Math.floor(
    feedback.reduce((acc, curr) => {
      return (acc += Number(curr.rating));
    }, 0) / feedback.length,
  );
};

export default ApplicationCard;
