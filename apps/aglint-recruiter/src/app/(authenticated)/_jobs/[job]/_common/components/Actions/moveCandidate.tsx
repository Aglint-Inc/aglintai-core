/* eslint-disable security/detect-object-injection */
import type { DatabaseTableInsert } from '@aglint/shared-types';
import { Checkbox } from '@components/ui/checkbox';
import { DcPopup } from '@devlink/DcPopup';
import { SelectActionsDropdown } from '@devlink2/SelectActionsDropdown';
import { Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import {
  useApplications,
  useApplicationsActionPopup,
  useApplicationsActions,
  useApplicationsChecklist,
  useApplicationsStore,
} from '@/job/hooks';
import { formatSessions } from '@/utils/formatSessions';
import { capitalize } from '@/utils/text/textUtils';

import CreateRequest from './CreateRequest';
import type { sessionType } from './CreateRequest/SessionsList';

const MoveCandidate = () => {
  const { emailVisibilities } = useApplications();
  const actionPopup = useApplicationsActionPopup();
  const checklist = useApplicationsChecklist();
  const { setActionPopup, resetActionPopup } = useApplicationsActions();
  const enabled = checklist.length !== 0;
  return (
    <>
      <SelectActionsDropdown
        isAssessment={false}
        isDisqualified={enabled && emailVisibilities.disqualified}
        isInterview={enabled && emailVisibilities.interview}
        isMoveNew={enabled && emailVisibilities.new}
        isQualified={enabled && emailVisibilities.qualified}
        isScreening={false}
        onClickAssessment={{ style: { display: 'none' } }}
        onClickDisqualified={{ onClick: () => setActionPopup('disqualified') }}
        onClickInterview={{ onClick: () => setActionPopup('interview') }}
        onClickMoveNew={{ onClick: () => setActionPopup('new') }}
        onClickQualified={{ onClick: () => setActionPopup('qualified') }}
        onClickScreening={{ style: { display: 'none' } }}
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
    case 'new':
      return <MoveCandidateNew />;
    case 'qualified':
      return <MoveCandidateQualified />;
    case 'disqualified':
      return <MoveCandidateDisqualified />;
    case 'interview':
      return <MoveCandidateInterview />;
  }
};

const MoveCandidateNew = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsActions();
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
          <UIAlert
            color={'error'}
            iconName={'CircleAlert'}
            title={`You are about to ${description}`}
            description={<li>All the schedules will be deleted</li>}
          />
        </Stack>
      }
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateInterview = () => {
  const { recruiterUser } = useAuthDetails();
  const {
    handleMoveApplicationToInterview,
    sectionApplication: { data },
  } = useApplications();
  const checklist = useApplicationsChecklist();
  const { resetActionPopup } = useApplicationsActions();

  const [request, setRequest] = useState<DatabaseTableInsert['request']>(null);
  const [priority, setPriority] = useState<'urgent' | 'standard'>('standard');
  const [note, setNote] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<sessionType[]>([]);
  const buttonText = 'Request and Move';
  const { buttons, title, description } = useMeta(() => {
    handleMoveApplicationToInterview({
      requests: checklist.map((application_id) => {
        const name =
          (data?.pages ?? [])
            .flatMap((list) => list)
            .find(({ id }) => id === application_id)?.name ?? '';
        return {
          assignee_id: request.assignee_id,
          type: request.type,
          priority: priority,
          status: request.status,
          schedule_end_date: request.schedule_end_date,
          schedule_start_date: request.schedule_start_date,
          assigner_id: recruiterUser?.user_id ?? null,
          title: `Schedule ${formatSessions(selectedSession.map(({ name }) => name))} for ${name}`,
          application_id,
          note,
        };
      }),
      sessions: selectedSession.map(({ id }) => id),
    });
    resetActionPopup();
  }, buttonText);

  return (
    <DcPopup
      popupName={title}
      slotBody={
        <Stack gap={2}>
          {capitalize(description)}
          <CreateRequest
            setRequest={setRequest}
            setSelectedSession={setSelectedSession}
            selectedSession={selectedSession}
            setPriority={setPriority}
            priority={priority}
            note={note}
            setNote={setNote}
          />
        </Stack>
      }
      onClickClosePopup={{ onClick: () => resetActionPopup() }}
      slotButtons={buttons}
    />
  );
};

const MoveCandidateQualified = () => {
  const { handleMoveApplications } = useApplications();
  const { resetActionPopup } = useApplicationsActions();
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
  const { resetActionPopup } = useApplicationsActions();
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
            <UIAlert
              color={'error'}
              iconName={'CircleAlert'}
              title={`You are about to ${description}`}
              description={
                <div className='pt-1'>
                  <li>All the schedules will be cancelled</li>
                  <li>All the related requests will be closed</li>
                  <li>You can still view the candidate details</li>
                  <li>Move to new state to start the process again</li>
                </div>
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

function useMeta(onSubmit: () => void, buttonText: string = null) {
  const checklist = useApplicationsChecklist();
  const actionPopup = useApplicationsActionPopup();
  const { resetActionPopup } = useApplicationsActions();
  const buttons = (
    <>
      <UIButton size='sm' variant='secondary' onClick={() => resetActionPopup()}>
        Cancel
      </UIButton>

      <UIButton size='sm' variant='default' onClick={() => onSubmit()}>
        {buttonText ?? `Move to ${actionPopup}`}
      </UIButton>
    </>
  );
  const count = checklist.length;
  const title = `Move to ${actionPopup}`;
  const description = `move ${count} candidate${count === 1 ? '' : 's'} to ${actionPopup}`;
  const action = `Send ${actionPopup} email${count === 1 ? '' : 's'} to ${count} candidate${count === 1 ? '' : 's'}`;
  return { title, description, buttons, action, count };
}
