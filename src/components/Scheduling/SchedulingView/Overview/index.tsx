import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import {
  AvatarWithName,
  CandidatesCard,
  RelatedJobCard,
  ScheduleCard,
  ScheduleTabOverview,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from '../../AllSchedules/ListCard/Icon';
import { getScheduleType } from '../../AllSchedules/utils';
import { TransformSchedule } from '../../Modules/types';

function Overview({ schedule }: { schedule: TransformSchedule }) {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  if (!schedule) {
    return null;
  }
  const { candidates, job, schedule: scheduleDetails, users } = schedule;
  return (
    <ScheduleTabOverview
    
      slotAvatarWithName={users.map((item, i) => {
        return (
          <AvatarWithName
            key={i}
            isRoleVisible={false}
            textName={
              item.first_name +
              ' ' +
              item.last_name +
              `${item.email === recruiterUser.email ? ' (you)' : ''}`
            }
            slotAvatar={
              <MuiAvatar
                level={getFullName(item.first_name, item.last_name)}
                src={item.profile_image}
                variant={'circular'}
                width={'100%'}
                height={'100%'}
                fontSize={'14px'}
              />
            }
          />
        );
      })}
      slotScheduleCard={
        <ScheduleCard
          textTitle={scheduleDetails.schedule_name}
          textStatus={schedule.interview_meeting.status}
          textDate={dayjs(schedule.interview_meeting.end_time).format('DD')}
          textDay={dayjs(schedule.interview_meeting.end_time).format('dddd')}
          textMonth={dayjs(schedule.interview_meeting.end_time).format('MMM')}
          textPlatformName={getScheduleType(schedule.schedule.schedule_type)}
          textDuration={`${dayjs(schedule.interview_meeting.start_time).format(
            'hh:mm A',
          )} - ${dayjs(schedule.interview_meeting.end_time).format(
            'hh:mm A',
          )} ( ${schedule.interview_meeting.duration} Minutes )`}
          colorPropsText={{
            style: {
              color:
                schedule.interview_meeting.status === 'completed'
                  ? '#228F67'
                  : schedule.interview_meeting.status === 'confirmed'
                    ? '#337FBD'
                    : schedule.interview_meeting.status === 'pending'
                      ? '#ED8F1C'
                      : '#D93F4C',
            },
          }}
          slotPlatformIcon={
            <IconScheduleType type={scheduleDetails.schedule_type} />
          }
        />
      }
      slotCandidateCard={
        <CandidatesCard
          isLinks={false}
          textMail={candidates.email}
          textName={candidates.first_name + ' ' + candidates.last_name}
          textRole={schedule.file.resume_json.basics.currentJobTitle}
          slotImage={
            <MuiAvatar
              level={getFullName(
                schedule?.candidates.first_name,
                schedule?.candidates.last_name,
              )}
              src={schedule?.candidates.avatar}
              variant={'rounded'}
              width={'100%'}
              height={'100%'}
              fontSize={'20px'}
            />
          }
        />
      }
      slotRelatedJobCard={
        <Stack
          onClick={() => {
            router.push(`/jobs/${job.id}`);
          }}
          sx={{
            cursor: 'pointer',
          }}
        >
          <RelatedJobCard
            textJobTitle={job.job_title}
            textJobTypeAndLocation={
              (job.jd_json as any)?.level + ', ' + job.location
            }
          />
        </Stack>
      }
    />
  );
}

export default Overview;
