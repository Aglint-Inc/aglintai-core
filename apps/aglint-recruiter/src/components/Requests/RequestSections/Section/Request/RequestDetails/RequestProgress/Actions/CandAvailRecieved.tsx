import { DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import React from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
} from '@/src/components/Requests/ViewRequestDetails/CandidateAvailability/store';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
} from '@/src/components/Requests/ViewRequestDetails/ConfirmAvailability/store';
import { supabase } from '@/src/utils/supabase/client';

const CandAvailRecieved = (progress: DatabaseTable['request_progress']) => {
  return (
    <>
      <Stack direction={'row'} mt={1} gap={1}></Stack>
    </>
  );
};

export default CandAvailRecieved;
