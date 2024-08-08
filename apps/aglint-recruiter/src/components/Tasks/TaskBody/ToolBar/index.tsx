import { DatabaseEnums } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { useRef, useState } from 'react';

import { MoveAssessment } from '@/devlink2/MoveAssessment';
import { TaskUpdateButton } from '@/devlink3/TaskUpdateButton';
import { ShowCode } from '@/src/components/Common/ShowCode';
import TaskOwners from '@/src/components/Jobs/Job/Candidate-List/Actions/createTask/TaskOwners';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';
import { assigneeType, createTaskProgress } from '../../utils';
import { CallIcon, EmailIcon } from '../AddNewTask';
import PriorityList from '../AddNewTask/PriorityList';
import TriggerTime from '../AddNewTask/TriggerTime';
import PopUps from './PopUps';
import { ToolPopUpReason } from './utils';

function ToolBar() {
  const {
    selectedTasksIds,
    isImmediate,
    setSelectedTasksIds,
    setIsImmediate,
    assignerList,
  } = useTaskStatesContext();
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

    if (reason === 'close_tasks' || reason === 'change_status') {
      if (reason === 'change_status' && !selectedStatus) {
        toast.message('Please select status.');
        return;
      }
      const tempTasks = cloneDeep(selectedTasks).map((item) => ({
        id: item.id,
        status: reason === 'close_tasks' ? 'closed' : selectedStatus,
      }));
      handelUpdateTask(tempTasks);
      for (let task of selectedTasks) {
        await createTaskProgress({
          type: 'status_update',
          data: {
            created_by: {
              id: recruiterUser.user_id,
              name:
                recruiterUser.first_name +
                ' ' +
                (recruiterUser.last_name ?? ''),
            },
            progress_type: task.latest_progress?.progress_type || 'standard',
            task_id: task.id,
          },
          optionData: {
            currentStatus: task.status,
            status: reason === 'close_tasks' ? 'closed' : selectedStatus,
          },
        });
      }
      if (reason === 'close_tasks')
        toast.message(
          `Closed ${selectedTasksIds.length} ${selectedTasksIds.length === 1 ? 'task' : 'tasks'}.`,
        );
      else {
        toast.message(
          `Moved ${selectedTasksIds.length} ${selectedTasksIds.length === 1 ? 'task' : 'tasks'} to '${capitalizeAll(selectedStatus.replace('_', ' '))}'.`,
        );
      }
    }
    if (reason === 'update_priority') {
      if (!selectedPriority) {
        toast.message('Please select priority.');
        return;
      }
      const tempTasks = selectedTasks.map((item) => ({
        id: item.id,
        priority: selectedPriority,
      }));
      handelUpdateTask([...tempTasks]);
      toast.message(
        `Set ${selectedTasksIds.length} ${selectedTasksIds.length === 1 ? 'task' : 'tasks'} to ${selectedPriority} priority.`,
      );
    }
    if (reason === 'change_assignee') {
      if (!selectedAssignee) {
        toast.message('Please select assignee.');
        return;
      }
      const tempTasks = cloneDeep(selectedTasks).map((item) => ({
        id: item.id,
        status: 'closed' as DatabaseEnums['task_status'],
        assignee: [selectedAssignee.user_id],
        start_date: isImmediate
          ? dayjs().add(5, 'minute').toString()
          : selectedTriggerTime
            ? dayjs(selectedTriggerTime).toString()
            : dayjs().toString(),
      }));
      handelUpdateTask([...tempTasks]);
      for (let task of selectedTasks) {
        const currentAssignee = assignerList.find(
          (ele) => ele.user_id === task.assignee[0],
        );
        await createTaskProgress({
          type: 'change_assignee',
          data: {
            created_by: {
              id: recruiterUser.user_id,
              name:
                recruiterUser.first_name +
                ' ' +
                (recruiterUser.last_name ?? ''),
            },
            progress_type: task.latest_progress?.progress_type || 'standard',
            task_id: task.id,
          },
          optionData: {
            currentAssigneeId: task.assignee[0],
            assignerId: selectedAssignee.user_id,
            assignerName: getFullName(
              selectedAssignee.first_name,
              selectedAssignee.last_name,
            ),
            currentAssigneeName: getFullName(
              currentAssignee.first_name,
              currentAssignee.last_name,
            ),
          },
        });
      }
      toast.message(
        `Assigned ${selectedTasksIds.length} ${selectedTasksIds.length === 1 ? 'task' : 'tasks'} to ${capitalizeAll(selectedAssignee.first_name + ' ' + (selectedAssignee.last_name ?? ''))}.`,
      );
    }
    closePopup();
  }

  function closePopup() {
    setIsOpen(false);
    setSelectedAssignee(null);
    setSelectedPriority(null);
    setSelectedStatus(null);
    setSelectedTriggerTime(null);
    setOpenTriggerTime(null);
  }

  return (
    <Stack
      py={'var(--space-5)'}
      px={'40px'}
      direction={'row'}
      spacing={'var(--space-5)'}
    >
      <TaskUpdateButton
        textTaskSelected={`${selectedTasksIds.length} tasks selected`}
        onClickCloseTask={{
          onClick: () => {
            setIsOpen(true);
            setReason('close_tasks');
          },
        }}
        onClickChangeStatus={{
          onClick: () => {
            setIsOpen(true);
            setReason('change_status');
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
        assigneeId={selectedAssignee?.user_id}
        popUpBody={
          <ShowCode>
            <ShowCode.When isTrue={reason === 'change_status'}>
              <Stack width={'100%'}>
                <MoveAssessment
                  isAssignedToVisible={false}
                  isInterviewDateVisible={false}
                  isInterviewVisible={false}
                  isWhentoCallVisible={false}
                  isPriorityVisible={false}
                  isStatusVisible={true}
                  slotStatus={
                    <SelectStatus
                      status={selectedStatus}
                      setSelectedStatus={setSelectedStatus}
                    />
                  }
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
                  isStatusVisible={false}
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
                  isStatusVisible={false}
                  slotAssignedTo={
                    <>
                      <TaskOwners
                        hiringTeamIds={[]}
                        selectedAssignee={selectedAssignee as any}
                        setSelectedAssignee={
                          setSelectedAssignee as unknown as any
                        }
                        assignerList={[]}
                        onChange={(assigner: assigneeType) => {
                          if (
                            assigner.user_id === EmailAgentId ||
                            assigner.user_id === PhoneAgentId
                          ) {
                            setOpenTriggerTime(spanRef.current);
                            setIsImmediate(false);
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
          closePopup();
        }}
        isOpen={isOpen}
        action={action}
        reason={reason}
      />
    </Stack>
  );
}

export default ToolBar;
