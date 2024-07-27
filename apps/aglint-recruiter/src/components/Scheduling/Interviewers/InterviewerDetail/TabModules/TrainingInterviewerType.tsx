import { Collapse, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { MemberListCard } from '@/devlink2/MemberListCard';
import dayjs from '@/src/utils/dayjs';
import ROUTES from '@/src/utils/routing/routes';

import { useModuleRelations } from '../hooks';
import ThreeDot from './ThreeDot';

function TrainingInterviewerType({
  relation,
}: {
  relation: ReturnType<typeof useModuleRelations>['data'][0];
}) {
    const router = useRouter();
    const [collapseOpen, setCollapseOpen] = React.useState(false);


  return (
    <div>
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
            <Stack px={'var(--space-5)'} pb={'var(--space-5)'}>
              <Typography variant='body1'>
                {relation.module_description}
              </Typography>
            </Stack>
          </Collapse>
        }
        key={relation.module_id}
        textName={relation.module_name}
        isTextObjectiveVisible={false}
        isPauseResumeVisible={Boolean(relation.pause_json)}
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
              ROUTES['/scheduling/module/members/[module_id]']({
                module_id: relation.module_id,
              }),
            );
          },
        }}
      />
    </div>
  );
}

export default TrainingInterviewerType;
