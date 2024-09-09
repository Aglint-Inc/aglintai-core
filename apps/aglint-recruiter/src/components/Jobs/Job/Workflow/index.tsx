import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { WorkflowJobs } from '@devlink/WorkflowJobs';
import { ButtonSolid } from '@devlink2/ButtonSolid';
import { PageLayout } from '@devlink2/PageLayout';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import Loader from '@/components/Common/Loader';
import { JobNotFound } from '@/job/components/JobNotFound';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob, useJobDashboard, useJobDashboardActions } from '@/job/hooks';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import JobWorkflow from './list';

const JobWorkflowDashboard = () => {
  const { jobLoad, job } = useJob();

  return jobLoad ? (
    job && job?.status !== 'closed' ? (
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotTopbarRight={<Actions />}
        slotBody={<WorkflowJobs slotWorkflowCards={<JobWorkflow />} />}
      />
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

export default JobWorkflowDashboard;

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href='#'
            onClick={() => push(ROUTES['/jobs/[job]']({ job: job?.id }))}
          >
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Workflows</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Actions = () => {
  const { manageJob } = useJobDashboard();
  const { setPopup } = useJobDashboardActions();
  return (
    <>
      {manageJob && (
        <ButtonSolid
          textButton='Add'
          size={2}
          iconName='bolt'
          isLeftIcon
          onClickButton={{ onClick: () => setPopup({ open: true }) }}
        />
      )}
      <Settings />
    </>
  );
};
