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
  const handleConfirmSlot = async () => {
    try {
      const [candReq] = supabaseWrap(
        await supabase
          .from('candidate_request_availability')
          .select()
          .eq('request_id', progress.request_id),
      );
      setCandidateAvailabilityId(candReq.id);
      setApplicationIdForConfirmAvailability(candReq.application_id);
    } catch (err) {
      //
    }
  };
  return (
    <>
      <Stack direction={'row'} mt={1} gap={1}>
        <ButtonSoft
          size={1}
          color={'accent'}
          textButton='Schedule Interview'
          onClickButton={{
            onClick: handleConfirmSlot,
          }}
        />
        <ButtonSoft
          size={1}
          color='accent'
          onClickButton={{
            onClick: () => {
              setCandidateAvailabilityDrawerOpen(true);
              setReRequestAvailability(true);
              setCandidateAvailabilityIdForReRequest(
                '6b7657ba-cc3f-4789-a44f-5be74d234f84',
              );
            },
          }}
          textButton='Re Request Availability'
        />
      </Stack>
    </>
  );
};

export default CandAvailRecieved;
