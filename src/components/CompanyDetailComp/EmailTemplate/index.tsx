/* eslint-disable security/detect-object-injection */
import { Drawer, Stack, Switch, Typography } from '@mui/material';
import { useState } from 'react';

import { EditEmail, EmailTemplateCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import toast from '@/src/utils/toast';

import { debouncedSave } from '../utils';
import TipTapAIEditor from '../../Common/TipTapAIEditor';
import UITextField from '../../Common/UITextField';

const EmailTemplate = () => {
  const { recruiter } = useAuthDetails();
  const [open, setOpen] = useState(false);
  const templateEntries = Object.entries(recruiter.email_template);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [selectedTemplate, setSelectedTemplate] = useState({
    name: '',
    body: '',
    default: false,
    subject: '',
  });

  const handlerSave = () => {
    recruiter.email_template[selectedTemplate.name] = {
      body: selectedTemplate.body,
      default: selectedTemplate.default,
      subject: selectedTemplate.subject,
    };
    debouncedSave({ ...recruiter }, recruiter.id);
    setOpen(false);
    toast.success('Saved successfully');
  };

  return (
    <>
      {templateEntries.map(([templateName, templateData], ind) => (
        <EmailTemplateCard
          key={ind}
          textEmailTemplateCategory={templateObj[templateName]}
          slotTemplateImage={
            <Stack
              dangerouslySetInnerHTML={{
                __html: templateData.body,
              }}
              sx={{
                gap: '4px',
                p: '16px',
                overflow: 'hidden',
                height: '240px',
                fontSize: '12px',
                color: palette.grey[600],
              }}
            />
          }
          textUsedByCount={''}
          onClickViewEdit={{
            onClick: () => {
              setSelectedTemplate({ ...templateData, name: templateName });
              setOpen(true);
            },
          }}
        />
      ))}
      <Drawer anchor='right' open={open} onClose={handleDrawerClose}>
        <EditEmail
          onClickSaveChanges={{
            onClick: () => {
              handlerSave();
            },
          }}
          onClickClose={{
            onClick: () => {
              setOpen(false);
            },
          }}
          textEmailName={templateObj[selectedTemplate?.name]}
          slotForm={
            <Stack spacing={'20px'}>
              <Stack
                direction={'row'}
                sx={{ bgcolor: palette.grey[100], p: 2, borderRadius: '8px' }}
                alignItems={'center'}
              >
                <Typography variant='body2'>
                  When you create a new job, this email will be enabled by
                  default in the job editor.
                </Typography>
                <Switch
                  size='small'
                  color='info'
                  checked={selectedTemplate.default}
                  onChange={() => {
                    setSelectedTemplate((prev) => ({
                      ...prev,
                      default: !selectedTemplate.default,
                    }));
                  }}
                />
              </Stack>
              <UITextField
                labelSize='medium'
                fullWidth
                label='Email Subject'
                value={selectedTemplate.subject}
                onChange={(e) => {
                  setSelectedTemplate((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }));
                }}
                minRows={1}
                multiline
              />
              <Stack
                sx={{
                  border: '1px solid',
                  borderColor: palette.grey[300],
                  borderRadius: '4px',
                }}
              >
                <TipTapAIEditor
                  enablAI={false}
                  placeholder='Job Description'
                  handleChange={(html) => {
                    setSelectedTemplate((prev) => ({ ...prev, body: html }));
                  }}
                  initialValue={selectedTemplate.body}
                />
              </Stack>
              <Stack
                spacing={1}
                sx={{ bgcolor: palette.grey[100], p: 2, borderRadius: '8px' }}
              >
                <Typography variant='h5'>Personalise your message</Typography>
                <Typography variant='caption'>
                  To insert dynamic information, you can use [firstName],
                  [lastName], [companyName] or [jobTitle]
                </Typography>
              </Stack>
            </Stack>
          }
        />
      </Drawer>
    </>
  );
};

export default EmailTemplate;

const templateObj = {
  interview: 'Interview Email',
  followup: 'Follow up for Interview',
  rejection: 'Rejection Email',
  application_recieved: 'Application Recieved Email',
};
