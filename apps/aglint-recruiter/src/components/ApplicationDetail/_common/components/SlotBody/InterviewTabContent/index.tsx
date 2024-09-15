import ReorderableInterviewPlan from '@components/reorderable-interview-plan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ExternalLink } from 'lucide-react';

import Loader from '@/components/Common/Loader';
import { UIButton } from '@/components/Common/UIButton';
import { useApplication } from '@/context/ApplicationContext';
import { ActionEmptyState } from '@/job/components/CandidateDrawer/Common/ActionEmptyState';
import { useInterviewModules } from '@/queries/interview-modules';

import Progress from '../../Progress';
import SideDrawerEdit from './_common/components/EditDrawer';
import DialogSchedule from './_common/components/ScheduleDialog';
import StageSessions from './_common/components/StageSessions';
import { InterviewStage } from './_common/components/ui/InterviewStage';

function InterviewTabContent() {
  const {
    interview: { data: stages, isLoading: isLoadingSession, refetch },
    details: { isLoading: isLoadingDetail },
    application_id,
  } = useApplication();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoadingSession || isLoadingDetail)
    return (
      <div className='h-[50vh] flex items-center justify-center'>
        <Loader />
      </div>
    );

  if (stages.length === 0)
    return (
      <div className='p-4'>
        <ActionEmptyState />
      </div>
    );

  return (
    <>
      <SideDrawerEdit refetch={refetch} />
      <Tabs defaultValue='internal'>
        <TabsList>
          <TabsTrigger value='internal'>Internal</TabsTrigger>
          <TabsTrigger value='candidate'>Candidate</TabsTrigger>
        </TabsList>
        <TabsContent value='internal'>
          <InterviewStage
            slotInterviewStage={<StageSessions />}
            slotPipelineTab={<Progress />}
          />
        </TabsContent>
        <TabsContent value='candidate'>
          <UIButton
            variant='secondary'
            onClick={() => {
              window.open(`/candidate/${application_id}/home`, '_blank');
            }}
            size='sm'
            rightIcon={<ExternalLink />}
          >
            Portal
          </UIButton>
          <ReorderableInterviewPlan
            applicationId={stages[0].interview_plan.application_id}
            jobId={null}
          />
        </TabsContent>
      </Tabs>
      <DialogSchedule />
    </>
  );
}

export default InterviewTabContent;
