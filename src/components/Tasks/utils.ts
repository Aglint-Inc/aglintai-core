/* eslint-disable no-unused-vars */
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';

import { Supabase } from '@/src/apiUtils/job/jobApplications/candidateUpload/types';
import { ApplicationType } from '@/src/context/CandidateAssessment/types';
import { DatabaseEnums } from '@/src/types/customSchema';
import { CandidateType, RecruiterUserType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { meetingCardType } from './TaskBody/ViewTask/Progress/SessionCard';
import { groupByTextType } from './TaskStatesContext';

export const EmailAgentId = '5acd5b49-a53d-4fc6-9365-ed5c7a7c08c1';
export const PhoneAgentId = '241409e5-45c6-451a-b576-c54388924e76';

export type assigneeType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};

export type JobCandidatesType = ApplicationType & {
  candidates: CandidateType;
};

export const agentsDetails = [
  {
    user_id: EmailAgentId,
    first_name: 'email',
    last_name: 'agent',
    assignee: 'Agents',
    profile_image: '',
  },
  {
    user_id: PhoneAgentId,
    first_name: 'phone',
    last_name: 'agent',
    assignee: 'Agents',
    profile_image: '',
  },
];

export async function extractDataFromText(
  text: string,
  recruiterUserId: string,
) {
  const { data } = await axios.post('/api/ai/queryToJson', {
    // As an AI, your task is to translate recruiters' scheduling requests into the JSON format shown below. When generating schedule times, ensure all appointments are set on business days (Monday through Friday). Here is an example request: "Schedule a first-round interview for John Doe on the next available Friday afternoon." Use this information to create a JSON object that organizes the interview details appropriately, including whether the scheduling should be coordinated via email or phone call.
    prompts: [
      {
        role: 'system',
        content: `
        query is >>> ${text} <<<
        
          set this data to json object
          {
            "name":"extract task name",
            "type":'enum("schedule")',
            "start_date":"'extract the date and time ( MM-DD-YYYY HH:mm:ss )' || 'current date'
            ",
            "end_date":" 'extract the date and time ( MM-DD-YYYY HH:mm:ss )' || 'current date'
            ",
            "assignee":"
            if(query.includes('phone') || query.includes('call'))
            return ${PhoneAgentId}
            else if(query.includes('email')) 
            return ${EmailAgentId}
            else ${recruiterUserId}
            ",
          } 
  
          Reference details:
           today date is ${dayjs().toString()}
          `,
      },
    ],
  });
  return JSON.parse(data);
}

type ProgressType =
  | 'slots_failed'
  | 'session_update'
  | 'due_date_update'
  | 'priority_update'
  | 'change_assignee'
  | 'status_update'
  | 'create_task'
  | 'schedule_date_update'
  | 'trigger_time_update';

type optionDataType = {
  assignerId?: string;
  assignerName?: string;
  currentAssigneeName?: string;
  currentAssigneeId?: string;
  currentStatus?: DatabaseEnums['task_status'];
  status?: DatabaseEnums['task_status'];
  supabse?: Supabase;
  scheduleDateRange?: {
    start_date: string | null;
    end_date: string | null;
  };
  prevScheduleDateRange?: {
    start_date: string | null;
    end_date: string | null;
  };
  triggerTime?: {
    prev: string;
    current: string;
  };
  sessions?: meetingCardType[] | null;
  candidateName?: string;
  priority?: DatabaseEnums['task_priority'];
  currentPriority?: DatabaseEnums['task_priority'];
  dueDate?: {
    prev: string;
    selectedDate: string;
  };
  currentSessions?: meetingCardType[];
  selectedSession?: meetingCardType[];
};

export async function createTaskProgress({
  type,
  optionData,
  data,
  supabaseCaller = supabase,
}: {
  type: ProgressType;
  optionData?: optionDataType;
  data: {
    task_id: string;
    created_by: {
      name: string;
      id: string;
    };
    progress_type: DatabaseEnums['progress_type'];
    jsonb_data?: null;
  };
  supabaseCaller?: ReturnType<typeof createServerClient<Database>>;
}) {
  var {
    assignerId,
    assignerName,
    currentAssigneeName,
    currentAssigneeId,
    currentStatus,
    status,
    scheduleDateRange,
    prevScheduleDateRange,
    triggerTime,
    candidateName,
    sessions,
    priority,
    currentPriority,
    dueDate,
    currentSessions,
    selectedSession,
  } = optionData;
  const progressTitle = (cusType: ProgressType) => {
    const removedSessions = currentSessions?.filter(
      (ele) => !selectedSession?.map((ele) => ele.id).includes(ele.id),
    );
    const addedSessions = selectedSession?.filter(
      (ele) => !currentSessions?.map((ele) => ele.id).includes(ele.id),
    );

    switch (cusType) {
      case 'session_update':
        return addedSessions.length
          ? `Added <b>${addedSessions
              .map((ele) => ele.name)
              .join(', ')}</b> to interview.`
          : removedSessions.length
            ? `Removed <b>${removedSessions
                .map((ele) => ele.name)
                .join(', ')}</b> from interview.`
            : '';

      case 'due_date_update':
        return `Due Date changed from <span class="progress_date_section">${dayjs(
          dueDate.prev,
        ).format(
          'MMM DD, hh:mm A',
        )}</span> to <span class="progress_date_section">${dayjs(
          dueDate.selectedDate,
        ).format('MMM DD, hh:mm A')}</span>.`;
      case 'priority_update':
        return `Priority changed from <span class="priority_card_${currentPriority}">${currentPriority}</span> to <span class="priority_card_${priority}">${priority}</span>.`;
      case 'create_task':
        return `Created task for <span class="mention">@${candidateName}</span> to schedule interviews for <b>${sessions
          .map((ele) => ele.name)
          .join(', ')}</b>.`;
      case 'change_assignee':
        return `Assignee changed from <span ${
          currentAssigneeId === EmailAgentId ||
          currentAssigneeId === PhoneAgentId
            ? 'class="agent_mention"'
            : 'class="mention"'
        }>@${capitalizeAll(currentAssigneeName)}</span> to <span ${
          assignerId === EmailAgentId || assignerId === PhoneAgentId
            ? 'class="agent_mention"'
            : 'class="mention"'
        }>@${capitalizeAll(assignerName)}</span>.`;
      case 'status_update':
        return `Status changed from <span class="${currentStatus}">${capitalizeAll(
          currentStatus.split('_').join(' '),
        )}</span> to <span class="${status}">${capitalizeAll(
          status.split('_').join(' '),
        )}</span>`;
      case 'schedule_date_update':
        return `Interview Date changed from (<span class="progress_date_section">${dayjs(
          prevScheduleDateRange.start_date,
        ).format('MMM DD')} ${
          prevScheduleDateRange.end_date
            ? ' - ' + dayjs(prevScheduleDateRange.end_date).format('MMM DD')
            : ''
        }</span>) to (<span class="progress_date_section">${dayjs(
          scheduleDateRange.start_date,
        ).format('MMM DD')} ${
          scheduleDateRange.end_date
            ? ' - ' + dayjs(scheduleDateRange.end_date).format('MMM DD')
            : ''
        }</span>)`;
      case 'trigger_time_update':
        return `Schedule time changed from <span class="progress_date_section">${dayjs(
          triggerTime.prev,
        ).format(
          'MMM DD, hh:mm A',
        )}</span> to <span class="progress_date_section">${dayjs(
          triggerTime.current,
        ).format('MMM DD, hh:mm A')}</span>`;
      case 'slots_failed':
        return `Unable to find slots between (<span class="progress_date_section">${dayjs(
          prevScheduleDateRange.start_date,
        ).format('MMM DD')} ${
          prevScheduleDateRange.end_date
            ? ' - ' + dayjs(prevScheduleDateRange.end_date).format('MMM DD')
            : ''
        }</span>)`;
      default:
        return '';
    }
  };

  const { error, data: progress } = await supabaseCaller
    .from('new_tasks_progress')
    .insert({ ...data, title: progressTitle(type) })
    .select();
  if (!error) {
    return progress;
  }
}

export function getFormattedTask({
  tasks,
  selectedGroupBy,
}: {
  tasks: TasksAgentContextType['tasks'];
  selectedGroupBy: groupByTextType;
}) {
  const groupedTasksByJob = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { applications, ...taskDetails } = task;
      if (!acc[applications.public_jobs.job_title]) {
        acc[applications.public_jobs.job_title] = { job: {}, tasklist: [] };
      }
      acc[applications.public_jobs.job_title].job =
        task.applications.public_jobs.job_title;
      acc[applications.public_jobs.job_title].tasklist.push(taskDetails);
      return acc;
    }, {});
  const groupedTasksByCandidate = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { application_id, ...taskDetails } = task;
      if (!acc[application_id]) {
        acc[application_id] = { applications: {}, tasklist: [] };
      }
      acc[application_id].applications = task.applications;
      acc[application_id].tasklist.push(taskDetails);
      return acc;
    }, {});
  const groupedTasksByPriority = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { priority, ...taskDetails } = task;
      if (!acc[priority]) {
        acc[priority] = { priority: {}, tasklist: [] };
      }
      acc[priority].priority = task.priority;
      acc[priority].tasklist.push({ priority, ...taskDetails });
      return acc;
    }, {});
  const groupedTasksByStatus = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { status, ...taskDetails } = task;
      if (!acc[status]) {
        acc[status] = { status: {}, tasklist: [] };
      }
      acc[status].status = task.status;
      acc[status].tasklist.push({ status, ...taskDetails });
      return acc;
    }, {});

  const groupedTasksByAssignee = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { assignee, ...taskDetails } = task;
      if (!acc[assignee[0]]) {
        acc[assignee[0]] = { assignee: {}, tasklist: [] };
      }
      acc[assignee[0]].assignee = task.assignee[0];
      acc[assignee[0]].tasklist.push({ assignee, ...taskDetails });
      return acc;
    }, {});
  if (selectedGroupBy.label == 'candidate') {
    return Object.values(groupedTasksByCandidate) as {
      applications: TasksAgentContextType['tasks'][number]['applications'];
      tasklist: TasksAgentContextType['tasks'];
    }[];
  }
  if (selectedGroupBy.label == 'priority') {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };
    return (
      Object.values(groupedTasksByPriority) as {
        priority: TasksAgentContextType['tasks'][number]['priority'];
        tasklist: TasksAgentContextType['tasks'];
      }[]
    ).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }
  if (selectedGroupBy.label == 'status') {
    return Object.values(groupedTasksByStatus) as {
      status: TasksAgentContextType['tasks'][number]['status'];
      tasklist: TasksAgentContextType['tasks'];
    }[];
  }
  if (selectedGroupBy.label === 'assignee') {
    return Object.values(groupedTasksByAssignee) as {
      assignee: TasksAgentContextType['tasks'][number]['assignee'][number];
      tasklist: TasksAgentContextType['tasks'];
    }[];
  }
  if (selectedGroupBy.label === 'job') {
    return Object.values(groupedTasksByJob) as {
      job: TasksAgentContextType['tasks'][number]['applications']['public_jobs']['job_title'];
      tasklist: TasksAgentContextType['tasks'];
    }[];
  }
}
