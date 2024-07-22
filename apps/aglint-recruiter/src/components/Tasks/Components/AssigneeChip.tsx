import { RecruiterUserType } from '@aglint/shared-types';
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { Box, Stack, Typography, Zoom } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AgentPill } from '@/devlink3/AgentPill';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ListCard } from '@/devlink3/ListCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
// import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import AssigneeDetailsCard, { LightTooltip } from './AssigneeDetailsCard';

function AssigneeChip({
  assigneeId,
  disableHoverListener = false,
  isOnlyName = false,
}: {
  assigneeId: string;
  disableHoverListener?: boolean;
  isOnlyName?: boolean;
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
      <ShowCode.When isTrue={assigneeId === SystemAgentId}>
        <AvatarWithName
          isAvatarVisible={true}
          isCandidateIconVisible={false}
          slotAvatar={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <GlobalIcon
                iconName='computer'
                size={6}
                weight={'regular'}
                color='neutral-8'
              />
            </Box>
          }
          textName={'System'}
        />
      </ShowCode.When>
      <ShowCode.When isTrue={Boolean(assigneeDetails?.first_name)}>
        <LightTooltip
          // open={true}
          disableHoverListener={disableHoverListener}
          TransitionComponent={Zoom}
          title={<AssigneeDetailsCard assigneeDetails={assigneeDetails} />}
          arrow={true}
          sx={{
            '& .MuiTooltip-tooltip': {
              padding: '0px',
            },
          }}
        >
          <Stack sx={{ cursor: 'pointer' }}>
            <ListCard
              isAvatarWithNameVisible={true}
              isListVisible={false}
              slotAvatarWithName={
                assigneeDetails &&
                (isOnlyName ? (
                  <b>
                    {getFullName(
                      assigneeDetails.first_name,
                      assigneeDetails.last_name,
                    )}
                  </b>
                ) : (
                  <AvatarWithName
                    slotAvatar={
                      <MuiAvatar
                        src={assigneeDetails.profile_image}
                        variant='rounded-small'
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
                        <Typography variant='caption' fontSize={'10px'}>
                          {capitalizeAll(assigneeDetails?.role)}
                        </Typography>
                      </Stack>
                    }
                  />
                ))
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
