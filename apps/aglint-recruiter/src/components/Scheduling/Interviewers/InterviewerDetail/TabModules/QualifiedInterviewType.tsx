import { Collapse, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { MemberListCard } from '@/devlink2/MemberListCard';
import dayjs from '@/src/utils/dayjs';
import ROUTES from '@/src/utils/routing/routes';

import { type useModuleRelations } from '../hooks';
import ThreeDot from './ThreeDot';

function QualifiedInterviewTypeCard({
  relation,
}: {
  relation: ReturnType<typeof useModuleRelations>['data'][0];
}) {
  const router = useRouter();
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <MemberListCard
      isDropdownIconVisible={true}
      onClickDropdownIcon={{
        onClick: () => {
          setCollapseOpen((pre) => !pre);
        },
      }}
      slotThreeDot={<ThreeDot relation={relation} />}
      isTrainingProgessVisible={true}
      isTrainingProgressDetailVisible={true}
      slotTrainingProgressDetail={
        <Collapse in={collapseOpen}>
          <Stack pb={'var(--space-5)'} pl={'var(--space-3)'}>
            <Typography variant='body1'>
              {relation.module_description}
            </Typography>
          </Stack>
        </Collapse>
      }
      key={relation.module_id}
      textName={relation.module_name}
      isTextObjectiveVisible={false}
      isPauseResumeVisible={relation.pause_json ? true : false}
      isScheduleCountVisible={true}
      isProfileVisible={false}
      isInterviewsVisible={false}
      textConfirmed={relation.confirmed_meeting_count}
      textCancel={relation.cancelled_meeting_count}
      countCompletedSchedule={relation.completed_meeting_count}
      textPause={
        'Paused from assigning to new interviews with this interview type'
      }
      textPauseResumeDate={
        relation.pause_json
          ? relation.pause_json.isManual
            ? 'Indefinitely'
            : relation.pause_json.end_date
              ? `Until ${dayjs(relation.pause_json.end_date).format('DD MMMM YYYY')}`
              : '--'
          : ''
      }
      onClickCard={{
        onClick: () => {
          router.push(
            ROUTES['/scheduling/interview-types/[type_id]']({
              type_id: relation.module_id,
            }),
          );
        },
      }}
    />
  );
}

export default QualifiedInterviewTypeCard;
