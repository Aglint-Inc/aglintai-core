/* eslint-disable security/detect-object-injection */
import { DatabaseView } from '@aglint/shared-types';
import { CircularProgress, Stack } from '@mui/material';

import { JobDetails } from '@/devlink2/JobDetails';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJobDetails } from '@/src/context/JobDashboard';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
import SectionIcons from '../JobApplicationsDashboard/Common/SectionIcons';
import { capitalize } from '../JobApplicationsDashboard/utils';
import Drawer from './drawer';
import Filters from './filters';
import { BreadCrumbs } from './layout';
import { Table } from './table';
import { UploadApplications } from './ui/uploadApplications';

const ApplicationsDashboard = () => {
  const { job, jobLoad } = useApplications();
  return jobLoad ? (
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
  const setImportPopup = useApplicationsStore(
    ({ setImportPopup }) => setImportPopup,
  );
  return (
    <>
      <JobDetails
        isImportCandidates={job.status === 'published'}
        onclickAddCandidates={{ onClick: () => setImportPopup(true) }}
        isFetchingPillVisible={true}
        slotRefresh={<></>}
        slotShowFilterButton={<>KKKK</>}
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
        slotTable={<Table />}
        isFilterVisible={true}
        slotFilters={<Filters />}
      />
      <Drawer />
      <UploadApplications />
    </>
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
  const { section, setSection } = useApplicationsStore(
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
      />
    </Stack>
  );
};
