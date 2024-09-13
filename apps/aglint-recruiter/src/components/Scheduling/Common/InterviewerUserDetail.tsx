import { type DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { Stack } from '@mui/material';
import { GlobalUserDetail } from 'src/app/_common/components/GlobalUserDetail';

import { UIBadge } from '@/components/Common/UIBadge';

import InterviewerAcceptDeclineIcon from '../../Common/Icons/InterviewerAcceptDeclineIcon';
import InterviewerTrainingTypeIcon from '../../Common/Icons/InterviewerTrainingTypeIcon';
import MuiAvatar from '../../Common/MuiAvatar';
import { getPauseMemberText } from '../InterviewTypes/DetailPage/_common/utils/utils';
import { formatTimeWithTimeZone, getShortTimeZone } from '../utils';

function InterviewerUserDetail({
  interview_meeting,
  cancelReason,
  accepted_status,
  isCalendarConnected,
  isPaused,
  pause_json,
  userDetails,
  interviewerTimeZone,
  trainingType,
  interviewerType,
}: {
  interview_meeting: Pick<
    DatabaseTable['interview_meeting'],
    'start_time' | 'end_time' | 'status'
  >;
  cancelReason: DatabaseTable['interview_session_cancel'];
  accepted_status: DatabaseTable['interview_session_relation']['accepted_status'];
  isCalendarConnected: boolean;
  isPaused: boolean;
  pause_json: DatabaseTable['interview_module_relation']['pause_json'];
  userDetails: {
    profile_image: string;
    position: string;
    user_id: string;
    first_name: string;
    last_name: string;
  };
  interviewerTimeZone: string;
  trainingType: DatabaseTable['interview_session_relation']['training_type'];
  interviewerType: DatabaseTable['interview_session_relation']['interviewer_type'];
}) {
  return (
    <GlobalUserDetail
      slotCandidateStatus={
        <Stack
          height={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
          direction={'row'}
        >
          {trainingType ? (
            <InterviewerTrainingTypeIcon type={trainingType} />
          ) : interviewerType !== 'qualified' &&
            trainingType !== 'qualified' ? (
            <UIBadge color={'info'} textBadge={'Training'} size={'sm'} />
          ) : (
            ''
          )}
          {interview_meeting?.status === 'confirmed' && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Stack
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    <InterviewerAcceptDeclineIcon type={accepted_status} />
                  </Stack>
                </TooltipTrigger>
                {cancelReason?.reason && (
                  <TooltipContent>
                    <Stack p={'var(--space-2)'} spacing={'var(--space-1)'}>
                      <p className='text-sm text-warning'>
                        Reason : {cancelReason?.reason}
                      </p>
                      {cancelReason?.other_details?.note && (
                        <p className='text-sm text-muted-foreground'>
                          Notes : {cancelReason?.other_details?.note}
                        </p>
                      )}
                    </Stack>
                  </TooltipContent>
                )}
              </Tooltip>
            </>
          )}

          {interview_meeting?.status !== 'confirmed' &&
            interview_meeting?.status !== 'completed' && (
              <>
                {!isCalendarConnected && (
                  <UIBadge
                    size={'sm'}
                    iconName={'CalendarOff'}
                    color={'error'}
                    textBadge={`Calendar not connected`}
                  />
                )}
                {isPaused && (
                  <UIBadge
                    size={'sm'}
                    color={'error'}
                    iconName={'CalendarFold'}
                    textBadge={`Paused ${getPauseMemberText(pause_json)}`}
                  />
                )}
              </>
            )}
        </Stack>
      }
      textTimeZone={
        interview_meeting?.start_time
          ? formatTimeWithTimeZone({
              start_time: interview_meeting.start_time,
              end_time: interview_meeting.end_time,
              timeZone: interviewerTimeZone,
            })
          : getShortTimeZone(interviewerTimeZone)
      }
      isRoleVisible={true}
      slotRole={
        userDetails?.position ? (
          <p className='text-sm text-muted-foreground'>
            {userDetails.position}
          </p>
        ) : (
          '--'
        )
      }
      textName={getFullName(userDetails.first_name, userDetails.last_name)}
      slotImage={
        <MuiAvatar
          level={getFullName(userDetails.first_name, userDetails.last_name)}
          src={userDetails.profile_image}
          variant={'rounded'}
          fontSize={'14px'}
          width='100%'
          height='100%'
        />
      }
      isSlotImageVisible={true}
      isCandidateAvatarVisible={false}
    />
  );
}

export default InterviewerUserDetail;
