import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { WorkflowJobs } from '@/devlink/WorkflowJobs';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useJob } from '@/src/context/JobContext';
import { useJobDashboard } from '@/src/context/JobDashboard';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

import JobNotFound from '../Common/JobNotFound';
import { Settings } from '../Common/SharedTopNav/actions';
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
            onClick={() => push(ROUTES['/jobs/[id]']({ id: job?.id }))}
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
  const { setPopup } = useJobDashboardStore(({ setPopup }) => ({
    setPopup,
  }));
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
