import { AvatarGroup, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { AllInterviewCard, ScheduleInfoBlock } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from './Icon';
import { ApplicationList } from '../store';
import { getScheduleType } from '../utils';
import { useSchedulingStore } from '../../Panels/store';

function ListCard({ app }: { app: ApplicationList }) {
  const router = useRouter();
  const { members } = useAuthDetails();
  const interviewPanels = useSchedulingStore((state) => state.interviewPanels);
  return (
    <>
      <Stack
        onClick={() => {
          router.push(`?application_id=${app.applications.id}`, undefined, {
            shallow: true,
          });
        }}
      >
        <AllInterviewCard
          textName={`${app.candidates.first_name} ${app.candidates.last_name}`}
          slotCandidateImage={
            <>
              <MuiAvatar
                level={getFullName(
                  app.candidates.first_name,
                  app.candidates.last_name,
                )}
                src={app.candidates.avatar}
                variant={'circular'}
                width={'100%'}
                height={'100%'}
                fontSize={'12px'}
              />
            </>
          }
          textStatus={
            <>{app.schedule ? app.schedule.status : 'Not Scheduled'}</>
          }
          colorPropsBg={{
            style: {
              backgroundColor: app.schedule
                ? app.schedule.status == 'completed'
                  ? '#D1E8DF80'
                  : app.schedule.status == 'confirmed'
                    ? '#CEE2F2'
                    : app.schedule.status == 'pending'
                      ? '#FFEDC2'
                      : '#FFF0F1'
                : '#FFF0F1',
            },
          }}
          colorPropsText={{
            style: {
              color: app.schedule
                ? app.schedule.status == 'completed'
                  ? '#2F3941'
                  : app.schedule.status == 'confirmed'
                    ? '#0F3554'
                    : app.schedule.status == 'pending'
                      ? '#703815'
                      : '#681219'
                : '#681219',
            },
          }}
          textDuration={app.schedule ? `${app.schedule.duration}` : '--'}
          textInterviewPanel={
            app.schedule?.panel_id
              ? interviewPanels.filter(
                  (panel) => panel.id === app.schedule?.panel_id,
                )[0]?.name
              : '--'
          }
          slotPanelImage={
            app.schedule?.panel_users ? (
              <AvatarGroup
                sx={{
                  '& .MuiAvatar-root': {
                    width: '24px',
                    height: '24px',
                    fontSize: '12px',
                  },
                }}
                total={app.schedule ? app.schedule.panel_users.length : 0}
              >
                {app.schedule.panel_users
                  .slice(0, 3)
                  .map((rel: { user_id: string; must: 'string' }) => {
                    const member = members.filter(
                      (member) => member.user_id === rel.user_id,
                    )[0];
                    return (
                      <MuiAvatar
                        key={rel.user_id}
                        src={member?.profile_image}
                        level={member?.first_name}
                        variant='circular'
                        height='24px'
                        width='24px'
                        fontSize='8px'
                      />
                    );
                  })}
              </AvatarGroup>
            ) : (
              ''
            )
          }
          slotScheduleInfo={
            app.schedule ? (
              <ScheduleInfoBlock
                textDateTimeOrSlots={
                  app.schedule.schedule_time
                    ? dayjs(app.schedule.schedule_time.startTime).format(
                        'YYYY MMM DD',
                      ) +
                      ' at ' +
                      dayjs(app.schedule.schedule_time.startTime).format(
                        'hh:mm A',
                      )
                    : '--'
                }
                slotScheduleTypeIcon={
                  <IconScheduleType type={app.schedule.schedule_type} />
                }
                textMeetingType={getScheduleType(app.schedule.schedule_type)}
              />
            ) : (
              '--'
            )
          }
          textRelatedJob={app.public_jobs.job_title}
        />
      </Stack>
    </>
  );
}

export default ListCard;
