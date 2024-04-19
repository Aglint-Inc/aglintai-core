/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { RecruiterUserType } from '@/src/types/data.types';

// import { useInterviewerList } from '../../CompanyDetailComp/Interviewers';
import { fetchInterviewSessionTask } from '../../Scheduling/AllSchedules/SchedulingApplication/hooks';
import { useInterviewerList } from '../Components/AssigneeChip';
import { EmailAgentId, PhoneAgentId } from '../utils';

// let setTime;
type SubTaskIndex = { taskIndex: number | null; subTaskIndex: number | null };
export type AssignerType = RecruiterUserType & {
  assignee: 'Agents' | 'Interviewers';
};
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
  selectedMemberId: null | string;
  setSelectedMemberId: (x: null | string) => void;
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
  selectedMemberId: null,
  setSelectedMemberId: () => {},
  showAddNew: false,
  setShowAddNew: () => {},
  selectedApplication: null,
  setSelectedApplication: () => {},
  isImmediate: false,
  setIsImmediate: () => {},
};
const TaskStatesContext = createContext<ContextValue>(defaultProvider);
const useTaskStatesContext = () => useContext(TaskStatesContext);
function TaskStatesProvider({ children }) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [openViewTask, setOpenViewTask] = useState(false);

  const { data: interviewers } = useInterviewerList();

  const [assignerList, setAssignerList] = useState<AssignerType[] | null>(null);
  const [showAddNew, setShowAddNew] = useState(false);
  // for textInput while creating subTask
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<null | string>(null);
  const [selectedApplication, setSelectedApplication] = useState<
    TasksAgentContextType['tasks'][number]['applications'] | null
  >(null);

  const [isImmediate, setIsImmediate] = useState(false);

  useEffect(() => {
    if (interviewers) {
      const members = interviewers?.map((item) => item.rec_user);
      setAssignerList([
        ...agentsDetails,
        ...members.map((item) => {
          return { ...item, assignee: 'Interviewers' };
        }),
      ] as AssignerType[]);
    }
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
        selectedMemberId,
        setSelectedMemberId,
        assignerList,
        setAssignerList,
        showAddNew,
        setShowAddNew,
        selectedApplication,
        setSelectedApplication,
        isImmediate,
        setIsImmediate,
      }}
    >
      {children}
    </TaskStatesContext.Provider>
  );
}

export { TaskStatesProvider, useTaskStatesContext };

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
