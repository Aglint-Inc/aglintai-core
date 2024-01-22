import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  ButtonGenerate,
  CdEmailOutreach,
  ConnectedMail,
  ConnectMailModal,
  EmailSuccessCard,
  LoaderSvg,
  MailLink,
} from '@/devlink';
import EmailTemplateEditor from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditor';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UISelect from '@/src/components/Common/Uiselect';
import UITextField from '@/src/components/Common/UITextField';
import { API_FAIL_MSG } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getTimeDifference } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useOutReachCtx } from './OutReachCtx';

const EmailOutReachMultiple = ({ selCandidates }) => {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    state: OutreachState,
    dispatch,
    genEmailTempToemail,
  } = useOutReachCtx();
  const { candEmailData, emailTemplates, outReachedEmails, isMailAuthOpen } =
    OutreachState;

  const [selectedEmailTemplate, setSelectedEmailTemp] = useState(0);
  const [isEditorLoading, setIsEditorLoading] = useState(false);
  const [editorJson, setEditoJson] = useState({
    subject: '',
    templateJson: '',
  });

  useEffect(() => {
    if (emailTemplates.length > 0) {
      setEditoJson({
        subject: emailTemplates[0].subject,
        templateJson: emailTemplates[0].templateJson,
      });
    }
  }, [emailTemplates]);

  const setLocalStorage = () => {
    localStorage.setItem('redirect-candidate', router.asPath);
  };

  const handleSubmit = async () => {
    const res = await axios.post('/api/candidatedb/save-emails', {
      candidates: selCandidates,
      editorJson: editorJson,
      recruiter: recruiter,
      recruiterUser: recruiterUser,
      subject: editorJson.subject,
      fromEmail: candEmailData.email,
    });

    if (res.status === 200) {
      toast.success(
        'Email are fetching in background. Once done, email will be sent to candidates',
      );
    } else {
      toast.error('Error sending emails');
    }
  };

  const getCandDetailshandler = async () => {
    try {
      localStorage.setItem('gmail-redirect-path', router.asPath);
      const { data: authUrl } = await axios.get(
        '/api/email-outreach/google-auth-url',
      );

      return router.push(authUrl);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  return (
    <>
      <CdEmailOutreach
        isRegenerateVisible={false}
        isEmailInputVisible={true}
        isEmailSuccess={false}
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
        slotInputSubject={
          <>
            <UITextField
              onChange={(e) => {
                setEditoJson((prev) => ({ ...prev, subject: e.target.value }));
              }}
              value={editorJson.subject}
              defaultValue={editorJson.subject}
              placeholder='Subject'
            />
          </>
        }
        slotInputMailId={<>fewiunfewiun</>}
        slotInputBody={
          <>
            {isEditorLoading && (
              <Stack
                direction={'row'}
                alignItems={'center'}
                width={'100%'}
                height={'300px'}
                justifyContent={'center'}
              >
                <LoaderSvg />
              </Stack>
            )}
            {!isEditorLoading && emailTemplates.length > 0 && (
              <EmailTemplateEditor
                defaultJson={editorJson.templateJson}
                onChangeUpdateJson={(s) => {
                  setEditoJson((prev) => ({ ...prev, templateJson: s }));
                }}
              />
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
        slotTemplateButton={
          <>
            <UISelect
              size='sm'
              fullWidth
              menuOptions={emailTemplates.map((e) => ({
                name: e.name,
                value: e.id,
              }))}
              value={selectedEmailTemplate}
              defaultValue={0}
              onChange={(e) => {
                setIsEditorLoading(true);
                setEditoJson({
                  subject: emailTemplates[Number(e.target.value)].subject,
                  templateJson:
                    emailTemplates[Number(e.target.value)].templateJson,
                });
                setSelectedEmailTemp(Number(e.target.value));
                setTimeout(() => {
                  setIsEditorLoading(false);
                }, 500);
              }}
            />
          </>
        }
        onClickSendMail={{
          //   onClick: sendEmailHandler,
          onClick: handleSubmit,
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
    </>
  );
};

export default EmailOutReachMultiple;
