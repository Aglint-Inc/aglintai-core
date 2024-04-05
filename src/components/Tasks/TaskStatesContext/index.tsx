/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from 'react';

// let setTime;
type SubTaskIndex = { taskIndex: number | null; subTaskIndex: number | null };

interface ContextValue {
  taskId: string | null;
  setTaskId: (x: string | null) => void;

  openViewTask: boolean;
  setOpenViewTask: (x: boolean) => void;
  addTaskPopUp: boolean;
  setAddTaskPopUp: (x: boolean) => void;
  selectedSubTaskId: string | null;
  setSelectedSubTaskId: (x: string | null) => void;

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

  const [addingSubTask, setAddingSubTask] = useState(false);

  // for textInput while creating subTask
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<null | string>(null);
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
      }}
    >
      {children}
    </TaskStatesContext.Provider>
  );
}

export { TaskStatesProvider, useTaskStatesContext };
