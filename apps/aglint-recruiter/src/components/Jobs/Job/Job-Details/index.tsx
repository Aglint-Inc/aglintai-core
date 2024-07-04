/* eslint-disable security/detect-object-injection */
import {
  Form,
  JobDetailsForm,
  JobMetaFormProps,
  useJobForms,
  WarningSvg,
} from '@components/Jobs/Create/form';
import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { SavedChanges } from '@/devlink/SavedChanges';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { JobDetailBlock } from '@/devlink3/JobDetailBlock';
import { useJob } from '@/src/context/JobContext';
import {
  validateDescription,
  validateString,
} from '@/src/context/JobContext/utils';
import NotFoundPage from '@/src/pages/404';
import { Job } from '@/src/queries/jobs/types';
import ROUTES from '@/src/utils/routing/routes';
import { capitalize } from '@/src/utils/text/textUtils';

import Loader from '../../../Common/Loader';

const JobDetailsDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job !== undefined && job.status !== 'closed' ? (
      <JobEdit />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const JobEdit = () => {
  const { job } = useJob();
  //TODO: HACK FOR BACKWARDS COMPATABILITY, DELETE THIS LATER
  const {
    job_title,
    company,
    department,
    description,
    job_type,
    location,
    workplace_type,
  } = {
    job_title: job.job_title,
    company: job.company,
    department: job.department,
    description: job.description,
    job_type: job.job_type,
    location: job.location,
    workplace_type: job.workplace_type,
    ...(job.draft ?? {}),
  };
  const [fields, setFields] = useState<JobDetailsForm>({
    job_title: {
      value: job_title,
      required: true,
      error: {
        value: validateString(job_title),
        helper: `Job title can't be empty`,
      },
    },
    company: {
      value: company,
      required: true,
      error: {
        value: validateString(company),
        helper: `Company name can't be empty`,
      },
    },
    department: {
      value: department,
      required: true,
      error: {
        value: validateString(department),
        helper: `Department name can't be empty`,
      },
    },
    job_type: {
      value: job_type,
      required: true,
      error: {
        value: validateString(job_type),
        helper: `Job type can't be empty`,
      },
    },
    location: {
      value: location,
      required: true,
      error: {
        value: validateString(location),
        helper: `Job location can't be empty`,
      },
    },
    workplace_type: {
      value: workplace_type,
      required: true,
      error: {
        value: validateString(workplace_type),
        helper: `Workplace type can't be empty`,
      },
    },
    description: {
      value: description,
      required: true,
      error: {
        value: validateDescription(description),
        helper: 'Job description must have more than 100 characters',
      },
    },
  });
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (saving) setShow(true);
    const timeout = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timeout);
  }, [saving]);

  return (
    <PageLayout
      slotTopbarLeft={<BreadCrumbs job={job} />}
      slotBody={
        <JobEditForm
          fields={fields}
          setFields={setFields}
          setSaving={setSaving}
        />
      }
      slotSaving={
        <Stack style={{ opacity: show ? 1 : 0, transition: '0.3s' }}>
          <SavedChanges
            isSaving={saving}
            isSaved={!saving}
            slotLoaderIcon={
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: 'var(--neutral-6)' }}
              />
            }
          />
        </Stack>
      }
    />
  );
};

const BreadCrumbs = ({ job }: { job: Job }) => {
  const { push } = useRouter();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`${ROUTES['/jobs']()}?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(ROUTES['/jobs/[id]']({ id: job?.id }));
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Job Details`} showArrow />
    </>
  );
};

const validateForms = (fields: JobDetailsForm) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = {
      value: value.value,
      required: value.required,
      error: {
        value: value?.value
          ? key === 'description'
            ? value.value.length < 100
            : value.value.length === 0
          : value.required,
        helper: value.error.helper,
      },
    };
    return acc;
  }, {} as JobDetailsForm);
};

type Payload = Parameters<ReturnType<typeof useJob>['handleJobAsyncUpdate']>[1];

const JobEditForm = ({
  fields,
  setFields,
  setSaving,
}: {
  fields: JobDetailsForm;
  setFields: Dispatch<SetStateAction<JobDetailsForm>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
}) => {
  const initialRef = useRef(false);
  const { job, handleJobAsyncUpdate } = useJob();

  const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobAsyncUpdate(job.id, {
      draft: { ...job.draft, ...newJob },
    });
    setSaving(false);
  };

  const handleChange = (name: keyof Form, value: string | number) => {
    const newFields = validateForms({
      ...fields,
      [name]: { ...fields[name], value },
    });
    setFields(newFields);
  };

  useEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true;
      return;
    }
    const timeout = setTimeout(() => handleSave(), 400);
    return () => clearTimeout(timeout);
  }, [...Object.values(newJob)]);

  return <JobForms fields={fields} handleChange={handleChange} />;
};

const JobForms = ({ fields, handleChange }: JobMetaFormProps) => {
  const {
    company,
    department,
    description,
    job_title,
    job_type,
    location,
    workplace_type,
  } = useJobForms(fields, handleChange);

  const forms = (
    <>
      {company}
      {department}
      {job_title}
      {job_type}
      {location}
      {workplace_type}
    </>
  );

  return (
    <JobDetailBlock
      isJobDetailVisible={true}
      slotJobForm={forms}
      isHiringTeamVisible={false}
      slotHiringTeamForm={null}
      slotRichtext={description}
      textDescription={
        'Update the job details here; changes will be saved automatically. Publish to make the updates live.'
      }
      isCreate={false}
      onClickCreate={null}
      styleBorder={{
        style: {
          borderColor: fields.description.error.value
            ? 'var(--error-a6)'
            : 'var(--neutral-a6)',
        },
      }}
      slotRichtextWarning={
        fields.description.error.value && (
          <Stack
            alignItems={'center'}
            direction={'row'}
            color={'var(--error-a11)'}
          >
            <WarningSvg />
            {fields.description.error.helper}
          </Stack>
        )
      }
    />
  );
};

export default JobDetailsDashboard;
