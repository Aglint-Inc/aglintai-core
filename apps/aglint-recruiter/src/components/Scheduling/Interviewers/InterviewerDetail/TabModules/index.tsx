import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';
import Loader from '@/src/components/Common/Loader';

import { useAllInterviewModules } from '../../../InterviewTypes/queries/hooks';
import { useModuleRelations } from '../hooks';
import DeleteMemberDialog from '../Popups/DeleteDialog';
import PauseDialog from '../Popups/PauseDialog';
import ResumeDialog from '../Popups/ResumeDialog';
import { setAddInterviewType, setIsAddInterviewTypeDialogOpen } from '../store';
import QualifiedInterviewTypeCard from './QualifiedInterviewType';
import TrainingInterviewerType from './TrainingInterviewerType';

function TabInterviewModules({ type }: { type: 'qualified' | 'training' }) {
  const router = useRouter();
  const user_id = router?.query?.user_id as string;
  const { data, isLoading, refetch } = useModuleRelations({
    user_id,
  });
  const { data: allModules } = useAllInterviewModules();

  const qualifiedModulesList = data?.filter(
    (rel) => rel.module_training_status === 'qualified' && !rel.is_archived,
  );
  const trainingModulesList = data?.filter(
    (rel) => rel.module_training_status === 'training' && !rel.is_archived,
  );

  const filteredQualifiedModulesList = qualifiedModulesList.filter(
    (qualified) =>
      !allModules?.find((module) => module.id === qualified.module_id)
        .is_archived,
  );

  const filteredtrainingModulesList = trainingModulesList.filter(
    (qualified) =>
      !allModules?.find((module) => module.id === qualified.module_id)
        .is_archived,
  );

  return (
    <>
      <PauseDialog />
      <ResumeDialog />
      <DeleteMemberDialog refetch={refetch} />
      <InterviewerDetailOverview
        isViewButtonVisible={false}
        textHeader1={'Interview Types'}
        textHeader2={'Interview Types'}
        isTrainingVisible={type === 'training' ? true : false}
        isUpcomingVisible={type === 'qualified' ? true : false}
        slotUpcomingSchedule={
          !isLoading ? (
            <>
              {filteredQualifiedModulesList?.length ? (
                <>
                  {filteredQualifiedModulesList?.map((relation) => {
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
                  styleEmpty={{
                    style: {
                      backgroundColor: 'var(--neutral-2)',
                      height: '220px',
                    },
                  }}
                />
              )}
              <Stack direction={'row'} pt={'var(--space-2)'}>
                <ButtonSoft
                  size={2}
                  isRightIcon={false}
                  iconName='add'
                  textButton={'Add'}
                  isLeftIcon={true}
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
              {filteredtrainingModulesList.length ? (
                <>
                  {filteredtrainingModulesList.map((relation) => {
                    return (
                      <TrainingInterviewerType
                        relation={relation}
                        key={relation.id}
                        refetch={refetch}
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
                <ButtonSoft
                  size={2}
                  isRightIcon={false}
                  iconName='add'
                  isLeftIcon={true}
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
