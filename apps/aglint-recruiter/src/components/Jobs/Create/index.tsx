/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { PageLayout } from '@/devlink2/PageLayout';
import { CreateJobLoader } from '@/devlink3/CreateJobLoader';
import { EditJobTopbarLeft } from '@/devlink3/EditJobTopbarLeft';
import { JobDetailBlock } from '@/devlink3/JobDetailBlock';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useCompanyMembers } from '@/src/queries/company-members';
import ROUTES from '@/src/utils/routing/routes';

import { WarningSvg } from '../Job/Interview-Plan/sessionForms';
import { Form, JobMetaFormProps, useJobForms } from './form';

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
      value: null,
      required: true,
      placeholder: initialTitle,
      error: { value: false, helper: `Job title can't be empty` },
    },
    company: {
      value: initialCompany,
      required: true,
      error: { value: false, helper: `Company name can't be empty` },
    },
    department: {
      value: null,
      required: false,
      error: { value: false, helper: `Department name can't be empty` },
    },
    job_type: {
      value: null,
      required: true,
      error: { value: false, helper: `Job type can't be empty` },
    },
    location: {
      value: '',
      required: false,
      error: { value: false, helper: `Job location can't be empty` },
    },
    workplace_type: {
      value: null,
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
  return (
    <>
      <PageLayout
        isBackButton
        onClickBack={{ onClick: () => push(ROUTES['/jobs']()) }}
        slotTopbarLeft={<EditJobTopbarLeft textName={'Create Job'} />}
        slotBody={<JobCreateForm fields={fields} setFields={setFields} />}
      />
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
      });
      push(ROUTES['/jobs/[id]']({ id }));
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

  const handleCancel = useCallback(() => {
    push(ROUTES['/jobs']());
  }, []);

  return (
    <>
      <JobForms
        fields={fields}
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleCancel={handleCancel}
      />
      <Dialog open={modal}>
        <CreateJobLoader slotLottie={<Loader />} />
      </Dialog>
    </>
  );
};

const JobForms = ({
  fields,
  handleChange,
  handleCreate,
  handleCancel,
}: JobMetaFormProps) => {
  const {
    company,
    department,
    description,
    job_title,
    job_type,
    location,
    workplace_type,
    hiring_manager,
    recruiter,
    recruiting_coordinator,
    sourcer,
  } = useJobForms(fields, handleChange);

  const forms = (
    <>
      {company}
      {job_title}
      {job_type}
      {workplace_type}
      {department}
      {location}
    </>
  );

  const roleForms = (
    <>
      {hiring_manager}
      {recruiter}
      {recruiting_coordinator}
      {sourcer}
    </>
  );

  return (
    <JobDetailBlock
      isJobDetailVisible={true}
      slotJobForm={forms}
      isHiringTeamVisible={true}
      slotHiringTeamForm={roleForms}
      slotRichtext={description}
      textDescription={'Enter the basic job details below.'}
      isCreate={true}
      onClickCreate={{ onClick: () => handleCreate() }}
      styleBorder={{
        style: {
          borderColor: fields.description.error.value
            ? 'var(--error-9)'
            : 'var(--neutral-a6)',
        },
      }}
      slotRichtextWarning={
        fields.description.error.value && (
          <Stack
            alignItems={'center'}
            direction={'row'}
            color={'var(--error-11)'}
          >
            <WarningSvg />
            {fields.description.error.helper}
          </Stack>
        )
      }
      onClickCancel={{ onClick: () => handleCancel() }}
    />
  );
};

export default JobCreateComponent;
