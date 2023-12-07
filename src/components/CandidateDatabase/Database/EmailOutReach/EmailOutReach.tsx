import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  ButtonGenerate,
  CdEmailOutreach,
  ConnectedMail,
  ConnectMailModal,
  EmailSent,
  MailLink,
} from '@/devlink';
import EmailAiEditor from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditor';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UITextField from '@/src/components/Common/UITextField';
import { API_FAIL_MSG } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { useCandFilter } from '../CandDbProvider';
import { Candidate } from '../candFilter.type';

type CandEmailData = {
  access_token: string;
  refresh_token: string;
  email: string;
  provider: 'google' | 'outlook';
  expiry_date: number;
} | null;

const EmailOutReach = ({ candPath }: { candPath: number }) => {
  const { candState } = useCandFilter();
  const selcandidate = get(candState.candidates, `[${candPath}]`) as Candidate;
  const [candEmailData, setCandEmailData] = useState<CandEmailData>(null);
  const [mailSendStatus, setMailSendStatus] = useState<'' | 'sending' | 'sent'>(
    '',
  );
  const [email, setEmail] = useState({
    toEmail: selcandidate.email,
    subject: '',
    body: '',
  });
  const { recruiter } = useAuthDetails();
  const [isMailAuthOpen, setIsMailAuthOpen] = useState(false);

  useEffect(() => {
    const str = localStorage.getItem(`email-outreach${recruiter.id}`);
    const candInfo = JSON.parse(str) as CandEmailData;
    if (!candInfo) return;
    const isDateExpired = candInfo.expiry_date - Date.now();
    if (isDateExpired <= 0) {
      localStorage.removeItem(`email-outreach${recruiter.id}`);
    } else {
      setCandEmailData(candInfo);
    }
  }, [recruiter]);

  useEffect(() => {
    setMailSendStatus('');
    let email = selcandidate.json_resume.basics?.email ?? selcandidate.email;
    setEmail((p) => ({ ...p, toEmail: email }));
  }, [selcandidate]);

  const router = useRouter();

  const getCandDetailshandler = async () => {
    try {
      const { data: authUrl } = await axios.get(
        '/api/email-outreach/google-auth-url',
      );

      return router.push(authUrl);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  const sendEmailHandler = async () => {
    try {
      if (!candEmailData) return;
      if (email && !email.toEmail && !email.subject && !email.body) {
        toast.error('please enter correct email, subject and body');
        return;
      }
      setMailSendStatus('sending');
      await axios.post('/api/email-outreach/send-email', {
        fromEmail: candEmailData.email,
        toEmail: email.toEmail,
        access_token: candEmailData.access_token,
        refresh_token: candEmailData.refresh_token,
        subject: email.subject,
        body: email.body,
      });
      setMailSendStatus('sent');
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setTimeout(() => {
        setMailSendStatus('');
      }, 10000);
    }
  };

  return (
    <>
      <CdEmailOutreach
        isEmailBodyVisible={true}
        isLoading={false}
        slotEmailSent={
          <>
            {mailSendStatus === 'sent' && (
              <EmailSent
                onClickOpenInbox={{
                  onClick: () => {
                    window.open(`https://mail.google.com/mail`, '_blank');
                  },
                }}
              />
            )}
          </>
        }
        slotButtonGenerate={
          <>
            <ButtonGenerate />
          </>
        }
        slotInputMailId={
          <>
            <UITextField
              defaultValue={selcandidate.email}
              onChange={(e) => {
                setEmail((p) => ({ ...p, toEmail: e.target.value }));
              }}
              value={email.toEmail}
            />
          </>
        }
        slotLoadingIcon={
          <>
            {mailSendStatus === 'sending' ? (
              <CircularProgress
                color='inherit'
                size={'15px'}
                sx={{ color: palette.grey[400] }}
              />
            ) : undefined}
          </>
        }
        slotInputSubject={
          <>
            <UITextField
              onChange={(e) => {
                setEmail((p) => ({ ...p, subject: e.target.value }));
              }}
              placeholder='Subject'
            />
          </>
        }
        slotInputBody={
          <>
            <div
              style={{
                border: `1px solid ${palette.grey[300]}`,
                borderRadius: '5px',
              }}
            >
              <EmailAiEditor
                defaultValue=''
                onChangeUpdateJson={() => {
                  // console.log(j);
                }}
                onChangeUpdateHtml={() => {
                  // console.log(h);
                }}
              />
            </div>
          </>
        }
        slotLinkMail={
          <>
            {candEmailData ? (
              <ConnectedMail
                isGmailIconVisible={candEmailData.provider === 'google'}
                isOutlookIconVisible={candEmailData.provider == 'outlook'}
                textConnectedMailid={candEmailData.email}
              />
            ) : (
              <MailLink
                onClickLinkNow={{
                  onClick: () => {
                    setIsMailAuthOpen(true);
                  },
                }}
              />
            )}
          </>
        }
        slotLottie={<></>}
        slotTemplateButton={
          <>
            <>Template 1</>
          </>
        }
        onClickBack={{
          onClick: () => {
            //
          },
        }}
        onClickCopyMail={{
          onClick: () => {
            //
          },
        }}
        onClickEdit={{
          onClick: () => {
            //
          },
        }}
        onClickSendMail={{
          onClick: sendEmailHandler,
          // onClick: getCandDetailshandler,
        }}
      />

      <MuiPopup
        props={{
          open: isMailAuthOpen,
          onClose: () => {
            setIsMailAuthOpen(false);
          },
        }}
      >
        <ConnectMailModal
          onClickGmail={{
            onClick: getCandDetailshandler,
          }}
        />
      </MuiPopup>

      <MuiPopup props={{ open: false }}>{/*  */}</MuiPopup>
    </>
  );
};

export default EmailOutReach;

[
  {
    name: 'Template 1',
    subject: 'Research study into the future of work',
    templateJson: {},
    templateHtml: '',
  },
];
