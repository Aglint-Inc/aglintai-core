import { CircularProgress, Paper, Stack } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import {
  ButtonGenerate,
  CdEmailOutreach,
  ConnectedMail,
  ConnectMailModal,
  EmailSent,
  LoaderSvg,
  MailLink,
} from '@/devlink';
import EmailGenerating from '@/src/components/Common/Lotties/EmailGenerating';
import MuiPopup from '@/src/components/Common/MuiPopup';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UISelect from '@/src/components/Common/Uiselect';
import UITextField from '@/src/components/Common/UITextField';
import { API_FAIL_MSG } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import EmailTemplateModalComp from './EmailTemplateDialog';
import { useOutReachCtx } from './OutReachCtx';

const EmailOutReach = () => {
  const {
    state: OutreachState,
    dispatch,
    genEmailTempToemail,
  } = useOutReachCtx();

  const {
    email,
    isOpenEditTempModal,
    selectedTemplate,
    mailSendStatus,
    candEmailData,
    emailTemplates,
    isMailAuthOpen,
    isEmailLoading,
    defaultEmailJson,
  } = OutreachState;

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
      dispatch({
        type: 'updateState',
        payload: {
          path: 'mailSendStatus',
          value: 'sending',
        },
      });
      await axios.post('/api/email-outreach/send-email', {
        fromEmail: candEmailData.email,
        toEmail: email.toEmail,
        access_token: candEmailData.access_token,
        refresh_token: candEmailData.refresh_token,
        subject: email.subject,
        body: email.body,
      });
      dispatch({
        type: 'updateState',
        payload: {
          path: 'mailSendStatus',
          value: 'sent',
        },
      });
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'updateState',
          payload: {
            path: 'mailSendStatus',
            value: '',
          },
        });
      }, 5000);
    }
  };

  return (
    <>
      <CdEmailOutreach
        isEmailBodyVisible={!OutreachState.isEmailLoading}
        isLoading={OutreachState.isEmailLoading}
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
            <ButtonGenerate
              onClickGenerate={{
                onClick: () => {
                  genEmailTempToemail();
                },
              }}
            />
          </>
        }
        slotInputMailId={
          <>
            <UITextField
              defaultValue={email.toEmail}
              onChange={(e) => {
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'email.toEmail',
                    value: e.target.value,
                  },
                });
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
            ) : (
              <>
                <Image
                  src='/images/svg/send.svg'
                  width={15}
                  height={15}
                  alt=''
                />
              </>
            )}
          </>
        }
        slotInputSubject={
          <>
            <UITextField
              onChange={(e) => {
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'email.subject',
                    value: e.target.value,
                  },
                });
              }}
              value={email.subject}
              defaultValue={email.subject}
              placeholder='Subject'
            />
          </>
        }
        slotInputBody={
          <>
            {isEmailLoading ? (
              <Stack
                direction={'row'}
                alignItems={'center'}
                width={'100%'}
                height={'300px'}
                justifyContent={'center'}
              >
                <LoaderSvg />
              </Stack>
            ) : (
              <div
                style={{
                  border: `1px solid ${palette.grey[300]}`,
                  borderRadius: '4px',
                }}
              >
                <TipTapAIEditor
                  enablAI={false}
                  initialValue=''
                  defaultJson={email.body === '' ? defaultEmailJson : undefined}
                  placeholder='Email Body'
                  handleChange={(s) => {
                    dispatch({
                      type: 'updateState',
                      payload: {
                        path: 'email.body',
                        value: s,
                      },
                    });
                  }}
                />
              </div>
            )}
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
                    dispatch({
                      type: 'updateState',
                      payload: {
                        path: 'isMailAuthOpen',
                        value: true,
                      },
                    });
                  },
                }}
              />
            )}
          </>
        }
        slotLottie={
          <>
            <EmailGenerating />
          </>
        }
        slotTemplateButton={
          <>
            <UISelect
              fullWidth
              menuOptions={emailTemplates.map((e) => ({
                name: e.name,
                value: e.id,
              }))}
              value={selectedTemplate}
              defaultValue={0}
              onChange={(e) => {
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'selectedTemplate',
                    value: Number(e.target.value),
                  },
                });
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'email.subject',
                    value: emailTemplates.find(
                      (prev) => prev.id === Number(e.target.value),
                    )?.subject,
                  },
                });
              }}
            />
          </>
        }
        onClickBack={{
          onClick: () => {
            //
          },
        }}
        onClickCopyMail={{
          onClick: () => {
            navigator.clipboard.writeText(email.toEmail);
          },
        }}
        onClickEdit={{
          onClick: () => {
            dispatch({
              type: 'updateState',
              payload: {
                path: 'isOpenEditTempModal',
                value: true,
              },
            });
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
            dispatch({
              type: 'updateState',
              payload: {
                path: 'isMailAuthOpen',
                value: false,
              },
            });
          },
        }}
      >
        <ConnectMailModal
          onClickGmail={{
            onClick: getCandDetailshandler,
          }}
        />
      </MuiPopup>

      <MuiPopup
        props={{
          open: isOpenEditTempModal,
          maxWidth: 'md',
          onClose: () =>
            dispatch({
              type: 'updateState',
              payload: {
                path: 'isOpenEditTempModal',
                value: false,
              },
            }),
        }}
      >
        <Paper>
          <EmailTemplateModalComp
            selectedTemplate={selectedTemplate}
            onClose={() => {
              dispatch({
                type: 'updateState',
                payload: {
                  path: 'isOpenEditTempModal',
                  value: false,
                },
              });
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
};

export default EmailOutReach;
