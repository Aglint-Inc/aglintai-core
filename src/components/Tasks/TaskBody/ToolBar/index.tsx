import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useRef, useState } from 'react';

import { MoveAssessment } from '@/devlink2';
import { TaskUpdateButton } from '@/devlink3/TaskUpdateButton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { DatabaseEnums } from '@/src/types/customSchema';
import toast from '@/src/utils/toast';

import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';
import {
  assigneeType,
  createTaskProgress,
  EmailAgentId,
  PhoneAgentId,
} from '../../utils';
import { CallIcon, EmailIcon } from '../AddNewTask';
import AssigneeList from '../AddNewTask/AssigneeList';
import PriorityList from '../AddNewTask/PriorityList';
import TriggerTime from '../AddNewTask/TriggerTime';
import PopUps from './PopUps';
import { ToolPopUpReason } from './utils';

function ToolBar() {
  const { selectedTasksIds, isImmediate, setSelectedTasksIds } =
    useTaskStatesContext();
  const { handelUpdateTask, tasks } = useTasksContext();
  const { recruiterUser } = useAuthDetails();
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<ToolPopUpReason | null>(null);

  // field status
  const spanRef = useRef(null);
  const [selectedStatus, setSelectedStatus] =
    useState<DatabaseEnums['task_status']>(null);
  const [selectedPriority, setSelectedPriority] =
    useState<DatabaseEnums['task_priority']>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<assigneeType>(null);
  const [selectedTriggerTime, setSelectedTriggerTime] = useState(null);
  const [openTriggerTime, setOpenTriggerTime] = useState(null);
  async function action() {
    const selectedTasks = tasks.filter((ele) =>
      selectedTasksIds.includes(ele.id),
    );

    if (reason === 'close_tasks' || reason === 'update_tasks') {
      if (reason === 'update_tasks' && !selectedStatus) {
        toast.message('Please select status!');
        return;
      }
      const tempTasks = cloneDeep(selectedTasks).map((item) => {
        delete item.applications;
        item.status = reason === 'close_tasks' ? 'closed' : selectedStatus;
        return item;
      });
      handelUpdateTask(tempTasks);
      for (let task of selectedTasks) {
        await createTaskProgress({
          type: 'status_update',
          data: {
            created_by: {
              id: recruiterUser.user_id,
              name: recruiterUser.first_name + ' ' + recruiterUser.last_name,
            },
            progress_type: 'standard',
            task_id: task.id,
          },
          optionData: {
            currentStatus: task.status,
            status: reason === 'close_tasks' ? 'closed' : selectedStatus,
          },
        });
      }
    }
    if (reason === 'update_priority') {
      if (!selectedPriority) {
        toast.message('Please select priority!');
        return;
      }
      const tempTasks = cloneDeep(selectedTasks).map((item) => {
        delete item.applications;
        item.priority = selectedPriority;
        return item;
      });
      handelUpdateTask(tempTasks);
    }
    if (reason === 'change_assignee') {
      if (!selectedAssignee) {
        toast.message('Please select assignee!');
        return;
      }
      const tempTasks = cloneDeep(selectedTasks).map((item) => {
        delete item.applications;
        item.assignee = [selectedAssignee.user_id];
        item.status =
          selectedAssignee.user_id === EmailAgentId ||
          selectedAssignee.user_id === PhoneAgentId
            ? 'scheduled'
            : 'not_started';
        item.start_date = isImmediate
          ? dayjs().add(5, 'minute').toString()
          : dayjs(selectedTriggerTime).toString();
        return item;
      });
      handelUpdateTask(tempTasks);
      for (let task of selectedTasks) {
        await createTaskProgress({
          type: 'create_task',
          data: {
            created_by: {
              id: recruiterUser.user_id,
              name: recruiterUser.first_name + ' ' + recruiterUser.last_name,
            },
            progress_type: 'standard',
            task_id: task.id,
          },
          optionData: {
            creatorName:
              recruiterUser.first_name + ' ' + recruiterUser.last_name,
            assignerName:
              selectedAssignee.first_name + ' ' + selectedAssignee.last_name,
            assignerId: selectedAssignee.user_id,
          },
        });
      }
    }
    setIsOpen(false);
  }

  return (
    <Stack py={'20px'} px={'40px'} direction={'row'} spacing={'20px'}>
      <TaskUpdateButton
        onClickCloseTask={{
          onClick: () => {
            setIsOpen(true);
            setReason('close_tasks');
          },
        }}
        onClickChangeStatus={{
          onClick: () => {
            setIsOpen(true);
            setReason('update_tasks');
          },
        }}
        onClickChangeAssignee={{
          onClick: () => {
            setIsOpen(true);
            setReason('change_assignee');
          },
        }}
        onClickClose={{
          onClick: () => {
            setSelectedTasksIds([]);
          },
        }}
        onClickUpdatePriority={{
          onClick: () => {
            setIsOpen(true);
            setReason('update_priority');
          },
        }}
      />

      <PopUps
        popUpBody={
          <ShowCode>
            <ShowCode.When isTrue={reason === 'update_tasks'}>
              <Stack direction={'row'} spacing={'5px'} alignItems={'center'}>
                <Typography variant='body2'> Status :</Typography>
                <SelectStatus
                  status={selectedStatus}
                  setSelectedStatus={setSelectedStatus}
                />
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={reason === 'update_priority'}>
              <Stack width={'100%'}>
                <MoveAssessment
                  isAssignedToVisible={false}
                  isInterviewDateVisible={false}
                  isInterviewVisible={false}
                  isWhentoCallVisible={false}
                  isPriorityVisible={true}
                  slotPriority={
                    <PriorityList
                      selectedPriority={selectedPriority}
                      setSelectedPriority={setSelectedPriority}
                    />
                  }
                />
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={reason === 'change_assignee'}>
              <Stack width={'100%'}>
                <MoveAssessment
                  isPriorityVisible={false}
                  isInterviewVisible={false}
                  isInterviewDateVisible={false}
                  slotAssignedTo={
                    <>
                      <AssigneeList
                        selectedAssignee={selectedAssignee}
                        setSelectedAssignee={setSelectedAssignee}
                        onChange={(assigner: assigneeType) => {
                          if (
                            assigner.user_id === EmailAgentId ||
                            assigner.user_id === PhoneAgentId
                          ) {
                            setOpenTriggerTime(spanRef.current);
                          }
                        }}
                      />
                      <span ref={spanRef}></span>
                    </>
                  }
                  slotWhentoCall={
                    <TriggerTime
                      selectTriggerTime={selectedTriggerTime}
                      setSelectTriggerTime={setSelectedTriggerTime}
                      openTriggerTime={openTriggerTime}
                      setOpenTriggerTime={setOpenTriggerTime}
                    />
                  }
                  isWhentoCallVisible={
                    selectedAssignee?.user_id === EmailAgentId ||
                    selectedAssignee?.user_id === PhoneAgentId
                  }
                  textWhenToCall={
                    selectedAssignee?.user_id === EmailAgentId
                      ? 'When to mail'
                      : 'When to call'
                  }
                  slotWhentoCallIcon={
                    selectedAssignee?.user_id === EmailAgentId ? (
                      <EmailIcon />
                    ) : (
                      <CallIcon />
                    )
                  }
                />
              </Stack>
            </ShowCode.When>
          </ShowCode>
        }
        close={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        action={action}
        reason={reason}
      />
    </Stack>
  );
}

export default ToolBar;
