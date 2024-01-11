import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

import { CandidateSelectionPopup } from '@/devlink2';
import {
  JobApplicationsData,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { pageRoutes } from '@/src/utils/pageRouting';

import AUIButton from '../../Common/AUIButton';

export const MoveCandidateDialog = ({
  open,
  onClose,
  destination,
  onSubmit,
  checkAction,
  count = 0,
  name = null,
}: {
  open: boolean;
  onClose: () => void;
  destination: JobApplicationSections;
  onSubmit: () => Promise<void>;
  checkAction: () => Promise<void>;
  count?: number;
  name?: string;
}) => {
  const [check, setCheck] = useState(false);
  const title = getTitle(destination);
  const subTitle = getSubTitle(destination, count, name);
  const description = getDescription(destination, count, name);
  const showCheck = checkVisibility(destination);
  const handleSubmit = async () => {
    await onSubmit();
    check && (await checkAction());
  };

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <CandidateSelectionPopup
        isCheckVisible={showCheck}
        textHeader={title}
        textDescription={description}
        isChecked={check}
        textCheck={subTitle}
        onclickCheck={{ onClick: () => setCheck((prev) => !prev) }}
        onclickClose={{ onClick: () => onClose() }}
        slotButtons={
          <Stack
            spacing={'10px'}
            mt={'10px'}
            direction={'row'}
            alignItems={'center'}
          >
            <AUIButton onClick={() => onClose()} variant='text'>
              Cancel
            </AUIButton>
            <AUIButton
              onClick={async () => await handleSubmit()}
              variant={'primary'}
            >
              {check && showCheck ? 'Send Email & Move' : title}
            </AUIButton>
          </Stack>
        }
      />
    </Dialog>
  );
};

const checkVisibility = (destination: JobApplicationSections) => {
  return (
    destination === JobApplicationSections.ASSESSMENT ||
    destination === JobApplicationSections.DISQUALIFIED
  );
};

const sectionMapper = (section: JobApplicationSections) => {
  switch (section) {
    case JobApplicationSections.NEW:
      return 'New';
    case JobApplicationSections.ASSESSMENT:
      return 'Assessment';
    case JobApplicationSections.QUALIFIED:
      return 'Qualified';
    case JobApplicationSections.DISQUALIFIED:
      return 'Disqualified';
  }
};

const getTitle = (destination: JobApplicationSections) => {
  return `Move to ${sectionMapper(destination)}`;
};

const getDescription = (
  destination,
  count: number = 0,
  name: string = null,
) => {
  if (name) return `Move ${name} to ${sectionMapper(destination)} stage?`;
  return `Move ${count} candidate${count !== 1 ? 's' : ''} to ${sectionMapper(
    destination,
  )} stage`;
};

const getSubTitle = (
  destination: JobApplicationSections,
  count: number = 0,
  name: string = null,
) => {
  if (name) {
    switch (destination) {
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to ${name}`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to ${name}`;
      default:
        return null;
    }
  } else if (count === 0) return null;
  else {
    switch (destination) {
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      default:
        return null;
    }
  }
};

export function sendEmails(
  status: string,
  checkList: Set<string>,
  applications: JobApplicationsData,
  job,
  handleJobApplicationUpdate,
) {
  if (
    status === JobApplicationSections.ASSESSMENT ||
    status === JobApplicationSections.DISQUALIFIED
  ) {
    const _new = applications.new;
    const assessment = applications.assessment;
    const qualified = applications.qualified;
    const disqualified = applications.disqualified;

    const allCandidates = [
      ..._new,
      ...assessment,
      ...qualified,
      ...disqualified,
    ];
    const allCandidatesIds = allCandidates.map((ele) => ele.id);
    const filteredCandidates = [];

    Array.from(checkList).forEach((id) => {
      if (allCandidatesIds.includes(id))
        filteredCandidates.push(
          allCandidates.filter((candidate) => candidate.id === id)[0],
        );
    });

    for (const candidate of filteredCandidates) {
      emailHandler(candidate, job, handleJobApplicationUpdate, status);
    }
  }
}

export const emailHandler = async (
  candidate: {
    email: any;
    first_name: any;
    last_name: any;
    job_title: any;
    company: any;
    application_id: any;
    status_emails_sent: any;
  },
  job: any,
  handleJobApplicationUpdate: any,
  status: JobApplicationSections,
) => {
  return await axios
    .post('/api/sendgrid', {
      fromEmail: `messenger@aglinthq.com`,
      fromName:
        status === JobApplicationSections.ASSESSMENT
          ? job.email_template?.interview.fromName
          : status === JobApplicationSections.DISQUALIFIED
            ? job.email_template?.rejection.fromName
            : null,
      email: candidate?.email,
      subject:
        status === JobApplicationSections.ASSESSMENT
          ? fillEmailTemplate(job.email_template?.interview.subject, {
              first_name: candidate.first_name,
              last_name: candidate.last_name,
              job_title: candidate.job_title,
              company_name: candidate.company,
              interview_link: undefined,
              support_link: undefined,
            })
          : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(job?.email_template?.rejection.subject, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
                support_link: undefined,
              })
            : null,
      text:
        status === JobApplicationSections.ASSESSMENT
          ? fillEmailTemplate(job?.email_template?.interview?.body, {
              first_name: candidate.first_name,
              last_name: candidate.last_name,
              job_title: candidate.job_title,
              company_name: candidate.company,
              interview_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/${pageRoutes.MOCKTEST}?id=${candidate.application_id}`,
              support_link: `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${candidate.application_id}`,
            })
          : status === JobApplicationSections.DISQUALIFIED
            ? fillEmailTemplate(job?.email_template?.rejection?.body, {
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                job_title: candidate.job_title,
                company_name: candidate.company,
                interview_link: undefined,
                support_link: undefined,
              })
            : null,
    })
    .then(async () => {
      if (status === JobApplicationSections.ASSESSMENT) {
        candidate.status_emails_sent.assessment = true;
        await handleJobApplicationUpdate(candidate.application_id, {
          emails: candidate.status_emails_sent,
        });
        return true;
      }
      if (status === JobApplicationSections.DISQUALIFIED) {
        candidate.status_emails_sent.rejected = true;
        await handleJobApplicationUpdate(candidate.application_id, {
          emails: candidate.status_emails_sent,
        });
        return true;
      }
    })
    .catch(() => {
      return false;
    });
};

function fillEmailTemplate(
  template: any,
  email: {
    first_name: any;
    last_name: any;
    job_title: any;
    company_name: any;
    interview_link: any;
    support_link: any;
  },
) {
  let filledTemplate = template;

  const placeholders = {
    '[firstName]': email.first_name,
    '[lastName]': email.last_name,
    '[jobTitle]': email.job_title,
    '[companyName]': email.company_name,
    '[interviewLink]': email.interview_link,
    '[supportLink]': email.support_link,
  };

  for (const [placeholder, value] of Object.entries(placeholders)) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
    filledTemplate = filledTemplate.replace(regex, value);
  }

  return filledTemplate;
}
