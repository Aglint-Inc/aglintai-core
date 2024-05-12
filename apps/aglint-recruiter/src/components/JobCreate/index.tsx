/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { PageLayout } from '@/devlink2';
import {
  ConfirmationPopup,
  CreateJobLoader,
  EditJobTopbarLeft,
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { hashCode } from '@/src/context/JobDashboard/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { useCompanyMembers } from '@/src/queries/company-members';
import { pageRoutes } from '@/src/utils/pageRouting';

import Loader from '../Common/Loader';
import { Form, JobForms } from './form';

const JobCreateComponent = () => {
  const { status } = useCompanyMembers();
  if (status === 'error')
    return (
      <Stack
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack>Error</Stack>
      </Stack>
    );
  if (status === 'pending')
    return (
      <Stack
        width={'100%'}
        height={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Loader />
      </Stack>
    );
  return <JobCreate />;
};

const JobCreate = () => {
  const { recruiter } = useAuthDetails();
  const { push } = useRouter();
  const initialCompany = recruiter?.name ?? '';
  const initialTitle = recruiter?.name ? `${initialCompany}'s first job` : '';
  const [fields, setFields] = useState<Form>({
    job_title: {
      value: initialTitle,
      required: true,
      error: { value: false, helper: `Job title can't be empty` },
    },
    company: {
      value: initialCompany,
      required: true,
      error: { value: false, helper: `Company name can't be empty` },
    },
    department: {
      value: recruiter?.departments?.[0] ?? null,
      required: true,
      error: { value: false, helper: `Department name can't be empty` },
    },
    job_type: {
      value: 'full time',
      required: true,
      error: { value: false, helper: `Job type can't be empty` },
    },
    location: {
      value: '',
      required: true,
      error: { value: false, helper: `Job location can't be empty` },
    },
    workplace_type: {
      value: 'on site',
      required: true,
      error: { value: false, helper: `Workplace type can't be empty` },
    },
    description: {
      value: '',
      required: true,
      error: {
        value: false,
        helper: 'Job description must have more than 100 characters',
      },
    },
    hiring_manager: {
      value: null,
      required: true,
      error: {
        value: false,
        helper: 'Hiring manager must be selected',
      },
    },
    recruiter: {
      value: null,
      required: true,
      error: {
        value: false,
        helper: 'Recruiter must be selected',
      },
    },
    recruiting_coordinator: {
      value: null,
      required: false,
      error: {
        value: false,
        helper: 'Recruiting coordinator must be selected',
      },
    },
    sourcer: {
      value: null,
      required: false,
      error: {
        value: false,
        helper: 'Sourcer must be selected',
      },
    },
  });
  const [modal, setModal] = useState(false);
  return (
    <>
      <PageLayout
        isBackButton
        onClickBack={{ onClick: () => push(pageRoutes.JOBS) }}
        slotTopbarLeft={<EditJobTopbarLeft textName={'Create Job'} />}
        slotBody={<JobCreateForm fields={fields} setFields={setFields} />}
      />
      <Dialog open={modal} onClose={() => setModal(false)}>
        <ConfirmationPopup isIcon={false} />
      </Dialog>
    </>
  );
};

const validateForms = (fields: Form) => {
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
  }, {} as Form);
};

const enableCreation = (fields: Form) => {
  return (
    Object.values(fields).filter((value) => value?.error?.value).length === 0
  );
};

type Payload = Parameters<ReturnType<typeof useJobs>['handleJobCreate']>[0];

const JobCreateForm = ({
  fields,
  setFields,
}: {
  fields: Form;
  setFields: Dispatch<SetStateAction<Form>>;
}) => {
  const [modal, setModal] = useState(false);
  const { handleJobCreate } = useJobs();
  const { push } = useRouter();

  const handleCreate = async () => {
    const newFields = validateForms(fields);
    if (enableCreation(newFields)) {
      const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
        acc[key] = value;
        return acc;
      }, {} as Payload);
      setModal(true);

      const { id } = await handleJobCreate({
        ...newJob,
        description_hash: hashCode(newJob.description),
      });
      push(`${pageRoutes.JOBS}/${id}`);
    } else {
      setFields(newFields);
    }
    setModal(false);
  };

  const handleChange = useCallback(
    (name: keyof Form, value: string | number) => {
      setFields((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value: value,
          error: {
            ...prev[name].error,
            value: false,
          },
        },
      }));
    },
    [],
  );

  return (
    <>
      <JobForms
        fields={fields}
        handleChange={handleChange}
        handleCreate={handleCreate}
      />
      <Dialog open={modal}>
        <CreateJobLoader slotLottie={<Loader />} />
      </Dialog>
    </>
  );
};

export default JobCreateComponent;
