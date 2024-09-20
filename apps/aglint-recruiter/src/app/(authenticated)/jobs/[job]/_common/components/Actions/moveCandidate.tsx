/* eslint-disable security/detect-object-injection */
import type { DatabaseTableInsert } from '@aglint/shared-types';
import { AlertDialog, AlertDialogContent } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { X } from 'lucide-react';
import { useState } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import {
  useApplicationsActions,
  useApplicationsMove,
  useApplicationsStore,
} from '@/job/hooks';
import { capitalize } from '@/utils/text/textUtils';

import CreateRequest from './CreateRequest';
import type { SessionType } from './CreateRequest/SessionsList';

export const MoveCandidate = () => {
  const emailVisibilities = useApplicationsStore((state) =>
    state.emailVisibilities(),
  );
  const actionPopup = useApplicationsStore((state) => state.actionPopup);
  const checklist = useApplicationsStore((state) => state.checklist);
  const { setActionPopup, resetActionPopup } = useApplicationsActions();
  const enabled = checklist.length !== 0;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full justify-start'>
            Move Candidate
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          {enabled && emailVisibilities.new && (
            <DropdownMenuItem onClick={() => setActionPopup('new')}>
              Move to New
            </DropdownMenuItem>
          )}
          {enabled && emailVisibilities.qualified && (
            <DropdownMenuItem onClick={() => setActionPopup('qualified')}>
              Move to Qualified
            </DropdownMenuItem>
          )}
          {enabled && emailVisibilities.disqualified && (
            <DropdownMenuItem onClick={() => setActionPopup('disqualified')}>
              Move to Disqualified
            </DropdownMenuItem>
          )}
          {enabled && emailVisibilities.interview && (
            <DropdownMenuItem onClick={() => setActionPopup('interview')}>
              Move to Interview
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={!!actionPopup} onOpenChange={resetActionPopup}>
        <AlertDialogContent className='p-0'>
          <MoveAction />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

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
  const { mutate, isPending } = useApplicationsMove();
  const { buttons, title, description } = useMeta(
    () =>
      mutate({
        status: 'new',
      }),
    isPending,
  );
  return (
    <Popup
      title={title}
      slotBody={
        <div className='space-y-4'>
          <UIAlert
            color={'error'}
            iconName={'CircleAlert'}
            title={`You are about to ${description}`}
            description={<li>All the schedules will be deleted</li>}
          />
        </div>
      }
      slotButtons={buttons}
    />
  );
};

const MoveCandidateInterview = () => {
  const { isShowFeature } = useAuthDetails();
  const { mutate, isPending } = useApplicationsMove();

  const [request, setRequest] = useState<DatabaseTableInsert['request']>(null);
  const [priority, setPriority] = useState<'urgent' | 'standard'>('standard');
  const [note, setNote] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<SessionType[]>([]);

  const buttonText = isShowFeature('SCHEDULING') ? 'Request and Move' : 'Move';
  const hideRequestBox = isShowFeature('SCHEDULING') ? '' : 'hidden';

  const { buttons, title, description } = useMeta(
    () =>
      mutate({
        status: 'interview',
        sessions: selectedSession.map(({ id }) => id),
        request: {
          assignee_id: request.assignee_id,
          type: request.type,
          priority: priority,
          schedule_end_date: request.schedule_end_date,
          schedule_start_date: request.schedule_start_date,
          note,
        },
      }),
    isPending,
    buttonText,
  );

  return (
    <Popup
      title={title}
      slotBody={
        <div className='flex flex-col gap-2'>
          {capitalize(description)}

          <div className={hideRequestBox}>
            <CreateRequest
              setRequest={setRequest}
              setSelectedSession={setSelectedSession}
              selectedSession={selectedSession}
              setPriority={setPriority}
              priority={priority}
              note={note}
              setNote={setNote}
            />
          </div>
        </div>
      }
      slotButtons={buttons}
    />
  );
};

const MoveCandidateQualified = () => {
  const { mutate, isPending } = useApplicationsMove();
  const { buttons, title, description } = useMeta(
    () =>
      mutate({
        status: 'qualified',
      }),
    isPending,
  );
  return (
    <Popup
      title={title}
      slotBody={
        <div className='flex flex-col gap-2'>{capitalize(description)}</div>
      }
      slotButtons={buttons}
    />
  );
};

const MoveCandidateDisqualified = () => {
  const { mutate, isPending } = useApplicationsMove();
  const { buttons, title, description } = useMeta(
    () =>
      mutate({
        status: 'disqualified',
      }),
    isPending,
  );
  return (
    <>
      <Popup
        title={title}
        slotBody={
          <div className='flex flex-col gap-4'>
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
          </div>
        }
        slotButtons={buttons}
      />
    </>
  );
};

function useMeta(
  onSubmit: () => void,
  isPending: boolean = false,
  buttonText: string = null,
) {
  const checklist = useApplicationsStore((state) => state.checklist);
  const actionPopup = useApplicationsStore((state) => state.actionPopup);
  const { resetActionPopup } = useApplicationsActions();
  const buttons = (
    <>
      <UIButton
        variant='secondary'
        onClick={() => resetActionPopup()}
        disabled={isPending}
      >
        Cancel
      </UIButton>

      <UIButton
        variant='default'
        onClick={() => onSubmit()}
        disabled={isPending}
      >
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

const Popup = ({ title, slotBody, slotButtons }) => {
  const { resetActionPopup } = useApplicationsActions();
  return (
    <div className='mx-autojustify-center mx-auto flex w-[500px] items-center'>
      <div className='w-full max-w-lg'>
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <h2 className='font-semibold'>{title}</h2>
          <UIButton
            onClick={() => resetActionPopup()}
            variant='ghost'
            size='sm'
          >
            <X className='h-4 w-4' />
          </UIButton>
        </div>
        <div className='p-4'>{slotBody}</div>
        <div className='flex justify-end gap-2 border-t border-gray-200 p-4'>
          {slotButtons}
        </div>
      </div>
    </div>
  );
};