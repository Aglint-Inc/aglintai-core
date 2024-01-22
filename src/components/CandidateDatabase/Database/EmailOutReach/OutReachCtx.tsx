import axios from 'axios';
import { cloneDeep, set } from 'lodash';
import React, { Dispatch, useContext, useEffect } from 'react';

import {
  API_FAIL_MSG,
  supabaseWrap,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { OutreachEmailDbType } from '@/src/types/data.types';
import { resolveAiCmd } from '@/src/utils/prompts/candidateDb/email';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { outReachTemplates, TemplateType } from './seedTemplates';
import { templateToEmailBody } from './utils';

export interface OutReachCtxType {
  state: StateType;
  dispatch: Dispatch<MyAction>;
  genEmailTempToemail: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  genEmailFromTempJson: (templateJson: any) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  saveEmail: (email: OutreachedEmail) => Promise<void>;
}

type CandEmailData = {
  access_token: string;
  refresh_token: string;
  email: string;
  provider: 'google' | 'outlook';
  expiry_date: number;
};

type OutreachedEmail = {
  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  createdAt: string;
};

type OutReachCandDetailsType = {
  candidateId: string;
  email: string;
  firstName: string;
  lastName: string;
  candOverview: string;
};
// Initial state interface
export interface StateType {
  candEmailData: CandEmailData | null;
  mailSendStatus: '' | 'sending' | 'sent';
  emailTemplates: TemplateType[];
  isMailAuthOpen: boolean;
  isOpenEditTempModal: boolean;
  selectedTemplate: number;
  isEmailLoading: boolean;
  defaultEmailJson: any;
  outReachedEmails: OutreachedEmail[];
  showEmailEditor: boolean;
  email: {
    subject: string;
    toEmail: string;
    body: string;
  };
}

// Actions interface
export type MyAction =
  | {
      type: 'updateState';
      payload: {
        path: string;
        value: any;
      };
    }
  | {
      type: 'generatedefaultJson';
      payload: Pick<StateType, 'defaultEmailJson' | 'email' | 'isEmailLoading'>;
    }
  | {
      type: 'UpdateMultiStates';
      payload: {
        path: string;
        value: any;
      }[];
    };

// Reducer function
const reducer = (state: StateType, action: MyAction): StateType => {
  let newState = cloneDeep(state);

  switch (action.type) {
    case 'updateState': {
      set(newState, action.payload.path, action.payload.value);
      return newState;
    }
    case 'generatedefaultJson': {
      const { defaultEmailJson, email, isEmailLoading } = action.payload;

      newState = {
        ...newState,
        defaultEmailJson,
        email,
        isEmailLoading,
      };
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

// Context object

const initialState: StateType = {
  candEmailData: null,
  emailTemplates: [],
  isMailAuthOpen: false,
  isOpenEditTempModal: false,
  mailSendStatus: '',
  isEmailLoading: true,
  defaultEmailJson: null,
  showEmailEditor: false,
  email: {
    subject: '',
    toEmail: '',
    body: '',
  },
  selectedTemplate: 0,
  outReachedEmails: [],
};
const OutReachCtx = React.createContext<OutReachCtxType>({
  state: initialState,
  dispatch: () => {},
  genEmailTempToemail: async () => {},
  // eslint-disable-next-line no-unused-vars
  genEmailFromTempJson: async (templateJson: any) => {},
  // eslint-disable-next-line no-unused-vars
  saveEmail: async (email: OutreachedEmail) => {},
});

// Provider component
const OutReachCtxProvider = ({
  children,
  selcandidate,
}: {
  selcandidate: OutReachCandDetailsType;
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { recruiter, recruiterUser } = useAuthDetails();

  useEffect(() => {
    // related to auth token
    const str = localStorage.getItem(`email-outreach${recruiter.id}`);
    const candInfo = JSON.parse(str) as CandEmailData;

    if (candInfo) {
      const isDateExpired = candInfo.expiry_date - Date.now();
      if (isDateExpired <= 0) {
        (async () => {
          const { data: newAcessTOken } = await axios.post(
            '/api/email-outreach/getNewAcessToken',
            {
              refresh_token: candInfo.refresh_token,
            },
          );
          candInfo.access_token = newAcessTOken;
          localStorage.setItem(
            `email-outreach${recruiter.id}`,
            JSON.stringify(candInfo),
          );
          dispatch({
            type: 'updateState',
            payload: {
              path: 'candEmailData',
              value: candInfo,
            },
          });
        })();
        // localStorage.removeItem(`email-outreach${recruiter.id}`);
      } else {
        dispatch({
          type: 'updateState',
          payload: {
            path: 'candEmailData',
            value: candInfo,
          },
        });
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [emailTemps] = supabaseWrap(
          await supabase
            .from('recruiter')
            .select('email_outreach_templates')
            .eq('id', recruiterUser.recruiter_id),
        ) as { email_outreach_templates: TemplateType[] }[];
        let temps = emailTemps?.email_outreach_templates
          ? emailTemps.email_outreach_templates
          : outReachTemplates;
        dispatch({
          type: 'updateState',
          payload: {
            path: 'emailTemplates',
            value: temps,
          },
        });
      } catch {
        //
      } finally {
        //
      }
    })();
  }, [recruiter, dispatch]);

  useEffect(() => {
    if (!selcandidate) return;
    genEmailTempToemail();
    getOutreachedEmails();
  }, [recruiterUser, selcandidate, dispatch]);

  const genEmailTempToemail = async () => {
    try {
      let email = selcandidate.email;

      dispatch({
        type: 'UpdateMultiStates',
        payload: [
          {
            path: 'email.toEmail',
            value: email,
          },
          {
            path: 'isEmailLoading',
            value: true,
          },
        ],
      });

      const [emailTemps] = supabaseWrap(
        await supabase
          .from('recruiter')
          .select('email_outreach_templates')
          .eq('id', recruiterUser.recruiter_id),
      ) as { email_outreach_templates: TemplateType[] }[];
      let temps = emailTemps?.email_outreach_templates
        ? emailTemps.email_outreach_templates
        : outReachTemplates;
      const emailBodyJson = await handleGenEmail(
        temps[0].templateJson,
        recruiterUser.first_name,
        selcandidate.firstName + ' ' + selcandidate.lastName,
        async (command) => {
          const resp = await resolveAiCmd(
            selcandidate.candOverview,
            recruiter.company_overview,
            command,
          );
          return resp;
        },
      );
      dispatch({
        type: 'generatedefaultJson',
        payload: {
          email: {
            body: '',
            subject: temps[0].subject,
            toEmail: email,
          },
          isEmailLoading: false,
          defaultEmailJson: emailBodyJson,
        },
      });

      //
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      dispatch({
        type: 'updateState',
        payload: {
          path: 'isEmailLoading',
          value: false,
        },
      });
    }
  };

  const getOutreachedEmails = async () => {
    try {
      const outreachedMails = supabaseWrap(
        await supabase
          .from('outreached_emails')
          .select()
          .eq('candidate_id', selcandidate.candidateId)
          .eq('recruiter_id', recruiter.id),
      ) as OutreachEmailDbType[];

      let newEMails: OutreachedEmail[] = outreachedMails
        .map((e: any) => ({
          ...e.email,
        }))
        .sort((e1, e2) => {
          const d1 = new Date(e1.createdAt);
          const d2 = new Date(e2.createdAt);
          return d2.getTime() - d1.getTime();
        });

      dispatch({
        type: 'UpdateMultiStates',
        payload: [
          {
            path: 'outReachedEmails',
            value: newEMails,
          },
          {
            path: 'showEmailEditor',
            value: newEMails.length === 0,
          },
        ],
      });
    } catch (err) {
      //
    }
  };

  const genEmailFromTempJson = async (templateJson) => {
    try {
      dispatch({
        type: 'updateState',
        payload: {
          path: 'isEmailLoading',
          value: true,
        },
      });
      dispatch({
        type: 'updateState',
        payload: {
          path: 'email.body',
          value: '',
        },
      });
      const emailBodyJson = await handleGenEmail(
        templateJson,
        recruiterUser.first_name,
        selcandidate.firstName + ' ' + selcandidate.lastName,
        async (command) => {
          const resp = await resolveAiCmd(
            selcandidate.candOverview,
            recruiter.company_overview,
            command,
          );
          return resp;
        },
      );
      dispatch({
        type: 'updateState',
        payload: {
          path: 'defaultEmailJson',
          value: emailBodyJson,
        },
      });
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      dispatch({
        type: 'updateState',
        payload: {
          path: 'isEmailLoading',
          value: false,
        },
      });
    }
  };

  const saveEmail = async (email: OutreachedEmail) => {
    supabaseWrap(
      await supabase
        .from('outreached_emails')
        .insert({
          candidate_id: selcandidate.candidateId,
          recruiter_user_id: recruiterUser.user_id,
          email: email,
        })
        .select(),
    ) as OutreachEmailDbType[];

    dispatch({
      type: 'UpdateMultiStates',
      payload: [
        {
          path: 'mailSendStatus',
          value: 'sent',
        },
        {
          path: 'showEmailEditor',
          value: false,
        },
        {
          path: 'outReachedEmails',
          value: [email, ...state.outReachedEmails],
        },
      ],
    });
  };

  const value = {
    state,
    dispatch,
    genEmailTempToemail,
    genEmailFromTempJson,
    saveEmail,
  };
  if (!selcandidate) return <></>;
  return <OutReachCtx.Provider value={value}>{children}</OutReachCtx.Provider>;
};

export const useOutReachCtx = () => {
  return useContext(OutReachCtx);
};

export { OutReachCtx, OutReachCtxProvider };

const handleGenEmail = async (
  templateJson,
  recruiterName,
  candidateName,
  genAiResp,
) => {
  let newTemp = cloneDeep(templateJson);
  // console.log(newTemp);
  newTemp.content = await templateToEmailBody(
    newTemp.content,
    recruiterName,
    candidateName,
    genAiResp,
  );
  // console.log(newTemp);
  return newTemp;
};
