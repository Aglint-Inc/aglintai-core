/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

import { RecruiterUserType } from '@/src/types/data.types';

import { useInterviewerList } from '../../Scheduling/Interviewers';
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
  addTaskPopUp: boolean;
  setAddTaskPopUp: (x: boolean) => void;
  selectedSubTaskId: string | null;
  setSelectedSubTaskId: (x: string | null) => void;

  assignerList: AssignerType[] | null;
  setAssignerList: (x: AssignerType[] | null) => void;

  addingSubTask: boolean;
  setAddingSubTask: (x: boolean) => void;
  // for textInput while creating subtask
  isPopUpOpen: boolean;
  setIsPopUpOpen: (x: boolean) => void;
  selectedMemberId: null | string;
  setSelectedMemberId: (x: null | string) => void;
}

const defaultProvider: ContextValue = {
  taskId: null,
  setTaskId: () => {},
  openViewTask: false,
  setOpenViewTask: () => {},

  addTaskPopUp: false,
  setAddTaskPopUp: () => {},
  selectedSubTaskId: null,
  setSelectedSubTaskId: () => {},
  addingSubTask: false,
  setAddingSubTask: () => {},

  assignerList: null,
  setAssignerList: () => {},

  // for textInput while creating subtask
  isPopUpOpen: false,
  setIsPopUpOpen: () => {},
  selectedMemberId: null,
  setSelectedMemberId: () => {},
};
const TaskStatesContext = createContext<ContextValue>(defaultProvider);
const useTaskStatesContext = () => useContext(TaskStatesContext);
function TaskStatesProvider({ children }) {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [openViewTask, setOpenViewTask] = useState(false);
  const [addTaskPopUp, setAddTaskPopUp] = useState(false);
  const [selectedSubTaskId, setSelectedSubTaskId] = useState<string | null>(
    null,
  );

  const { data: interviewers } = useInterviewerList();

  const [assignerList, setAssignerList] = useState<AssignerType[] | null>(null);

  const [addingSubTask, setAddingSubTask] = useState(false);

  // for textInput while creating subTask
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<null | string>(null);

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
        addTaskPopUp,
        setAddTaskPopUp,
        selectedSubTaskId,
        setSelectedSubTaskId,
        isPopUpOpen,
        setIsPopUpOpen,
        selectedMemberId,
        setSelectedMemberId,
        addingSubTask,
        setAddingSubTask,
        assignerList,
        setAssignerList,
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
