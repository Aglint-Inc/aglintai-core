import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { EmailTemplateModal } from '@/devlink';
import EmailAiEditor from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditor';
import UITextField from '@/src/components/Common/UITextField';
import UITypography from '@/src/components/Common/UITypography';
import {
  API_FAIL_MSG,
  supabaseWrap,
} from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useOutReachCtx } from './OutReachCtx';
import { outReachTemplates, TemplateType } from './seedTemplates';

const EmailTemplateModalComp = ({
  selectedTemplate,
  onClose,
}: {
  selectedTemplate: number;
  onClose: () => void;
}) => {
  const { recruiter } = useAuthDetails();
  const [email, setEmail] = useState({ subject: '', body: null, name: '' });
  const [editorJson, setEditorJson] = useState(null);
  const [showEditName, setShowditName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { dispatch, state, genEmailFromTempJson } = useOutReachCtx();

  useEffect(() => {
    if (!recruiter || selectedTemplate === -1) return;

    const templates = state.emailTemplates;

    const selectedMail = templates.find((s) => s.id === selectedTemplate);
    setEmail({
      body: selectedMail.templateJson,
      subject: selectedMail.subject,
      name: selectedMail.name,
    });
    setEditorJson(selectedMail.templateJson);
  }, [recruiter, selectedTemplate]);

  const submitHandler = async () => {
    try {
      if (!email.body || !email.subject || !email.name) {
        return;
      }
      setIsSaving(true);
      const [{ email_outreach_templates }] = supabaseWrap(
        await supabase
          .from('recruiter')
          .select('email_outreach_templates')
          .eq('id', recruiter.id),
      ) as { email_outreach_templates: null | TemplateType[] }[];

      const newOutReachTemp: TemplateType = {
        id: selectedTemplate,
        name: email.name,
        subject: email.subject,
        templateHtml: '',
        templateJson: email.body,
      };

      let updatedTemps: TemplateType[] = email_outreach_templates
        ? email_outreach_templates
        : outReachTemplates;

      updatedTemps = updatedTemps.map((t) => {
        if (t.id === newOutReachTemp.id) return newOutReachTemp;
        return t;
      });
      supabaseWrap(
        await supabase
          .from('recruiter')
          .update({
            email_outreach_templates: updatedTemps,
          })
          .eq('id', recruiter.id),
      );
      dispatch({
        type: 'updateState',
        payload: {
          path: 'emailTemplates',
          value: updatedTemps,
        },
      });

      genEmailFromTempJson(newOutReachTemp.templateJson);
      onClose();
      toast.success('template updated sucessfully');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <EmailTemplateModal
        isEditIconVisible={!showEditName}
        isSaveButtonVisible={showEditName}
        slotSubjectInput={
          <>
            <UITextField
              value={email.subject}
              defaultValue={email.subject}
              onChange={(e) =>
                setEmail((pre) => ({ ...pre, subject: e.target.value }))
              }
            />
          </>
        }
        slotTemplateButton={<></>}
        slotBodyInput={
          <>
            <EmailAiEditor
              defaultJson={editorJson}
              onChangeUpdateJson={(s) => {
                setEmail((p) => ({ ...p, body: s }));
              }}
            />
          </>
        }
        isButtonIconVisible={isSaving}
        slotButtonIcon={
          <>
            <CircularProgress
              color='inherit'
              size={'15px'}
              sx={{ color: palette.grey[400] }}
            />
          </>
        }
        isButtonDisable={
          email.subject.length === 0 || email.name.length === 0 || !email.body
        }
        textTemplateName={
          showEditName ? (
            <UITextField
              fullWidth
              defaultValue={email.name}
              placeholder='Press enter to update names'
              onChange={(e) => {
                setEmail((p) => ({ ...p, name: String(e.target.value) }));
              }}
            />
          ) : (
            <UITypography fontBold='normal'>{email.name}</UITypography>
          )
        }
        onClickCancel={{
          onClick: () => {
            onClose();
          },
        }}
        onClickEditName={{
          onClick: () => {
            setShowditName(true);
          },
        }}
        onClickSaveTemplate={{
          onClick: submitHandler,
        }}
        onClickClose={{
          onClick: () => {
            const selectedMail = state.emailTemplates.find(
              (s) => s.id === selectedTemplate,
            );
            setEmail((p) => ({ ...p, name: selectedMail.name }));
            setShowditName(false);
          },
        }}
        onClickSave={{
          onClick: () => {
            setShowditName(false);
          },
        }}
      />
    </>
  );
};

export default EmailTemplateModalComp;
