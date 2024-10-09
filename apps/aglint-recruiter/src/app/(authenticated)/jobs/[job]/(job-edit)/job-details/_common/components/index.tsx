/* eslint-disable security/detect-object-injection */
import AutoSave from '@components/auto-save';
import {
  Page,
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { Skeleton } from '@components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { JobNotFound } from '@/job/components/JobNotFound';
// import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { validateDescription } from '@/job/utils';
import {
  type JobMetaFormProps,
  useJobForms,
} from '@/jobs/create/components/form';
import type { Form, Job, JobDetailsForm } from '@/jobs/types';
import { validateString } from '@/utils/validateString';

export const JobDetailsDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <JobEdit />
    ) : (
      <JobNotFound />
    )
  ) : (
    // TODO: When we move to app router, we should move to separate skeleton component
    <div className='container mx-auto flex flex-col space-y-6 p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-64' />
          <Skeleton className='h-4 w-32' />
        </div>
        <div className='flex gap-6'>
          <div className='w-1/4'>
            <Skeleton className='h-[calc(100vh-200px)] w-full' />
          </div>
          <div className='w-3/4 space-y-4'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-full' />
            <div className='space-y-4'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-40 w-full' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobEdit = () => {
  const { job } = useJob();
  const {
    job_title,
    department_id,
    description,
    job_type,
    location_id,
    workplace_type,
  } = job.draft;
  const [fields, setFields] = useState<JobDetailsForm>({
    job_title: {
      value: job_title,
      required: true,
      error: {
        value: validateString(job_title),
        helper: `Job title can't be empty`,
      },
    },
    department_id: {
      value: department_id!,
      required: false,
      error: {
        value: validateString(department_id!),
        helper: `Department name can't be empty`,
      },
    },
    job_type: {
      value: job_type,
      required: true,
      error: {
        value: validateString(job_type!),
        helper: `Job type can't be empty`,
      },
    },
    location_id: {
      value: location_id!,
      required: false,
      error: {
        value: validateString(location_id!),
        helper: `Job location can't be empty`,
      },
    },
    workplace_type: {
      value: workplace_type,
      required: true,
      error: {
        value: validateString(workplace_type!),
        helper: `Workplace type can't be empty`,
      },
    },
    description: {
      value: description,
      required: true,
      error: {
        value: validateDescription(description!),
        helper: 'Job description must have more than 100 characters',
      },
    },
  });

  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (saving) setShow(true);
    const timeout = setTimeout(() => (!saving ? setShow(false) : null), 1000);
    return () => clearTimeout(timeout);
  }, [saving]);

  return (
    <Page>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Edit job details</PageTitle>
          <PageDescription>
            Update the job details here; changes will be saved automatically.
          </PageDescription>
        </PageHeaderText>
        <PageActions>
          <AutoSave show={show} saving={saving} />
          {/* <AutoSave onSave={handleSave} saveInterval={5000} /> */}
        </PageActions>
      </PageHeader>
      <JobEditForm
        fields={fields}
        setFields={setFields}
        setSaving={setSaving}
      />
    </Page>
  );
};

const validateForms = (fields: JobDetailsForm) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
    //@ts-ignore
    acc[key] = {
      value: value.value,
      required: value.required,
      error: {
        value:
          typeof value?.value === 'number'
            ? false
            : value?.value
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

type Payload = Parameters<ReturnType<typeof useJob>['handleJobAsyncUpdate']>[0];

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
    //@ts-ignore
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobAsyncUpdate({
      draft: { ...job.draft, ...newJob } as Job['draft'],
    });
    setSaving(false);
  };

  const handleChange = (name: keyof Form, value: string | number) => {
    const newFields = validateForms({
      ...fields,
      [name]: { ...fields[name as keyof typeof fields], value },
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
    department_id,
    description,
    job_title,
    job_type,
    location_id,
    workplace_type,
  } = useJobForms(fields, handleChange);

  const forms = (
    <>
      {job_title}
      {job_type}
      {workplace_type}
      {department_id}
      {location_id}
    </>
  );

  return (
    <div>
      <div className='mb-6 grid grid-cols-2 gap-4'>{forms}</div>
      <div
        className={`rounded-md ${fields.description!.error.value ? 'outline-destructive' : ''}`}
      >
        {description}
      </div>
      {fields.description!.error.value && (
        <div className='mt-2 flex items-center text-sm text-destructive'>
          <AlertCircle className='mr-2 h-4 w-4' />
          <span>{fields.description!.error.helper}</span>
        </div>
      )}
    </div>
  );
};
