import { DatabaseView } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GeneralBanner } from '@/devlink/GeneralBanner';
import { supabase } from '@/src/utils/supabase/client';

import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../store';

function TaskPopups() {
  const [tasks, setTasks] = useState<DatabaseView['tasks_view'][]>(null);
  const router = useRouter();
  useEffect(() => {
    if (router.query.application_id) {
      getTaskDetails(router.query.application_id as string);
    }
  }, [router.query?.candidate_request_availability]);

  const getTaskDetails = async (application_id: string) => {
    const { data } = await supabase
      .from('tasks_view')
      .select('*')
      .eq('application_id', application_id);

    setTasks(data);
  };
  return (
    <Stack direction={'column'} gap={1}>
      {tasks &&
        tasks.length === 1 &&
        tasks[0].latest_progress?.progress_type === 'schedule' &&
        tasks[0].assignee[0] !== EmailAgentId &&
        tasks[0].assignee[0] !== PhoneAgentId && (
          <GeneralBanner
            textHeading={`Task created for scheduling ${tasks[0].session_ids.map((ele) => `${ele.name}`)}`}
            textDesc={''}
            slotButton={
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
                        tasks[0].session_ids.map((ele) => ele.id),
                      );
                      setStepScheduling('reschedule');
                      setDateRange({
                        start_date: tasks[0].schedule_date_range.start_date,
                        end_date: tasks[0].schedule_date_range.end_date,
                      });
                      router.push(
                        `/scheduling/application/${router.query.application_id}?task_id=${tasks[0].id}`,
                      );
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
