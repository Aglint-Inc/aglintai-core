import { dayjsLocal, supabaseWrap } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { useRequest } from '@request/hooks';
import { useRequestAvailabilityDetails } from '@requests/hooks';
import React from 'react';

import { UIButton } from '@/common/UIButton';
import { supabase } from '@/utils/supabase/client';

import {
  setCandidateAvailabilityDrawerOpen,
  setCandidateAvailabilityIdForReRequest,
  setReRequestAvailability,
} from '../CandidateAvailability/_common/contexts/CandidateAvailabilityFlowStore';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
  useConfirmAvailabilitySchedulingFlowStore,
} from '../ConfirmAvailability/_common/contexts/AvailabilitySchedulingStore';

const CandAvailRecived = () => {
  const { requestDetails } = useRequest();
  const { candidateAvailabilityId } =
    useConfirmAvailabilitySchedulingFlowStore();
  const { isFetching } = useRequestAvailabilityDetails(
    {
      availability_id: candidateAvailabilityId,
      user_tz: dayjsLocal.tz.guess(),
    },
    {
      enabled: !!candidateAvailabilityId,
    },
  );
  const handleConfirmSlot = async (request_id: string) => {
    try {
      const [candReq] = supabaseWrap(
        await supabase
          .from('candidate_request_availability')
          .select()
          .eq('request_id', request_id),
      );
      setCandidateAvailabilityId(candReq.id);
      setApplicationIdForConfirmAvailability(candReq.application_id);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
      });
    }
  };

  const handleReReq = async (request_id: string) => {
    const [avail_req] = supabaseWrap(
      await supabase
        .from('candidate_request_availability')
        .select()
        .eq('request_id', request_id),
    );
    setCandidateAvailabilityDrawerOpen(true);
    setReRequestAvailability(true);
    setCandidateAvailabilityIdForReRequest(avail_req.id);
  };

  return (
    <div className='flex space-x-2'>
      <UIButton
        variant='default'
        size='sm'
        onClick={async () => {
          handleConfirmSlot(requestDetails.id);
        }}
        isLoading={isFetching}
      >
        Schedule Interview
      </UIButton>
      <UIButton
        variant='outline'
        size='sm'
        onClick={() => {
          handleReReq(requestDetails.id);
        }}
      >
        Re Request Availability
      </UIButton>
    </div>
  );
};

export default CandAvailRecived;
