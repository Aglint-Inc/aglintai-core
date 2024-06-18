/* eslint-disable security/detect-object-injection */
import { Collapse, Dialog, Stack } from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { ButtonSolid } from '@/devlink/ButtonSolid';
// import axios from 'axios';
import { CandidateSelectionPopup } from '@/devlink2/CandidateSelectionPopup';
import { SelectActionsDropdown } from '@/devlink2/SelectActionsDropdown';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  // JobApplicationsData,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { CountJobs } from '@/src/context/JobsContext/types';
import { JobApplicationEmails } from '@/src/pages/api/job/jobApplications/candidateEmail';

import { TaskStatesProvider } from '../../Tasks/TaskStatesContext';
import { capitalize } from '../utils';
import CreateTask, { TaskType } from './CreateTask';

const MoveCandidate: React.FC<{
  applicationLimit: CountJobs;
  selectAll: boolean;
  setSelectAll: Dispatch<SetStateAction<boolean>>;
}> = ({ applicationLimit, selectAll, setSelectAll }) => {
  const {
    section,
    cardStates: {
      checkList: { list, disabled },
    },
    setCardStates,
    handleJobApplicationSectionUpdate,
    actionVisibilities,
    actionProps,
    setActionProps,
    canCreateTask,
    applications,
  } = useJobApplications();
  const [purposes, setPurposes] = useState([]);
  const [taskCheck, setTaskCheck] = useState(false);
  const [task, setTask] = useState<TaskType>(null);
  const isChecked = list.size !== 0;

  const showNew = isChecked && actionVisibilities.new;
  const showScreening = isChecked && actionVisibilities.screening;
  const showAssessment = isChecked && actionVisibilities.assessment;
  const showInterview =
    isChecked && actionVisibilities.interview && canCreateTask;
  const showQualified = isChecked && actionVisibilities.qualified;
  const showDisqualified = isChecked && actionVisibilities.disqualified;
  const handlePopUpCheck = () => {
    actionProps.destination === 'interview'
      ? setTaskCheck((prev) => {
          if (prev) setTask(null);
          return !prev;
        })
      : setPurposes((prev) =>
          prev.length !== 0 ? [] : getPurpose(actionProps.destination),
        );
  };
  const handleMoveCandidate = async () => {
    if (!disabled) {
      setActionProps((prev) => ({ ...prev, open: false }));
      setCardStates((prev) => ({
        ...prev,
        checkList: { ...prev.checkList, disabled: true },
      }));
      await handleJobApplicationSectionUpdate(
        {
          source: section,
          destination: actionProps.destination,
        },
        taskCheck && canCreateTask ? task : null,
        purposes,
        list,
        selectAll,
      );
      setCardStates((prev) => ({
        ...prev,
        checkList: {
          disabled: false,
          list: new Set(),
        },
      }));
      setSelectAll(false);
    }
  };
  const handleOpen = (destination: JobApplicationSections) => {
    setActionProps({ open: true, destination });
  };
  const handleClose = () => {
    setActionProps((prev) => ({ ...prev, open: false }));
    setTimeout(() => {
      setActionProps({ open: false, destination: null });
      setTaskCheck(false);
      setTask(null);
    }, 200);
  };

  useEffect(() => {
    if (actionProps.destination === 'interview' && canCreateTask) {
      setTaskCheck(true);
    }
  }, [actionProps.destination, canCreateTask]);

  return (
    <>
      <SelectActionsDropdown
        isInterview={showInterview}
        onClickInterview={{
          onClick: () => handleOpen(JobApplicationSections.INTERVIEW),
        }}
        isAssessment={showAssessment}
        onClickAssessment={{
          onClick: () => handleOpen(JobApplicationSections.ASSESSMENT),
        }}
        isQualified={showQualified}
        onClickQualified={{
          onClick: () => handleOpen(JobApplicationSections.QUALIFIED),
        }}
        isDisqualified={showDisqualified}
        onClickDisqualified={{
          onClick: () => handleOpen(JobApplicationSections.DISQUALIFIED),
        }}
        onClickMoveNew={{
          onClick: () => handleOpen(JobApplicationSections.NEW),
        }}
        isMoveNew={showNew}
        onClickScreening={{
          onClick: () => handleOpen(JobApplicationSections.SCREENING),
        }}
        isScreening={showScreening}
      />
      <MoveCandidateDialog
        open={actionProps.open}
        onClose={() => handleClose()}
        destination={actionProps.destination}
        onSubmit={async () => await handleMoveCandidate()}
        showCheck={
          checkVisibility(actionProps.destination) ||
          (actionProps.destination === 'interview' && canCreateTask)
        }
        checked={
          actionProps.destination === 'interview'
            ? taskCheck
            : purposes.length !== 0
        }
        checkAction={() => handlePopUpCheck()}
        count={selectAll ? applicationLimit[section] : list.size}
        slotMoveAssessment={
          showInterview && (
            <Collapse in={actionProps.destination === 'interview' && taskCheck}>
              <CreateTask applications={applications.new} setTask={setTask} />
            </Collapse>
          )
        }
      />
    </>
  );
};

export default MoveCandidate;

const MoveCandidateDialog = ({
  open,
  onClose,
  checked,
  showCheck,
  destination,
  onSubmit,
  checkAction,
  count = 0,
  name = null,
  slotMoveAssessment = <></>,
}: {
  open: boolean;
  checked: boolean;
  showCheck: boolean;
  onClose: () => void;
  destination: JobApplicationSections;
  onSubmit: () => Promise<void>;
  checkAction: () => void;
  count?: number;
  name?: string;
  slotMoveAssessment?: React.JSX.Element;
}) => {
  const title = capitalize(destination);
  const subTitle = getSubTitle(destination, count, name);
  const description = getDescription(destination, count, name);

  return (
    <TaskStatesProvider>
      <Dialog open={open} onClose={() => onClose()}>
        <CandidateSelectionPopup
          isCheckVisible={showCheck}
          textHeader={title}
          textDescription={description}
          isChecked={checked}
          textCheck={subTitle}
          onclickCheck={{ onClick: () => checkAction() }}
          onclickClose={{ onClick: () => onClose() }}
          slotButtons={
            <Stack
              spacing={'var(--space-2)'}
              mt={'var(--space-2)'}
              direction={'row'}
              alignItems={'center'}
            >
              <ButtonGhost
                textButton='Cancel'
                color={'neutral'}
                size={2}
                onClickButton={{
                  onClick: () => onClose(),
                }}
              />
              <ButtonSolid
                textButton={title}
                size={2}
                onClickButton={{
                  onClick: () => onSubmit(),
                }}
              />
            </Stack>
          }
          slotMoveAssessment={slotMoveAssessment}
        />
      </Dialog>
    </TaskStatesProvider>
  );
};

const checkVisibility = (destination: JobApplicationSections) => {
  return (
    destination === JobApplicationSections.SCREENING ||
    destination === JobApplicationSections.ASSESSMENT ||
    destination === JobApplicationSections.DISQUALIFIED
  );
};

const getDescription = (
  destination,
  count: number = 0,
  name: string = null,
) => {
  if (name) return `Move ${name} to ${capitalize(destination)} stage?`;
  return `Move ${count} candidate${count !== 1 ? 's' : ''} to ${capitalize(
    destination,
  )} stage`;
};

const getSubTitle = (
  destination: JobApplicationSections,
  count: number = 0,
  name: string = null,
) => {
  if (name) {
    switch (destination) {
      case JobApplicationSections.SCREENING:
        return `Proceed to send a screening email to ${name}`;
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to ${name}`;
      case JobApplicationSections.INTERVIEW:
        return `Create scheduling task.`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to ${name}`;
      default:
        return null;
    }
  } else if (count === 0) return null;
  else {
    switch (destination) {
      case JobApplicationSections.SCREENING:
        return `Proceed to send a screening email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      case JobApplicationSections.ASSESSMENT:
        return `Proceed to send an assessment email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      case JobApplicationSections.INTERVIEW:
        return `Create scheduling task.`;
      case JobApplicationSections.DISQUALIFIED:
        return `Proceed to send a rejection email to the candidate${
          count !== 1 ? 's' : ''
        }`;
      default:
        return null;
    }
  }
};

const getPurpose = (
  destination: JobApplicationSections,
): JobApplicationEmails['request']['purposes'] => {
  switch (destination) {
    case JobApplicationSections.NEW:
      return [];
    case JobApplicationSections.ASSESSMENT:
      return ['interview'];
    case JobApplicationSections.SCREENING:
      return ['phone_screening'];
    case JobApplicationSections.QUALIFIED:
      return null;
    case JobApplicationSections.DISQUALIFIED:
      return ['rejection'];
    default:
      return [];
  }
};
