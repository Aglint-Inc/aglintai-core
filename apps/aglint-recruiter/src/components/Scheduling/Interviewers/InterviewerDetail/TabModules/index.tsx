import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';

import IconPlusFilter from '../../../Schedules/Filters/FilterChip/IconPlusFilter';
import { useModuleRelations } from '../hooks';
import AddInterviewTypeDialog from '../Popups/AddInterviewTypeDialog';
import PauseDialog from '../Popups/PauseDialog';
import { setAddInterviewType, setIsAddInterviewTypeDialogOpen } from '../store';
import QualifiedInterviewTypeCard from './QualifiedInterviewType';

function TabInterviewModules() {
  const router = useRouter();
  const { data, isLoading, refetch } = useModuleRelations({
    user_id: router.query.member_id as string,
  });

  const qualifiedModulesList = data?.filter(
    (rel) => rel.module_training_status === 'qualified',
  );

  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training',
  );
  return (
    <>
      /
      <AddInterviewTypeDialog />
      <PauseDialog refetch={refetch} />
      <InterviewerDetailOverview
        isViewButtonVisible={false}
        textHeader1={'Qualified Interview Types'}
        textHeader2={'Training Interview Types'}
        slotUpcomingSchedule={
          !isLoading ? (
            <>
              {qualifiedModulesList.length ? (
                <>
                  {qualifiedModulesList.map((relation) => {
                    return (
                      <QualifiedInterviewTypeCard
                        relation={relation}
                        key={relation.id}
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
                          setAddInterviewType('qualified');
                          setIsAddInterviewTypeDialogOpen(true);
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
          ) : (
            'loading'
          )
        }
        slotTrainingModules={
          !isLoading ? (
            <>
              {trainingModulesList.length ? (
                <>
                  {trainingModulesList.map((relation) => {
                    return (
                      <QualifiedInterviewTypeCard
                        relation={relation}
                        key={relation.id}
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
                          setAddInterviewType('training');
                          setIsAddInterviewTypeDialogOpen(true);
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
          ) : (
            'loading'
          )
        }
      />
    </>
  );
}

export default TabInterviewModules;
