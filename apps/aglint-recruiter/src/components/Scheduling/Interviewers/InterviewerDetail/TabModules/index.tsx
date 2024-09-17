import { CardContent } from '@components/ui/card';
import { Plus, School } from 'lucide-react';
import { useRouter } from 'next/router';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';
import { useAllInterviewModules } from '@/components/Scheduling/InterviewTypes/_common/hooks/useAllInterviewModules';

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
                <GlobalEmpty
                  text={'No Interview type found.'}
                  iconSlot={<School className='text-gray-500' />}
                />
              )}
              <div className='flex flex-row pt-2'>
                <UIButton
                  size='sm'
                  variant='secondary'
                  onClick={() => {
                    setAddInterviewType('qualified');
                    setIsAddInterviewTypeDialogOpen(true);
                  }}
                  leftIcon={<Plus />}
                >
                  Add
                </UIButton>
              </div>
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
                <GlobalEmpty
                  text={'No Interview type found.'}
                  iconSlot={<School className='text-gray-500' />}
                />
              )}
              <div className='flex flex-row pt-2'>
                <UIButton
                  size='sm'
                  variant='secondary'
                  onClick={() => {
                    setAddInterviewType('training');
                    setIsAddInterviewTypeDialogOpen(true);
                  }}
                  leftIcon={<Plus />}
                >
                  Add
                </UIButton>
              </div>
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

function InterviewerDetailOverview({
  slotUpcomingSchedule,
  slotTrainingModules,
  textHeader1 = 'Upcoming Schedules',
  textHeader2 = 'Training',
  isTrainingVisible = true,
  isUpcomingVisible = true,
}) {
  return (
    <div className='flex w-[900px] flex-col space-y-6 p-4'>
      {isUpcomingVisible && (
        <div>
          <UITypography variant='p' type='small' className='mb-2 font-semibold'>
            {textHeader1}
          </UITypography>
          <CardContent className='flex flex-col space-y-2 p-0'>
            {slotUpcomingSchedule}
          </CardContent>
        </div>
      )}
      {isTrainingVisible && (
        <div>
          <UITypography variant='p' type='small' className='mb-2 font-semibold'>
            {textHeader2}
          </UITypography>
          <CardContent className='flex flex-col space-y-4 p-0'>
            {slotTrainingModules}
          </CardContent>
        </div>
      )}
    </div>
  );
}
