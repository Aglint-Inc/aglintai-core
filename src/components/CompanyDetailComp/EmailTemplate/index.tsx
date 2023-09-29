/* eslint-disable security/detect-object-injection */
import { Drawer, Stack } from '@mui/material';
import { useState } from 'react';

import { EditEmail, EmailTemplateCard } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

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
              sx={{ gap: '4px' }}
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
          textEmailName={templateObj[selectedTemplate?.name]}
          slotForm={
            <Stack spacing={'20px'}>
              <UITextField
                labelSize='medium'
                fullWidth
                placeholder={''}
                label='Email Subject'
                // onChange={(e) => {
                  //   handleChange(
                  //     {
                  //       ...recruiter,
                  //       socials: {
                  //         ...recruiter.socials,
                  //         [socialName]: e.target.value,
                  //       },
                  //     },
                  //     socialName,
                  //   );
                // }}
              />
              <UITextField
                labelSize='medium'
                fullWidth
                label='Body Content'
                // onChange={(e) => {
                  //   handleChange(
                  //     {
                  //       ...recruiter,
                  //       socials: {
                  //         ...recruiter.socials,
                  //         [socialName]: e.target.value,
                  //       },
                  //     },
                  //     socialName,
                  //   );
                // }}
                multiline
                minRows={6}
                maxRows={20}
              />
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
