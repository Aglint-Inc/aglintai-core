import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';
import Loader from '@/src/components/Common/Loader';

import IconPlusFilter from '../../../Schedules/Filters/FilterChip/IconPlusFilter';
import { useModuleRelations } from '../hooks';
import DeleteMemberDialog from '../Popups/DeleteDialog';
import PauseDialog from '../Popups/PauseDialog';
import ResumeDialog from '../Popups/ResumeDialog';
import { setAddInterviewType, setIsAddInterviewTypeDialogOpen } from '../store';
import QualifiedInterviewTypeCard from './QualifiedInterviewType';
import TrainingInterviewerType from './TrainingInterviewerType';

function TabInterviewModules() {
  const router = useRouter();
  const user_id = router?.query?.user_id as string;
  const { data, isLoading, refetch } = useModuleRelations({
    user_id,
  });
  const qualifiedModulesList = data?.filter(
    (rel) => rel.module_training_status === 'qualified' && !rel.is_archived,
  );
  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training' && !rel.is_archived,
  );

  return (
    <>
      <PauseDialog />
      <ResumeDialog />
      <DeleteMemberDialog refetch={refetch} />
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
                </>
              ) : (
                <GlobalEmptyState
                  textDesc='No Interview type found.'
                  size={6}
                  iconName='school'
                />
              )}
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
            <Loader />
          )
        }
        slotTrainingModules={
          !isLoading ? (
            <>
              {trainingModulesList.length ? (
                <>
                  {trainingModulesList.map((relation) => {
                    return (
                      <TrainingInterviewerType
                        relation={relation}
                        key={relation.id}
                      />
                    );
                  })}
                </>
              ) : (
                <GlobalEmptyState
                  textDesc='No Interview type found.'
                  size={6}
                  iconName='school'
                />
              )}
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
            <Loader />
          )
        }
      />
    </>
  );
}

export default TabInterviewModules;
