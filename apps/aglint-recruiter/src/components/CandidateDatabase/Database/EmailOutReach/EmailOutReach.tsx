import { CircularProgress, Paper, Stack } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonGenerate } from '@/devlink/ButtonGenerate';
import { CdEmailOutreach } from '@/devlink/CdEmailOutreach';
import { ConnectedMail } from '@/devlink/ConnectedMail';
import { ConnectMailModal } from '@/devlink/ConnectMailModal';
import { EmailSuccessCard } from '@/devlink/EmailSuccessCard';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { MailLink } from '@/devlink/MailLink';
import EmailGenerating from '@/public/lottie/EmailGenerating';
import MuiPopup from '@/src/components/Common/MuiPopup';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UISelect from '@/src/components/Common/Uiselect';
import UITextField from '@/src/components/Common/UITextField';
import { getTimeDifference } from '@/src/utils/jsonResume';

import EmailTemplateModalComp from './EmailTemplateDialog';
import { useOutReachCtx } from './OutReachCtx';

const EmailOutReach = ({
  onClose,
  isRegenerateVisible = true,
  isAddFieldEditorVisible = false,
}) => {
  const {
    state: OutreachState,
    dispatch,
    genEmailTempToemail,
    genEmailFromTempJson,
    saveEmail,
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
    outReachedEmails,
    showEmailEditor,
  } = OutreachState;

  const router = useRouter();
  const { toast } = useToast();
  const getCandDetailshandler = async () => {
    try {
      const { data: authUrl } = await axios.get(
        '/api/email-outreach/google-auth-url',
      );

      return router.push(authUrl);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
    }
  };

  const sendEmailHandler = async () => {
    try {
      if (!candEmailData) return;
      if (email && !email.toEmail && !email.subject && !email.body) {
        toast({
          variant: 'destructive',
          title:
            'Please enter a valid email address, subject, and message body.',
        });
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
      await saveEmail({
        fromEmail: candEmailData.email,
        toEmail: email.toEmail,
        body: email.body,
        subject: email.subject,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
    } finally {
      setTimeout(() => {
        dispatch({
          type: 'updateState',
          payload: {
            path: 'mailSendStatus',
            value: '',
          },
        });
      }, 10000);
    }
  };

  const setLocalStorage = () => {
    localStorage.setItem('redirect-candidate', router.asPath);
  };

  return (
    <>
      <CdEmailOutreach
        isAddFieldEditorVisible={isAddFieldEditorVisible}
        isRegenerateVisible={isRegenerateVisible}
        isEmailBodyVisible={!OutreachState.isEmailLoading}
        isLoading={OutreachState.isEmailLoading}
        isEmailInputVisible={showEmailEditor}
        isEmailSuccess={!showEmailEditor}
        slotEmailSuccessCard={
          <>
            {outReachedEmails.map((eSent, idx) => {
              return (
                <EmailSuccessCard
                  key={idx}
                  slotBodyText={
                    <div dangerouslySetInnerHTML={{ __html: eSent.body }}></div>
                  }
                  textEmail={eSent.toEmail}
                  textSentMail={eSent.fromEmail}
                  textStatus={getTimeDifference(
                    eSent.createdAt,
                    new Date().toISOString(),
                  )}
                  textSubject={eSent.subject}
                />
              );
            })}
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
              textDynamic='Regenerate'
            />
          </>
        }
        slotInputMailId={
          <>
            <UITextField
              width='370px'
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
                sx={{ color: 'var(--neutral-6)' }}
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
                  border: `1px solid var(--neutral-6)`,
                  borderRadius: 'var(--radius-2)',
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
                    setLocalStorage();
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
              menuOptions={emailTemplates.map((e) => ({
                name: e.name,
                value: e.id,
              }))}
              value={selectedTemplate}
              defaultValue={0}
              onChange={(value) => {
                genEmailFromTempJson(
                  emailTemplates[Number(value)].templateJson,
                );
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'selectedTemplate',
                    value: Number(value),
                  },
                });
                dispatch({
                  type: 'updateState',
                  payload: {
                    path: 'email.subject',
                    value: emailTemplates.find(
                      (prev) => prev.id === Number(value),
                    )?.subject,
                  },
                });
              }}
            />
          </>
        }
        onClickBack={{
          onClick: () => {
            onClose();
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
        onClickOpenInbox={{
          onClick: () => {
            window.open(`https://mail.google.com/mail`, '_blank');
          },
        }}
        onClickAddFollowUp={{
          onClick: () => {
            dispatch({
              type: 'updateState',
              payload: {
                path: 'showEmailEditor',
                value: true,
              },
            });
          },
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
