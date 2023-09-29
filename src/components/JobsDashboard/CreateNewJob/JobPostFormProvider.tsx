import { cloneDeep, debounce, get, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { useJobs } from '@/src/context/JobsContext';
import { RecruiterDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { getSeedJobFormData } from './seedFormData';
import { JobType, Status } from '../types';

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

export type FormJobType = {
  jobTitle: string;
  company: string;
  logo: string;
  workPlaceType: string;
  jobLocation: string;
  jobType: string;
  applicantsCount: number;
  interviewingCount: number;
  shortListedCount: number;
  jobDescription: string;
  skills: string[];
  status: Status;
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
  };
  defaultWorkPlaceTypes: dropDownOption[];
  defaultJobType: dropDownOption[];
  recruiterId: string;
};

export type JobFormState = {
  jobPostId: string | undefined;
  updatedAt: string | null;
  createAt: string | null;
  formType: 'edit' | 'new';
  formFields: FormJobType | null;
  slideNo: number;
};

const initialState: JobFormState = {
  formFields: null,
  formType: 'new',
  jobPostId: null,
  updatedAt: null,
  createAt: null,
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
        jobPostId: string;
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
      const { createdAt, jobPostId, updatedAt } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'createAt', createdAt);
      set(newState, 'jobPostId', jobPostId);
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
  const { handleJobUpdate, jobsData } = useJobs();
  const updateFormTodb = async (currState, saveField) => {
    // if job is already there update in db sync
    if (get(currState, 'jobPostId', false)) {
      await saveJobPostToDb(currState, saveField);
    } else if (currState.slideNo > 1) {
      //fresh job being created
      const d = await saveJobPostToDb(currState, saveField);
      dispatch({
        type: 'setPostMeta',
        payload: {
          createdAt: d.created_at,
          updatedAt: '',
          jobPostId: d.id,
        },
      });
      const updatedJobs = get(jobsData, 'jobs', []).filter(
        (j) => j.id !== d.id,
      );
      handleJobUpdate([d, ...updatedJobs]);
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
    } catch (err) {
      //
    }
  };

  const handleInitializeForm: JobsContextType['handleInitializeForm'] = ({
    type = 'new',
    recruiter,
  }) => {
    try {
      const seedFormData = getSeedJobFormData(recruiter);
      seedFormData.formType = type;
      dispatch({
        type: 'initForm',
        payload: { seedData: seedFormData },
      });
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
        status: jobForm.formFields.status,
        skills: jobForm.formFields.skills,
        slug: getjobPostSlug(
          jobForm.jobPostId,
          jobForm.formFields.jobTitle,
          jobForm.formFields.company,
          jobForm.formFields.jobLocation,
        ),
        recruiter_id: jobForm.formFields.recruiterId,
        location: jobForm.formFields.jobLocation,
      })
      .select();
    if (error) throw new Error(error.message);
    return data[0] as JobType;
  } else {
    const { error } = await supabase
      .from('public_jobs')
      .update({
        screening_setting: {
          interviewType: jobForm.formFields.interviewType,
          ...jobForm.formFields.screeningConfig,
        },
        screening_questions: [jobForm.formFields.interviewConfig],
      })
      .eq('id', jobForm.jobPostId);
    if (error) throw new Error(error.message);
  }
}

const getjobPostSlug = (
  jobId: string,
  jobTitle: string,
  company: string,
  location: string,
) => {
  if (!jobId || !jobTitle || !company || location) return '';

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
