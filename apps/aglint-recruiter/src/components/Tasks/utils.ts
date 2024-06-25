/* eslint-disable security/detect-object-injection */
/* eslint-disable no-unused-vars */
import {
  CandidateType,
  DatabaseEnums,
  DatabaseTable,
  DB,
  RecruiterUserType,
} from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { createServerClient } from '@supabase/ssr';
import axios from 'axios';
import dayjs from 'dayjs';

import { Supabase } from '@/src/apiUtils/job/candidateUpload/types';
import { ApplicationType } from '@/src/context/CandidateAssessment/types';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { supabase } from '@/src/utils/supabase/client';

import { getIndicator } from './Components/TaskStatusTag/utils';
import { meetingCardType } from './TaskBody/ViewTask/Progress/SessionCard';
import { groupByTextType } from './TaskStatesContext';

export type assigneeType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};

export type JobCandidatesType = ApplicationType & {
  candidates: CandidateType;
};

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
  | 'trigger_time_update'
  | 'create_debrief_task'
  | 'interview_scheduled'
  | 'debrief_scheduled'
  | 'email_followUp_reminder'
  | 'request_availability'
  | 're_request_availability';

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
  timeFormat?: string;
  debriefDateRange?: { start_date: string; end_date: string };
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
  supabaseCaller?: ReturnType<typeof createServerClient<DB>>;
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
    timeFormat,
    debriefDateRange,
  } = optionData;
  const removedSessions = currentSessions?.filter(
    (ele) => !selectedSession?.map((ele) => ele.id).includes(ele.id),
  );
  const addedSessions = selectedSession?.filter(
    (ele) => !currentSessions?.map((ele) => ele.id).includes(ele.id),
  );
  const progressTitle = (cusType: ProgressType) => {
    switch (cusType) {
      case 'session_update':
        return addedSessions.length
          ? `Added {addedSessions} to interview.`
          : removedSessions.length
            ? `Removed {removedSessions} from interview.`
            : '';
      case 'due_date_update':
        return `Due Date changed from {dueDateRage}`;
      case 'priority_update':
        return `Priority changed from {currentPriority} to {priority}`;
      case 'create_task':
        return `Created task for {candidate} to schedule interviews for {selectedSessions}`;
      case 'change_assignee':
        return `Assignee changed from {currentAssigneeName} to {assigneeName}`;
      case 'status_update':
        return `Status changed from {currentStatus} to {status}`;
      case 'schedule_date_update':
        return `Interview Date changed from {prevScheduleDateRange} to {scheduleDateRange}`;
      case 'trigger_time_update':
        return `Schedule time changed from {previousTriggerTime} to {currentTriggerTime}`;
      case 'slots_failed':
        return `Unable to find slots between {scheduleDateRangeNotFound}`;
      case 'create_debrief_task':
        return `Scheduling debrief {selectedSessions} between {debriefDateRange}`;
      case 'debrief_scheduled':
        return `Debrief scheduled at {time_format}`;
      case 'email_followUp_reminder':
        return `{assigneeName} sent a follow-up email on {time_format}`;
      case 'request_availability':
        return `Request Availability from {candidate} to Schedule Interviews for {selectedSessions}`;
      case 're_request_availability':
        return `Resend request availability`;
      default:
        return '';
    }
  };

  const { error, data: progress } = await supabaseCaller
    .from('new_tasks_progress')
    .insert({
      ...data,
      title: progressTitle(type),
      title_meta: {
        '{candidate}': candidateName,
        '{currentAssigneeId}': currentAssigneeId,
        '{assigneeId}': assignerId,
        '{assigneeName}': assignerName,
        '{currentAssigneeName}': currentAssigneeName,
        '{prevScheduleDateRange}': prevScheduleDateRange,
        '{scheduleDateRange}': scheduleDateRange,
        '{currentTriggerTime}': triggerTime?.current,
        '{previousTriggerTime}': triggerTime?.prev,
        '{scheduleDateRangeNotFound}': prevScheduleDateRange,
        '{status}': status,
        '{currentStatus}': currentStatus,
        '{dueDateRage}': dueDate,
        '{currentPriority}': currentPriority,
        '{priority}': priority,
        '{selectedSessions}': sessions,
        '{addedSessions}': addedSessions,
        '{removedSessions}': removedSessions,
        '{time_format}': timeFormat,
        '{debriefDateRange}': debriefDateRange,
      },
    })
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
      acc[applications.public_jobs.job_title].tasklist.push({
        applications,
        ...taskDetails,
      });
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

  const groupedTasksByProgressType = tasks
    .filter((task) => task.application_id)
    .reduce((acc, task) => {
      const progressType = getIndicator({
        task,
        progress_type: task.last_progress.progress_type,
        created_at: task.last_progress.created_at,
      });
      if (!acc[progressType]) {
        acc[progressType] = { progress_type: progressType, tasklist: [] };
      }
      acc[progressType].status = progressType;

      acc[progressType].tasklist.push(task);
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
    return Object.values(groupedTasksByProgressType) as {
      status: TasksAgentContextType['tasks'][number]['last_progress']['progress_type'];
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

export function getTaskActionCount({
  preValue,
  taskActionType,
}: {
  preValue: DatabaseTable['new_tasks']['task_action'];
  taskActionType: keyof DatabaseTable['new_tasks']['task_action'];
}) {
  if (!Number(preValue[taskActionType])) {
    preValue[taskActionType] = 1;
  } else preValue[taskActionType] += 1;

  return preValue;
}
