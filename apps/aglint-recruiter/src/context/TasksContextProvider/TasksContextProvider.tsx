'use client';
import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
  DatabaseView,
} from '@aglint/shared-types';
import { meetingCardType } from '@aglint/shared-types/src/db/tables/new_tasks.types';
import {
  EmailAgentId,
  PhoneAgentId,
  SystemAgentId,
} from '@aglint/shared-utils';
import { RealtimeChannel } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import {
  getIndicator,
  indicatorType,
} from '@/src/components/Tasks/Components/TaskStatusTag/utils';
import { typeArray } from '@/src/components/Tasks/TaskBody/AddNewTask/TypeList';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';
export type taskFilterType = {
  Job: string[];
  Date: string[];
  Status: DatabaseEnums['task_status'][];
  Priority: DatabaseEnums['task_priority'][];
  Assignee: string[];
  Type: DatabaseEnums['task_type_enum'][];
  Candidate: string[];
};

type TasksReducerType = {
  tasks: Awaited<ReturnType<typeof getTasks>>['data'];
  taskProgress: DatabaseTable['new_tasks_progress'][];
  search: string;
  filter: {
    status: { options: { id: string; label: string }[]; values: string[] };
    assignee: { options: { id: string; label: string }[]; values: string[] };
    jobTitle: { options: { id: string; label: string }[]; values: string[] };
    priority: { options: DatabaseEnums['task_priority'][]; values: string[] };
    type: { options: DatabaseEnums['task_type_enum'][]; values: string[] };
    date: { values: string[] };
    candidate: { options: { id: string; label: string }[]; values: string[] };
  };
  pagination: {
    rows: number;
    page: number;
    totalRows: number;
  };
  sort: 'date' | 'status';
  loadingTasks: boolean;
};
/* eslint-disable no-unused-vars */
export type TasksAgentContextType = TasksReducerType & {
  handelAddTask: (
    x: DatabaseTableInsert['new_tasks'] & { sessions: meetingCardType[] },
  ) => Promise<DatabaseView['tasks_view']>;
  handelUpdateTask: (
    x: (Omit<DatabaseTableUpdate['new_tasks'], 'id'> & { id: string })[],
  ) => Promise<DatabaseView['tasks_view'][]>;
  handelDeleteTask: (id: string) => Promise<boolean>;
  handelGetTaskProgress: (task_id: string) => Promise<boolean>;
  handelAddTaskProgress: (
    x: DatabaseTableInsert['new_tasks_progress'],
  ) => Promise<boolean>;
  handelSearch: (x: string) => void;
  handelFilter: (x: AtLeastOneRequired<TasksReducerType['filter']>) => void;
  handelResetFilter: () => void;
  handelSort: (x: TasksReducerType['sort']) => void;
  loadingTasks: boolean;
};
/* eslint-enable no-unused-vars */

const reducerInitialState: TasksReducerType = {
  tasks: [],
  taskProgress: [],
  search: '',
  pagination: {
    rows: 100,
    page: 0,
    totalRows: 0,
  },
  filter: {
    status: {
      options: [
        {
          id: 'ACTION_NEEDED' as indicatorType,
          label: 'Action Needed',
        },
        { id: 'BOOKED' as indicatorType, label: 'Booked' },
        {
          id: 'AWAITING_RESPONSE' as indicatorType,
          label: 'Awaiting Response',
        },
        { id: 'NO_RESPONSE' as indicatorType, label: 'No Response' },
        {
          id: 'READY_TO_SCHEDULE' as indicatorType,
          label: 'Ready to Schedule',
        },
        { id: 'UNKNOWN_STATUS' as indicatorType, label: 'Unknown Status' },
      ],
      values: [],
    },
    assignee: { options: [], values: [] },
    jobTitle: { options: [], values: [] },
    priority: { options: ['high', 'low', 'medium'], values: [] },
    type: { options: typeArray, values: [] },
    date: { values: [] },
    candidate: { options: [], values: [] },
  },
  sort: 'date',
  loadingTasks: true,
};

/* eslint-disable no-unused-vars */
const contextInitialState: TasksAgentContextType = {
  ...reducerInitialState,
  handelAddTask: (x) => Promise.resolve(null),
  handelUpdateTask: (x) => Promise.resolve(null),
  handelDeleteTask: (x) => Promise.resolve(false),
  handelGetTaskProgress: (x) => Promise.resolve(false),
  handelAddTaskProgress: (x) => Promise.resolve(false),
  handelSearch: (x) => {},
  handelFilter: (x) => {},
  handelResetFilter: () => {},
  handelSort: (x) => {},
};
/* eslint-enable no-unused-vars */

const TaskContext = createContext<TasksAgentContextType>(contextInitialState);

/* eslint-disable no-unused-vars */
enum TasksReducerAction {
  INIT,
  ADD_TASK,
  SEARCH,
  FILTER,
  SORT,
  SET_ASSIGNEE_OPTIONS,
  SET_TASK_PROGRESS,
  SET_PAGINATION,
}
/* eslint-enable no-unused-vars */

type TasksReducerActionType =
  | {
      type: TasksReducerAction.INIT;
      payload: TasksReducerType;
    }
  | {
      type: TasksReducerAction.ADD_TASK;
      payload: {
        tasks: TasksAgentContextType['tasks'];
        filterOption: TasksReducerType['filter'];
        totalRows: number;
      };
    }
  | {
      type: TasksReducerAction.SET_TASK_PROGRESS;
      payload: TasksAgentContextType['taskProgress'];
    }
  | {
      type: TasksReducerAction.SEARCH;
      payload: TasksAgentContextType['search'];
    }
  | {
      type: TasksReducerAction.FILTER;
      payload: TasksAgentContextType['filter'];
    }
  | {
      type: TasksReducerAction.SORT;
      payload: TasksAgentContextType['sort'];
    }
  | {
      type: TasksReducerAction.SET_ASSIGNEE_OPTIONS;
      payload: TasksAgentContextType['filter']['assignee']['options'];
    }
  | {
      type: TasksReducerAction.SET_PAGINATION;
      payload: TasksAgentContextType['pagination'];
    };

const reducer = (
  state: TasksReducerType,
  action: TasksReducerActionType,
): TasksReducerType => {
  switch (action.type) {
    case TasksReducerAction.INIT: {
      return action.payload;
    }
    case TasksReducerAction.ADD_TASK: {
      const temp = cloneDeep(reducerInitialState);
      temp.tasks = action.payload.tasks;
      temp.filter = action.payload.filterOption;
      temp.pagination.totalRows = action.payload.totalRows;
      return temp;
    }
    case TasksReducerAction.SET_TASK_PROGRESS: {
      const temp = cloneDeep(reducerInitialState);
      temp.taskProgress = action.payload;
      return temp;
    }
    case TasksReducerAction.SEARCH: {
      return { ...state, search: action.payload };
    }
    case TasksReducerAction.FILTER: {
      return { ...state, filter: action.payload };
    }
    case TasksReducerAction.SORT: {
      return { ...state, sort: action.payload };
    }
    case TasksReducerAction.SET_ASSIGNEE_OPTIONS: {
      const temp = cloneDeep(state);
      temp.filter.assignee.options = action.payload;
      return temp;
    }
    case TasksReducerAction.SET_PAGINATION: {
      const temp = cloneDeep(state);
      temp.pagination = action.payload;
      return temp;
    }
    default: {
      return state;
    }
  }
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasksReducer, dispatch] = useReducer(reducer, reducerInitialState);
  const { recruiter_id, recruiterUser, isAllowed } = useAuthDetails();
  const { members, loading: isFetching } = useAuthDetails();

  const router = useRouter();

  const updateFilterOptions = (tasks: TasksReducerType['tasks']) => {
    const filter: TasksReducerType['filter'] = { ...tasksReducer.filter };
    if (!filter.assignee.values.length) {
      filter.assignee.options = [
        ...new Set(tasks.map((task) => task.assignee).flat(2)),
      ]
        .map((item) => {
          const temp = members.find((mem) => mem.user_id === item);
          return temp;
        })
        .filter((item) => Boolean(item))
        .map((temp) => {
          return {
            id: temp.user_id,
            label: `${temp.first_name} ${temp.last_name}`.trim(),
          };
        });
    }

    if (!filter.jobTitle.values.length) {
      filter.jobTitle.options = [
        ...new Set(
          tasks
            .filter((task) => Boolean(task.application_id))
            .map((task) => ({
              id: task.applications.public_jobs.id,
              label: task.applications.public_jobs.job_title,
            }))
            .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i),
        ),
      ];
    }
    if (!filter.candidate.values.length) {
      filter.candidate.options = [
        ...new Set(
          tasks
            .filter((task) => Boolean(task.application_id))
            .map((task) => ({
              id: task.application_id,
              label: getFullName(
                task.applications.candidates.first_name,
                task.applications.candidates.last_name,
              ),
            }))
            .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i),
        ),
      ];
    }
    return filter;
  };

  const init = (data: TasksReducerType) => {
    const application_id = router.query.application_id as string;
    data.filter.candidate.values = application_id
      ? [application_id]
      : data.filter.candidate.values;
    dispatch({ type: TasksReducerAction.INIT, payload: data });
  };

  const handelTaskChanges = (
    tasks: TasksAgentContextType['tasks'],
    type?: 'add' | 'update' | 'delete' | 'set',
  ) => {
    const filterOption = cloneDeep(tasksReducer.filter);
    let totalRows = tasksReducer.pagination.totalRows;

    if (type === 'add') totalRows = totalRows + 1;
    else if (type === 'delete') totalRows = totalRows - 1;

    dispatch({
      type: TasksReducerAction.ADD_TASK,
      payload: { tasks, filterOption, totalRows },
    });
  };

  const handelAddTask: TasksAgentContextType['handelAddTask'] = async (
    task,
  ) => {
    let sessions: (typeof task)['sessions'] = [...task.sessions];
    delete task.sessions;
    return updateTask({ type: 'new', task }, sessions).then(
      async (taskData) => {
        const tempTask = [{ ...taskData }, ...cloneDeep(tasksReducer.tasks)];
        handelTaskChanges(tempTask, 'add');
        return taskData;
      },
    );
  };

  const handelUpdateTask: TasksAgentContextType['handelUpdateTask'] = async (
    updates,
  ) => {
    let tempTask = cloneDeep(tasksReducer.tasks);
    const updatedTasks = await Promise.all(
      updates.map((task) =>
        updateTask({
          type: 'update',
          task,
        }),
      ),
    );

    updatedTasks.forEach((taskData) => {
      tempTask = tempTask.map((item) =>
        item.id === taskData.id ? { ...item, ...taskData } : item,
      );
    }),
      handelTaskChanges(tempTask);
    return updatedTasks;
  };

  const handelDeleteTask: TasksAgentContextType['handelDeleteTask'] = async (
    id,
  ) => {
    return deleteTask(id).then(() => {
      const tempTask = tasksReducer.tasks.filter((item) => item.id !== id);
      handelTaskChanges(tempTask, 'delete');
      return true;
    });
  };

  const handelGetTaskProgress: TasksAgentContextType['handelGetTaskProgress'] =
    async (id) => {
      return getTaskProgress(id).then((data) => {
        dispatch({ type: TasksReducerAction.SET_TASK_PROGRESS, payload: data });
        return true;
      });
    };

  const handelAddTaskProgress: TasksAgentContextType['handelAddTaskProgress'] =
    async (data) => {
      return createTaskProgress({ ...data }).then((data) => {
        dispatch({
          type: TasksReducerAction.SET_TASK_PROGRESS,
          payload: [...tasksReducer.taskProgress, data],
        });
        return true;
      });
    };

  const handelSearch: TasksAgentContextType['handelSearch'] = (str) => {
    dispatch({
      type: TasksReducerAction.SEARCH,
      payload: str,
    });
  };

  const handelFilter: TasksAgentContextType['handelFilter'] = (filter) => {
    dispatch({
      type: TasksReducerAction.FILTER,
      payload: { ...tasksReducer.filter, ...filter },
    });
  };

  const handelResetFilter: TasksAgentContextType['handelResetFilter'] = () => {
    const data = Object.keys(tasksReducer.filter).reduce((acc, key) => {
      // eslint-disable-next-line security/detect-object-injection
      acc[key] = { ...tasksReducer.filter[key], values: [] };
      return acc;
    }, {});

    localStorage.setItem(
      'taskFilters',
      JSON.stringify({
        Candidate: [],
        Status: [],
        Assignee: [],
        Priority: [],
        Job: [],
        Type: [],
        Date: [],
      }),
    );
    dispatch({
      type: TasksReducerAction.FILTER,
      payload: data as TasksReducerType['filter'],
    });
  };

  const handelSort: TasksAgentContextType['handelSort'] = (sort) => {
    dispatch({
      type: TasksReducerAction.SORT,
      payload: sort,
    });
  };

  const sortedTask: TasksAgentContextType['tasks'] = useMemo(() => {
    return tasksReducer.tasks;
  }, [tasksReducer.sort, tasksReducer.tasks]);

  const filterTask: TasksAgentContextType['tasks'] = useMemo(() => {
    const status = tasksReducer.filter.status;
    const assignee = tasksReducer.filter.assignee;
    const jobTitle = tasksReducer.filter.jobTitle;
    const priority = tasksReducer.filter.priority;
    const date = tasksReducer.filter.date;
    const candidate = tasksReducer.filter.candidate;
    const type = tasksReducer.filter.type;
    let temp = [...sortedTask];

    if (status.values.length) {
      temp = temp.filter((sub) => {
        const progress_type = sub?.latest_progress?.progress_type;
        const created_at = sub?.latest_progress?.created_at;

        if (
          status.values.includes(
            getIndicator({
              task: sub,
              progress_type: progress_type,
              created_at: created_at,
            }),
          )
        ) {
          return sub;
        }
      });
    }

    if (assignee.values.length) {
      temp = temp.filter((sub) => {
        return assignee.values.some((curr) => {
          return sub.assignee.includes(curr);
        });
      });
    }

    if (jobTitle.values.length) {
      temp = temp.filter((task) =>
        jobTitle.values.includes(task?.applications?.public_jobs?.id),
      );
    }
    if (priority.values.length) {
      temp = temp.filter((task) => priority.values.includes(task?.priority));
    }
    if (type.values.length) {
      temp = temp.filter((task) => type.values.includes(task?.type));
    }
    if (date.values.length) {
      if (date.values.length === 2) {
        const SelectedStartDate = dayjs(date.values[0])
          .startOf('day')
          .add(-1, 'day');
        const SelectedEndDate = dayjs(date.values[1])
          .startOf('day')
          .add(1, 'day');
        temp = temp.filter((task) => {
          const startDate = dayjs(task.schedule_date_range.start_date).startOf(
            'day',
          );
          const endDate = dayjs(task.schedule_date_range.end_date).startOf(
            'day',
          );

          if (
            startDate.isAfter(SelectedStartDate) &&
            endDate.isBefore(SelectedEndDate)
          ) {
            return task;
          }
        });
      } else {
        temp = temp.filter((task) => {
          const startDate = dayjs(task.schedule_date_range.start_date).startOf(
            'day',
          );
          const SelectedStartDate = dayjs(date.values[0]).startOf('day');
          return startDate.isSame(SelectedStartDate);
        });
      }
    }
    if (candidate.values.length) {
      temp = temp.filter((task) =>
        candidate.values.includes(task?.application_id),
      );
    }
    return temp;
  }, [tasksReducer.filter, sortedTask]);

  const searchedTask: TasksAgentContextType['tasks'] = useMemo(() => {
    const search = tasksReducer.search;
    return search?.length
      ? filterTask.filter(
          (task) =>
            task.name.toLowerCase().includes(search.toLowerCase()) ||
            `${task.applications.candidates.first_name} ${task.applications.candidates.last_name ?? ''}`
              .trim()
              .toLowerCase()
              .includes(search.toLowerCase()),
        )
      : filterTask;
  }, [tasksReducer.search, filterTask]);
  const [loadingTasks, setLoading] = useState(true);

  useEffect(() => {
    if (recruiter_id && members) {
      getTasks({
        id: recruiter_id,
        pagination: {
          page: tasksReducer.pagination.page,
          rows: tasksReducer.pagination.rows,
        },
        getCount: true,
        user_id: isAllowed(['admin', 'recruiter', 'recruiting_coordinator'])
          ? undefined
          : recruiterUser.user_id,
      }).then((data) => {
        const preFilterData = JSON.parse(
          localStorage.getItem('taskFilters'),
        ) as taskFilterType;
        const temp = cloneDeep(reducerInitialState);
        if (preFilterData) {
          temp.filter.assignee.values = preFilterData?.Assignee || [];
          temp.filter.priority.values = preFilterData?.Priority || [];
          temp.filter.status.values = preFilterData?.Status || [];
          temp.filter.jobTitle.values = preFilterData?.Job || [];
          temp.filter.type.values = preFilterData?.Type || [];
          temp.filter.candidate.values = preFilterData?.Candidate || [];
          temp.filter.date.values = preFilterData?.Date || [];
        }
        temp.tasks = data.data;
        temp.pagination.totalRows = data.count;

        init({ ...temp, tasks: data.data });
        setLoading(false);
      });
    }
  }, [recruiter_id, members]);

  useEffect(() => {
    let channel: RealtimeChannel;
    if (tasksReducer.tasks.length) {
      channel = supabase
        .channel('db-changes')
        .on(
          'postgres_changes',
          {
            // event: 'UPDATE',
            event: '*',
            schema: 'public',
            table: 'new_tasks',
            // filter: `id=in.(${tasksReducer.tasks.map((item) => item.id)})`,
          },
          (payload) => {
            const rowData =
              payload.new as unknown as DatabaseTable['new_tasks'];
            if (rowData)
              handelTaskChanges(
                tasksReducer.tasks.map((item) => {
                  if (item.id == rowData.id) {
                    return {
                      ...item,
                      status: rowData.status,
                      assignee: rowData.assignee,
                      task_action: rowData.task_action,
                    };
                  }
                  return item;
                }),
              );
          },
        )
        .subscribe();
    }
    if (channel)
      return () => {
        channel.unsubscribe();
      };
  }, [tasksReducer.tasks]);
  return (
    <>
      {isFetching || loadingTasks ? (
        <DynamicLoader />
      ) : (
        <TaskContext.Provider
          value={{
            tasks: searchedTask,
            pagination: tasksReducer.pagination,
            taskProgress: tasksReducer.taskProgress,
            search: tasksReducer.search,
            filter: updateFilterOptions(searchedTask),
            sort: tasksReducer.sort,
            handelAddTask,
            handelUpdateTask,
            handelDeleteTask,
            handelGetTaskProgress,
            handelAddTaskProgress,
            handelSearch,
            handelFilter,
            handelSort,
            handelResetFilter,
            loadingTasks,
          }}
        >
          {children}
        </TaskContext.Provider>
      )}
    </>
  );
};

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasksAgentContext must be used within a Task page');
  }
  return context;
};

const getTasks = ({
  id,
  pagination,
  getCount,
  user_id,
}: {
  id: string;
  pagination: { page: number; rows: number };
  getCount: boolean;
  user_id: string;
}) => {
  return (
    user_id
      ? supabase
          .from('tasks_view')
          .select(
            '*, applications(* , candidates( * ), public_jobs( * )), candidate_request_availability ( id,slots,booking_confirmed )',
            getCount ? { count: 'exact' } : {},
          )
          .or(
            `assignee.cs.{${user_id}}, or(task_owner.eq.${user_id}, created_by.eq.${user_id})`,
          )
      : supabase
          .from('tasks_view')
          .select(
            '*, applications(* , candidates( * ), public_jobs( * )), candidate_request_availability ( id,slots,booking_confirmed )',
            getCount ? { count: 'exact' } : {},
          )
  )
    .eq('recruiter_id', id)
    .order('created_at', {
      ascending: false,
    })
    .range(
      pagination.page * pagination.rows,
      pagination.page * pagination.rows + pagination.rows - 1,
    )
    .then(({ data, count, error }) => {
      if (error) throw new Error(error.message);
      return { data, count };
    });
};

export const updateTask = (
  {
    type,
    task,
  }:
    | {
        type: 'new';
        task: DatabaseTableInsert['new_tasks'];
      }
    | {
        type: 'update';
        task: Omit<DatabaseTableUpdate['new_tasks'], 'id'> & { id: string };
      },
  sessions?: meetingCardType[],
) => {
  return (
    type === 'update'
      ? supabase.from('new_tasks').update(task).eq('id', task.id)
      : supabase.from('new_tasks').insert(task)
  )
    .select(
      'id, recruiter_user(first_name,last_name), applications(* , candidates( * ), public_jobs( * ))',
    )
    .single()
    .then(async ({ data, error }) => {
      if (type === 'new') {
        await supabase.from('task_session_relation').insert(
          sessions.map((ele) => ({
            session_id: ele.id,
            task_id: data.id,
          })),
        );
        const candidateName = getFullName(
          data.applications.candidates.first_name,
          data.applications.candidates.last_name,
        );

        await createTaskProgress({
          task_id: data?.id as string,
          title: `Created task for {candidate} to schedule interviews for {selectedSessions}`,
          created_by: {
            id: task.created_by,
            name: getFullName(
              data.recruiter_user.first_name,
              data.recruiter_user.first_name,
            ),
          },
          title_meta: {
            '{candidate}': candidateName,
            '{selectedSessions}': sessions,
          },
          progress_type:
            task.type === 'schedule' ||
            task.type === 'self_schedule' ||
            task.type === 'availability'
              ? 'schedule'
              : 'standard',
        });
      }
      const { data: updatedTask } = await supabase
        .from('tasks_view')
        .select(
          '*, applications(* , candidates( * ), public_jobs( * )), candidate_request_availability ( id,slots,booking_confirmed )',
        )
        .eq('id', data.id)
        .single();
      const temp = updatedTask as unknown as Omit<
        typeof updatedTask,
        'applications'
      > & {
        applications: (typeof updatedTask)['applications'];
      };
      if (error) throw new Error(error.message);
      return temp;
    });
};

const deleteTask = (id: string) => {
  return supabase
    .from('new_tasks')
    .delete()
    .eq('id', id)
    .then(({ error }) => {
      if (error) throw new Error(error.message);
      return true;
    });
};

const getTaskProgress = (id: string) => {
  return supabase
    .from('new_tasks_progress')
    .select()
    .eq('task_id', id)
    .order('created_at', {
      ascending: true,
    })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};

const createTaskProgress = (
  data: DatabaseTableInsert['new_tasks_progress'],
) => {
  return supabase
    .from('new_tasks_progress')
    .insert({ ...data })
    .select()
    .order('created_at', {
      ascending: true,
    })
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};

type AtLeastOneRequired<T> = {
  [K in keyof T]-?: {
    [P in keyof T]: P extends K ? T[P] : never;
  }[keyof T];
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
  {
    user_id: SystemAgentId,
    first_name: 'system',
    last_name: 'agent',
    assignee: 'Agents',
    profile_image: '',
  },
];
