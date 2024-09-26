/* eslint-disable security/detect-object-injection */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Button } from '@components/ui/button';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useJobs } from '@/jobs/hooks';
import type { Form } from '@/jobs/types';
import { useCompanyMembers } from '@/queries/company-members';
import ROUTES from '@/utils/routing/routes';

import { type JobMetaFormProps, useJobForms } from './form';

const JobCreateComponent = () => {
  const { status } = useCompanyMembers();
  if (status === 'error')
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div>Error</div>
      </div>
    );
  if (status === 'pending')
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader2 className='animate-spin' />
      </div>
    );
  return (
    <div className='container'>
      <JobCreate />;
    </div>
  );
};

const JobCreate = () => {
  const { recruiter } = useAuthDetails();
  const initialCompany = recruiter?.name ?? '';
  const initialTitle = recruiter?.name ? `${initialCompany}'s first job` : '';
  const [fields, setFields] = useState<Form>({
    job_title: {
      value: null,
      required: true,
      placeholder: initialTitle,
      error: { value: false, helper: `Job title can't be empty` },
    },
    department_id: {
      value: null,
      required: false,
      error: { value: false, helper: `Department name can't be empty` },
    },
    job_type: {
      value: null,
      required: true,
      error: { value: false, helper: `Job type can't be empty` },
    },
    location_id: {
      value: 0,
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
    <div className='mx-auto max-w-2xl p-4'>
      <div className='mb-4 flex items-center'>
        {/* <Button variant='outline' onClick={() => push(ROUTES['/jobs']())}>
          Back
          </Button> */}
        <div className='flex flex-col items-center space-x-2'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/jobs'>Jobs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className='ml-4 mt-4 text-2xl font-bold'>Create Job</h1>
        </div>
      </div>
      <JobCreateForm fields={fields} setFields={setFields} />
    </div>
  );
};

const validateForms = (fields: Form) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = {
      value: value.value,
      required: value.required,
      error: {
        value:
          value?.value && typeof value?.value === 'string'
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
  const { push } = useRouterPro();

  const handleCreate = async () => {
    const newFields = validateForms(fields);
    if (enableCreation(newFields)) {
      setModal(true);
      const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
        acc[key] = value;
        return acc;
      }, {} as Payload);

      const { id } = await handleJobCreate({
        ...newJob,
      });

      setModal(false);
      push(ROUTES['/jobs/[job]']({ job: id }));
    } else {
      setFields(newFields);
    }
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
  }, [push]);

  return (
    <>
      <JobForms
        fields={fields}
        handleChange={handleChange}
        handleCreate={handleCreate}
        handleCancel={handleCancel}
      />
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent>
          <div className='flex min-h-[200px] items-center justify-center'>
            <Loader2 className='animate-spin' />
            <span className='ml-2'>Please wait job is creating...</span>
          </div>
        </DialogContent>
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
    department_id,
    description,
    job_title,
    job_type,
    location_id,
    workplace_type,
    hiring_manager,
    recruiter,
    recruiting_coordinator,
    sourcer,
  } = useJobForms(fields, handleChange);

  const forms = (
    <div className='space-y-4'>
      {job_title}
      <div className='grid grid-cols-2 gap-4'>
        <div>{job_type}</div>
        <div>{workplace_type}</div>
        <div>{department_id}</div>
        <div>{location_id}</div>
      </div>
    </div>
  );

  const roleForms = (
    <div className='grid grid-cols-2 gap-4'>
      <div>{hiring_manager}</div>
      <div>{recruiter}</div>
      <div>{recruiting_coordinator}</div>
      <div>{sourcer}</div>
    </div>
  );

  return (
    <div className='space-y-6'>
      <div className='rounded-md border bg-white p-4'>
        <h2 className='mb-4 text-lg font-semibold'>Job Details</h2>
        <div className='text-sm text-gray-500'>
          Add job details to help candidates understand the role and apply.
        </div>
        {forms}
      </div>
      <div className='rounded-md border bg-white p-4'>
        <h2 className='mb-4 text-lg font-semibold'>Hiring Team</h2>
        <div className='text-sm text-gray-500'>
          Add the hiring team so they can manage the job.
        </div>
        {roleForms}
      </div>
      <div className='rounded-md border bg-white p-4'>
        <h2 className='mb-4 text-lg font-semibold'>Job Description</h2>
        <div className='text-sm text-gray-500'>
          Add a detailed job description to help candidates understand the role
          and apply.
        </div>
        <div className='mt-4'>{description}</div>
        {fields.description.error.value && (
          <div className='mt-2 flex items-center text-red-500'>
            <AlertTriangle className='mr-2' />
            <span>{fields.description.error.helper}</span>
          </div>
        )}
      </div>
      <div className='flex justify-end space-x-4'>
        <Button variant='outline' onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleCreate}>Create Job</Button>
      </div>
    </div>
  );
};

export default JobCreateComponent;
