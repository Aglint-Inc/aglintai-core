/* eslint-disable security/detect-object-injection */
import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { SavedChanges } from '@/devlink/SavedChanges';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { JobDetailBlock } from '@/devlink3/JobDetailBlock';
import { useJobDetails } from '@/src/context/JobDashboard';
import { validateString } from '@/src/context/JobDashboard/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import NotFoundPage from '@/src/pages/404';
import { Job } from '@/src/queries/job/types';
import ROUTES from '@/src/utils/routing/routes';

import Loader from '../Common/Loader';
import { capitalize } from '../JobApplicationsDashboard/utils';
import {
  JobHiringTeamForm,
  JobMetaFormProps,
  useJobForms,
} from '../JobCreate/form';

const JobHiringTeamDashboard = () => {
  const { initialLoad, job } = useJobDetails();

  return initialLoad ? (
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
  const { job } = useJobDetails();
  //TODO: HACK FOR BACKWARDS COMPATABILITY, DELETE THIS LATER
  const { hiring_manager, recruiter, recruiting_coordinator, sourcer } = {
    hiring_manager: job.hiring_manager,
    recruiter: job.recruiter,
    recruiting_coordinator: job.recruiting_coordinator,
    sourcer: job.sourcer,
  };
  const [fields, setFields] = useState<JobHiringTeamForm>({
    hiring_manager: {
      value: hiring_manager,
      required: true,
      error: {
        value: validateString(hiring_manager),
        helper: 'Hiring manager must be selected',
      },
    },
    recruiter: {
      value: recruiter,
      required: true,
      error: {
        value: validateString(recruiter),
        helper: 'Recruiter must be selected',
      },
    },
    recruiting_coordinator: {
      value: recruiting_coordinator,
      required: false,
      error: {
        value: false,
        helper: 'Recruiter coordinator must be selected',
      },
    },
    sourcer: {
      value: sourcer,
      required: false,
      error: {
        value: false,
        helper: 'Sourcer must be selected',
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
                sx={{ color: palette.grey[400] }}
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
      <Breadcrum textName={`Hiring Team`} showArrow />
    </>
  );
};

const validateForms = (fields: JobHiringTeamForm) => {
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
  }, {} as JobHiringTeamForm);
};

type Payload = Parameters<
  ReturnType<typeof useJobs>['handleJobAsyncUpdate']
>[1];

const JobEditForm = ({
  fields,
  setFields,
  setSaving,
}: {
  fields: JobHiringTeamForm;
  setFields: Dispatch<SetStateAction<JobHiringTeamForm>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
}) => {
  const initialRef = useRef(false);
  const { job } = useJobDetails();
  const { handleJobAsyncUpdate } = useJobs();

  const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobAsyncUpdate(job.id, newJob);
    setSaving(false);
  };

  const handleChange = (
    name: keyof JobHiringTeamForm,
    value: string | number,
  ) => {
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
  const { hiring_manager, recruiter, recruiting_coordinator, sourcer } =
    useJobForms(fields, handleChange);

  const forms = (
    <>
      {hiring_manager}
      {recruiter}
      {recruiting_coordinator}
      {sourcer}
    </>
  );

  return (
    <JobDetailBlock
      isJobDetailVisible={false}
      slotJobForm={null}
      isHiringTeamVisible={true}
      slotHiringTeamForm={forms}
      slotRichtext={null}
      textDescription={null}
      isCreate={false}
      onClickCreate={null}
      styleBorder={null}
      slotRichtextWarning={null}
    />
  );
};

export default JobHiringTeamDashboard;
