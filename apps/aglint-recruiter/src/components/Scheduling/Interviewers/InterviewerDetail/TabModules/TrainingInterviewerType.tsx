import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import dayjs from '@/utils/dayjs';
import ROUTES from '@/utils/routing/routes';

import { HistoryPillShadcn } from '../../../../Common/Member/HistoryPill';
import { MemberListCardShadcn } from '../../../../Common/Member/MemberListCard';
import { type PillsTraining } from '../../../InterviewTypes/DetailPage/_common/components/old/SlotTrainingMembers/IndividualCard';
import CollapseTrainingProgress from '../../../InterviewTypes/DetailPage/_common/components/old/SlotTrainingMembers/IndividualCard/Collapse';
import { useModuleRelations, useTrainingProgressUser } from '../hooks';
import ThreeDot from './ThreeDot';

function TrainingInterviewerType({
  relation,
  refetch: relationRefetch,
}: {
  relation: ReturnType<typeof useModuleRelations>['data'][0];
  refetch: () => void;
}) {
  const router = useRouter();
  const user_id = router?.query?.member_id as string;
  const { refetch } = useModuleRelations({
    user_id,
  });
  const { data, refetch: refetchTrainingProgress } = useTrainingProgressUser({
    user_id,
  });
  const [collapseOpen, setCollapseOpen] = useState(false);

  const progressDataUser =
    data?.filter(
      (rel) => rel.interview_session.module_id === relation.module_id,
    ) || [];

  const shadowProgress = progressDataUser.filter(
    (prog) =>
      prog.interview_session_relation.training_type == 'shadow' &&
      prog.interview_module_relation,
  );
  const mutatedShadowProgress = Array.from({
    length: relation.number_of_shadow - shadowProgress.length,
  });

  const reverseShadowProgress = progressDataUser.filter(
    (prog) =>
      prog.interview_session_relation.training_type == 'reverse_shadow' &&
      prog.interview_module_relation,
  );
  const mutatedReverseShadowProgress = Array.from({
    length: relation.number_of_reverse_shadow - reverseShadowProgress.length,
  });

  const pills: PillsTraining[] = [
    ...shadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: true };
    }),
    ...mutatedShadowProgress.map(() => {
      return { sessionType: 'shadow' as const, completed: false };
    }),
    ...reverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: true };
    }),
    ...mutatedReverseShadowProgress.map(() => {
      return { sessionType: 'rshadow' as const, completed: false };
    }),
  ];

  return (
    <>
      <MemberListCardShadcn
        isThreeDotVisible={true}
        isDropdownIconVisible={true}
        onClickDropdownIcon={{
          onClick: () => {
            setCollapseOpen((pre) => !pre);
          },
        }}
        slotThreeDot={<ThreeDot relation={relation} />}
        isTrainingProgessVisible={true}
        isTrainingProgressDetailVisible={true}
        isTrainingCompletedVisible={false}
        slotProgressBar={
          <Stack
            direction={'row'}
            overflow={'hidden'}
            borderRadius={'var(--radius-2)'}
            spacing={'2px'}
          >
            {pills.map((pill, i) => (
              <HistoryPillShadcn
                key={i}
                isShadow={pill.sessionType === 'shadow'}
                isReverseShadow={pill.sessionType === 'rshadow'}
                isActive={pill.completed}
              />
            ))}
          </Stack>
        }
        slotTrainingProgressDetail={
          <CollapseTrainingProgress
            refetch={refetch}
            refetchTrainingProgress={refetchTrainingProgress}
            relationRefetch={relationRefetch}
            reverse_shadow_to_complete={relation.number_of_reverse_shadow}
            shadow_to_complete={relation.number_of_shadow}
            module_realtion_id={relation.id}
            isCollapseOpen={collapseOpen}
            setIsCollapseOpen={setCollapseOpen}
            mutatedReverseShadowProgress={mutatedReverseShadowProgress}
            mutatedShadowProgress={mutatedShadowProgress}
            reverseShadowProgress={reverseShadowProgress}
            shadowProgress={shadowProgress}
          />
        }
        key={relation.module_id}
        textName={relation.module_name}
        // textName={relation.module_name}
        isTextObjectiveVisible={false}
        isPauseResumeVisible={Boolean(relation.pause_json)}
        isScheduleCountVisible={false}
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
              ROUTES['/interview-pool/[type_id]']({
                type_id: relation.module_id,
              }),
            );
          },
        }}
      />
    </>
  );
}

export default TrainingInterviewerType;
