/* eslint-disable security/detect-object-injection */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { SavedChanges } from '@devlink/SavedChanges';
import { PageLayout } from '@devlink2/PageLayout';
import { JobDetailBlock } from '@devlink3/JobDetailBlock';
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
    <PageLayout
      slotTopbarLeft={<BreadCrumbs job={job} />}
      slotBody={
        <JobEditForm
          fields={fields}
          setFields={setFields}
          setSaving={setSaving}
        />
      }
      slotTopbarRight={<Settings />}
      slotSaving={
        <div
          className={`transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
        >
          <SavedChanges
            isSaving={saving}
            isSaved={!saving}
            slotLoaderIcon={
              <div className='text-neutral-600'>
                <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                  ></path>
                </svg>
              </div>
            }
          />
        </div>
      }
    />
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
