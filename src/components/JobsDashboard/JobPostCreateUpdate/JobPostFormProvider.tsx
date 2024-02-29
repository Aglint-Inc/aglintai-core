import { cloneDeep, debounce, get, isNull, set } from 'lodash';
import React, { createContext, useContext, useReducer } from 'react';

import { useJobs } from '@/src/context/JobsContext';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import {
  JobTypeDB,
  PublicJobsType,
  RecruiterDB,
  RecruiterUserType,
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
  id: string;
};

export type JdJsonType = {
  title: string;
  level:
    | 'Fresher-level'
    | 'Associate-level'
    | 'Mid-level'
    | 'Senior-level'
    | 'Executive-level';
  rolesResponsibilities: jsonItemType[];
  skills: jsonItemType[];
  educations: jsonItemType[]; // Adjust this line based on the structure of the "education" property
};
export type PhoneScreenQuestion = {
  id: string;
  isRequired: boolean;
  question: string;
  description: string;
  showDescription: boolean;
  questionLabel: string;
  type: 'multiSelect' | 'singleSelect' | 'shortAnswer';
  options: {
    option: string;
    id: string;
  }[];
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
  isPhoneScreenEnabled: boolean;
  isjdChanged: boolean;
  phoneScreening: {
    startMessage: string;
    endMessage: string;
    questions: PhoneScreenQuestion[];
  };
};

export type AssesMenusType =
  | 'instructions'
  | 'welcome'
  | 'assesqns'
  | 'epilogue'
  | 'settings';
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
    | 'phoneScreening'
    | 'workflow'
    | 'resumeScore';
  currentAssmSlides: AssesMenusType;
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
  currentAssmSlides: 'instructions',
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
  | {
      type: 'updateAssmTab';
      payload: {
        tab: JobFormState['currentAssmSlides'];
      };
    }
  | {
      type: 'UpdateMultiStates';
      payload: {
        path: string;
        value: any;
      }[];
    };
null;

const jobsReducer = (state: JobFormState, action: JobsAction): JobFormState => {
  const newState = cloneDeep(state);

  switch (action.type) {
    case 'editJobField': {
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
      set(newState, 'createdAt', createdAt);
      set(newState, 'updatedAt', updatedAt);
      return newState;
    }
    case 'moveToSlide': {
      const { nextSlide } = action.payload;
      set(newState, 'currSlide', nextSlide);
      return newState;
    }
    case 'setDbSyncStatus': {
      const { status } = action.payload;
      set(newState, 'syncStatus', status);
      return newState;
    }
    case 'updateRevertStatus': {
      const { status } = action.payload;
      set(newState, 'isJobPostReverting', status);
      return newState;
    }
    case 'updateJobPublishstatus': {
      const { status } = action.payload;
      set(newState, 'jobPostStatus', status);
      if (status === 'published') {
        set(newState.formFields, 'isDraftCleared', true);
      }
      return newState;
    }
    case 'updateAssmTab': {
      const { tab } = action.payload;
      set(newState, 'currentAssmSlides', tab);
      return newState;
    }
    case 'UpdateMultiStates': {
      const updStates = action.payload;
      for (let singState of updStates) {
        set(newState.formFields, singState.path, singState.value);
      }
      set(newState, 'formFields.isDraftCleared', false);
      set(newState, 'updatedAt', new Date().toISOString());
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
    // eslint-disable-next-line no-unused-vars
    multipayload,
  }: {
    path?: string;
    value?: any;
    multipayload?: {
      path: string;
      value: any;
    }[];
  }) => Promise<void>;
  handleInitializeForm: ({
    // eslint-disable-next-line no-unused-vars
    type,
  }: {
    type: JobFormState['formType'];
    recruiter?: RecruiterDB | null;
    recruiterUser?: RecruiterUserType | null;
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
      rightErr: [],
    },
    phoneScreening: {
      err: [],
      title: '',
      rightErr: [],
    },
    screening: {
      err: [],
      title: '',
      rightErr: [],
    },

    templates: {
      err: [],
      title: '',
      rightErr: [],
    },
    workflow: {
      err: [],
      title: '',
      rightErr: [],
    },
    resumeScore: {
      err: [],
      title: '',
      rightErr: [],
    },
    assesqns: {
      err: [],
      title: '',
      rightErr: [],
    },
    epilogue: {
      err: [],
      title: '',
      rightErr: [],
    },
    instructions: {
      err: [],
      title: '',
      rightErr: [],
    },
    settings: {
      err: [],
      title: '',
      rightErr: [],
    },
    welcome: {
      err: [],
      title: '',
      rightErr: [],
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
  const { handleUIJobUpdate, jobsData } = useJobs();
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
        handleUIJobUpdate({
          ...updatedJobDb,
          assessment_job_relation: updatedJobDb.assessment_job_relation,
          jd_json: updatedJobDb.jd_json as JobTypeDashboard['jd_json'],
          active_status:
            updatedJobDb.active_status as JobTypeDashboard['active_status'],
          count: (uiJob
            ? uiJob.count
            : {
                new: 0,
                assessment: 0,
                qualified: 0,
                disqualified: 0,
              }) as JobTypeDashboard['count'],
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
      toast.error('Something went wrong! Please Check Your Network');
    }
  };

  const formSyncTODB = React.useRef(
    debounce(updateFormTodb, SYNC_TIME),
  ).current;

  const handleUpdateFormFields: JobsContextType['handleUpdateFormFields'] =
    async ({ path, value, multipayload }) => {
      try {
        if (multipayload) {
          dispatch({
            type: 'UpdateMultiStates',
            payload: multipayload,
          });

          const updatedState = cloneDeep(state);

          const updStates = multipayload;
          for (let singState of updStates) {
            set(updatedState.formFields, singState.path, singState.value);
          }
          set(updatedState, 'formFields.isDraftCleared', false);
          set(updatedState, 'updatedAt', new Date().toISOString());
          formSyncTODB(updatedState);
        } else {
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
        }
      } catch {
        //
      }
    };

  const handleInitializeForm: JobsContextType['handleInitializeForm'] = ({
    type = 'new',
    recruiter,
    job,
    currSlide,
    recruiterUser,
  }) => {
    try {
      const seedFormData = getSeedJobFormData(recruiterUser, recruiter);
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
              recruiterUser,
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
