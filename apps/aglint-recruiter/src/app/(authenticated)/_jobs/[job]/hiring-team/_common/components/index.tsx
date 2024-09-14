/* eslint-disable security/detect-object-injection */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { CheckIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import Loader from '@/components/Common/Loader';
import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import {
  type JobMetaFormProps,
  useJobForms,
} from '@/jobs/create/components/form';
import type { JobHiringTeamForm } from '@/jobs/types';
import { type Job } from '@/queries/jobs/types';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';
import { validateString } from '@/utils/validateString';

export const JobHiringTeamDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job.status !== 'closed' ? (
      <JobEdit />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='flex justify-center items-center w-full h-screen'>
      <Loader />
    </div>
  );
};

const JobEdit = () => {
  const { job } = useJob();
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
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto p-6'>
        <div className='flex justify-between items-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>Job Settings</h1>
            <BreadCrumbs job={job} />
          </div>
          <Settings />
        </div>

        <div className='flex gap-6 mb-6'>
          <div className='w-1/4'>
            <JobsSideNavV2 />
          </div>
          <div className='w-3/4'>
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
            <h2 className='text-xl font-bold mb-2'>Hiring Team</h2>
            <p className='text-sm text-gray-600 mb-4'>
              Update the hiring team details here. Changes will be saved
              automatically.
            </p>
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
          <BreadcrumbPage>Hiring Team</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
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

type Payload = Parameters<ReturnType<typeof useJob>['handleJobAsyncUpdate']>[0];

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
  const { handleJobAsyncUpdate } = useJob();

  const newJob = Object.entries(fields).reduce((acc, [key, { value }]) => {
    acc[key] = value;
    return acc;
  }, {} as Payload);

  const handleSave = async () => {
    setSaving(true);
    await handleJobAsyncUpdate(newJob);
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
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <p className='text-sm text-gray-600 mb-4'>
        Update the hiring team details here. Changes will be saved
        automatically.
      </p>
      <div className='grid grid-cols-2 gap-4'>{forms}</div>
    </div>
  );
};
