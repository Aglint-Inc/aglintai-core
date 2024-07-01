import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { JobDetails } from '@/devlink2/JobDetails';
import Loader from '@/src/components/Common/Loader';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import NotFoundPage from '@/src/pages/404';

import { UploadApplications } from '../Common/UploadApplications';
import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import Drawer from './Drawer';
import Filters from './Filters';
import { BreadCrumbs } from './layout';
import { Table } from './Table';
import Tabs from './Tabs';

const ApplicationsDashboard = () => {
  const { job, jobLoad } = useApplications();
  const resetAll = useApplicationsStore(({ resetAll }) => resetAll);
  useEffect(() => {
    return () => resetAll();
  }, []);
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
    <DNDProvider>
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
        slotTabs={<Tabs />}
        slotTable={<Table />}
        isFilterVisible={true}
        slotFilters={checklist.length === 0 ? <Filters /> : <Actions />}
      />
      <Drawer />
      <UploadApplications />
    </DNDProvider>
  );
};
