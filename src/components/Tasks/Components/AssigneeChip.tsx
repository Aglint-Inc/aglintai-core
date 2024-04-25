import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AgentPill, AvatarWithName, ListCard } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
// import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import { EmailAgentId, PhoneAgentId } from '../utils';

function AssigneeChip({ assigneeId }: { assigneeId: string }) {
  const { data: members } = useInterviewerList();

  const assigneeDetails =
    members &&
    members
      .map((item) => item.rec_user)
      .find((item) => item.user_id === assigneeId);
  return (
    <ShowCode>
      <ShowCode.When isTrue={assigneeId === EmailAgentId}>
        <AgentPill
          isEmailAgentVisible={assigneeId === EmailAgentId}
          isPhoneAgentVisible={false}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={assigneeId === PhoneAgentId}>
        <AgentPill
          isEmailAgentVisible={false}
          isPhoneAgentVisible={assigneeId === PhoneAgentId}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={Boolean(assigneeDetails?.first_name)}>
        <ListCard
          isAvatarWithNameVisible={true}
          isListVisible={false}
          slotAvatarWithName={
            assigneeDetails && (
              <AvatarWithName
                slotAvatar={
                  <MuiAvatar
                    height={'25px'}
                    width={'25px'}
                    src={assigneeDetails.profile_image}
                    variant='circular'
                    fontSize='14px'
                    level={capitalizeAll(
                      assigneeDetails?.first_name +
                        ' ' +
                        assigneeDetails?.last_name,
                    )}
                  />
                }
                textName={capitalizeAll(
                  assigneeDetails?.first_name +
                    ' ' +
                    assigneeDetails?.last_name,
                )}
              />
            )
          }
        />
      </ShowCode.When>
    </ShowCode>
  );
}

export default AssigneeChip;

export const useInterviewerList = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['interviewer_list'],
    queryFn: () => getInterviewerList(recruiter.id),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['interviewer_list'] });
  return { ...query, refetch };
};
async function getInterviewerList(recruiter_id: string) {
  const { data, error } = await supabase.rpc('get_interviewers', {
    rec_id: recruiter_id,
  });
  if (error) throw Error(error.message);
  else
    return data as unknown as {
      rec_user: RecruiterUserType;
      qualified_module_names: string[];
      training_module_names: string[];
      upcoming_meeting_count: number;
      completed_meeting_count: number;
    }[];
}
