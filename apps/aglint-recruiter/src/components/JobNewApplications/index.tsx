/* eslint-disable security/detect-object-injection */
import { DatabaseView } from '@aglint/shared-types';
import { CircularProgress, Stack } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';

import { JobDetails } from '@/devlink2/JobDetails';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { useApplications } from '@/src/context/ApplicationsContext';
import { useKeyPress } from '@/src/context/ApplicationsContext/hooks';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { useJob } from '@/src/context/JobContext';
import NotFoundPage from '@/src/pages/404';

import Loader from '../Common/Loader';
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

  const { section, changeSection } = useApplicationsStore(
    ({ section, changeSection }) => ({
      section,
      changeSection,
    }),
  );

  const count = useMemo(
    () => (job?.activeSections ?? []).length,
    [job?.activeSections],
  );

  const handleSelectNextSection = useCallback(() => {
    if (job?.activeSections) {
      const index = job.activeSections.indexOf(section);
      changeSection(job.activeSections[(index + 1) % count]);
    }
  }, [job?.activeSections, section, count]);

  const handleSelectPrevSection = useCallback(() => {
    if (job?.activeSections) {
      const index = job.activeSections.indexOf(section);
      changeSection(job.activeSections[index - 1 < 0 ? count - 1 : index - 1]);
    }
  }, [job?.activeSections, section, count]);

  const { pressed: shift } = useKeyPress('Shift');
  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (shift) {
      if (left) handleSelectPrevSection();
      else if (right) handleSelectNextSection();
    }
  }, [shift, left, right]);

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
        // slotStartIcon={<SectionIcons section={status} />}
        // isStartIconVisible={true}
        isTabCountVisible={true}
        textLabel={`${capitalize(status)}`}
        tabCount={`${job.count[status]}`}
      />
    </Stack>
  );
};
