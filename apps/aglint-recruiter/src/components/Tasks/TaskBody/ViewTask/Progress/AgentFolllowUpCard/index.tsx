import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { AgentFollowUp } from '@/devlink3/AgentFollowUp';
import { onClickResendInvite } from '@/src/components/Scheduling/CandidateDetails/utils';
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
  const { recruiterUser, recruiter } = useAuthDetails();
  function setFollowUpEmail() {
    const assignee = assignerList.find(
      (ele) => ele.user_id === recruiterUser.user_id,
    );
    onClickResendInvite({
      application_id: selectedTask.application_id,
      candidate_email: selectedTask.applications.candidates.email,
      candidate_name: getFullName(
        selectedTask.applications.candidates.first_name,
        selectedTask.applications.candidates.first_name,
      ),
      job_title: selectedTask.applications.public_jobs.job_title,
      rec_email: recruiter.email,
      rec_user_id: recruiterUser.user_id,
      recruiter_id: recruiter.id,
      filter_id: selectedTask.filter_id,
      schedule_id: '',
      session_name: '',
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
    <AgentFollowUp
      isEmailAgentIcon={false}
      isCallAgain={false}
      isConactViaEmail={false}
      isPhoneAgentIcon={true}
      isMakeAPhoneCall={true}
      isSendFollowupEmail={true}
      textFollowup={`It's been ${dayjs(progress_created_at).fromNow().replace('ago', '')} since the candidate replied to this email.`}
      onClickMakeAPhoneCall={{
        onClick: () => {
          setOpenPhoneFollowUp(true);
        },
      }}
      onClickSendFollowupEmail={{
        onClick: () => {
          setFollowUpEmail();
        },
      }}
    />
  );
}

export default AgentFollowUpCard;
