import { type DatabaseEnums } from '@aglint/shared-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { AvailableOptionCardDate } from '@devlink2/AvailableOptionCardDate';
import { OptionAvailable } from '@devlink2/OptionAvailable';
import dayjs from 'dayjs';

import { getFullName } from '@/utils/jsonResume';

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
                <div className='flex flex-row flex-wrap gap-2.5'>
                  {ses.users?.map((user, i) => {
                    return (
                      <div key={i} className='flex items-center space-x-2'>
                        <Avatar className='h-8 w-8 rounded-sm'>
                          <AvatarImage
                            src={user?.profile_image}
                            alt={getFullName(user.first_name, user.last_name)}
                          />
                          <AvatarFallback>
                            {getFullName(
                              user.first_name,
                              user.last_name,
                            ).charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className='text-sm font-medium'>
                          {getFullName(user.first_name, user.last_name)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              }
            />
          </>
        }
      />
    </>
  );
}

export default SessionCard;
