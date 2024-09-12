import {
  type APIUpdateMeetingInterviewers,
  type ConflictReason,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import axios from 'axios';
import { ArrowDownUp } from 'lucide-react';
import React from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useRequest } from '@/context/RequestContext';
import { api } from '@/trpc/client';

import { useMeetingList } from '../../_common/hooks';
import ConflictWithHover from '../SelfSchedulingDrawer/_common/components/ui/ConflictWithHover';
import { MemberRow } from '../SelfSchedulingDrawer/_common/components/ui/MemberRow';

const RequestDecline = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<string | null>(
    null,
  );
  const [isInterviewerChanging, setIsInterviewerChanging] =
    React.useState(false);

  const { requestDetails } = useRequest();
  const { data: meetingTime, refetch } = useMeetingList();
  const declinedUserDetails = (meetingTime ?? [])
    .flat()
    .map((item) => item.cancel_reasons)
    .flat()
    .find(
      (item) => item.interview_session_cancel.request_id === requestDetails.id,
    );
  const {
    data: alternativeInts,
    isPending,
    isSuccess: isAlternativeIntsSuccess,
    mutateAsync,
  } = api.scheduling.v1.findReplacementInts.useMutation();

  const handleGetAvailableInterviewers = async () => {
    try {
      if (isPending) return;
      await mutateAsync({
        declined_int_sesn_reln_id:
          declinedUserDetails.interview_session_cancel.session_relation_id,
        session_id: declinedUserDetails.interview_session_cancel.session_id,
      });
      setIsDialogOpen(true);
    } catch (e) {
      toast({
        title: 'Failed to get available interviewers',
        variant: 'destructive',
      });
    }
  };
  const changeInterviewer = async () => {
    try {
      setIsInterviewerChanging(true);
      const payload: APIUpdateMeetingInterviewers = {
        curr_declined_int_sesn_reln_id:
          declinedUserDetails.interview_session_cancel.session_relation_id,
        new_int_user_id: selectedMember,
        session_id: declinedUserDetails.interview_session_cancel.session_id,
      };
      await axios.post(
        '/api/scheduling/v1/update-meeting-interviewers',
        payload,
      );
      setIsDialogOpen(false);
      await refetch();
    } catch (err) {
      toast({
        title: 'Failed to change interviewer',
        variant: 'destructive',
      });
    } finally {
      setIsInterviewerChanging(false);
    }
  };
  return (
    <>
      <UIButton onClick={handleGetAvailableInterviewers} isLoading={isPending}>
        Change Interviewer
      </UIButton>
      <UIDialog
        title='Interviewers'
        open={isDialogOpen}
        size='lg'
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onClickPrimary={changeInterviewer}
        isPrimaryActionLoading={isInterviewerChanging}
      >
        <div className='flex flex-col gap-2'>
          {declinedUserDetails && (
            <div className='bg-neutral-100 p-2 rounded-md'>
              <MemberRow
                slotConflicts={<></>}
                slotInterviewerImage={
                  <MuiAvatar
                    level={getFullName(
                      declinedUserDetails.recruiter_user.first_name,
                      declinedUserDetails.recruiter_user.last_name,
                    )}
                    src={declinedUserDetails.recruiter_user.profile_image}
                    variant={'rounded'}
                    width={'100%'}
                    height={'100%'}
                  />
                }
                iconTraining={<></>}
                textName={getFullName(
                  declinedUserDetails.recruiter_user.first_name,
                  declinedUserDetails.recruiter_user.last_name,
                )}
                textRole={declinedUserDetails.recruiter_user.position}
              />
            </div>
          )}
          <div className='flex flex-row justify-center'>
            <ArrowDownUp size={18} />
          </div>
          <div className='flex flex-col gap-2'>
            {isAlternativeIntsSuccess &&
              alternativeInts.map((item) => {
                const isSelected =
                  selectedMember === item.replacement_int.user_id;
                return (
                  <div
                    key={item.replacement_int.user_id}
                    className={`bg-neutral-100 p-2 rounded-md ${
                      isSelected ? 'border-gray-100 outline' : ''
                    }`}
                    onClick={() => {
                      setSelectedMember(item.replacement_int.user_id);
                    }}
                  >
                    <MemberRow
                      key={item.replacement_int.user_id}
                      slotConflicts={
                        <ConflictWithHover
                          conflictReasons={item.conflicts as ConflictReason[]}
                          isToolTipVisible={true}
                        />
                      }
                      slotInterviewerImage={
                        <MuiAvatar
                          level={getFullName(
                            item.replacement_int.first_name,
                            item.replacement_int.last_name,
                          )}
                          src={item.replacement_int.profile_image}
                          variant={'rounded'}
                          width={'100%'}
                          height={'100%'}
                        />
                      }
                      iconTraining={<></>}
                      textName={getFullName(
                        item.replacement_int.first_name,
                        item.replacement_int.last_name,
                      )}
                      textRole={item.replacement_int.position}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </UIDialog>
    </>
  );
};

export default RequestDecline;
