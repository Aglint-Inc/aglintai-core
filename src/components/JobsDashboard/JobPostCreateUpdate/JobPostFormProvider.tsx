import { cloneDeep, debounce, get, isNull, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { useJobs } from '@/src/context/JobsContext';
import {
  JobTypeDB,
  PublicJobsType,
  RecruiterDB,
  StatusJobs,
} from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import { FormErrorParams } from './JobForm/JobForm';
import { dbToClientjobPostForm, getSeedJobFormData } from './seedFormData';
import { findDisclaimers, saveJobPostToDb } from './utils';
import { ScoreWheelParams } from '../../Common/ScoreWheel';

export type QuestionType = {
  id: string;
  question: string;
  videoId: string;
  videoQn: string;
  videoUrl: string;
};

export type InterviewParam =
  | 'skill'
  | 'behavior'
  | 'communication'
  | 'performance'
  | 'education'
  | 'general';
export type InterviewConfigType = {
  category: InterviewParam;
  id: string;
  copy: string;
  questions: QuestionType[];
};

type dropDownOption = {
  name: string;
  value: string;
};

type AutoCompleteType = {
  label: string;
  value: string;
};

export type EmailDetails = {
  fromName: string;
  body: string;
  subject: string;
};

export type jsonItemType = {
  field: string;
  isMustHave: boolean;
};

export type JdJsonType = {
  rolesResponsibilities: jsonItemType[];
  skills: jsonItemType[];
  educations: jsonItemType[]; // Adjust this line based on the structure of the "education" property
};

type EmailTemplate = Record<string, EmailDetails>;
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
  interviewConfig: InterviewConfigType[];
  videoAssessment: boolean;
  screeningEmail: {
    isImmediate: boolean;
    date: null | string;
    emailTemplates: EmailTemplate;
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
  jdJson: JdJsonType;
  resumeScoreSettings: ScoreWheelParams;
  defaultWorkPlaceTypes: dropDownOption[];
  defaultDepartments: AutoCompleteType[];
  defaultJobType: dropDownOption[];
  defaultAddress: AutoCompleteType[];
  recruiterId: string;
  introVideo: QuestionType;
  startVideo: QuestionType;
  endVideo: QuestionType;
  interviewSetting: {
    showInstructionVideo: boolean;
    isVideoAiGenerated: boolean;
    uploadedVideoInfo: QuestionType;
    aiGeneratedVideoInfo: QuestionType;
    assessmentValidity: {
      expirationDuration: number;
      candidateRetry: number;
    };
  };
  isDraftCleared: boolean;
  interviewInstrctions: string;
  assessment: boolean;
};

export type JobFormState = {
  isFormOpen: boolean;
  jobPostId: string | undefined;
  updatedAt: string | null;
  createdAt: string | null;
  formType: 'edit' | 'new';
  formFields: FormJobType | null;
  currSlide:
    | 'details'
    | 'templates'
    | 'screening'
    | 'workflow'
    | 'resumeScore'
    | 'applyForm';
  syncStatus: 'saving' | 'saved' | '';
  jobPostStatus: 'published' | 'draft' | 'closed';
  isJobPostReverting: boolean;
};

const initialState: JobFormState = {
  formFields: null,
  formType: 'new',
  jobPostId: null,
  updatedAt: null,
  createdAt: null,
  isFormOpen: false,
  syncStatus: '',
  currSlide: 'details',
  isJobPostReverting: false,
  jobPostStatus: 'draft',
};

// Define action types
type JobsAction =
  | {
      type: 'initForm';
      payload: {
        seedData: JobFormState;
        currSlide: JobFormState['currSlide'];
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
        nextSlide: JobFormState['currSlide'];
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
  | {
      type: 'updateRevertStatus';
      payload: {
        status: boolean;
      };
    }
  | {
      type: 'updateJobPublishstatus';
      payload: {
        status: JobFormState['jobPostStatus'];
      };
    }
  | null;

const jobsReducer = (state: JobFormState, action: JobsAction): JobFormState => {
  switch (action.type) {
    case 'editJobField': {
      const newState: JobFormState = cloneDeep(state);
      const { path, value } = action.payload;
      set(newState.formFields, path, value);
      set(newState, 'formFields.isDraftCleared', false);
      set(newState, 'updatedAt', new Date().toISOString());
      return newState;
    }
    case 'initForm': {
      const { seedData, currSlide } = action.payload;
      seedData.currSlide = currSlide ?? 'details';
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
      const { nextSlide } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'currSlide', nextSlide);
      return newState;
    }
    case 'setDbSyncStatus': {
      const { status } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'syncStatus', status);
      return newState;
    }
    case 'updateRevertStatus': {
      const { status } = action.payload;
      const newState = cloneDeep(state);
      set(newState, 'isJobPostReverting', status);
      return newState;
    }
    case 'updateJobPublishstatus': {
      const { status } = action.payload;
      const newState = cloneDeep(state);

      set(newState, 'jobPostStatus', status);
      if (status === 'published') {
        set(newState.formFields, 'isDraftCleared', true);
      }
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
    type,
  }: {
    type: JobFormState['formType'];
    recruiter?: RecruiterDB | null;
    job?: JobTypeDB;
    currSlide?: JobFormState['currSlide'];
  }) => void;
  handleFormClose?: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  handleUpdateRevertStatus: (status: boolean) => void;
  formWarnings: FormErrorParams;
};

const initialContextValue: JobsContextType = {
  jobForm: initialState,
  dispatch: () => {},
  handleUpdateFormFields: null,
  handleInitializeForm: () => {},
  // eslint-disable-next-line no-unused-vars
  handleUpdateRevertStatus: (s) => {},
  formWarnings: {
    details: {
      err: [],
      title: '',
    },
    screening: {
      err: [],
      title: '',
    },
    templates: {
      err: [],
      title: '',
    },
    workflow: {
      err: [],
      title: '',
    },
    resumeScore: {
      err: [],
      title: '',
    },
  },
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
  const { handleUIJobReplace, jobsData } = useJobs();
  const updateFormTodb = async (currState: JobFormState) => {
    try {
      dispatch({
        type: 'setDbSyncStatus',
        payload: {
          status: 'saving',
        },
      });

      const updatedJobDb = await saveJobPostToDb(currState);

      //randomly .jobs was not initilised temp soln
      if (jobsData.jobs) {
        const uiJob = jobsData.jobs.find((j) => j.id === updatedJobDb.id);
        handleUIJobReplace({
          ...updatedJobDb,
          active_status: updatedJobDb.active_status as unknown as StatusJobs,
          count: uiJob
            ? uiJob.count
            : {
                new: 0,
                interviewing: 0,
                qualified: 0,
                disqualified: 0,
              },
        });
      }

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
    } catch (err) {
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
    currSlide,
  }) => {
    try {
      const seedFormData = getSeedJobFormData(recruiter);
      seedFormData.formType = type;
      if (type === 'new') {
        dispatch({
          type: 'initForm',
          payload: { seedData: seedFormData, currSlide },
        });
      } else {
        dispatch({
          type: 'initForm',
          payload: {
            seedData: dbToClientjobPostForm(
              isNull(job.draft) ? job : (job.draft as PublicJobsType),
              recruiter,
              job.status,
            ),
            currSlide,
          },
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

  const handleUpdateRevertStatus = async (status: boolean) => {
    dispatch({
      type: 'updateRevertStatus',
      payload: {
        status,
      },
    });
  };
  const warning = state.formFields && findDisclaimers(state.formFields);

  return (
    <JobsCtx.Provider
      value={{
        jobForm: state,
        dispatch,
        handleUpdateFormFields,
        handleInitializeForm,
        handleFormClose,
        handleUpdateRevertStatus,
        formWarnings: warning,
      }}
    >
      {children}
    </JobsCtx.Provider>
  );
};

export default JobPostFormProvider;
