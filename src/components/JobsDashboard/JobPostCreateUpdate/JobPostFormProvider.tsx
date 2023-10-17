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
  | 'behavior'
  | 'communication'
  | 'performance'
  | 'education'
  | 'general';
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

type EmailTemplate = Record<
  string,
  {
    fromName: string;
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
  department: string;
  skills: string[];
  interviewType: 'ai-powered' | 'questions-preset';
  interviewConfig: Record<InterviewParam, InterviewConfigType>;
  screeningConfig: {
    screening: {
      isSendInterviewToAll: boolean;
      minNoResumeScore: number;
    };
    useAglintMatchingAlgo: boolean;
    shortlist: {
      interviewScore: boolean;
      minInterviewScore: number;
    };
    feedbackVisible: boolean;
    screeningEmail: {
      isImmediate: boolean;
      date: null | string;
      emailTemplates: EmailTemplate;
    };
  };
  newScreeningConfig: {
    screening: {
      qualificationRange: { min: number; max: number } | null;
      isManual: boolean;
    };
    interview: {
      qualificationRange: { min: number; max: number } | null;
      isManual: boolean;
    };
    interviewMail: {
      timestamp: string | null;
      isManual: boolean;
    };
    disqualifiedMail: {
      timestamp: string | null;
      isManual: boolean;
    };
    feedbackVisible: boolean;
  };
  defaultWorkPlaceTypes: dropDownOption[];
  defaultDepartments: AutoCompleteType[];
  defaultJobType: dropDownOption[];
  defaultAddress: AutoCompleteType[];
  recruiterId: string;
};

export type JobFormState = {
  isFormOpen: boolean;
  jobPostId: string | undefined;
  updatedAt: string | null;
  createdAt: string | null;
  formType: 'edit' | 'new';
  formFields: FormJobType | null;
  slideNo: number;
  syncStatus: 'saving' | 'saved' | '';
};

const initialState: JobFormState = {
  formFields: null,
  formType: 'new',
  jobPostId: null,
  updatedAt: null,
  createdAt: null,
  slideNo: 0,
  isFormOpen: false,
  syncStatus: '',
};

// Define action types
type JobsAction =
  | {
      type: 'initForm';
      payload: {
        seedData: JobFormState;
        slideNo: number;
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
  | {
      type: 'setDbSyncStatus';
      payload: {
        status: JobFormState['syncStatus'];
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
      const { seedData, slideNo } = action.payload;
      seedData.slideNo = slideNo ?? 0;
      seedData.isFormOpen = true;
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
    case 'setDbSyncStatus': {
      const { status } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'syncStatus', status);
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
  }) => Promise<void>;
  handleInitializeForm: ({
    // eslint-disable-next-line no-unused-vars
    type = 'new',
  }: {
    type: JobFormState['formType'];
    recruiter?: RecruiterDB | null;
    job?: JobTypeDB;
    slideNo?: number;
  }) => void;
  handleFormClose?: () => Promise<void>;
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
  const updateFormTodb = async (currState: JobFormState) => {
    try {
      dispatch({
        type: 'setDbSyncStatus',
        payload: {
          status: 'saving',
        },
      });
      const updatedJobDb = await saveJobPostToDb(currState);
      handleUIJobUpdate({
        ...updatedJobDb,
        active_status: updatedJobDb.active_status as unknown as StatusJobs,
      });

      if (get(currState, 'createdAt', undefined) === undefined) {
        dispatch({
          type: 'setPostMeta',
          payload: {
            createdAt: updatedJobDb.created_at,
            updatedAt: updatedJobDb.updated_at,
          },
        });
      }
      dispatch({
        type: 'setDbSyncStatus',
        payload: {
          status: 'saved',
        },
      });
    } catch {
      toast.error('Something went Wrong. Please Check Your Network');
    }
  };

  const formSyncTODB = React.useRef(
    debounce(updateFormTodb, SYNC_TIME),
  ).current;

  const handleUpdateFormFields = async ({
    path,
    value,
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
      formSyncTODB(updatedState);
    } catch {
      //
    }
  };

  const handleInitializeForm: JobsContextType['handleInitializeForm'] = ({
    type = 'new',
    recruiter,
    job,
    slideNo,
  }) => {
    try {
      const seedFormData = getSeedJobFormData(recruiter);
      seedFormData.formType = type;
      if (type === 'new') {
        dispatch({
          type: 'initForm',
          payload: { seedData: seedFormData, slideNo },
        });
      } else {
        dispatch({
          type: 'initForm',
          payload: { seedData: dbToClientjobPostForm(job, recruiter), slideNo },
        });
      }
    } catch (err) {
      toast.error('Failed to perform the action. Please try again');
    }
  };

  const handleFormClose = async () => {
    dispatch({
      type: 'closeForm',
    });
  };

  return (
    <JobsCtx.Provider
      value={{
        jobForm: state,
        dispatch,
        handleUpdateFormFields,
        handleInitializeForm,
        handleFormClose,
      }}
    >
      {children}
    </JobsCtx.Provider>
  );
};

export default JobPostFormProvider;

async function saveJobPostToDb(jobForm: JobFormState) {
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
      skills: jobForm.formFields.skills,
      department: jobForm.formFields.department,
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
      screening_setting: {
        interviewType: jobForm.formFields.interviewType,
        ...jobForm.formFields.screeningConfig,
      },
      screening_questions: [jobForm.formFields.interviewConfig],
      new_screening_setting: {
        ...jobForm.formFields.newScreeningConfig,
      },
    })
    .select();
  if (error) throw new Error(error.message);
  return data[0] as JobTypeDB;
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
