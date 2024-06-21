import { supabaseWrap } from '@aglint/shared-utils';
import { cloneDeep, debounce, set } from 'lodash';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

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
export type FormJobType = {
  phoneScreening: {
    startMessage: string;
    endMessage: string;
    questions: PhoneScreenQuestion[];
  };
};

export type PhoneScreeningState = {
  phoneScreening: {
    startMessage: string;
    endMessage: string;
    questions: PhoneScreenQuestion[];
  };
  title: string;
  syncStatus: 'saving' | 'saved' | '';
  isLoading: boolean;
};

const initialState: PhoneScreeningState = {
  phoneScreening: {
    startMessage:
      'Welcome to the candidate application form. Please fill out the following information',
    endMessage:
      'Thank you for taking your time. We will get back to you shortly',
    questions: [],
  },
  title: '',
  syncStatus: '',
  isLoading: true,
};

// Define action types
type PhoneScreeningAction =
  | {
      type: 'initForm';
      payload: {
        phoneScreening: PhoneScreeningState;
      };
    }
  | {
      type: 'setDbSyncStatus';
      payload: {
        status: PhoneScreeningState['syncStatus'];
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
      type: 'UpdateMultiStates';
      payload: {
        path: string;
        value: any;
      }[];
    };
null;

const phoneScreeningReducer = (
  state: PhoneScreeningState,
  action: PhoneScreeningAction,
): PhoneScreeningState => {
  const newState = cloneDeep(state);

  switch (action.type) {
    case 'editJobField': {
      const { path, value } = action.payload;
      set(newState, path, value);
      return newState;
    }
    case 'initForm': {
      const { phoneScreening } = action.payload;
      return cloneDeep(phoneScreening);
    }

    case 'setDbSyncStatus': {
      const { status } = action.payload;
      set(newState, 'syncStatus', status);
      return newState;
    }

    case 'UpdateMultiStates': {
      const updStates = action.payload;
      for (let singState of updStates) {
        set(newState, singState.path, singState.value);
      }
      return newState;
    }
    default:
      return state;
  }
};

export type PhoneScreeningContextType = {
  phoneScreenignForm: PhoneScreeningState;
  template_id: any;
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
};

const initialContextValue: PhoneScreeningContextType = {
  template_id: null,
  phoneScreenignForm: initialState,
  // eslint-disable-next-line no-unused-vars
  handleUpdateFormFields: async ({ path, value, multipayload }) => {},
};

const PhoneScreeningContext =
  createContext<PhoneScreeningContextType>(initialContextValue);

export const usePhoneScreening = () => {
  return useContext(PhoneScreeningContext);
};

const SYNC_TIME = 1000;

const PhoneScreeningProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phoneScreeningReducer, initialState);
  const router = useRouter();
  const templateId = router.query.id as string;

  useEffect(() => {
    const templateId = router.query.id as string;
    if (router.isReady && templateId) {
      (async () => {
        try {
          const [rec] = supabaseWrap(
            await supabase
              .from('screening_questions')
              .select()
              .eq('id', templateId),
          ) as unknown as any;
          //TODO: supabaseWrap type fix needed
          let phoneScreenState: PhoneScreeningState = {
            syncStatus: '',
            phoneScreening: {
              endMessage:
                rec.questions.endMessage ??
                initialState.phoneScreening.endMessage,
              questions: rec.questions?.questions ?? [],
              startMessage:
                rec.questions.startMessage ??
                initialState.phoneScreening.startMessage,
            },
            title: rec.title ?? initialState.title,
            isLoading: false,
          };
          dispatch({
            type: 'initForm',
            payload: {
              phoneScreening: phoneScreenState,
            },
          });
        } catch (err) {
          toast.error('Something went wrong. Please try again.');
        }
      })();
    }
  }, [router.isReady, router.query]);
  const updateFormTodb = async (currState: PhoneScreeningState) => {
    try {
      dispatch({
        type: 'setDbSyncStatus',
        payload: {
          status: 'saving',
        },
      });

      await saveScreeningToDb(currState, templateId);
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

  const handleUpdateFormFields: PhoneScreeningContextType['handleUpdateFormFields'] =
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
            set(updatedState, singState.path, singState.value);
          }
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
          set(updatedState, path, value);
          formSyncTODB(updatedState);
        }
      } catch (err) {
        toast.error('Something went wrong. Please try again.');
      }
    };

  return (
    <PhoneScreeningContext.Provider
      value={{
        phoneScreenignForm: state,
        handleUpdateFormFields,
        template_id: templateId,
      }}
    >
      {children}
    </PhoneScreeningContext.Provider>
  );
};

export default PhoneScreeningProvider;

const saveScreeningToDb = async (
  currState: PhoneScreeningState,
  templateId: string,
) => {
  return supabaseWrap(
    await supabase
      .from('screening_questions')
      .update({
        questions: currState.phoneScreening,
      })
      .eq('id', templateId)
      .select(),
  );
};
