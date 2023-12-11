import { cloneDeep, set } from 'lodash';
import React, { Dispatch, useContext, useEffect } from 'react';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { resolveAiCmd } from '@/src/utils/prompts/candidateDb/email';
import { supabase } from '@/src/utils/supabaseClient';

import { outReachTemplates, TemplateType } from './seedTemplates';
import { templateToEmailBody } from './utils';
import { Candidate } from '../candFilter.type';

export interface OutReachCtxType {
  state: StateType;
  dispatch: Dispatch<MyAction>;
  genEmailTempToemail: () => Promise<void>;
}

type CandEmailData = {
  access_token: string;
  refresh_token: string;
  email: string;
  provider: 'google' | 'outlook';
  expiry_date: number;
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
      payload: Pick<
        StateType,
        | 'defaultEmailJson'
        | 'mailSendStatus'
        | 'email'
        | 'emailTemplates'
        | 'isEmailLoading'
      >;
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
      const {
        defaultEmailJson,
        email,
        emailTemplates,
        isEmailLoading,
        mailSendStatus,
      } = action.payload;

      newState = {
        ...newState,
        defaultEmailJson,
        email,
        emailTemplates,
        isEmailLoading,
        mailSendStatus,
      };
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
  email: {
    subject: '',
    toEmail: '',
    body: '',
  },
  selectedTemplate: 0,
};
const OutReachCtx = React.createContext<OutReachCtxType>({
  state: initialState,
  dispatch: () => {},
  genEmailTempToemail: async () => {},
});

// Provider component
const OutReachCtxProvider = ({
  children,
  selcandidate,
}: {
  selcandidate: Candidate;
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
        localStorage.removeItem(`email-outreach${recruiter.id}`);
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
    if (!selcandidate) return;

    genEmailTempToemail();
  }, [recruiterUser, selcandidate, dispatch]);

  const genEmailTempToemail = async () => {
    try {
      dispatch({
        type: 'updateState',
        payload: {
          path: 'isEmailLoading',
          value: true,
        },
      });
      let email = selcandidate.json_resume.basics?.email ?? selcandidate.email;
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
        selcandidate.first_name + ' ' + selcandidate.last_name,
        async (command) => {
          const resp = await resolveAiCmd(
            selcandidate.json_resume.overview,
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
          mailSendStatus: '',
          emailTemplates: temps,
          isEmailLoading: false,
          defaultEmailJson: emailBodyJson,
        },
      });

      //
    } catch (err) {
      // console.log(err);
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
  const value = { state, dispatch, genEmailTempToemail };
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
