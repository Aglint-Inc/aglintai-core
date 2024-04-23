import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { AvailableOptionCardDate, OptionAvailable } from '@/devlink2';
import { AvatarWithName } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import { useScheduleSession } from '..';

function SessionCard({
  indOpt,
  ses,
}: {
  indOpt: number;
  ses: ReturnType<typeof useScheduleSession>['data'][number];
}) {
  const { data: sessionList } = useScheduleSession();

  return (
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
      key={ses.interview_session.id}
      slotOptionAvailable={
        <>
          <OptionAvailable
            textTime={`${dayjs(ses.interview_meeting?.start_time).format(
              'hh:mm A',
            )} - ${dayjs(ses.interview_meeting?.end_time).format('hh:mm A')}`}
            textTitle={ses.interview_session.name}
            textBreakTime={
              `${ses.interview_session.break_duration} Minutes` || ''
            }
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
                {ses.interview_session_relation?.map((int) => {
                  return (
                    <AvatarWithName
                      key={
                        int.interview_module_relation?.recruiter_user.first_name
                      }
                      textName={
                        int.interview_module_relation?.recruiter_user.first_name
                      }
                      slotAvatar={
                        <MuiAvatar
                          level={getFullName(
                            int.interview_module_relation?.recruiter_user
                              .first_name,
                            int.interview_module_relation?.recruiter_user
                              .last_name,
                          )}
                          src={
                            int.interview_module_relation?.recruiter_user
                              ?.profile_image
                          }
                          variant={'circular'}
                          width={'24px'}
                          height={'24px'}
                          fontSize={'12px'}
                        />
                      }
                    />
                  );
                })}
              </Stack>
            }
          />
          {ses.interview_session.break_duration > 0 && (
            <OptionAvailable
              textTime={''}
              textBreakTime={
                `${ses.interview_session.break_duration} Minutes` || ''
              }
              isTitleVisible={false}
              isBreakVisible={true}
            />
          )}
        </>
      }
    />
  );
}

export default SessionCard;
