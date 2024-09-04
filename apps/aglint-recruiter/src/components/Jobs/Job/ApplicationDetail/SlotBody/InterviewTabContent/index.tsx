import { Stack } from '@mui/material';

import ReorderableInterviewPlan from '@/components/reorderable-interview-plan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InterviewStage } from '@/devlink3/InterviewStage';
import Loader from '@/src/components/Common/Loader';
import { useApplication } from '@/src/context/ApplicationContext';
import { useInterviewModules } from '@/src/queries/interview-modules';

import { ActionEmptyState } from '../../../Common/CandidateDrawer/Common/ActionEmptyState';
import Progress from '../Progress';
import DialogSchedule from './ScheduleDialog';
import StageSessions from './StageSessions';
import SideDrawerEdit from './StageSessions/EditDrawer';

function InterviewTabContent() {
  const {
    interview: { data: stages, isLoading: isLoadingSession, refetch },
    details: { isLoading: isLoadingDetail },
  } = useApplication();

  useInterviewModules(); //needed to fetch interview modules which is used in edit interview plan

  if (isLoadingSession || isLoadingDetail)
    return (
      <Stack height={'50vh'}>
        <Loader />
      </Stack>
    );

  if (stages.length === 0)
    return (
      <Stack padding={'var(--space-4)'}>
        <ActionEmptyState />
      </Stack>
    );

  return (
    <>
      <SideDrawerEdit refetch={refetch} />
      <Tabs defaultValue='candidate'>
        <TabsList>
          <TabsTrigger value='internal'>Internal</TabsTrigger>
          <TabsTrigger value='candidate'>Candidate</TabsTrigger>
        </TabsList>
        <TabsContent value='internal'>
          <InterviewStage
            slotInterviewStage={<StageSessions />}
            slotPiplineTab={<Progress />}
          />
        </TabsContent>
        <TabsContent value='candidate'>
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
