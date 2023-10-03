import { cloneDeep, debounce, get, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { useJobs } from '@/src/context/JobsContext';
import { JobTypeDB, RecruiterDB, StatusJobs } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { dbToClientjobPostForm, getSeedJobFormData } from './seedFormData';

type Question = {
  id: string;
  question: string;
};
export type InterviewParam =
  | 'skill'
  | 'cultural'
  | 'personality'
  | 'softSkills';
export type InterviewConfigType = {
  id: string;
  copy: string;
  value: boolean;
  questions: Question[];
};

type dropDownOption = {
  name: string;
  value: string;
};

type AutoCompleteType = {
  label: string;
  value: string;
};

type JobStatus = {
  sourcing: {
    isActive: boolean;
    startTime: null | string;
  };
  interviewing: {
    isActive: boolean;
    startTime: null | string;
  };
  closed: {
    isActive: boolean;
    startTime: null | string;
  };
};

type EmailTemplate = Record<
  string,
  {
    body: string;
    subject: string;
  }
>;
export type FormJobType = {
  jobTitle: string;
  company: string;
  logo: string;
  workPlaceType: string;
  jobLocation: string;
  jobType: string;
  jobDescription: string;
  skills: string[];
  status: JobStatus;
  interviewType: 'ai-powered' | 'questions-preset';
  interviewConfig: Record<InterviewParam, InterviewConfigType>;
  screeningConfig: {
    screening: {
      minApplicants: boolean;
      minScore: boolean;
      minNoApplicants: number;
      minNoResumeScore: number;
    };
    useAglintMatchingAlgo: boolean;
    shortlist: {
      algoScore: boolean;
      interviewScore: boolean;
      minAlgoScore: number;
      minInterviewScore: number;
    };
    feedbackVisible: boolean;
    screeningEmail: {
      isImmediate: boolean;
      date: null | string;
      emailTemplates: EmailTemplate;
    };
  };
  defaultWorkPlaceTypes: dropDownOption[];
  defaultJobType: dropDownOption[];
  defaultAddress: AutoCompleteType[];
  recruiterId: string;
};

export type JobFormState = {
  jobPostId: string | undefined;
  updatedAt: string | null;
  createdAt: string | null;
  formType: 'edit' | 'new';
  formFields: FormJobType | null;
  slideNo: number;
};

const initialState: JobFormState = {
  formFields: null,
  formType: 'new',
  jobPostId: null,
  updatedAt: null,
  createdAt: null,
  slideNo: 0,
};

// Define action types
type JobsAction =
  | {
      type: 'initForm';
      payload: {
        seedData: JobFormState;
      };
    }
  | {
      type: 'editJobField';
      payload: {
        path: string;
        value: any;
      };
    }
  | {
      type: 'closeForm';
    }
  | {
      type: 'moveToSlide';
      payload: {
        slideNo: number;
      };
    }
  | {
      type: 'setPostMeta';
      payload: {
        updatedAt: string;
        createdAt: string;
      };
    }
  | null;

const jobsReducer = (state: JobFormState, action: JobsAction): JobFormState => {
  switch (action.type) {
    case 'editJobField': {
      const newState: JobFormState = cloneDeep(state);
      const { path, value } = action.payload;
      set(newState.formFields, path, value);
      set(newState, 'updatedAt', new Date().toISOString());
      return newState;
    }
    case 'initForm': {
      const { seedData } = action.payload;
      seedData.slideNo = 1;
      return cloneDeep(seedData);
    }
    case 'closeForm': {
      const newState: JobFormState = {
        ...initialState,
      };
      return newState;
    }
    case 'setPostMeta': {
      const { createdAt, updatedAt } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'createdAt', createdAt);
      set(newState, 'updatedAt', updatedAt);
      return newState;
    }
    case 'moveToSlide': {
      const { slideNo } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'slideNo', slideNo);
      return newState;
    }
    default:
      return state;
  }
};

export type JobsContextType = {
  jobForm: JobFormState;
  dispatch: React.Dispatch<JobsAction>;
  handleUpdateFormFields: ({
    // eslint-disable-next-line no-unused-vars
    path,
    // eslint-disable-next-line no-unused-vars
    value,
  }: {
    path: string;
    value: any;
    saveField?: 'job-details' | 'screening';
  }) => Promise<void>;
  handleInitializeForm: ({
    // eslint-disable-next-line no-unused-vars
    type = 'new',
  }: {
    type: JobFormState['formType'];
    recruiter?: RecruiterDB | null;
    job?: JobTypeDB;
  }) => void;
};

const initialContextValue: JobsContextType = {
  jobForm: initialState,
  dispatch: () => {},
  handleUpdateFormFields: null,
  handleInitializeForm: () => {},
};

const JobsCtx = createContext<JobsContextType>(initialContextValue);

export const useJobForm = () => {
  return useContext(JobsCtx);
};

const SYNC_TIME = 1000;

type JobPostFormProviderParams = {
  children: React.ReactNode;
};

const JobPostFormProvider = ({ children }: JobPostFormProviderParams) => {
  const [state, dispatch] = useReducer(jobsReducer, initialState);
  const { handleUIJobUpdate } = useJobs();
  const updateFormTodb = async (currState: JobFormState, saveField) => {
    if (currState.formType === 'edit') {
      const updatedJob = await saveJobPostToDb(currState, saveField);
      handleUIJobUpdate({
        ...updatedJob,
        active_status: updatedJob.active_status as unknown as StatusJobs,
      });
    } else if (currState.formType === 'new') {
      //job data gets inserted for the first time
      if (
        get(currState, 'createdAt', undefined) === undefined &&
        currState.slideNo > 1
      ) {
        const newJob = await saveJobPostToDb(currState, saveField);
        dispatch({
          type: 'setPostMeta',
          payload: {
            createdAt: newJob.created_at,
            updatedAt: newJob.updated_at,
          },
        });
        handleUIJobUpdate({
          ...newJob,
          active_status: newJob.active_status as unknown as StatusJobs,
        });
      }
      //update job data gets updated in first slide
      if (
        currState.slideNo === 1 &&
        get(currState, 'createdAt', undefined) !== undefined
      ) {
        const newJob = await saveJobPostToDb(currState, saveField);
        handleUIJobUpdate({
          ...newJob,
          active_status: newJob.active_status as unknown as StatusJobs,
        });
      }
      //update job data gets updated in any a slides
      if (currState.slideNo > 1 && get(currState, 'createdAt')) {
        await saveJobPostToDb(currState, saveField);
      }
    }
  };

  const formSyncTODB = React.useRef(
    debounce(updateFormTodb, SYNC_TIME),
  ).current;

  const handleUpdateFormFields = async ({
    path,
    value,
    saveField = 'job-details',
  }: {
    path: string;
    value: any;
    saveField?: 'job-details' | 'screening';
  }) => {
    try {
      dispatch({
        type: 'editJobField',
        payload: {
          path,
          value,
        },
      });
      const updatedState = cloneDeep(state);
      set(updatedState.formFields, path, value);
      formSyncTODB(updatedState, saveField);
    } catch {
      //
    }
  };

  const handleInitializeForm: JobsContextType['handleInitializeForm'] = ({
    type = 'new',
    recruiter,
    job,
  }) => {
    try {
      const seedFormData = getSeedJobFormData(recruiter);
      seedFormData.formType = type;
      if (type === 'new') {
        dispatch({
          type: 'initForm',
          payload: { seedData: seedFormData },
        });
      } else {
        dispatch({
          type: 'initForm',
          payload: { seedData: dbToClientjobPostForm(job, recruiter) },
        });
      }
    } catch (err) {
      toast.error('Failed to perform the action. Please try again');
    }
  };

  return (
    <JobsCtx.Provider
      value={{
        jobForm: state,
        dispatch,
        handleUpdateFormFields,
        handleInitializeForm,
      }}
    >
      {children}
    </JobsCtx.Provider>
  );
};

export default JobPostFormProvider;

async function saveJobPostToDb(
  jobForm: JobFormState,
  saveField: 'job-details' | 'screening',
) {
  if (saveField === 'job-details') {
    const { data, error } = await supabase
      .from('public_jobs')
      .upsert({
        id: jobForm.jobPostId,
        logo: jobForm.formFields.logo,
        company: jobForm.formFields.company,
        description: jobForm.formFields.jobDescription,
        job_title: jobForm.formFields.jobTitle,
        job_type: jobForm.formFields.jobType,
        workplace_type: jobForm.formFields.workPlaceType,
        active_status: jobForm.formFields.status,
        skills: jobForm.formFields.skills,
        slug: jobForm.createdAt
          ? undefined
          : getjobPostSlug(
              jobForm.jobPostId,
              jobForm.formFields.jobTitle,
              jobForm.formFields.company,
              jobForm.formFields.jobLocation,
            ),
        recruiter_id: jobForm.formFields.recruiterId,
        location: jobForm.formFields.jobLocation,
        email_template:
          jobForm.formFields.screeningConfig.screeningEmail.emailTemplates,
      })
      .select();
    if (error) throw new Error(error.message);
    return data[0] as JobTypeDB;
  } else {
    const { data, error } = await supabase
      .from('public_jobs')
      .update({
        screening_setting: {
          interviewType: jobForm.formFields.interviewType,
          ...jobForm.formFields.screeningConfig,
        },
        screening_questions: [jobForm.formFields.interviewConfig],
      })
      .eq('id', jobForm.jobPostId)
      .select();
    if (error) throw new Error(error.message);
    return data[0] as JobTypeDB;
  }
}

const getjobPostSlug = (
  jobId: string,
  jobTitle: string,
  company: string,
  location: string,
) => {
  if (!jobId || !jobTitle || !company || !location) return '';

  const convertedJobTitle = jobTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '')
    .replace(/\//g, '-')
    .replace(/[()]/g, '');
  const convertedCompany = company
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  const convertedJobLocation = location
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  let slug = `${convertedJobTitle}-at-${convertedCompany}-${convertedJobLocation}-${jobId}`;
  return slug;
};
