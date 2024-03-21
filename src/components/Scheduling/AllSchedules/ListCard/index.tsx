import { Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AllInterviewCard, ScheduleInfoBlock, StatusBadge } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { getFullName } from '@/src/utils/jsonResume';

import IconScheduleType from './Icon';
import { ApplicationList } from '../store';
import { getScheduleType } from '../utils';

function ListCardInterviewSchedule({
  app,
  onClickCard,
  slotCheckbox = <></>,
  isJobDasboard = false,
  isSelected = false,
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
          textCurrentRole={
            (app.file?.resume_json as unknown as ResumeJson)?.basics
              ?.currentJobTitle || '--'
          }
          isSelected={isSelected}
          propsGrid={{
            style: {
              gridTemplateColumns: isJobDasboard
                ? '25% 15% 15% 20%'
                : '25% 21% 20% 14% 20%',
            },
          }}
          isSchedulerTable={!isJobDasboard}
          isCheckBoxVisible={isJobDasboard}
          slotCheckbox={slotCheckbox}
          textName={getFullName(
            app.candidates.first_name,
            app.candidates.last_name,
          )}
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
                fontSize={'16px'}
              />
            </>
          }
          slotStatusBadge={
            <StatusBadge
              isNotScheduledVisible={!app.schedule}
              isCancelledVisible={
                app.schedule?.status === 'cancelled' ||
                app.schedule?.status === 'reschedule'
              }
              isConfirmedVisible={app.schedule?.status === 'confirmed'}
              isCompletedVisible={app.schedule?.status === 'completed'}
              isInProgressVisible={app.schedule?.status === 'pending'}
            />
          }
          textDuration={'--'}
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
          textRelatedJob={app.public_jobs?.job_title}
        />
      </Stack>
    </>
  );
}

export default ListCardInterviewSchedule;
