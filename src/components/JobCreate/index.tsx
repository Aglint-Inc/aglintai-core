/* eslint-disable security/detect-object-injection */
import { Dialog } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { PageLayout } from '@/devlink2';
import {
  ConfirmationPopup,
  CreateJobLoader,
  EditJobTopbarLeft
} from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { hashCode } from '@/src/context/JobDashboard/hooks';
import { useJobs } from '@/src/context/JobsContext';
import { pageRoutes } from '@/src/utils/pageRouting';

import Loader from '../Common/Loader';
import { Form, JobForms } from './form';

const JobCreate = () => {
  const { recruiter } = useAuthDetails();
  const { push } = useRouter();
  const initialCompany = recruiter?.name ?? '';
  const initialTitle = recruiter?.name ? `${initialCompany}'s first job` : '';
  const [fields, setFields] = useState<Form>({
    job_title: {
      value: initialTitle,
      error: { value: false, helper: `Job title can't be empty` }
    },
    company: {
      value: initialCompany,
      error: { value: false, helper: `Company name can't be empty` }
    },
    department: {
      value: 'legal',
      error: { value: false, helper: `Department name can't be empty` }
    },
    job_type: {
      value: 'full time',
      error: { value: false, helper: `Job type can't be empty` }
    },
    location: {
      value: '',
      error: { value: false, helper: `Job location can't be empty` }
    },
    workplace_type: {
      value: 'on site',
      error: { value: false, helper: `Workplace type can't be empty` }
    },
    description: {
      value: '',
      error: {
        value: false,
        helper: 'Job description must have more than 100 characters'
      }
    }
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

const enableCreation = (fields: Form) => {
  return (
    Object.values(fields).filter((value) => value?.error?.value).length === 0
  );
};

type Payload = Parameters<ReturnType<typeof useJobs>['handleJobCreate']>[0];

const JobCreateForm = ({
  fields,
  setFields
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
        description_hash: hashCode(newJob.description)
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
            value: false
          }
        }
      }));
    },
    []
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

export default JobCreate;
