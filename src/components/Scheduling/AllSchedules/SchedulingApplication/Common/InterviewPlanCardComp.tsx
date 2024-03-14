import { Badge, Stack, Typography } from '@mui/material';
import React from 'react';

import { InterviewPlanCard } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { InterviewModuleDbType } from '@/src/components/JobInterviewPlan/types';
import { MemberType } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { InterviewModuleType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';

import { convertToWord } from '../../utils';

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
      textMemberFrom={`${convertToWord(
        plan?.meetingIntervCnt || 0
      )} Member from :`}
      slotMemberList={
        <Stack
          direction={'row'}
          sx={{
            flexWrap: 'wrap',
            gap: 2.5
          }}
        >
          {plan.selectedIntervs.map((int) => {
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
                <MuiAvatar
                  level={getFullName(user.first_name, user.last_name)}
                  src={user?.profile_image}
                  variant={'circular'}
                  width={'24px'}
                  height={'24px'}
                  fontSize={'12px'}
                />
                <Typography variant={'body2'} color={'#000'}>
                  {getFullName(user.first_name, user.last_name)}
                </Typography>
              </Stack>
            );
          })}
          {plan.shadowIntervs.map((int) => {
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
                <Badge
                  key={int.interv_id}
                  color='secondary'
                  overlap='circular'
                  badgeContent={<>S</>}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  style={{
                    fontSize: '10px'
                  }}
                >
                  <MuiAvatar
                    level={getFullName(user.first_name, user.last_name)}
                    src={user?.profile_image}
                    variant={'circular'}
                    width={'24px'}
                    height={'24px'}
                    fontSize={'12px'}
                  />
                </Badge>

                <Typography variant={'body2'} color={'#000'}>
                  {getFullName(user.first_name, user.last_name)}
                </Typography>
              </Stack>
            );
          })}
          {plan.revShadowInterv.map((int) => {
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
                <Badge
                  key={int.interv_id}
                  color='secondary'
                  overlap='circular'
                  badgeContent={<>R</>}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                >
                  <MuiAvatar
                    level={getFullName(user.first_name, user.last_name)}
                    src={user?.profile_image}
                    variant={'circular'}
                    width={'24px'}
                    height={'24px'}
                    fontSize={'12px'}
                  />
                </Badge>

                <Typography variant={'body2'} color={'#000'}>
                  {getFullName(user.first_name, user.last_name)}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      }
    />
  );
}

export default InterviewPlanCardComp;
