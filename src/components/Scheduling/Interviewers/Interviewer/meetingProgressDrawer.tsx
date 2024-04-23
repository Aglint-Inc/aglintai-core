import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import {
  InterviewScreenCard,
  MutedShadowSession,
  ShadowSession,
  ShadowSessionCard,
  StatusBadge,
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { RecruiterUserType } from '@/src/types/data.types';
import { getFullName } from '@/src/utils/jsonResume';
import { numberToOrdinalText } from '@/src/utils/numberToText/numberToOrdinalText';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import {
  getScheduleTextcolor,
  getScheduleType,
} from '../../AllSchedules/utils';
import { getMeetingsByUserIdModuleId } from '.';

export default function MeetingProgressDrawer({
  user,
  moduleSettings,
  meetings,
  open,
  onClose,
}: {
  user: RecruiterUserType;
  moduleSettings: { noShadow: number; noReverseShadow: number };
  meetings: Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>[string];
  open: boolean;
  onClose: () => void;
}) {
  //   console.log({ user, moduleSettings, meetings });

  const shadowProgress = meetings.filter(
    (prog) => prog.training_type == 'shadow',
  );

  const mutatedShadowProgress = Array.from({
    length: moduleSettings.noShadow - shadowProgress.length,
  });

  const reverseShadowProgress = meetings.filter(
    (prog) => prog.training_type == 'reverse_shadow',
  );

  const mutatedReverseShadowProgress = Array.from({
    length: moduleSettings.noReverseShadow - reverseShadowProgress.length,
  });
  return (
    <Drawer anchor={'right'} open={open} onClose={onClose}>
      <ShadowSession
        onClickClose={{
          onClick: onClose,
        }}
        textName={user?.first_name}
        slotProfileImage={
          user && (
            <MuiAvatar
              src={user.profile_image}
              level={getFullName(user.first_name, user.last_name)}
              variant='circular'
              height='24px'
              width='24px'
              fontSize='12px'
            />
          )
        }
        slotShadowSessionCard={
          <>
            {shadowProgress.map((prog, ind) => {
              return (
                <SessionCard
                  key={ind}
                  prog={prog}
                  isLineVisible={true}
                  session_name={`${numberToOrdinalText(ind + 1)} Shadow`}
                />
              );
            })}
            {mutatedShadowProgress.map((_, index) => (
              <MutedShadowSession
                slotStatusBadge={
                  <StatusBadge
                    isNotScheduledVisible={true}
                    isConfirmedVisible={false}
                  />
                }
                isReverseShadowIconVisible={false}
                isShadowIconVisible={true}
                textSessionHeader={`${numberToOrdinalText(index + 1 + shadowProgress.length)} Shadow Session`}
                key={index}
                isLineVisible={index != mutatedShadowProgress.length - 1}
              />
            ))}

            {reverseShadowProgress.map((prog, ind) => {
              return (
                <SessionCard
                  key={ind}
                  prog={prog}
                  isLineVisible={true}
                  session_name={`${numberToOrdinalText(ind + 1)} Reverse Shadow`}
                />
              );
            })}
            {mutatedReverseShadowProgress.map((_, index) => (
              <MutedShadowSession
                slotStatusBadge={
                  <StatusBadge
                    isNotScheduledVisible={true}
                    isConfirmedVisible={false}
                  />
                }
                isReverseShadowIconVisible={true}
                isShadowIconVisible={false}
                textSessionHeader={`${numberToOrdinalText(index + 1 + reverseShadowProgress.length)} Reverse Shadow Session`}
                key={index}
                isLineVisible={index != mutatedReverseShadowProgress.length - 1}
              />
            ))}
          </>
        }
      />
    </Drawer>
  );
}

function SessionCard({
  session_name,
  prog,
  isLineVisible,
}: {
  session_name: string;
  prog: Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>[string][number];
  isLineVisible: boolean;
}) {
  const router = useRouter();
  return (
    <ShadowSessionCard
      textSessionName={session_name}
      isShadowIconVisible={prog.training_type === 'shadow'}
      isReverseShadowIconVisible={prog.training_type === 'reverse_shadow'}
      slotStatusBadge={
        <StatusBadge
          isNotScheduledVisible={false}
          isConfirmedVisible={prog.status == 'confirmed'}
          isCancelledVisible={prog.status == 'cancelled'}
          isCompletedVisible={prog.status == 'completed'}
          isInProgressVisible={prog.status == 'waiting'}
        />
      }
      slotInterviewScreenCard={
        <InterviewScreenCard
          onClickCard={{
            onClick: () => {
              router.push(
                `/scheduling/view?schedule_id=${prog.interview_schedule_id}&module_id=${prog.module_id}`,
              );
            },
          }}
          colorPropsText={{
            style: {
              color: getScheduleTextcolor(prog.status),
            },
          }}
          textDate={dayjs(prog.start_time).format('DD')}
          textDay={dayjs(prog.start_time).format('dddd')}
          textMonth={dayjs(prog.start_time).format('MMM')}
          isStatusVisible={false}
          textTime={`${dayjs(prog.start_time).format('hh:mm A')} - ${dayjs(prog.end_time).format('hh:mm A')}`}
          textMeetingPlatform={getScheduleType(prog.schedule_type)}
          slotMeetingIcon={<IconScheduleType type={prog.schedule_type} />}
          textTitle={prog.name}
        />
      }
      isLineVisible={isLineVisible}
    />
  );
}
