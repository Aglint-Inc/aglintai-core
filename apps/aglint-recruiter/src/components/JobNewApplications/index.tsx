/* eslint-disable security/detect-object-injection */
import { DatabaseView } from '@aglint/shared-types';
import { CircularProgress, Stack } from '@mui/material';

import { JobDetails } from '@/devlink2/JobDetails';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
import SectionIcons from '../JobApplicationsDashboard/Common/SectionIcons';
import { capitalize } from '../JobApplicationsDashboard/utils';
import { Actions } from './actions';
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
  const { job } = useJob();
  const { setImportPopup, checklist } = useApplicationsStore(
    ({ setImportPopup, checklist }) => ({ setImportPopup, checklist }),
  );
  return (
    <>
      <JobDetails
        isImportCandidates={job.status === 'published'}
        onclickAddCandidates={{ onClick: () => setImportPopup(true) }}
        isFetchingPillVisible={false}
        slotRefresh={<></>}
        slotShowFilterButton={<></>}
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
        slotFilters={checklist.length === 0 ? <Filters /> : <Actions />}
      />
      <Drawer />
      <UploadApplications />
    </>
  );
};

const NewJobDetailsTabs = () => {
  const { job } = useJob();
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
  const { job } = useJob();
  const { section, changeSection } = useApplicationsStore(
    ({ section, changeSection }) => ({
      section,
      changeSection,
    }),
  );
  return (
    <Stack onClick={() => changeSection(status)}>
      <NewTabPill
        isPillActive={section === status}
        slotStartIcon={<SectionIcons section={status} />}
        isStartIconVisible={true}
        textLabel={`${capitalize(status)} (${job.count[status]})`}
      />
    </Stack>
  );
};
