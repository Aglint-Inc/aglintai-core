import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { JobDetails } from '@/devlink2/JobDetails';
import { JobsBanner } from '@/devlink3/JobsBanner';
import { ScoreSetting } from '@/devlink3/ScoreSetting';
import Loader from '@/src/components/Common/Loader';
import PublishButton from '@/src/components/Common/PublishButton';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';

import JobNotFound from '../Common/JobNotFound';
import { UploadApplications } from '../Common/UploadApplications';
import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import Drawer from './Drawer';
import Filters from './Filters';
import { BreadCrumbs } from './layout';
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
  const {
    job,
    handlePublish,
    canPublish,
    total,
    applicationScoringPollEnabled,
    manageJob,
  } = useJob();
  const { setImportPopup, checklist } = useApplicationsStore(
    ({ setImportPopup, checklist }) => ({ setImportPopup, checklist }),
  );
  return (
    <DNDProvider>
      <JobDetails
        isImportCandidates={false}
        isFetchingPillVisible={false}
        slotRefresh={
          applicationScoringPollEnabled && (
            <ScoreSetting
              textScoreCount={`${
                job?.processing_count.processed +
                job?.processing_count.unavailable +
                job?.processing_count.unparsable
              }/${total ?? '---'}`}
              slotScoringLoader={
                <Stack sx={{ width: '12px', aspectRatio: 1 }}>
                  <CircularProgress
                    color='inherit'
                    size={'100%'}
                    sx={{ color: 'var(--white)' }}
                  />
                </Stack>
              }
            />
          )
        }
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
          <Stack direction={'row'} alignItems={'center'} gap={2}>
            {applicationScoringPollEnabled && (
              <ScoreSetting
                textScoreCount={`${
                  job?.processing_count.processed +
                  job?.processing_count.unavailable +
                  job?.processing_count.unparsable
                }/${total ?? '---'}`}
                slotScoringLoader={
                  <Stack sx={{ width: '12px', aspectRatio: 1 }}>
                    <CircularProgress
                      color='inherit'
                      size={'100%'}
                      sx={{ color: 'var(--white)' }}
                    />
                  </Stack>
                }
              />
            )}
            {job?.status !== 'closed' && manageJob && (
              <ButtonSoft
                size={2}
                color='neutral'
                textButton='Add candidates'
                onClickButton={{ onClick: () => setImportPopup(true) }}
                isLeftIcon
                iconName='person_add'
              />
            )}
            {job?.status === 'draft' && (
              <JobsBanner
                slotButton={
                  manageJob && (
                    <PublishButton
                      onClick={() => handlePublish()}
                      disabled={!canPublish}
                    />
                  )
                }
              />
            )}
          </Stack>
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
