import { Edit } from 'lucide-react';
import Link from 'next/link';

import { UIButton } from '@/components/Common/UIButton';
import { type StageWithSessions } from '@/queries/application';
import ROUTES from '@/utils/routing/routes';

import { useEditSession } from '../../InterviewTab/hooks/useEditSession';

function ButtonGroupRight({
  currentSession,
  isEditIconVisible,
  isViewDetailVisible,
}: {
  currentSession: StageWithSessions[0]['sessions'][0];
  isEditIconVisible: boolean;
  isViewDetailVisible: boolean;
}) {

  const { onClickEdit } = useEditSession();

  const interview_meeting = currentSession.interview_meeting;
  return (
    <div className='flex gap-2'>
      {isViewDetailVisible &&
        (interview_meeting?.status === 'completed' ||
          interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'waiting' ||
          interview_meeting?.status === 'cancelled') && (
          <Link
            href={
              ROUTES['/scheduling/view']() +
              `?meeting_id=${interview_meeting.id}&tab=candidate_details`
            }
          >
            <UIButton size='sm' variant='secondary'>
              View Detail
            </UIButton>
          </Link>
        )}

      {isEditIconVisible &&
        (interview_meeting?.status === 'not_scheduled' ||
          interview_meeting?.status === 'cancelled' ||
          !interview_meeting) && (
          <UIButton
            variant='secondary'
            size='sm'
            iconClassName='text-neutral-600'
            icon={<Edit />}
            onClick={async () => {
              onClickEdit(currentSession);
            }}
          />
        )}
    </div>
  );
}

export default ButtonGroupRight;
