import { Stack } from '@mui/material';
import React, { Dispatch } from 'react';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';

import IconPlusFilter from '../../../Schedules/Filters/FilterChip/IconPlusFilter';
import { DetailsWithCount, PauseDialog } from '../../type';
import ListCardInterviewerModules from './ListCard';
import TraininingModules from './TraininingModules';

function TabInterviewModules({
  detailsWithCount,
  setPauseResumeDialog,
}: {
  detailsWithCount: DetailsWithCount;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
}) {
  const qualifiedModulesList =
    detailsWithCount.modules.filter((item) => {
      return (
        item.training_status === 'qualified' &&
        item.interview_module.is_archived === false
      );
    }) || [];

  const trainingModulesList =
    detailsWithCount.modules.filter((item) => {
      return (
        item.training_status === 'training' &&
        item.interview_module.is_archived === false
      );
    }) || [];

  return (
    <>
      <InterviewerDetailOverview
        isViewButtonVisible={false}
        // textButton1={'Add'}
        // textButton2={'Add'}
        textHeader1={'Qualified Interview Types'}
        textHeader2={'Training Interview Types'}
        slotUpcomingSchedule={
          <>
            {qualifiedModulesList.length ? (
              <>
                {qualifiedModulesList.map((module) => {
                  return (
                    <ListCardInterviewerModules
                      key={module.id}
                      module={module}
                      setPauseResumeDialog={setPauseResumeDialog}
                      status='qualified'
                      user_id={detailsWithCount.interviewer.user_id}
                    />
                  );
                })}
                <Stack direction={'row'} pt={'var(--space-2)'}>
                  <ButtonSurface
                    size={1}
                    isRightIcon={false}
                    slotIcon={<IconPlusFilter />}
                    textButton={'Add'}
                    onClickButton={{
                      onClick: () => {
                        setPauseResumeDialog((pre) => ({
                          ...pre,
                          isOpen: true,
                          type: 'addQualifiedModule',
                          isLoading: false,
                        }));
                      },
                    }}
                  />
                </Stack>
              </>
            ) : (
              <GlobalEmptyState
                textDesc='No Interview type found.'
                size={6}
                iconName='school'
              />
            )}
          </>
        }
        slotTrainingModules={
          <>
            <TraininingModules
              setPauseResumeDialog={setPauseResumeDialog}
              trainingModulesList={trainingModulesList}
              user_id={detailsWithCount.interviewer.user_id}
            />
            <Stack direction={'row'} pt={'var(--space-2)'}>
              <ButtonSurface
                size={1}
                isRightIcon={false}
                slotIcon={<IconPlusFilter />}
                textButton={'Add'}
                onClickButton={{
                  onClick: () => {
                    setPauseResumeDialog((pre) => ({
                      ...pre,
                      isOpen: true,
                      type: 'addTrainingModule',
                      isLoading: false,
                    }));
                  },
                }}
              />
            </Stack>
          </>
        }
      />
    </>
  );
}

export default TabInterviewModules;
