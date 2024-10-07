import type { DatabaseTable } from '@aglint/shared-types';
import { AlertDialog, AlertDialogContent } from '@components/ui/alert-dialog';
import { Button } from '@components/ui/button';
import { UIAlert } from '@components/ui-alert';
import { X } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { useFlags } from '@/company/hooks/useFlags';
import { UIButton } from '@/components/Common/UIButton';
import {
  useApplicationsActions,
  useApplicationsMove,
  useApplicationsStore,
} from '@/job/hooks';
import { capitalize } from '@/utils/text/textUtils';

import CreateRequest from './CreateRequest';
import type { SessionType } from './CreateRequest/SessionsList';

export const Actions = () => {
  const actionPopup = useApplicationsStore((state) => state.actionPopup);
  const checklist = useApplicationsStore((state) => state.checklist);
  const emailVisibilities = useApplicationsStore((state) =>
    state.emailVisibilities(),
  );
  const { resetActionPopup, setActionPopup, resetChecklist } =
    useApplicationsActions();
  const count = checklist.length;
  const enabled = count !== 0;

  return (
    <>
      <div className='flex w-full items-center bg-blue-100 px-8 py-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-gray-600'>
              {`Move ${count} selected candidate${count === 1 ? '' : 's'} to:`}
            </span>
            {enabled && emailVisibilities.new && (
              <Button variant='outline' onClick={() => setActionPopup('new')}>
                New
              </Button>
            )}
            {enabled && emailVisibilities.interview && (
              <Button
                variant='outline'
                onClick={() => setActionPopup('interview')}
              >
                Interview
              </Button>
            )}
            {enabled && emailVisibilities.qualified && (
              <Button
                variant='outline'
                onClick={() => setActionPopup('qualified')}
              >
                Qualified
              </Button>
            )}
            {enabled && emailVisibilities.disqualified && (
              <Button
                variant='outline'
                onClick={() => setActionPopup('disqualified')}
              >
                Disqualified
              </Button>
            )}
            <Button
              onClick={() => resetChecklist()}
              variant='ghost'
              className='text-gray-600 hover:text-gray-800'
            >
              <X className='mr-2 h-4 w-4' /> Clear Selection
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog open={!!actionPopup} onOpenChange={resetActionPopup}>
        <AlertDialogContent className='p-0'>
          <MoveAction />
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const MoveAction = () => {
  const actionPopup = useApplicationsStore((state) => state.actionPopup);
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
  const { buttons, title, description } = useMeta(() => {
    mutate({
      status: 'new',
    });
  }, isPending);
  return (
    <Popup
      title={title}
      slotBody={
        <div className='space-y-4'>
          <UIAlert type='info' title={`You are about to:`}>
            <ul className='list-disc pl-4'>
              {description}
              <li>All the schedules will be deleted</li>
            </ul>
          </UIAlert>
        </div>
      }
      slotButtons={buttons}
    />
  );
};

const MoveCandidateInterview = () => {
  const { isShowFeature } = useFlags();
  const { mutate, isPending } = useApplicationsMove();
  const [request, setRequest] = useState<DatabaseTable['request'] | null>(null);
  const [priority, setPriority] = useState<'urgent' | 'standard'>('standard');
  const [note, setNote] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<SessionType[]>([]);
  const showRequest = isShowFeature('SCHEDULING') && selectedSession.length > 0;

  const buttonText = showRequest ? 'Request and Move' : 'Move';
  const hideRequestBox = isShowFeature('SCHEDULING') ? '' : 'hidden';

  const { buttons, title, description } = useMeta(
    () => {
      mutate({
        status: 'interview',
        body: (showRequest
          ? {
              request: { ...request!, note },
              sessions: selectedSession.map(({ id }) => id),
            }
          : null)!,
      });
    },
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
  const { buttons, title, description } = useMeta(() => {
    mutate({
      status: 'qualified',
    });
  }, isPending);

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
  const { buttons, title, description } = useMeta(() => {
    mutate({
      status: 'disqualified',
    });
  }, isPending);

  return (
    <>
      <Popup
        title={title}
        slotBody={
          <div className='flex flex-col gap-4'>
            <UIAlert type='error' title={`You are about to:`}>
              <ul className='pt-1'>
                ${description}
                <li>All the schedules will be canceled</li>
                <li>All the related requests will be closed</li>
                <li>You can still view the candidate details</li>
                <li>Move to new state to start the process again</li>
              </ul>
            </UIAlert>
          </div>
        }
        slotButtons={buttons}
      />
    </>
  );
};

function useMeta(
  onSubmit: () => void,
  isPending = false,
  buttonText: string | null = null,
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
const Popup = ({
  title,
  slotBody,
  slotButtons,
}: {
  title: string;
  slotBody: ReactNode;
  slotButtons: ReactNode;
}) => {
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
