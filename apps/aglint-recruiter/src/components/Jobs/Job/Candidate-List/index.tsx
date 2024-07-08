import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { JobDetails } from '@/devlink2/JobDetails';
import { JobsBanner } from '@/devlink3/JobsBanner';
import Loader from '@/src/components/Common/Loader';
import PublishButton from '@/src/components/Common/PublishButton';
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
  const { job, handlePublish, canPublish } = useJob();
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
        slotGlobalBanner={
          job?.status === 'draft' && (
            <JobsBanner
              slotButton={
                <PublishButton
                  onClick={() => handlePublish()}
                  disabled={!canPublish}
                />
              }
            />
          )
        }
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
