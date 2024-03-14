/* eslint-disable security/detect-object-injection */
import { CircularProgress, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { SavedChanges } from '@/devlink';
import { PageLayout } from '@/devlink2';
import { EditJobTopbarLeft } from '@/devlink3';
import { useJobDetails } from '@/src/context/JobDashboard';
import {
  validateDescription,
  validateString
} from '@/src/context/JobDashboard/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import NotFoundPage from '@/src/pages/404';
import { pageRoutes } from '@/src/utils/pageRouting';

import Loader from '../Common/Loader';
import { Form, JobForms } from '../JobCreate/form';

const JobEditDashboard = () => {
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
  const {
    job_title,
    company,
    department,
    description,
    job_type,
    location,
    workplace_type
  } = {
    job_title: job.job_title,
    company: job.company,
    department: job.department,
    description: job.description,
    job_type: job.job_type,
    location: job.location,
    workplace_type: job.workplace_type,
    ...(job.draft ?? {})
  };
  const { push } = useRouter();
  const [fields, setFields] = useState<Form>({
    job_title: {
      value: job_title,
      error: {
        value: validateString(job_title),
        helper: `Job title can't be empty`
      }
    },
    company: {
      value: company,
      error: {
        value: validateString(company),
        helper: `Company name can't be empty`
      }
    },
    department: {
      value: department,
      error: {
        value: validateString(department),
        helper: `Department name can't be empty`
      }
    },
    job_type: {
      value: job_type,
      error: {
        value: validateString(job_type),
        helper: `Job type can't be empty`
      }
    },
    location: {
      value: location,
      error: {
        value: validateString(location),
        helper: `Job location can't be empty`
      }
    },
    workplace_type: {
      value: workplace_type,
      error: {
        value: validateString(workplace_type),
        helper: `Workplace type can't be empty`
      }
    },
    description: {
      value: description,
      error: {
        value: validateDescription(description),
        helper: 'Job description must have more than 100 characters'
      }
    }
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
      isBackButton
      onClickBack={{ onClick: () => push(`${pageRoutes.JOBS}/${job.id}`) }}
      slotTopbarLeft={<EditJobTopbarLeft textName={'Edit Job'} />}
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

const validateForms = (fields: Form) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = {
      value: value.value,
      error: {
        value: value?.value
          ? key === 'description'
            ? value.value.length < 100
            : value.value.length === 0
          : true,
        helper: value.error.helper
      }
    };
    return acc;
  }, {} as Form);
};

type Payload = Parameters<ReturnType<typeof useJobs>['handleJobUpdate']>[1];

const JobEditForm = ({
  fields,
  setFields,
  setSaving
}: {
  fields: Form;
  setFields: Dispatch<SetStateAction<Form>>;
  setSaving: Dispatch<SetStateAction<boolean>>;
}) => {
  const initialRef = useRef(false);
  const { job } = useJobDetails();
  const { handleJobUpdate } = useJobs();

  const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobUpdate(job.id, { draft: { ...job.draft, ...newJob } });
    setSaving(false);
  };

  const handleChange = (name: keyof Form, value: string | number) => {
    const newFields = validateForms({
      ...fields,
      [name]: { ...fields[name], value }
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

export default JobEditDashboard;
