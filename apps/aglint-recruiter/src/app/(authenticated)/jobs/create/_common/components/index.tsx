/* eslint-disable security/detect-object-injection */
import {
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Dialog, DialogContent } from '@components/ui/dialog';
import { AlertCircle } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

import { useTenant } from '@/company/hooks';
import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import { useOnboarding } from '@/components/Navigation/OnboardPending/context/onboarding';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useCreateAglintJobs } from '@/jobs/hooks';
import type { Form } from '@/jobs/types';
import type { RouterInputs } from '@/trpc/client';
import ROUTES from '@/utils/routing/routes';

import { type JobMetaFormProps, useJobForms } from './form';

export const JobCreateHeader = () => {
  return (
    <PageHeader>
      <PageHeaderText>
        <PageTitle>Create Job</PageTitle>
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
      </PageHeaderText>
    </PageHeader>
  );
};

export const JobCreate = () => {
  const { recruiter } = useTenant();
  const { isJobSetupPending, jobSetupSteps } = useOnboarding();
  const initialCompany = recruiter?.name ?? '';
  const initialTitle = recruiter?.name ? `${initialCompany}'s first job` : '';
  const [fields, setFields] = useState<Form>({
    job_title: {
      value: null!,
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
      required: false,
      error: { value: false, helper: `Job type can't be empty` },
    },
    location_id: {
      value: null,
      required: false,
      error: { value: false, helper: `Job location can't be empty` },
    },
    workplace_type: {
      value: null,
      required: false,
      error: { value: false, helper: `Workplace type can't be empty` },
    },
    description: {
      value: null!,
      required: true,
      error: {
        value: false,
        helper: 'Job description must have more than 100 characters',
      },
    },
    hiring_manager: {
      value: null!,
      required: true,
      error: {
        value: false,
        helper: 'Hiring manager must be selected',
      },
    },
    recruiter: {
      value: null!,
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

  const pendingCompanySettingforJob = jobSetupSteps
    .filter((job) => !job.isCompleted)
    .map((set) => set.title)
    .join(', ');

  return (
    <div className='px-4 flex w-full max-w-3xl flex-col space-y-4'>
      {isJobSetupPending && (
        <Alert variant='warning'>
          <AlertTitle>Company setup is pending </AlertTitle>
          <AlertDescription>
            First complete the onboarding progress then only you can create a
            job. {pendingCompanySettingforJob}
          </AlertDescription>
        </Alert>
      )}
      <JobCreateForm fields={fields} setFields={setFields} />
    </div>
  );
};

const validateForms = (fields: Form) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    //@ts-ignore
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

type Payload = RouterInputs['jobs']['create']['aglint'];

const JobCreateForm = ({
  fields,
  setFields,
}: {
  fields: Form;
  setFields: Dispatch<SetStateAction<Form>>;
}) => {
  const [modal, setModal] = useState(false);
  const { mutateAsync } = useCreateAglintJobs();
  const { push } = useRouterPro();

  const handleCreate = async () => {
    const newFields = validateForms(fields);
    if (enableCreation(newFields)) {
      setModal(true);
      const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
        //@ts-ignore
        acc[key] = value;
        return acc;
      }, {} as Payload);

      try {
        const id = await mutateAsync({
          ...newJob,
        });

        setModal(false);
        push(ROUTES['/jobs/[job]']({ job: id! }));
      } catch {
        //
      }
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
            ...prev[name]!.error,
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
            <Loader />
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
      <div className='max-w-3xl'>{job_title}</div>
      <div className='grid grid-cols-2 gap-4 max-w-3xl'>
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
      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>Job Details</SectionTitle>
            <SectionDescription>
              Add job details to help candidates understand the role and apply.
            </SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
        {forms}
        <div className='mt-4'>{description}</div>
        {fields.description!.error.value && (
          <div className='mt-2 flex items-center text-sm text-destructive'>
            <AlertCircle className='mr-2 h-4 w-4' />
            <span>{fields.description!.error.helper}</span>
          </div>
        )}
      </Section>
      <Section>
        <SectionHeader>
          <SectionHeaderText>
            <SectionTitle>Hiring Team</SectionTitle>
            <SectionDescription>
              Add the hiring team so they can manage the job.
            </SectionDescription>
          </SectionHeaderText>
        </SectionHeader>
        {roleForms}
      </Section>
      <div className='flex justify-end space-x-4'>
        <UIButton variant='outline' onClick={handleCancel}>
          Cancel
        </UIButton>
        <UIButton onClick={handleCreate}>Create Job</UIButton>
      </div>
    </div>
  );
};
