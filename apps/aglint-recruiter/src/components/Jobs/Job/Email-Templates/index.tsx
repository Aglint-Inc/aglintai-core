/* eslint-disable security/detect-object-injection */
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { JobEditWarning } from '@/devlink/JobEditWarning';
import { JobWarningList } from '@/devlink/JobWarningList';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useJobDetails } from '@/src/context/JobDashboard';
import { validateString } from '@/src/context/JobDashboard/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';
import { Job } from '@/src/queries/jobs/types';
import { emailTemplates as emailTemplatesUtils } from '@/src/utils/emailTemplate';
import { capitalize } from '@/src/utils/text/textUtils';

import { JobEmailTemplateForms } from './form';
import { templateObj } from './utils';

const JobEmailTemplatesDashboard = () => {
  const { initialLoad } = useJobs();
  return (
    <Stack height={'100%'} width={'100%'}>
      {!initialLoad ? (
        <Loader />
      ) : (
        <PageLayout
          slotTopbarLeft={<JobEmailTemplatesDashboardBreadCrumbs />}
          slotTopbarRight={<></>}
          slotBody={
            <Box padding={'24px'} bgcolor={'var(--neutral-2)'}>
              <JobEmailTemplates />
            </Box>
          }
        />
      )}
    </Stack>
  );
};

export default JobEmailTemplatesDashboard;

const JobEmailTemplatesDashboardBreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Email Templates`} showArrow />
    </>
  );
};

const JobEmailTemplates = () => {
  const initialRef = useRef(false);
  const { job, emailTemplateValidity } = useJobDetails();
  const { handleJobAsyncUpdate } = useJobs();
  const emailTemplates = job?.email_template;
  const [fields, setFields] = useState<AllForms>(
    Object.entries(emailTemplates).reduce((acc, curr) => {
      acc[curr[0]] = Object.entries(curr[1]).reduce(
        (acc, curr) => {
          acc[curr[0]] = {
            value: curr[1],
            error: {
              value: validateString(String(curr[1])),
              helper: getHelper(curr[0] as any),
            },
          };
          return acc;
        },
        {} as AllForms['application_received'],
      );
      return acc;
    }, {} as AllForms),
  );
  const newEmailTemplates = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc[key] = Object.entries(value).reduce(
        (acc, [key, { value }]) => {
          acc[key] = value;
          return acc;
        },
        {} as Job['email_template']['application_received'],
      );
      return acc;
    },
    {} as Job['email_template'],
  );
  const templateEntries = useTemplateEntries();
  const [selection, setSelection] = useState<keyof Job['email_template']>(
    templateEntries[0],
  );
  const handleChange = (
    name: keyof AllForms['application_received'],
    value: string,
  ) => {
    const newFields = validateForms({
      ...fields,
      [selection]: {
        ...fields[selection],
        [name]: { ...fields[selection][name], value },
      },
    });
    setFields(newFields);
  };
  const handleSave = async () => {
    await handleJobAsyncUpdate(job.id, { email_template: newEmailTemplates });
  };
  useDeepCompareEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true;
      return;
    }
    const timeout = setTimeout(() => handleSave(), 400);
    return () => clearTimeout(timeout);
  }, [newEmailTemplates]);

  return (
    <EmailTemplatesStart
      isWarningVisible={emailTemplateValidity?.length !== 0}
      slotWarning={
        <JobEditWarning
          slotWarningList={emailTemplateValidity.map((warning, i) => (
            <JobWarningList key={i} textWarning={warning} />
          ))}
        />
      }
      slotEmailTemplateCards={
        <Sections selection={selection} setSelection={setSelection} />
      }
      slotEmailDetails={
        <EditEmail
          editEmailDescription={emailTemplatesUtils[selection].descriptionInJob}
          textEmailName={emailTemplatesUtils[selection].heading}
          slotForm={
            <JobEmailTemplateForms
              key={selection}
              fields={fields[selection]}
              selection={selection}
              handleChange={handleChange}
            />
          }
          isSaveChangesButtonVisible={false}
        />
      }

      // onClickApplicationRecieved={{ onClick: () => console.log('A') }}
      // onClickDisqualified={{ onClick: () => console.log('B') }}
      // onClickDone={{ onClick: () => console.log('C') }}
      // onClickFollowInterview={{ onClick: () => console.log('D') }}
      // onClickInterviewInvite={{ onClick: () => console.log('E') }}
      // onClickProceed={{ onClick: () => console.log('F') }}
      // onClickSaveDraft={{ onClick: () => console.log('G') }}
      // slotBasicButton={<></>}
      // slotButtonPrimaryRegular={<></>}
      // isAddJob={false}
      // isProceedDisable={false}
    />
  );
};

export type AllForms = {
  [id in keyof Job['email_template']]: {
    [subId in keyof Job['email_template'][id]]: {
      value: Job['email_template'][id][subId];
      error: {
        value: boolean;
        helper: string;
        description: string;
      };
    };
  };
};

const useTemplateEntries = () => {
  const { job } = useJobDetails();
  const emailTemplates = job?.email_template;
  const isAssesmentEnabled = useFeatureFlagEnabled('isAssesmentEnabled');
  const isPhoneScreeningEnabled = useFeatureFlagEnabled(
    'isPhoneScreeningEnabled',
  );
  const isJobMarketingEnabled = useFeatureFlagEnabled('isJobMarketingEnabled');
  const templateEntries = Object.keys(emailTemplates).filter((path) => {
    if (path === 'phone_screening' || path === 'phone_screening_resend')
      return isPhoneScreeningEnabled && job.phone_screen_enabled;
    if (path === 'interview' || path === 'interview_resend')
      return isAssesmentEnabled && job.assessment;
    if (path == 'application_received') return isJobMarketingEnabled;
    return true;
  }) as unknown as (keyof Job['email_template'])[];

  return templateEntries;
};

const Sections = ({
  selection,
  setSelection,
}: {
  selection: keyof Job['email_template'];
  setSelection: Dispatch<SetStateAction<keyof Job['email_template']>>;
}) => {
  const entries = useTemplateEntries();

  const templateEntries = entries.map((email) => ({
    title: templateObj[`${email}`],
    excerpt: '',
    path: email,
  }));

  return templateEntries.map((email) => {
    if (email.title)
      return (
        <EmailTemplateCards
          key={email?.path}
          textTitle={email?.title?.listing}
          textDescription={templateObj[email.path]?.triggerInfo}
          isActive={selection === email?.path}
          onClickApplicationRecieved={{
            onClick: () => {
              setSelection(email?.path as keyof Job['email_template']);
            },
          }}
        />
      );
  });
};

const validateForms = (fields: AllForms) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(value).reduce(
      (acc, [key, value]) => {
        acc[key] = {
          value: value.value,
          error: {
            ...value.error,
            value: validateString(String(value.value)),
          },
        };
        return acc;
      },
      {} as AllForms['application_received'],
    );
    return acc;
  }, {} as AllForms);
};

export const getHelper = (label: keyof AllForms['application_received']) => {
  switch (label) {
    case 'body':
      return 'Email body cannot be empty';
    case 'subject':
      return 'Email subject cannot be empty';
    case 'fromName':
      return 'Sender name cannot be empty';
    default:
      return;
  }
};
