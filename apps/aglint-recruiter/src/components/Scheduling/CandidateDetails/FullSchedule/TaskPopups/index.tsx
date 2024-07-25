import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { TextWithIcon } from '@/devlink2/TextWithIcon';

import {
  setDateRange,
  setIsScheduleNowOpen,
  setSelectedTaskId,
  setStepScheduling,
  useSchedulingFlowStore,
} from '../../SchedulingDrawer/store';
import {
  setRescheduleSessionIds,
  setSelectedTasks,
  useSchedulingApplicationStore,
} from '../../store';
import { getTaskDetails } from '../../utils';

function TaskPopups() {
  const router = useRouter();
  const { updateRequestAvailibityId } = useSchedulingFlowStore();
  const { selectedTasks, initialSessions } = useSchedulingApplicationStore();
  useEffect(() => {
    if (router.query.application_id) {
      getTask();
    }
  }, [updateRequestAvailibityId]);

  const getTask = async () => {
    const data = await getTaskDetails(router.query.application_id as string);
    setSelectedTasks(data);
  };

  const conflict =
    selectedTasks &&
    selectedTasks.length === 1 &&
    initialSessions &&
    selectedTasks[0]?.session_ids &&
    initialSessions
      .filter((ele) =>
        selectedTasks[0]?.session_ids
          .map((ele) => ele.id)
          .includes(ele.interview_session.id),
      )
      .map((ele) => ele.banners)
      .flat();
  const checkDate =
    selectedTasks?.length &&
    dayjsLocal(selectedTasks[0]?.due_date).isBefore(
      dayjsLocal().add(-1, 'day'),
    );

  return (
    <Stack direction={'column'} gap={1}>
      {!checkDate &&
        selectedTasks &&
        selectedTasks.length === 1 &&
        selectedTasks[0].latest_progress?.progress_type === 'schedule' &&
        selectedTasks[0].assignee[0] !== EmailAgentId &&
        selectedTasks[0].assignee[0] !== PhoneAgentId &&
        selectedTasks[0].session_ids.length && (
          <GlobalBannerShort
            color={conflict.length ? 'error' : 'warning'}
            textTitle={`Task created for scheduling ${selectedTasks[0].session_ids.map((ele) => `${ele.name}`)}`}
            textDescription={
              conflict.length > 0 && (
                <TextWithIcon
                  iconSize={4}
                  iconName={'warning'}
                  color={'error'}
                  textContent={
                    'Unable to schedule this task as there are conflicting sessions.'
                  }
                />
              )
            }
            iconName={'check_circle'}
            slotButtons={
              <>
                {conflict.length === 0 && (
                  <ButtonSolid
                    isDisabled={Boolean(conflict.length)}
                    textButton={'Schedule now'}
                    isLoading={false}
                    isLeftIcon={false}
                    isRightIcon={false}
                    size={1}
                    onClickButton={{
                      onClick: () => {
                        setRescheduleSessionIds(
                          selectedTasks[0].session_ids.map((ele) => ele.id),
                        );
                        setStepScheduling('schedule_all_options');
                        setDateRange({
                          start_date:
                            selectedTasks[0].schedule_date_range.start_date,
                          end_date:
                            selectedTasks[0].schedule_date_range.end_date,
                        });
                        setSelectedTaskId(selectedTasks[0].id);
                        // setSelectedSessionIds(
                        //   tasks[0].session_ids.map((ele) => ele.id),
                        // );
                        setIsScheduleNowOpen(true);
                      },
                    }}
                  />
                )}
              </>
            }
          />
        )}
    </Stack>
  );
}

export default TaskPopups;
