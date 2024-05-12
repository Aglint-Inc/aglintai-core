/* eslint-disable no-unused-vars */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { RecruiterUserType } from '@/src/types/data.types';

// import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import { useInterviewerList } from '../Components/AssigneeChip';
import {
  AssigneeIcon,
  CandidateIcon,
  JobIcon,
  ListIcon,
  PriorityIcon,
  StatusIcon,
} from '../TaskBody/GroupBy';
import { agentsDetails } from '../utils';

// let setTime;
type SubTaskIndex = { taskIndex: number | null; subTaskIndex: number | null };
export type AssignerType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};
export type groupByType =
  | 'job'
  | 'priority'
  | 'candidate'
  | 'assignee'
  | 'status'
  | 'none';
export type groupByTextType = { label: groupByType; icon: ReactNode };
export let groupByText = [
  { label: 'job', icon: <JobIcon /> },
  { label: 'candidate', icon: <CandidateIcon /> },
  { label: 'assignee', icon: <AssigneeIcon /> },
  { label: 'status', icon: <StatusIcon /> },
  { label: 'priority', icon: <PriorityIcon /> },
  { label: 'none', icon: <ListIcon /> },
] as groupByTextType[];

interface ContextValue {
  taskId: string | null;
  setTaskId: (x: string | null) => void;
  openViewTask: boolean;
  setOpenViewTask: (x: boolean) => void;
  assignerList: AssignerType[] | null;
  setAssignerList: (x: AssignerType[] | null) => void;

  // for textInput while creating subtask
  isPopUpOpen: boolean;
  setIsPopUpOpen: (x: boolean) => void;

  showAddNew: boolean;
  setShowAddNew: (x: boolean) => void;

  selectedApplication:
    | TasksAgentContextType['tasks'][number]['applications']
    | null;
  setSelectedApplication: (
    x: TasksAgentContextType['tasks'][number]['applications'] | null,
  ) => void;

  isImmediate: boolean;
  setIsImmediate: (x: boolean) => void;
  selectedTasksIds: string[];
  setSelectedTasksIds: (x: string[]) => any;
  showToolBar: boolean;
  setShowToolBar: (x: boolean) => void;
  selectedGroupBy: groupByTextType | null;
  setSelectedGroupBy: (x: groupByTextType | null) => void;
}

const defaultProvider: ContextValue = {
  taskId: null,
  setTaskId: () => {},
  openViewTask: false,
  setOpenViewTask: () => {},
  assignerList: null,
  setAssignerList: () => {},

  // for textInput while creating subtask
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},

  showAddNew: false,
  setShowAddNew: () => {},
  selectedApplication: null,
  setSelectedApplication: () => {},
  isImmediate: false,
  setIsImmediate: () => {},
  selectedTasksIds: [],
  setSelectedTasksIds: () => {},
  showToolBar: false,
  setShowToolBar: () => {},
  selectedGroupBy: null,
  setSelectedGroupBy: () => {},
};
const TaskStatesContext = createContext<ContextValue>(defaultProvider);
const useTaskStatesContext = () => useContext(TaskStatesContext);
function TaskStatesProvider({ children }) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [openViewTask, setOpenViewTask] = useState(false);
  const [showToolBar, setShowToolBar] = useState(false);

  const [selectedGroupBy, setSelectedGroupBy] =
    useState<groupByTextType | null>(groupByText[5]);

  const { data: interviewers } = useInterviewerList();

  const [assignerList, setAssignerList] = useState<AssignerType[] | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  // for textInput while creating subTask
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<
    TasksAgentContextType['tasks'][number]['applications'] | null
  >(null);

  const [isImmediate, setIsImmediate] = useState(true);
  const [selectedTasksIds, setSelectedTasksIds] = useState([]);

  useEffect(() => {
    const members = interviewers
      ? interviewers?.map((item) => item.rec_user)
      : [];

    setAssignerList([
      ...agentsDetails,
      ...members.map((item) => {
        return { ...item, assignee: 'Interviewers' };
      }),
    ] as AssignerType[]);
  }, [interviewers]);

  return (
    <TaskStatesContext.Provider
      value={{
        taskId,
        setTaskId,
        openViewTask,
        setOpenViewTask,
        isPopUpOpen,
        setIsPopUpOpen,
        assignerList,
        setAssignerList,
        showAddNew,
        setShowAddNew,
        selectedApplication,
        setSelectedApplication,
        isImmediate,
        setIsImmediate,
        selectedTasksIds,
        setSelectedTasksIds,
        showToolBar,
        setShowToolBar,
        selectedGroupBy,
        setSelectedGroupBy,
      }}
    >
      {children}
    </TaskStatesContext.Provider>
  );
}

export { TaskStatesProvider, useTaskStatesContext };
