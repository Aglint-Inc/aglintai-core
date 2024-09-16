/* eslint-disable security/detect-object-injection */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Skeleton } from '@components/ui/skeleton';
import { AlertTriangle, CheckIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
// import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { validateDescription } from '@/job/utils';
import {
  type JobMetaFormProps,
  useJobForms,
} from '@/jobs/create/components/form';
import type { Form, JobDetailsForm } from '@/jobs/types';
import { type Job } from '@/queries/jobs/types';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';
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
    <div className='min-h-screen'>
      <div className='container mx-auto p-6 flex flex-col space-y-6'>
        <div className='flex justify-between items-center mb-6'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-4 w-32' />
          </div>
          <div className='flex space-x-4'>
            <Skeleton className='h-10 w-10' />
            <Skeleton className='h-10 w-10' />
            <Skeleton className='h-10 w-10' />
          </div>
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
  //TODO: HACK FOR BACKWARDS COMPATABILITY, DELETE THIS LATER
  const {
    job_title,
    department_id,
    description,
    job_type,
    location_id,
    workplace_type,
  } = {
    job_title: job.job_title,
    department_id: job.department_id,
    description: job.description,
    job_type: job.job_type,
    location_id: job.location_id,
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
    department_id: {
      value: department_id,
      required: false,
      error: {
        value: validateString(department_id),
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
    location_id: {
      value: location_id,
      required: false,
      error: {
        value: validateString(location_id),
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
    <div className='min-h-screen'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-2xl font-bold mb-2'>Job Settings</h1>
            <BreadCrumbs job={job} />
          </div>
          {/* <Settings /> */}
        </div>

        <div className='flex gap-6 mb-6'>
          <div className='w-1/4'>
            <JobsSideNavV2 />
          </div>
          <div className='w-3/4'>
            <div className='flex flex-row justify-between'>
              <div>
                <h2 className='text-xl font-bold mb-2'>Job Details</h2>
                <p className='text-sm text-gray-600 mb-4'>
                  Update the job details here; changes will be saved
                  automatically. Publish to make the updates live.
                </p>
              </div>
              <div
                className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className='flex items-center space-x-2 text-sm text-gray-600'>
                  {saving ? (
                    <>
                      <div className='w-4 h-4 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin'></div>
                      <span>Saving changes...</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className='w-4 h-4 text-green-500' />
                      <span>Changes saved</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <JobEditForm
              fields={fields}
              setFields={setFields}
              setSaving={setSaving}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BreadCrumbs = ({ job }: { job: Job }) => {
  const { push } = useRouter();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href='#'
            onClick={() => push(ROUTES['/jobs/[job]']({ job: job?.id }))}
          >
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Job Details</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const validateForms = (fields: JobDetailsForm) => {
  return Object.entries(fields).reduce((acc, [key, value]) => {
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
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobAsyncUpdate({ draft: { ...job.draft, ...newJob } });
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
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <p className='text-sm text-gray-600 mb-4'>
        Update the job details here; changes will be saved automatically.
        Publish to make the updates live.
      </p>
      <div className='grid grid-cols-2 gap-4 mb-6'>{forms}</div>
      <div
        className={`border rounded-md p-4 ${fields.description.error.value ? 'border-red-500' : 'border-gray-300'}`}
      >
        {description}
      </div>
      {fields.description.error.value && (
        <div className='flex items-center text-red-600 mt-2'>
          <AlertTriangle className='w-4 h-4 mr-2' />
          <span>{fields.description.error.helper}</span>
        </div>
      )}
    </div>
  );
};
