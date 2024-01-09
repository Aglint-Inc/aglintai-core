import { Stack } from '@mui/material';
import axios from 'axios';
import { cloneDeep, set } from 'lodash';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { LoaderSvg } from '@/devlink/LoaderSvg';
import { PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  FormJobType,
  PhoneScreenQuestion,
} from '../JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '../JobsDashboard/JobPostCreateUpdate/utils';

type PhoneScreenCandQnType = Omit<PhoneScreenQuestion, 'options'>;
export interface PhoneScreeningResponseType extends PhoneScreenCandQnType {
  options: {
    option: string;
    id: string;
    isChecked: boolean;
  }[];
  candAnswer: string;
}

type CandPhoneScreeningState = {
  phoneScreen: PhoneScreeningResponseType[];
  startMessage: string;
  endMessage: string;
  companyLogo: string;
  currentQn: number;
  showStartMessage: boolean;
  showEndMessage: boolean;
  applicationId: string;
  jobPostId: string;
  isPreview: boolean;
};

type ScreeningCtxProviderType = {
  state: CandPhoneScreeningState;
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: any; value: any }) => void;
  dispatch: React.Dispatch<ScreenigAction>;
};

type ScreenigAction =
  | {
      type: 'UpdateState';
      payload: {
        path: string;
        value: any;
      };
    }
  | {
      type: 'initialise';
      payload: {
        newState: CandPhoneScreeningState;
      };
    };

const reducer = (state: CandPhoneScreeningState, action: ScreenigAction) => {
  const newState = cloneDeep(state);
  switch (action.type) {
    case 'UpdateState': {
      set(newState, action.payload.path, action.payload.value);
      return newState;
    }
    case 'initialise': {
      return action.payload.newState;
    }
    default: {
      return newState;
    }
  }
};

const initialState: CandPhoneScreeningState = {
  phoneScreen: [],
  companyLogo: '',
  currentQn: -1,
  showEndMessage: true,
  showStartMessage: false,
  applicationId: '',
  isPreview: true,
  jobPostId: '',
  startMessage: '',
  endMessage: '',
};

const ScreeningCtx = createContext<ScreeningCtxProviderType>({
  state: initialState,
  // eslint-disable-next-line no-unused-vars
  updateState: ({ path, value }: { path: any; value: any }) => {},
  dispatch: () => {},
});

export const ScreeningCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { job_post_id, application_id, preview } = router.query as any;

    if (!job_post_id) {
      toast.error('invalid Link');
      router.replace('/login');
      return;
    }

    (async () => {
      try {
        setIsLoading(true);
        const [job] = (await supabaseWrap(
          await supabase
            .from('public_jobs')
            .select('phone_screening,logo,draft')
            .eq('id', router.query.job_post_id),
        )) as Pick<PublicJobsType, 'phone_screening' | 'logo' | 'draft'>[];
        if (!job) {
          toast.error('invalid link');
          router.push('/login');
          return;
        }

        let draftJobPhoneScreen: FormJobType['phoneScreening'] | null =
          (job.draft as any)?.phone_screening || null;

        let jobPhoneScreening: FormJobType['phoneScreening'] | null = null;

        let candPhScreenResp: CandPhoneScreeningState['phoneScreen'] | null =
          null;

        let isFormFilled = false;

        if (application_id) {
          const { data } = await axios.post(
            '/api/phone-screening/get-application-info',
            {
              application_id: application_id,
            },
          );
          if (!data) {
            toast.error('invalid link');
            router.push('/login');
            return;
          }
          if (data.phone_screening !== null) {
            isFormFilled = true;
          }
          jobPhoneScreening = job.phone_screening as any;
          candPhScreenResp = jobPhoneScreening.questions.map((q) => {
            return {
              candAnswer: '',
              id: q.id,
              isRequired: q.isRequired,
              type: q.type,
              questionLabel: q.questionLabel,
              question: q.question,
              options: q.options.map((o) => ({
                option: o.option,
                id: o.id,
                isChecked: false,
              })),
            };
          });
        } else {
          if (draftJobPhoneScreen) {
            jobPhoneScreening = draftJobPhoneScreen;
          } else {
            jobPhoneScreening = job.phone_screening as any;
          }
          candPhScreenResp = jobPhoneScreening.questions.map((q) => {
            return {
              candAnswer: '',
              id: q.id,
              isRequired: q.isRequired,
              type: q.type,
              questionLabel: q.questionLabel,
              question: q.question,
              options: q.options.map((o) => ({
                option: o.option,
                id: o.id,
                isChecked: false,
              })),
            };
          });
        }

        dispatch({
          type: 'initialise',
          payload: {
            newState: {
              companyLogo: job.logo || '',
              phoneScreen: candPhScreenResp,
              currentQn: -1,
              showStartMessage: !isFormFilled,
              showEndMessage: isFormFilled,
              applicationId: application_id ?? '',
              jobPostId: job_post_id,
              isPreview: preview === 'true' || !application_id,
              endMessage: jobPhoneScreening.endMessage as any,
              startMessage: jobPhoneScreening.startMessage as any,
            },
          },
        });
      } catch (err) {
        toast.error(API_FAIL_MSG);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router.isReady, dispatch]);

  const updateState = ({ path, value }) => {
    dispatch({
      type: 'UpdateState',
      payload: {
        path,
        value,
      },
    });
  };

  return (
    <>
      <ScreeningCtx.Provider value={{ state, updateState, dispatch }}>
        {isLoading ? (
          <>
            <Stack
              direction={'row'}
              width={'100%'}
              height={'100vh'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <LoaderSvg />
            </Stack>
          </>
        ) : (
          children
        )}
      </ScreeningCtx.Provider>
    </>
  );
};

export const useScreeningCtx = () => {
  return useContext(ScreeningCtx);
};
