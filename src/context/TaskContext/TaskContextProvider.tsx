/* eslint-disable no-unused-vars */
'use client';
import { tasks } from 'googleapis/build/src/apis/tasks';
import { cloneDeep } from 'lodash';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import {
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@/src/types/customSchema';
import { supabase } from '@/src/utils/supabase/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

type TasksReducerType = {
  tasks: Awaited<ReturnType<typeof getAllTasks>>;
  search: string;
  filter: {
    status: { options: string[]; values: string[] };
    assignee: { options: string[]; values: string[] };
  };
  // filterOptions: {
  //   status: DatabaseTable['tasks']['status'][];
  //   assignee: string[];
  // };
  sort: 'date' | 'status';
};

export type TasksAgentContextType = TasksReducerType & {
  // eslint-disable-next-line no-unused-vars
  handelAddTask: (x: DatabaseTableInsert['tasks']) => boolean;
  handelUpdateTask: (x: {
    id: string;
    data: DatabaseTableInsert['tasks'];
  }) => boolean;
  handelAddSubTask: (x: {
    taskId: string;
    data: DatabaseTableInsert['sub_tasks'];
  }) => boolean;
  handelUpdateSubTask: (x: {
    SubTaskId: string;
    data: DatabaseTableInsert['sub_tasks'];
  }) => boolean;
  handelSearch: (x: string) => void;
  handelFilter: (x: AtLeastOneRequired<TasksReducerType['filter']>) => void;
  handelSort: (x: TasksReducerType['sort']) => void;
};

const reducerInitialState: TasksReducerType = {
  tasks: [],
  search: '',
  filter: {
    status: {
      options: ['completed', 'in_progress', 'pending', 'closed'],
      values: [],
    },
    assignee: { options: [], values: [] },
  },
  sort: 'date',
};

const contextInitialState: TasksAgentContextType = {
  ...reducerInitialState,
  // eslint-disable-next-line no-unused-vars
  handelAddTask: (x) => false,
  handelUpdateTask: (x) => false,
  handelAddSubTask: (x) => false,
  handelUpdateSubTask: (x) => false,
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
}

type TasksReducerActionType =
  | {
      type: TasksReducerAction.INIT;
      payload: TasksReducerType;
    }
  | {
      type: TasksReducerAction.ADD_TASK;
      payload: TasksAgentContextType['tasks'];
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
      temp.tasks = action.payload;
      temp.filter.assignee.options = [
        ...new Set(
          action.payload
            .map((task) => task.sub_tasks.map((subTask) => subTask.assignee))
            .flat(2),
        ),
      ];
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
    default: {
      return state;
    }
  }
};

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasksReducer, dispatch] = useReducer(reducer, reducerInitialState);
  const { recruiter_id } = useAuthDetails();
  const init = (data: TasksReducerType) => {
    dispatch({ type: TasksReducerAction.INIT, payload: data });
  };

  const handelAddTask: TasksAgentContextType['handelAddTask'] = (task) => {
    NewUpdateTasks({ type: 'new', task }).then((taskData) => {
      const tempTask = [
        { ...taskData, sub_tasks: [] },
        ...cloneDeep(tasksReducer.tasks),
      ];
      dispatch({ type: TasksReducerAction.ADD_TASK, payload: tempTask });
      return true;
    });
    return false;
  };

  const handelUpdateTask: TasksAgentContextType['handelUpdateTask'] = ({
    id,
    data,
  }) => {
    NewUpdateTasks({
      type: 'update',
      task: { ...data, id },
    }).then((taskData) => {
      const tempTask = cloneDeep(tasksReducer.tasks).map((item) =>
        item.id === taskData.id ? { ...item, ...taskData } : item,
      );
      dispatch({ type: TasksReducerAction.ADD_TASK, payload: tempTask });
      return true;
    });
    return false;
  };

  const handelAddSubTask: TasksAgentContextType['handelAddSubTask'] = ({
    taskId,
    data,
  }) => {
    NewUpdateSubTask({
      type: 'new',
      subTask: { ...data, task_id: taskId },
    }).then((taskData) => {
      const tempTask = cloneDeep(tasksReducer.tasks).map((item) =>
        item.id === taskData.task_id
          ? { ...item, sub_tasks: [...item.sub_tasks, taskData] }
          : item,
      );
      dispatch({ type: TasksReducerAction.ADD_TASK, payload: tempTask });
      return true;
    });
    return false;
  };

  const handelUpdateSubTask: TasksAgentContextType['handelUpdateSubTask'] = ({
    SubTaskId,
    data,
  }) => {
    NewUpdateSubTask({
      type: 'update',
      subTask: { ...data, id: SubTaskId },
    }).then((taskData) => {
      const tempTask = cloneDeep(tasksReducer.tasks).map((item) =>
        item.id === taskData.task_id
          ? {
              ...item,
              sub_tasks: item.sub_tasks.map((st) =>
                st.id === taskData.id ? taskData : st,
              ),
            }
          : item,
      );
      dispatch({ type: TasksReducerAction.ADD_TASK, payload: tempTask });
      return true;
    });
    return false;
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
    let temp = [...sortedTask];

    if (status.values.length) {
      temp = temp.reduce((prev, curr) => {
        const tempTask = cloneDeep(curr);
        tempTask.sub_tasks = tempTask.sub_tasks.filter((sub) => {
          return status.values.includes(sub.status.toLowerCase());
        });
        tempTask.sub_tasks.length && prev.push(tempTask);
        return prev;
      }, []);
    }

    if (assignee.values.length) {
      temp = temp.reduce((prev, curr) => {
        const tempTask = cloneDeep(curr);
        tempTask.sub_tasks = tempTask.sub_tasks.filter((sub) => {
          return assignee.values.some((curr) => {
            return sub.assignee.includes(curr);
          });
        });
        tempTask.sub_tasks.length && prev.push(tempTask);
        return prev;
      }, []);
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

  useEffect(() => {
    if (recruiter_id) {
      getAllTasks(recruiter_id).then((data) => {
        const temp = cloneDeep(reducerInitialState);
        temp.filter.assignee.options = [
          ...new Set(
            data
              .map((task) => task.sub_tasks.map((subTask) => subTask.assignee))
              .flat(2),
          ),
        ];
        init({ ...temp, tasks: data });
      });
    }
  }, [recruiter_id]);

  return (
    <>
      <TaskContext.Provider
        value={{
          tasks: searchedTask,
          search: tasksReducer.search,
          filter: tasksReducer.filter,
          sort: tasksReducer.sort,
          handelAddTask,
          handelAddSubTask,
          handelUpdateTask,
          handelUpdateSubTask,
          handelSearch,
          handelFilter,
          handelSort,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
};

export const useTasksAgentContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasksAgentContext must be used within a Task page');
  }
  return context;
};

const getAllTasks = (id: string) => {
  return supabase
    .from('tasks')
    .select(
      '*, applications(* , candidates( * ), public_jobs( * )), recruiter_user(*), sub_tasks(*)',
    )
    .eq('recruiter_id', id)
    .order('created_at', {
      ascending: false,
    })
    .then(({ data, error }) => {
      const temp = data as unknown as (Omit<
        (typeof data)[number],
        'applications, recruiter_user'
      > & {
        applications: (typeof data)[number]['applications'][number];
        recruiter_user: (typeof data)[number]['recruiter_user'][number];
      })[];
      if (error) throw new Error(error.message);
      return temp;
    });
};

const NewUpdateTasks = ({
  type,
  task,
}:
  | { type: 'new'; task: DatabaseTableInsert['tasks'] }
  | {
      type: 'update';
      task: Omit<DatabaseTableUpdate['tasks'], 'id'> & { id: string };
    }) => {
  return (
    type === 'update'
      ? supabase.from('tasks').update(task).eq('id', task.id)
      : supabase.from('tasks').insert(task)
  )
    .select(
      '*, applications(* , candidates( * ), public_jobs( * )), recruiter_user(*)',
    )
    .single()
    .then(({ data, error }) => {
      const temp = data as unknown as Omit<
        typeof data,
        'applications, recruiter_user'
      > & {
        applications: (typeof data)['applications'][number];
        recruiter_user: (typeof data)['recruiter_user'][number];
      };
      if (error) throw new Error(error.message);
      return temp;
    });
};

const NewUpdateSubTask = ({
  type,
  subTask,
}:
  | { type: 'new'; subTask: DatabaseTableInsert['sub_tasks'] }
  | {
      type: 'update';
      subTask: Omit<DatabaseTableUpdate['sub_tasks'], 'id'> & { id: string };
    }) => {
  return (
    type === 'update'
      ? supabase.from('sub_tasks').update(subTask).eq('id', subTask.id)
      : supabase.from('sub_tasks').insert(subTask)
  )
    .select('*')
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
