/* eslint-disable no-unused-vars */
'use client';
import { tasks } from 'googleapis/build/src/apis/tasks';
import { capitalize, cloneDeep } from 'lodash';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import { EmailAgentId } from '@/src/components/Tasks/utils';
import { PhoneAgentId } from '@/src/components/Tasks/utils';
import {
  CustomDatabase,
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

type TasksReducerType = {
  tasks: Awaited<ReturnType<typeof getAllTasks>>;
  taskProgress: DatabaseTable['new_tasks_progress'][];
  search: string;
  filter: {
    status: { options: { id: string; label: string }[]; values: string[] };
    assignee: { options: { id: string; label: string }[]; values: string[] };
    jobTitle: { options: { id: string; label: string }[]; values: string[] };
    priority: { options: DatabaseEnums['task_priority'][]; values: string[] };
  };
  pagination: {
    rows: number;
    page: number;
    totalRows: number;
  };
  sort: 'date' | 'status';
  loadingTasks: boolean;
};

export type TasksAgentContextType = TasksReducerType & {
  // eslint-disable-next-line no-unused-vars
  handelAddTask: (
    x: DatabaseTableInsert['new_tasks'],
  ) => Promise<DatabaseTable['new_tasks']>;
  handelUpdateTask: (x: {
    id: string;
    data: DatabaseTableUpdate['new_tasks'];
  }) => Promise<DatabaseTable['new_tasks']>;
  handelDeleteTask: (id: string) => Promise<boolean>;
  handelGetTaskProgress: (task_id: string) => Promise<boolean>;
  handelAddTaskProgress: (
    x: DatabaseTableInsert['new_tasks_progress'],
  ) => Promise<boolean>;
  handelSearch: (x: string) => void;
  handelFilter: (x: AtLeastOneRequired<TasksReducerType['filter']>) => void;
  handelSort: (x: TasksReducerType['sort']) => void;
  loadingTasks: boolean;
};

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
        { id: 'not_started', label: 'Not Started' },
        { id: 'completed', label: 'Completed' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'closed', label: 'Closed' },
        { id: 'cancelled', label: 'Cancelled' },
        { id: 'scheduled', label: 'Scheduled' },
      ],
      values: [],
    },
    assignee: { options: [], values: [] },
    jobTitle: { options: [], values: [] },
    priority: { options: ['high', 'low', 'medium'], values: [] },
  },
  sort: 'date',
  loadingTasks: true,
};

const contextInitialState: TasksAgentContextType = {
  ...reducerInitialState,
  // eslint-disable-next-line no-unused-vars
  handelAddTask: (x) => Promise.resolve(null),
  handelUpdateTask: (x) => Promise.resolve(null),
  handelDeleteTask: (x) => Promise.resolve(false),
  handelGetTaskProgress: (x) => Promise.resolve(false),
  handelAddTaskProgress: (x) => Promise.resolve(false),
  handelSearch: (x) => {},
  handelFilter: (x) => {},
  handelSort: (x) => {},
};

const TaskContext = createContext<TasksAgentContextType>(contextInitialState);

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
  const { recruiter_id, members, recruiterUser } = useAuthDetails();
  const init = (data: TasksReducerType) => {
    data.filter.assignee.options = [
      ...new Set(data.tasks.map((task) => task.assignee).flat(2)),
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

    data.filter.jobTitle.options = [
      ...new Set(
        data.tasks
          .filter((task) => Boolean(task.application_id))
          .map((task) => ({
            id: task.applications.public_jobs.id,
            label: task.applications.public_jobs.job_title,
          }))
          .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i),
      ),
    ];
    dispatch({ type: TasksReducerAction.INIT, payload: data });
  };
  const handelTaskChanges = (
    tasks: TasksAgentContextType['tasks'],
    type?: 'add' | 'update' | 'delete' | 'set',
  ) => {
    const filterOption = cloneDeep(tasksReducer.filter);
    filterOption.assignee.options = [
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
    filterOption.jobTitle.options = tasks
      .filter((task) => Boolean(task.application_id))
      .map((task) => ({
        id: task.applications.public_jobs.id,
        label: task.applications.public_jobs.job_title,
      }))
      .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
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
    return updateTask({ type: 'new', task }).then(async (taskData) => {
      const tempTask = [{ ...taskData }, ...cloneDeep(tasksReducer.tasks)];
      const assigner = [
        ...agentsDetails,
        ...members.map((item) => {
          return { ...item, assignee: 'Interviewers' };
        }),
      ].find((item) => item.user_id === taskData.assignee[0]);
      if (assigner) {
        await handelAddTaskProgress({
          task_id: taskData.id,
          title: `Task assigned to <span ${assigner.user_id === EmailAgentId || assigner.user_id === PhoneAgentId ? 'class="agent_mention"' : 'class="mention"'}>@${capitalize(assigner?.first_name + ' ' + assigner?.last_name)}</span> by <span class="mention">@${recruiterUser.first_name + ' ' + recruiterUser.last_name}</span>`,
          created_by: {
            name: recruiterUser.first_name,
            id: recruiterUser.user_id,
          },
          progress_type: 'standard',
        });
      }
      handelTaskChanges(tempTask, 'add');
      return taskData;
    });
  };

  const handelUpdateTask: TasksAgentContextType['handelUpdateTask'] = async ({
    id,
    data,
  }) => {
    return updateTask({
      type: 'update',
      task: { ...data, id },
    }).then((taskData) => {
      const tempTask = cloneDeep(tasksReducer.tasks).map((item) =>
        item.id === taskData.id ? { ...item, ...taskData } : item,
      );
      handelTaskChanges(tempTask);
      return taskData;
    });
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
    let temp = [...sortedTask];

    if (status.values.length) {
      temp = temp.filter((sub) => {
        return status.values.includes(sub.status.toLowerCase());
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

    return temp;
  }, [tasksReducer.filter, sortedTask]);

  const searchedTask: TasksAgentContextType['tasks'] = useMemo(() => {
    const search = tasksReducer.search;
    return search?.length
      ? filterTask.filter(
          (task) =>
            task.name.toLowerCase().includes(search.toLowerCase()) ||
            `${task.applications.candidates.first_name} ${task.applications.candidates.last_name}`
              .trim()
              .toLowerCase()
              .includes(search.toLowerCase()),
        )
      : filterTask;
  }, [tasksReducer.search, filterTask]);
  const [loadingTasks, setLoading] = useState(true);

  useEffect(() => {
    if (recruiter_id) {
      getTasks(
        recruiter_id,
        {
          page: tasksReducer.pagination.page,
          rows: tasksReducer.pagination.rows,
        },
        true,
      ).then((data) => {
        const temp = cloneDeep(reducerInitialState);
        temp.tasks = data.data;
        temp.pagination.totalRows = data.count;
        init({ ...temp, tasks: data.data });
        setLoading(false);
      });
    }
  }, [recruiter_id]);

  return (
    <>
      <TaskContext.Provider
        value={{
          tasks: searchedTask,
          pagination: tasksReducer.pagination,
          taskProgress: tasksReducer.taskProgress,
          search: tasksReducer.search,
          filter: tasksReducer.filter,
          sort: tasksReducer.sort,
          handelAddTask,
          handelUpdateTask,
          handelDeleteTask,
          handelGetTaskProgress,
          handelAddTaskProgress,
          handelSearch,
          handelFilter,
          handelSort,
          loadingTasks,
        }}
      >
        {children}
      </TaskContext.Provider>
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

const getAllTasks = (id: string) => {
  return supabase
    .from('new_tasks')
    .select('*, applications(* , candidates( * ), public_jobs( * ))')
    .eq('recruiter_id', id)
    .order('created_at', {
      ascending: false,
    })
    .then(({ data, error }) => {
      const temp = data as unknown as (Omit<
        (typeof data)[number],
        'applications, recruiter_user'
      > & {
        applications: (typeof data)[number]['applications'];
      })[];
      if (error) throw new Error(error.message);
      return temp;
    });
};

const getTasks = (
  id: string,
  pagination: { page: number; rows: number },
  getCount: boolean,
) => {
  return supabase
    .from('new_tasks')
    .select(
      '*, applications(* , candidates( * ), public_jobs( * ))',
      getCount ? { count: 'exact' } : {},
    )
    .range(
      pagination.page * pagination.rows,
      pagination.page * pagination.rows + pagination.rows - 1,
    )
    .eq('recruiter_id', id)
    .order('created_at', {
      ascending: false,
    })
    .then(({ data, count, error }) => {
      // const temp = data as unknown as (Omit<
      //   (typeof data)[number],
      //   'applications, recruiter_user'
      // > & {
      //   applications: (typeof data)[number]['applications'];
      //   recruiter_user: (typeof data)[number]['recruiter_user'];
      // })[];
      if (error) throw new Error(error.message);
      return { data, count };
    });
};

const updateTask = ({
  type,
  task,
}:
  | { type: 'new'; task: DatabaseTableInsert['new_tasks'] }
  | {
      type: 'update';
      task: Omit<DatabaseTableUpdate['new_tasks'], 'id'> & { id: string };
    }) => {
  return (
    type === 'update'
      ? supabase.from('new_tasks').update(task).eq('id', task.id)
      : supabase.from('new_tasks').insert(task)
  )
    .select('*, applications(* , candidates( * ), public_jobs( * ))')
    .single()
    .then(({ data, error }) => {
      const temp = data as unknown as Omit<typeof data, 'applications'> & {
        applications: (typeof data)['applications'];
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
];
