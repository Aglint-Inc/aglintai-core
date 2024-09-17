import { Edit } from 'lucide-react';
import { useRouter } from 'next/router';

import { UIButton } from '@/components/Common/UIButton';
import { type StageWithSessions } from '@/queries/application';

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
  const router = useRouter();

  const { onClickEdit } = useEditSession();

  const interview_meeting = currentSession.interview_meeting;
  return (
    <div className='flex gap-2'>
      {isViewDetailVisible &&
        (interview_meeting?.status === 'completed' ||
          interview_meeting?.status === 'confirmed' ||
          interview_meeting?.status === 'waiting' ||
          interview_meeting?.status === 'cancelled') && (
          <>
            <UIButton
              size='sm'
              variant='secondary'
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `/scheduling/view?meeting_id=${interview_meeting.id}&tab=candidate_details`,
                );
              }}
            >
              View Detail
            </UIButton>
          </>
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