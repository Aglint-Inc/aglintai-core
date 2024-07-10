import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { onClickResendInvite } from '@/src/components/Scheduling/CandidateDetails/utils';
import { EmailAgentIcon } from '@/src/components/Tasks/Components/EmailAgentIcon';
import { useTaskStatesContext } from '@/src/components/Tasks/TaskStatesContext';
import {
  createTaskProgress,
  getTaskActionCount,
} from '@/src/components/Tasks/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { getFullName } from '@/src/utils/jsonResume';

function AgentFollowUpCard({
  progress_created_at,
}: {
  progress_created_at: string;
}) {
  const { setOpenPhoneFollowUp, assignerList } = useTaskStatesContext();

  const { tasks, handelUpdateTask } = useTasksContext();

  const router = useRouter();
  const selectedTask = tasks.find((ele) => ele.id === router.query?.task_id);
  const { recruiterUser } = useAuthDetails();
  function setFollowUpEmail() {
    const assignee = assignerList.find(
      (ele) => ele.user_id === recruiterUser.user_id,
    );
    onClickResendInvite({
      application_id: selectedTask.application_id,
      candidate_name: getFullName(
        selectedTask.applications.candidates.first_name,
        selectedTask.applications.candidates.first_name,
      ),
      rec_user_id: recruiterUser.user_id,
      filter_id: selectedTask.filter_id,
      session_name: `${selectedTask.session_ids.map((ses) => ses.name).join(' , ')}`,
      request_id: null,
      task_id: selectedTask.id,
    });

    createTaskProgress({
      type: 'email_followUp_reminder',
      data: {
        task_id: router.query.task_id as string,
        created_by: {
          name: recruiterUser.first_name,
          id: recruiterUser.user_id,
        },
        progress_type: 'email_follow_up_reminder',
      },
      optionData: {
        assignerId: assignee.user_id,
        assignerName: getFullName(assignee.first_name, assignee.last_name),
        timeFormat: dayjs().toString(),
      },
    });
    const emailFollowUpActionCount = getTaskActionCount({
      preValue: { ...selectedTask.task_action },
      taskActionType: 'email_followUp_reminder',
    });
    handelUpdateTask([
      { id: selectedTask.id, task_action: emailFollowUpActionCount },
    ]);
  }
  return (
    <Stack mt={2}>
      <GlobalBannerShort
        iconName={<EmailAgentIcon />}
        textTitle={'Agent Follow-up'}
        textDescription={`It's been ${dayjs(progress_created_at).fromNow().replace('ago', '')} since the candidate replied to this email.`}
        slotButtons={
          <>
            <ButtonSolid
              size={1}
              textButton={'Make a Flow-up Call'}
              isLeftIcon={true}
              iconName={'call'}
              onClickButton={{
                onClick: () => {
                  setOpenPhoneFollowUp(true);
                },
              }}
            />
            <ButtonSoft
              size={1}
              isLeftIcon={true}
              iconName={'mail'}
              textButton={'Send Follow-up Email'}
              onClickButton={{
                onClick: setFollowUpEmail,
              }}
            />
          </>
        }
      />
    </Stack>
  );
}

export default AgentFollowUpCard;
