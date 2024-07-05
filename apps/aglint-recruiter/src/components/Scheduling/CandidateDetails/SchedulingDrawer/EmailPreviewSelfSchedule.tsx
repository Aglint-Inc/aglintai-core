/* eslint-disable no-unused-vars */
import { EmailTemplateAPi } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { EmailPreviewOnScheduling } from '@/devlink3/EmailPreviewOnScheduling';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../store';
import { useSchedulingFlowStore } from './store';

function EmailPreviewSelfSchedule() {
  const { emailData } = useSchedulingFlowStore((state) => ({
    emailData: state.emailData,
  }));

  return (
    <EmailPreviewOnScheduling
      textEmailPreview={
        'To proceed to self scheduling please click on the button below. Upon doing so, an email containing the following message will be sent to the candidate:'
      }
      slotEmailPreview={
        emailData?.html && (
          <Stack sx={{ py: 'var(--space-4)' }}>
            <iframe
              width={'600px'}
              height={'650px'}
              color='white'
              srcDoc={emailData?.html}
              title='Previw Email'
            />
          </Stack>
        )
      }
    />
  );
}

export default EmailPreviewSelfSchedule;
