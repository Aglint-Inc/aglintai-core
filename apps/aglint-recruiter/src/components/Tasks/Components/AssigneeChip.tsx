import { RecruiterUserType } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { AgentPill, AvatarWithName, ListCard } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
// import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import { EmailAgentId, PhoneAgentId } from '../utils';
import AssigneeDetailsCard, { LightTooltip } from './AssigneeDetailsCard';

function AssigneeChip({
  assigneeId,
  disableHoverListener = false,
}: {
  assigneeId: string;
  disableHoverListener?: boolean;
}) {
  const { members } = useAuthDetails();
  // const { data: members } = useInterviewerList();
  const assigneeDetails =
    members && members.find((item) => item.user_id === assigneeId);

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
        <LightTooltip
          // open={true}
          disableHoverListener={disableHoverListener}
          // TransitionComponent={Zoom}
          title={<AssigneeDetailsCard assigneeDetails={assigneeDetails} />}
        >
          <Stack>
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
                            (assigneeDetails?.last_name ?? ''),
                        )}
                      />
                    }
                    textName={
                      <Stack>
                        <Typography fontSize={'14px'}>
                          {capitalizeAll(
                            assigneeDetails?.first_name +
                              ' ' +
                              (assigneeDetails?.last_name ?? ''),
                          )}{' '}
                        </Typography>
                        {/* <Typography variant='caption' fontSize={'12px'}>
                          {capitalizeAll(assigneeDetails?.position)}
                        </Typography> */}
                      </Stack>
                    }
                  />
                )
              }
            />
          </Stack>
        </LightTooltip>
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
