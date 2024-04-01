import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { ButtonPrimarySmall } from '@/devlink';
import {
  AvailableOptionCardDate,
  InterviewConfirmed,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import toast from '@/src/utils/toast';

import { ApiResponse } from '../type';

function InvitationConfirmed({ schedule }: { schedule: ApiResponse }) {
  return (
    <>
      <InterviewConfirmed
        slotCompanyLogo={
          <Stack height={'60px'}>
            <CompanyLogo
              companyName={schedule.recruiter.name}
              companyLogo={schedule.recruiter.logo}
            />
          </Stack>
        }
        textTitle={schedule.schedule.schedule_name}
        textMailSent={schedule.candidate.email}
        slotCardDate={
          <OptionAvailableCard
            isActive={true}
            slotCardDate={schedule?.meetings.map((ses, ind) => {
              return (
                <>
                  <AvailableOptionCardDate
                    textDate={dayjs(ses.interview_meeting.start_time).format(
                      'DD',
                    )}
                    textDay={dayjs(ses.interview_meeting.start_time).format(
                      'dddd',
                    )}
                    textMonth={dayjs(ses.interview_meeting.start_time).format(
                      'MMM',
                    )}
                    key={ind}
                    slotOptionAvailable={
                      <>
                        <OptionAvailable
                          textTime={`${dayjs(
                            ses.interview_meeting.start_time,
                          ).format(
                            'hh:mm A',
                          )} - ${dayjs(ses.interview_meeting.end_time).format('hh:mm A')}`}
                          textTitle={ses.name}
                          key={ind}
                          isTitleVisible={true}
                          isBreakVisible={false}
                          slotMember={
                            <Stack spacing={1}>
                              <Stack direction={'row'}>
                                <ButtonPrimarySmall
                                  isDisabled={
                                    (dayjs(
                                      ses.interview_meeting.start_time,
                                    ).isAfter(dayjs().add(3, 'hour')) ||
                                      dayjs().isAfter(
                                        dayjs(ses.interview_meeting.end_time),
                                      )) &&
                                    !ses.interview_meeting.meeting_link
                                  }
                                  textLabel={'Join Meeting'}
                                  onClickButton={{
                                    onClick: () => {
                                      ses.interview_meeting.meeting_link
                                        ? window.open(
                                            ses.interview_meeting.meeting_link,
                                            '_blank',
                                          )
                                        : toast.error(
                                            'Meeting link not available. Please contact support for more information.',
                                          );
                                    },
                                  }}
                                />
                              </Stack>
                              <Typography variant='caption'>
                                Meeting link will get enabled 3 hours before
                                meeting
                              </Typography>
                            </Stack>
                          }
                        />
                        {ses.break_duration > 0 &&
                          ind !== schedule?.meetings.length - 1 && (
                            <OptionAvailable
                              key={ind}
                              textBreakTime={
                                `${ses.break_duration} Minutes` || ''
                              }
                              isTitleVisible={false}
                              isBreakVisible={true}
                            />
                          )}
                      </>
                    }
                  />
                </>
              );
            })}
          />
        }
        onClickSupport={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/support/create?id=${schedule.schedule.application_id}`,
              '_blank',
            );
          },
        }}
      />
    </>
  );
}

export default InvitationConfirmed;
