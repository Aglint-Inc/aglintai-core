/* eslint-disable security/detect-object-injection */
import { DatabaseTableInsert } from '@aglint/shared-types';
import { Checkbox, Dialog, Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { DcPopup } from '@/devlink/DcPopup';
import { GlobalBannerShort } from '@/devlink2/GlobalBannerShort';
import { SelectActionsDropdown } from '@/devlink2/SelectActionsDropdown';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalize } from '@/src/utils/text/textUtils';

import { formatSessions } from '../utils';
import CreateRequest, { sessionType } from './CreateRequest';

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

const MoveCandidateInterview = () => {
  const { recruiterUser } = useAuthDetails();
  const {
    handleMoveApplicationToInterview,
    sectionApplication: { data },
  } = useApplications();
  const { resetActionPopup, checklist } = useApplicationsStore(
    ({ resetActionPopup, checklist }) => ({
      checklist,
      resetActionPopup,
    }),
  );

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
            .find(({ id }) => id === application_id)?.name ?? ``;
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
                  <li>All the related requests will be closed</li>
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

function useMeta(onSubmit: () => void, buttonText: string = null) {
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
        textButton={buttonText ?? `Move to ${actionPopup}`}
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
