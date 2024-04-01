import { Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AllInterviewCard, ScheduleWithAgent, StatusBadge } from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { getFullName } from '@/src/utils/jsonResume';

import { ApplicationList } from '../store';

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
          slotScheduleWithAgent={<ScheduleWithAgent />}
          textCurrentRole={
            (app.file?.resume_json as unknown as ResumeJson)?.basics
              ?.currentJobTitle || '--'
          }
          isSelected={isSelected}
          propsGrid={{
            style: {
              gridTemplateColumns: isJobDasboard
                ? '25% 15% 15% 20%'
                : '250px 200px 160px auto',
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
          textInterviewPanel={'0'}
          slotStatusBadge={
            <StatusBadge
              isWaitingVisible={Boolean(app.schedule)}
              isNotScheduledVisible={!app.schedule}
              isCancelledVisible={false}
              isConfirmedVisible={false}
            />
          }
          textRelatedJob={app.public_jobs?.job_title}
        />
      </Stack>
    </>
  );
}

export default ListCardInterviewSchedule;
