/* eslint-disable security/detect-object-injection */
import { DatabaseView } from '@aglint/shared-types';
import { CircularProgress, Stack } from '@mui/material';

import { JobDetails } from '@/devlink2/JobDetails';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { useJobDetails } from '@/src/context/JobDashboard';
import { useJobDashboardStore } from '@/src/context/JobDashboard/store';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
import SectionIcons from '../JobApplicationsDashboard/Common/SectionIcons';
import { capitalize } from '../JobApplicationsDashboard/utils';
import { BreadCrumbs } from './layout';
import List from './table';

const ApplicationsDashboard = () => {
  const { job, initialLoad } = useJobDetails();
  return initialLoad ? (
    job !== undefined ? (
      <ApplicationsComponent />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

export default ApplicationsDashboard;

const ApplicationsComponent = () => {
  const { job } = useJobDetails();
  return (
    <JobDetails
      isEditJob={false}
      isWarningVisible={
        job.status == 'published' && (!job.jd_json || !job.description)
          ? true
          : false
      }
      isImportCandidates={job.status === 'published'}
      slotLoadingLottie={
        <CircularProgress
          style={{
            color: '#17494D',
            width: '12px',
            height: '12px',
          }}
        />
      }
      slotBreadcrumb={<BreadCrumbs />}
      slotTabs={<NewJobDetailsTabs />}
      slotTable={<List />}
    />
  );
};

const NewJobDetailsTabs = () => {
  const { job } = useJobDetails();
  return (
    <>
      {job.activeSections.map((section) => (
        <SectionCard key={section} status={section} />
      ))}
    </>
  );
};

const SectionCard = ({
  status,
}: {
  status: DatabaseView['application_view']['status'];
}) => {
  const { job } = useJobDetails();
  const { section, setSection } = useJobDashboardStore(
    ({ section, setSection }) => ({
      section,
      setSection,
    }),
  );
  return (
    <Stack onClick={() => setSection(status)}>
      <NewTabPill
        isPillActive={section === status}
        slotStartIcon={<SectionIcons section={status} />}
        isStartIconVisible={true}
        textLabel={`${capitalize(status)} (${job.count[status]})`}
        onClickPill={{
          style: {
            minWidth: '200px',
            minHeight: '60px',
          },
        }}
      />
    </Stack>
  );
};
