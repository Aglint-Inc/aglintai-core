import { Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AllInterviewCard, ScheduleInfoBlock } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from './Icon';
import { ApplicationList } from '../store';
import { getScheduleType } from '../utils';

function ListCardInterviewSchedule({
  app,
  onClickCard,
  slotCheckbox = <></>,
  isJobDasboard = false,
  isSelected = false
}: {
  app: ApplicationList;
  // eslint-disable-next-line no-unused-vars
  onClickCard: (app: ApplicationList) => void;
  isJobDasboard?: boolean;
  slotCheckbox?: ReactNode;
  isSelected?: boolean;
}) {
  return (
    <>
      <Stack
        onClick={() => {
          onClickCard(app);
        }}
      >
        <AllInterviewCard
          isSelected={isSelected}
          propsGrid={{
            style: {
              gridTemplateColumns: isJobDasboard
                ? '25% 15% 15% 20%'
                : '25% 15% 20% 17% 23%'
            }
          }}
          isSchedulerTable={!isJobDasboard}
          isCheckBoxVisible={isJobDasboard}
          slotCheckbox={slotCheckbox}
          textName={`${app.candidates.first_name} ${app.candidates.last_name}`}
          slotCandidateImage={
            <>
              <MuiAvatar
                level={getFullName(
                  app.candidates.first_name,
                  app.candidates.last_name
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
                : '#FFF0F1'
            }
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
                : '#681219'
            }
          }}
          textDuration={app.schedule ? `--` : '--'}
          textInterviewPanel={
            app?.schedule?.interview_plan?.filter((f) => !f.isBreak)?.length ||
            '--'
          }
          slotScheduleInfo={
            app.schedule ? (
              <ScheduleInfoBlock
                textDateTimeOrSlots={''}
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

export default ListCardInterviewSchedule;
