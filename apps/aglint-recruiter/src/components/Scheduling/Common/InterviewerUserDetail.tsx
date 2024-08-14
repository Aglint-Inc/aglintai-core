import { DatabaseTable } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { Stack } from '@mui/material';
import Link from 'next/link';

import { GlobalBadge } from '@/devlink/GlobalBadge';
import { Text } from '@/devlink/Text';
import { GlobalUserDetail } from '@/devlink3/GlobalUserDetail';

import InterviewerAcceptDeclineIcon from '../../Common/Icons/InterviewerAcceptDeclineIcon';
import InterviewerTrainingTypeIcon from '../../Common/Icons/InterviewerTrainingTypeIcon';
import MuiAvatar from '../../Common/MuiAvatar';
import { CustomTooltip } from '../../Common/Tooltip';
import { getPauseMemberText } from '../InterviewTypes/DetailPage/SlotBodyComp/utils';
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
            <GlobalBadge color={'info'} textBadge={'Training'} size={1} />
          ) : (
            ''
          )}
          {interview_meeting?.status === 'confirmed' && (
            <>
              <CustomTooltip
                disableHoverListener={!cancelReason?.reason}
                // hidden={!cancelReason?.reason}
                title={
                  <Stack p={'var(--space-2)'} spacing={'var(--space-1)'}>
                    <Text
                      size={1}
                      content={`Reason : ${cancelReason?.reason}`}
                      color={'warning'}
                      weight={'regular'}
                    />
                    {cancelReason?.other_details?.note && (
                      <Text
                        size={1}
                        content={`Notes : ${cancelReason?.other_details?.note}`}
                        weight={'regular'}
                        color={'neutral'}
                      />
                    )}
                  </Stack>
                }
              >
                <Stack
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <InterviewerAcceptDeclineIcon type={accepted_status} />
                </Stack>
              </CustomTooltip>
            </>
          )}

          {interview_meeting?.status !== 'confirmed' &&
            interview_meeting?.status !== 'completed' && (
              <>
                {!isCalendarConnected && (
                  <GlobalBadge
                    size={1}
                    showIcon={true}
                    iconName={'warning'}
                    color={'error'}
                    textBadge={`Calendar not connected`}
                  />
                )}
                {isPaused && (
                  <GlobalBadge
                    size={1}
                    showIcon={true}
                    iconName={'error'}
                    color={'warning'}
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
          <Text
            content={userDetails.position}
            size={1}
            color={'neutral'}
            weight={'regular'}
          />
        ) : (
          '--'
        )
      }
      textName={
        <Link href={`/user/profile/${userDetails.user_id}`}>
          {getFullName(userDetails.first_name, userDetails.last_name)}
        </Link>
      }
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
