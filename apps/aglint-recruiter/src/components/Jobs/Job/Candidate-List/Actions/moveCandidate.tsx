/* eslint-disable security/detect-object-injection */
import { DatabaseEnums } from '@aglint/shared-types';
import { Checkbox, Collapse, Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { SelectActionsDropdown } from '@/devlink2/SelectActionsDropdown';
import { TaskStatesProvider } from '@/src/components/Tasks/TaskStatesContext';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalize } from '@/src/utils/text/textUtils';

import CreateTask from './createTask';

const MoveCandidate = () => {
  const { emailVisibilities } = useApplications();
  const { actionPopup, checklist, setActionPopup, resetActionPopup } =
    useApplicationsStore(
      ({ actionPopup, checklist, setActionPopup, resetActionPopup }) => ({
        actionPopup,
        checklist,
        setActionPopup,
        resetActionPopup,
      }),
    );
  const enabled = checklist.length !== 0;
  return (
    <>
      <SelectActionsDropdown
        isAssessment={enabled && emailVisibilities.assessment}
        isDisqualified={enabled && emailVisibilities.disqualified}
        isInterview={enabled && emailVisibilities.interview}
        isMoveNew={enabled && emailVisibilities.new}
        isQualified={enabled && emailVisibilities.qualified}
        isScreening={enabled && emailVisibilities.screening}
        onClickAssessment={{ onClick: () => setActionPopup('assessment') }}
        onClickDisqualified={{ onClick: () => setActionPopup('disqualified') }}
        onClickInterview={{ onClick: () => setActionPopup('interview') }}
        onClickMoveNew={{ onClick: () => setActionPopup('new') }}
        onClickQualified={{ onClick: () => setActionPopup('qualified') }}
        onClickScreening={{ onClick: () => setActionPopup('screening') }}
      />
      <Dialog open={!!actionPopup} onClose={() => resetActionPopup()}>
        <MoveAction />
      </Dialog>
    </>
  );
};

export { MoveCandidate };

const MoveAction = () => {
  const { actionPopup } = useApplicationsStore(({ actionPopup }) => ({
    actionPopup,
  }));
  switch (actionPopup) {
    case 'assessment':
      return <MoveCandidateAssessment />;
    case 'new':
      return <MoveCandidateNew />;
    case 'qualified':
      return <MoveCandidateQualified />;
    case 'disqualified':
      return <MoveCandidateDisqualified />;
    case 'screening':
      return <MoveCandidateScreening />;
    case 'interview':
      return <MoveCandidateInterview />;
  }
};

const MoveCandidateNew = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'new',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <DcPopup
      popupName={title}
      slotBody={
        <Stack gap={2}>
          <GlobalBannerShort
            color={'error'}
            iconName={'warning'}
            slotButtons={<></>}
            textTitle={`You are about to ${description}`}
            textDescription={
              <Stack px={1}>
                <li>All the schedules will be deleted</li>
              </Stack>
            }
          />
        </Stack>
      }
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateScreening = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const [checked, setChecked] = useState(false);
  const { buttons, title, description, action } = useMeta(() => {
    handleMoveApplications({
      status: 'screening',
      email: checked ? 'phoneScreen_email_candidate' : null,
    });
    resetActionPopup();
  });
  return (
    <DcPopup
      popupName={title}
      slotBody={
        <Stack gap={2}>
          {capitalize(description)}
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Checkbox
              checked={checked}
              onClick={() => setChecked((prev) => !prev)}
            />
            {capitalize(action)}
          </Stack>
        </Stack>
      }
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateAssessment = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'assessment',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <DcPopup
      popupName={title}
      slotBody={<Stack gap={2}>{capitalize(description)}</Stack>}
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

type TaskType = {
  assignee: string[];
  schedule_date_range: { start_date: string; end_date: string };
  session_ids: any[];
  task_owner: string;
  status: DatabaseEnums['task_status'];
  priority: DatabaseEnums['task_priority'];
  type: DatabaseEnums['task_type_enum'];
  due_date: string;
  start_date: string;
  name: string;
};

const MoveCandidateInterview = () => {
  const { recruiterUser } = useAuthDetails();
  const { handleMoveApplicationToInterview, job } = useApplications();
  const { resetActionPopup, checklist } = useApplicationsStore(
    ({ resetActionPopup, checklist }) => ({
      checklist,
      resetActionPopup,
    }),
  );

  const [taskCheck, setTaskCheck] = useState(true);
  const [task, setTask] = useState<TaskType>(null);

  const { buttons, title, description } = useMeta(() => {
    handleMoveApplicationToInterview({
      request: taskCheck
        ? {
            assignee_id: (task?.assignee ?? []).find(Boolean),
            assigner_id: recruiterUser?.user_id ?? null,
            title: task?.name ?? 'Request',
            type: 'schedule_request',
            priority: 'standard',
            status: 'to_do',
            schedule_end_date: null,
            schedule_start_date: null,
          }
        : null,
      sessions: taskCheck ? (task?.session_ids ?? []).map(({ id }) => id) : [],
    });
    resetActionPopup();
  });

  return (
    <TaskStatesProvider>
      <DcPopup
        popupName={title}
        slotBody={
          <Stack gap={2}>
            {capitalize(description)}
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Checkbox
                checked={taskCheck}
                onClick={() => setTaskCheck((prev) => !prev)}
              />
              {'Create scheduling request'}
            </Stack>
            <Collapse in={taskCheck}>
              <CreateTask
                applications={checklist}
                setTask={setTask}
                job_id={job?.id}
              />
            </Collapse>
          </Stack>
        }
        onClickClosePopup={{ onClick: () => resetActionPopup() }}
        slotButtons={buttons}
      />
    </TaskStatesProvider>
  );
};

const MoveCandidateQualified = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplications({
      status: 'qualified',
      email: null,
    });
    resetActionPopup();
  });
  return (
    <DcPopup
      popupName={title}
      slotBody={<Stack gap={2}>{capitalize(description)}</Stack>}
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateDisqualified = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsStore(({ resetActionPopup }) => ({
    resetActionPopup,
  }));
  const [checked, setChecked] = useState(false);
  const { buttons, title, description, action } = useMeta(() => {
    handleMoveApplications({
      status: 'disqualified',
      email: checked ? 'applicantReject_email_applicant' : null,
    });
    resetActionPopup();
  });
  return (
    <>
      <DcPopup
        popupName={title}
        slotBody={
          <Stack gap={1}>
            <GlobalBannerShort
              color={'error'}
              iconName={'warning'}
              slotButtons={<></>}
              textTitle={`You are about to ${description}`}
              textDescription={
                <Stack px={1}>
                  <li>All the schedules will be cancelled</li>
                  <li>All the related tasks will be closed</li>
                  <li>You can still view the candidate details</li>
                  <li>Move to new state to start the process again</li>
                </Stack>
              }
            />
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <Checkbox
                checked={checked}
                onClick={() => setChecked((prev) => !prev)}
              />
              {capitalize(action)}
            </Stack>
          </Stack>
        }
        onClickClosePopup={{ onClick: () => resetActionPopup() }}
        slotButtons={buttons}
      />
    </>
  );
};

function useMeta(onSubmit: () => void) {
  const { resetActionPopup, actionPopup, checklist } = useApplicationsStore(
    ({ resetActionPopup, actionPopup, checklist }) => ({
      resetActionPopup,
      actionPopup,
      checklist,
    }),
  );
  const buttons = (
    <>
      <ButtonSoft
        textButton='Cancel'
        color={'neutral'}
        size={2}
        onClickButton={{ onClick: () => resetActionPopup() }}
      />

      <ButtonSolid
        textButton={`Move to ${actionPopup}`}
        size={2}
        onClickButton={{
          onClick: () => onSubmit(),
        }}
      />
    </>
  );
  const count = checklist.length;
  const title = `Move to ${actionPopup}`;
  const description = `move ${count} candidate${count === 1 ? '' : 's'} to ${actionPopup}`;
  const action = `Send ${actionPopup} email${count === 1 ? '' : 's'} to ${count} candidate${count === 1 ? '' : 's'}`;
  return { title, description, buttons, action, count };
}
