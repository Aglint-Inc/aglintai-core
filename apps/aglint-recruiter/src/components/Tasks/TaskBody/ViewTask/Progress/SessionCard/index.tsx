import { DatabaseEnums } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import { AvailableOptionCardDate } from '@/devlink2/AvailableOptionCardDate';
import { OptionAvailable } from '@/devlink2/OptionAvailable';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

export type meetingCardType = {
  id: string;
  name: string;
  interview_meeting: {
    id: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
  };
  session_order: number;
  users: {
    email: string;
    user_id: string;
    last_name: string;
    first_name: string;
    meeting_id: string;
    session_id: string;
    profile_image: string | null;
    training_type: DatabaseEnums['interviewer_type'];
    interviewer_type: DatabaseEnums['status_training'];
  }[];
};

function SessionCard({
  indOpt,
  ses,
  sessionList,
}: {
  indOpt: number;
  ses: meetingCardType;
  sessionList: meetingCardType[];
}) {
  const localTime = new Date().toTimeString();
  const timeZonea = localTime.substring(
    localTime.lastIndexOf('(') + 1,
    localTime.lastIndexOf(')'),
  );
  const timezone = timeZonea
    .split(' ')
    .map((ele) => ele[0])
    .join('');
  return (
    <>
      <AvailableOptionCardDate
        isDateWrapVisible={
          indOpt == 0 ||
          !dayjs(sessionList[indOpt - 1]?.interview_meeting?.start_time).isSame(
            ses.interview_meeting?.start_time,
            'day',
          ) // temp fix for hiding date.
        }
        textDate={dayjs(ses.interview_meeting?.start_time).format('DD')}
        textDay={dayjs(ses.interview_meeting?.start_time).format('dddd')}
        textMonth={dayjs(ses.interview_meeting?.start_time).format('MMM')}
        slotOptionAvailable={
          <>
            <OptionAvailable
              textTime={`${dayjs(ses.interview_meeting?.start_time).format(
                'hh:mm A',
              )} - ${dayjs(ses.interview_meeting?.end_time).format('hh:mm A')} (${timezone})`}
              textTitle={ses.name}
              isTitleVisible={true}
              isBreakVisible={false}
              slotMember={
                <Stack
                  direction={'row'}
                  sx={{
                    flexWrap: 'wrap',
                    gap: 2.5,
                  }}
                >
                  {ses.users?.map((user) => {
                    return (
                      <AvatarWithName
                        key={user.first_name}
                        textName={getFullName(user.first_name, user.last_name)}
                        slotAvatar={
                          <MuiAvatar
                            level={getFullName(user.first_name, user.last_name)}
                            src={user?.profile_image}
                            variant={'rounded-small'}
                          />
                        }
                      />
                    );
                  })}
                </Stack>
              }
            />
          </>
        }
      />
    </>
  );
}

export default SessionCard;
