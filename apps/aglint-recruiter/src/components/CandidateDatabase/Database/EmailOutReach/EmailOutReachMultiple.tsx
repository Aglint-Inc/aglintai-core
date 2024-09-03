import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonGenerate } from '@/devlink/ButtonGenerate';
import { CdEmailOutreach } from '@/devlink/CdEmailOutreach';
import { ConnectedMail } from '@/devlink/ConnectedMail';
import { ConnectMailModal } from '@/devlink/ConnectMailModal';
import { EmailSuccessCard } from '@/devlink/EmailSuccessCard';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { MailLink } from '@/devlink/MailLink';
import EmailTemplateEditor from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditor';
import MuiPopup from '@/src/components/Common/MuiPopup';
import UISelect from '@/src/components/Common/Uiselect';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getTimeDifference } from '@/src/utils/jsonResume';

import { useOutReachCtx } from './OutReachCtx';

const EmailOutReachMultiple = ({ selCandidates, onClose }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    state: OutreachState,
    dispatch,
    genEmailTempToemail,
  } = useOutReachCtx();
  const { candEmailData, emailTemplates, outReachedEmails, isMailAuthOpen } =
    OutreachState;
  const [defaultTemplate, setDefaultTemplate] = useState(null);
  const [selectedEmailTemplate, setSelectedEmailTemp] = useState(0);
  const [isEditorLoading, setIsEditorLoading] = useState(false);
  const [editorJson, setEditorJson] = useState({
    subject: '',
    templateJson: '',
  });

  useEffect(() => {
    if (emailTemplates.length > 0) {
      setEditorJson({
        subject: emailTemplates[0].subject,
        templateJson: '',
      });
      setDefaultTemplate(emailTemplates[0].templateJson);
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
      toast({
        variant: 'default',
        title:
          'Emails are being fetched in the background. Once that process is complete, emails will be sent to the candidates.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error sending emails.',
      });
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
      toast({
        variant: 'destructive',
        title: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <>
      <CdEmailOutreach
        isEditVisible={false}
        tipsAutoFilledVisible={true}
        isToEmailHeaderVisible={false}
        isRegenerateVisible={false}
        isEmailInputVisible={true}
        isEmailSuccess={false}
        onClickBack={{
          onClick: () => {
            onClose();
          },
        }}
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
                setEditorJson((prev) => ({ ...prev, subject: e.target.value }));
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
                height={'250px'}
                justifyContent={'center'}
              >
                <LoaderSvg />
              </Stack>
            )}
            {defaultTemplate &&
              !isEditorLoading &&
              emailTemplates.length > 0 && (
                <EmailTemplateEditor
                  defaultJson={defaultTemplate}
                  onChangeUpdateJson={(s) => {
                    setEditorJson((prev) => ({ ...prev, templateJson: s }));
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
              menuOptions={emailTemplates.map((e) => ({
                name: e.name,
                value: e.id,
              }))}
              value={selectedEmailTemplate}
              defaultValue={0}
              onChange={(value) => {
                setIsEditorLoading(true);
                setDefaultTemplate(emailTemplates[Number(value)].templateJson);
                setEditorJson({
                  subject: emailTemplates[Number(value)].subject,
                  templateJson: '',
                });
                setSelectedEmailTemp(Number(value));
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
