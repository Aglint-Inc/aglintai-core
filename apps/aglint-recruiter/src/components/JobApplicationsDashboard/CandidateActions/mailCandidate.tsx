/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
// import axios from 'axios';
import { CandidateSelectionPopup } from '@/devlink2/CandidateSelectionPopup';
import { getSafeAssessmentResult } from '@/src/apiUtils/job/jobApplications/candidateEmail/utils';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { JobApplicationEmails } from '@/src/pages/api/job/jobApplications/candidateEmail';

import {
  getAssessmentStatus,
  getDisqualificationStatus,
  getScreeningStatus,
} from '../utils';

const MailCandidateDialog: React.FC<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
}> = ({ open, setOpen, selectAll, setSelectAll }) => {
  const {
    cardStates: {
      checkList: { list, disabled },
    },
    setCardStates,
    handleJobApplicationSectionUpdate,
    section,
    applications,
  } = useJobApplications();

  const {
    initialPurpose,
    showCheck,
    title,
    description,
    subTitle,
    buttonText,
  } = getEmailProps(selectAll, applications[section], section, list);

  const [purposes, setPurposes] = useState(initialPurpose);

  const checkAction = () => {
    if (showCheck) {
      setPurposes((prev) => {
        const newPurpose = [...prev];
        if (prev.length !== 1) {
          newPurpose.pop();
        } else {
          newPurpose.push(getSubPurpose(section));
        }
        return newPurpose;
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPurposes([]);
  };

  const handleMailCandidate = async () => {
    if (!disabled) {
      setOpen(false);
      setCardStates((prev) => ({
        ...prev,
        checkList: { ...prev.checkList, disabled: true },
      }));
      await handleJobApplicationSectionUpdate(
        {
          source: section,
          destination: null,
        },
        null,
        purposes,
        list,
        selectAll,
      );
      setCardStates((prev) => ({
        ...prev,
        checkList: {
          disabled: false,
          list: new Set(),
        },
      }));
      setSelectAll(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <CandidateSelectionPopup
        isCheckVisible={showCheck}
        textHeader={title}
        textDescription={description}
        isChecked={purposes.length === 2}
        textCheck={subTitle}
        onclickCheck={{ onClick: () => checkAction() }}
        onclickClose={{ onClick: () => handleClose() }}
        slotButtons={
          <Stack
            spacing={'var(--space-2)'}
            mt={'var(--space-2)'}
            direction={'row'}
            alignItems={'center'}
          >
            <ButtonGhost
              textButton='Cancel'
              onClickButton={{
                onClick: () => handleClose(),
              }}
              size={2}
              color={'neutral'}
            />
            <ButtonSolid
              textButton={buttonText}
              onClickButton={{
                onClick: async () => await handleMailCandidate(),
              }}
              size={2}
              color={'neutral'}
            />
          </Stack>
        }
      />
    </Dialog>
  );
};

export default MailCandidateDialog;

const getEmailProps = (
  selectAll: boolean,
  sectionApplications: JobApplication[],
  section: JobApplicationSections,
  list: Set<string>,
) => {
  const type =
    section === JobApplicationSections.DISQUALIFIED ? 'mail' : 'invite';
  if (selectAll) {
    const initialPurpose = [getPurpose(section)].filter(
      (f) => f,
    ) as JobApplicationEmails['request']['purposes'];
    return {
      initialPurpose,
      title: getTitle(section),
      description:
        section === JobApplicationSections.DISQUALIFIED
          ? `Send ${type}s to all disqualified candidates who haven't recieved a rejection email`
          : `Send ${type}s to all uninvited candidates`,
      subTitle:
        section === JobApplicationSections.DISQUALIFIED
          ? `Resend ${type}s to all disqualified candidates who have recieved a rejection email`
          : `Resend ${type}s to all invited candidates`,
      showCheck: section === JobApplicationSections.DISQUALIFIED ? false : true,
      buttonText: `Send ${type}s`,
    };
  }
  const { send, resend } = getEmailSplit(sectionApplications, list, section);
  const initialPurpose = (
    send.length !== 0
      ? [getPurpose(section)]
      : resend.length !== 0
        ? [getSubPurpose(section)]
        : []
  ) as JobApplicationEmails['request']['purposes'];
  const title = getTitle(section);
  const subTitle =
    resend.length > 0 && send.length > 0
      ? getReSendDescription(resend.length, type)
      : null;
  const description =
    send.length > 0
      ? getSendDescription(send.length, type)
      : getReSendDescription(resend.length, type);
  const showCheck = checkVisibility(section, subTitle ? true : false);
  const buttonText = `Send ${type}${
    send.length + resend.length > 1 ? 's' : ''
  }`;
  return {
    initialPurpose,
    title,
    subTitle,
    description,
    showCheck,
    buttonText,
  };
};

const getEmailSplit = (
  applications: JobApplication[],
  checkList: Set<string>,
  section: JobApplicationSections,
) => {
  return applications.reduce(
    (acc, curr) => {
      if (checkList.has(curr.id)) {
        const { isNotInvited, isPending } = getStatus(section, curr);
        if (isNotInvited) acc.send.push(curr);
        else if (isPending) acc.resend.push(curr);
      }
      return acc;
    },
    { send: [] as JobApplication[], resend: [] as JobApplication[] },
  );
};

const getStatus = (
  section: JobApplicationSections,
  application: JobApplication,
) => {
  switch (section) {
    case JobApplicationSections.SCREENING:
      return getScreeningStatus(
        application.status_emails_sent,
        application.phone_screening,
      );
    case JobApplicationSections.ASSESSMENT:
      return getAssessmentStatus(
        application.status_emails_sent,
        getSafeAssessmentResult(application.assessment_results),
      );
    case JobApplicationSections.DISQUALIFIED:
      return getDisqualificationStatus(application.status_emails_sent);
  }
};

const checkVisibility = (
  section: JobApplicationSections,
  sendTitleCriteria: boolean,
) => {
  return (
    (section === JobApplicationSections.SCREENING ||
      section === JobApplicationSections.ASSESSMENT) &&
    sendTitleCriteria
  );
};

const getSendDescription = (count: number = 0, type: 'mail' | 'invite') => {
  return `Send ${type}${count !== 1 ? 's' : ''} to ${count} candidate${
    count !== 1 ? 's' : ''
  }`;
};

const getReSendDescription = (count: number = 0, type: 'mail' | 'invite') => {
  return `Resend ${type}${count !== 1 ? 's' : ''} to ${count} candidate${
    count !== 1 ? 's' : ''
  }`;
};

const getTitle = (section: JobApplicationSections) => {
  switch (section) {
    case JobApplicationSections.SCREENING:
      return `Screening invite`;
    case JobApplicationSections.ASSESSMENT:
      return `Assessment invite`;
    case JobApplicationSections.DISQUALIFIED:
      return `Rejection mail`;
    default:
      return null;
  }
};

const getPurpose = (
  destination: JobApplicationSections,
): JobApplicationEmails['request']['purposes'][number] => {
  switch (destination) {
    case JobApplicationSections.NEW:
      return null;
    case JobApplicationSections.ASSESSMENT:
      return 'interview';
    case JobApplicationSections.SCREENING:
      return 'phone_screening';
    case JobApplicationSections.QUALIFIED:
      return null;
    case JobApplicationSections.DISQUALIFIED:
      return 'rejection';
    default:
      return null;
  }
};

const getSubPurpose = (
  destination: JobApplicationSections,
): JobApplicationEmails['request']['purposes'][number] => {
  switch (destination) {
    case JobApplicationSections.NEW:
      return null;
    case JobApplicationSections.ASSESSMENT:
      return 'interview_resend';
    case JobApplicationSections.SCREENING:
      return 'phone_screening_resend';
    case JobApplicationSections.QUALIFIED:
      return null;
    case JobApplicationSections.DISQUALIFIED:
      return null;
    default:
      return null;
  }
};
