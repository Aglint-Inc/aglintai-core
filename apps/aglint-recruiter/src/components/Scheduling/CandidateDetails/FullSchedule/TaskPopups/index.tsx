import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';

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
  const { selectedTasks } = useSchedulingApplicationStore();
  useEffect(() => {
    if (router.query.application_id) {
      getTask();
    }
  }, [updateRequestAvailibityId]);

  const getTask = async () => {
    const data = await getTaskDetails(router.query.application_id as string);
    setSelectedTasks(data);
  };

  return (
    <Stack direction={'column'} gap={1}>
      {selectedTasks &&
        selectedTasks.length === 1 &&
        selectedTasks[0].latest_progress?.progress_type === 'schedule' &&
        selectedTasks[0].assignee[0] !== EmailAgentId &&
        selectedTasks[0].assignee[0] !== PhoneAgentId &&
        selectedTasks[0].session_ids.length && (
          <GlobalBannerShort
            color={'warning'}
            textTitle={`Task created for scheduling ${selectedTasks[0].session_ids.map((ele) => `${ele.name}`)}`}
            textDescription={''}
            iconName={'schedule'}
            slotButtons={
              <>
                <ButtonSolid
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
                        end_date: selectedTasks[0].schedule_date_range.end_date,
                      });
                      setSelectedTaskId(selectedTasks[0].id);
                      // setSelectedSessionIds(
                      //   tasks[0].session_ids.map((ele) => ele.id),
                      // );
                      setIsScheduleNowOpen(true);
                    },
                  }}
                />
              </>
            }
          />
        )}
    </Stack>
  );
}

export default TaskPopups;
