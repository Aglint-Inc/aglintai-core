import { cloneDeep, debounce, get, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabaseClient';

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

export type FormJobType = {
  jobTitle: string;
  company: string;
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
        recruiterId: string;
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
      const newState = getSeedJobFormData();
      newState.slideNo = 1;
      return newState;
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
  }) => Promise<void> | null;
};
const initialContextValue: JobsContextType = {
  jobForm: initialState,
  dispatch: () => {},
  handleUpdateFormFields: null,
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
    const d = await saveJobPostToDb(currState, saveField);
    if (currState.slideNo > 1) {
      if (get(currState, 'jobPostId', false)) return;
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
      // setJobs((p) => {
      //   const updatedJobs = p.filter((j) => j.id !== d.id);
      //   return [d, ...updatedJobs];
      // });
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
      formSyncTODB(state, saveField);
    } catch (err) {
      //
    }
  };

  return (
    <JobsCtx.Provider
      value={{ jobForm: state, dispatch, handleUpdateFormFields }}
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
