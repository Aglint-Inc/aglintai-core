import { JobDetails } from '@devlink2/JobDetails';
import { CircularProgress } from '@mui/material';

import Loader from '@/components/Common/Loader';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import { useApplicationsChecklist, useJob } from '@/job/hooks';

import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import Filters from './Filters';
import { JobNotFound } from './JobNotFound';
import { SharedActions } from './SharedTopNav/actions';
import { SharedBreadCrumbs } from './SharedTopNav/breadcrumbs';
import { Table } from './Table';
import Tabs from './Tabs';

export const ApplicationsDashboard = () => {
  const { job, jobLoad } = useJob();
  return jobLoad ? (
    job ? (
      <ApplicationsComponent />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='w-full h-screen flex items-center justify-center'>
      <Loader />
    </div>
  );
};

const ApplicationsComponent = () => {
  const checklist = useApplicationsChecklist();
  return (
    <DNDProvider>
      <UIPageLayout
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
    </DNDProvider>
  );
};
