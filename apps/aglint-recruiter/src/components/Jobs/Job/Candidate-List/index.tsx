import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { JobDetails } from '@/devlink2/JobDetails';
import { PageLayout } from '@/devlink2/PageLayout';
import Loader from '@/src/components/Common/Loader';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';

import JobNotFound from '../Common/JobNotFound';
import { SharedActions } from '../Common/SharedTopNav/actions';
import { SharedBreadCrumbs } from '../Common/SharedTopNav/breadcrumbs';
import { UploadApplications } from '../Common/UploadApplications';
import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import Filters from './Filters';
import { Table } from './Table';
import Tabs from './Tabs';

const ApplicationsDashboard = () => {
  const { job, jobLoad } = useJob();
  const resetAll = useApplicationsStore(({ resetAll }) => resetAll);
  useEffect(() => {
    return () => resetAll();
  }, []);
  return jobLoad ? (
    job ? (
      <ApplicationsComponent />
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

export default ApplicationsDashboard;

const ApplicationsComponent = () => {
  const { checklist } = useApplicationsStore(({ checklist }) => ({
    checklist,
  }));
  return (
    <DNDProvider>
      <PageLayout
        slotBody={
          <JobDetails
            isImportCandidates={false}
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
            slotBreadcrumb={<></>}
            slotGlobalBanner={<></>}
            slotTabs={<Tabs />}
            slotTable={<Table />}
            isFilterVisible={true}
            slotFilters={checklist.length === 0 ? <Filters /> : <Actions />}
          />
        }
        slotTopbarRight={<SharedActions />}
        slotTopbarLeft={<SharedBreadCrumbs />}
      />
      <UploadApplications />
    </DNDProvider>
  );
};
