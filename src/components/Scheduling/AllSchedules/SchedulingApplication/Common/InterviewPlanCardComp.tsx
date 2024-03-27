import { Stack } from '@mui/material';

import { InterviewPlanCard } from '@/devlink2';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { InterviewModuleType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';

import { MemberType } from '../../../Modules/types';
import { convertNumberToWord } from '../../utils';

function InterviewPlanCardComp({
  plan,
  mod,
  members
}: {
  plan: InterviewModuleDbType;
  mod: InterviewModuleType;
  members: MemberType[];
}) {
  return (
    <InterviewPlanCard
      key={plan.module_id}
      textTitle={mod?.name}
      textDuration={plan.duration + ' Minutes'}
      textMemberFrom={`${convertNumberToWord(
        plan?.meetingIntervCnt || 0
      )} Member from :`}
      slotReverseShadowmember={
        <Stack
          direction={'row'}
          sx={{
            flexWrap: 'wrap',
            gap: 2.5
          }}
        >
          {plan.revShadowInterv?.map((int) => {
            const user = members.find(
              (member) => member.user_id === int.interv_id
            );
            if (!user) return null;
            return (
              <Stack
                key={int.interv_id}
                direction={'row'}
                spacing={1}
                sx={{
                  textWrap: 'nowrap'
                }}
              >
                <AvatarWithName
                  isReverseShadowVisible={true}
                  textName={user.first_name}
                  slotAvatar={
                    <MuiAvatar
                      level={getFullName(user.first_name, user.last_name)}
                      src={user?.profile_image}
                      variant={'circular'}
                      width={'24px'}
                      height={'24px'}
                      fontSize={'12px'}
                    />
                  }
                />
              </Stack>
            );
          })}
        </Stack>
      }
      slotShadowMember={
        <Stack
          direction={'row'}
          sx={{
            flexWrap: 'wrap',
            gap: 2.5
          }}
        >
          {plan.shadowIntervs?.map((int) => {
            const user = members.find(
              (member) => member.user_id === int.interv_id
            );
            if (!user) return null;
            return (
              <Stack
                key={int.interv_id}
                direction={'row'}
                spacing={1}
                sx={{
                  textWrap: 'nowrap'
                }}
              >
                <AvatarWithName
                  isShadowVisible={true}
                  textName={user.first_name}
                  slotAvatar={
                    <MuiAvatar
                      level={getFullName(user.first_name, user.last_name)}
                      src={user?.profile_image}
                      variant={'circular'}
                      width={'24px'}
                      height={'24px'}
                      fontSize={'12px'}
                    />
                  }
                />
              </Stack>
            );
          })}
        </Stack>
      }
      isShadowMemberVisible={plan.shadowIntervs.length > 0}
      isReverseShadowVisible={plan.revShadowInterv.length > 0}
      slotMemberList={
        <Stack
          direction={'row'}
          sx={{
            flexWrap: 'wrap',
            gap: 2.5
          }}
        >
          {plan.selectedIntervs?.map((int) => {
            const user = members.find(
              (member) => member.user_id === int.interv_id
            );
            if (!user) return null;
            return (
              <AvatarWithName
                key={int.interv_id}
                textName={user.first_name}
                slotAvatar={
                  <MuiAvatar
                    level={getFullName(user.first_name, user.last_name)}
                    src={user?.profile_image}
                    variant={'circular'}
                    width={'24px'}
                    height={'24px'}
                    fontSize={'12px'}
                  />
                }
              />
            );
          })}
        </Stack>
      }
    />
  );
}

export default InterviewPlanCardComp;
