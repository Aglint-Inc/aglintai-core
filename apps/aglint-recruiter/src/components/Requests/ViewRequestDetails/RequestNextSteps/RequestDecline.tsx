import React from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import UIDialog from '@/components/Common/UIDialog';
import { ChangeInterviewer } from '@devlink3/ChangeInterviewer';
import { toast } from '@components/hooks/use-toast';
import axios from 'axios';
import { APIFindAltenativeTimeSlot } from '@aglint/shared-types';
import { useRequest } from '@/context/RequestContext';
import { useMeetingList } from '../../_common/hooks';

const RequestDecline = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const { requestDetails } = useRequest();
  const { data: meetingTime } = useMeetingList();

  const handleGetAvailableInterviewers = async () => {
    try {
      const declinedUserDetails = meetingTime
        .flat()
        .map((item) => item.cancel_reasons)
        .flat()
        .map((item) => item.interview_session_cancel)
        .find((item) => item.request_id === requestDetails.id);

      const payload: APIFindAltenativeTimeSlot = {
        declined_int_sesn_reln_id: declinedUserDetails.session_relation_id,
        session_id: declinedUserDetails.session_id,
      };
      console.log('payload', payload);
      const { data } = await axios.post(
        '/api/scheduling/v1/find-replacement-ints',
        payload,
      );
      console.log(data);
      setIsDialogOpen(true);
    } catch (e) {
      toast({
        title: 'Failed to get available interviewers',
        variant: 'destructive',
      });
    }
  };
  return (
    <>
      <UIButton onClick={handleGetAvailableInterviewers}>asdasd</UIButton>
      <UIDialog
        open={isDialogOpen}
        size='lg'
        onClose={() => {
          setIsDialogOpen(false);
        }}
      >
        <ChangeInterviewer
          slotInterviewerList={<></>}
          slotProfileImage={<></>}
          textName={''}
          textAvailableDesc={''}
          textDesignation={''}
        />
      </UIDialog>
    </>
  );
};

export default RequestDecline;
