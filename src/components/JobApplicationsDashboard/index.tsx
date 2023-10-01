/* eslint-disable security/detect-object-injection */
import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

import {
  AddCandidateDropdown,
  ApplicantsListEmpty,
  JobScreening,
  SelectActionBar,
} from '@/devlink2';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import ApplicationCard from './ApplicationCard';
import ImportCandidates from './ImportCandidates';
import SearchField from './SearchField';
import { capitalize } from './utils';
import Loader from '../Common/Loader';
import MuiPopup from '../Common/MuiPopup';

const JobApplicationsDashboard = () => {
  const { initialLoad, applicationsData } = useJobApplications();
  return initialLoad ? (
    applicationsData.job !== null ? (
      <YTransformWrapper>
        <JobApplicationComponent />
      </YTransformWrapper>
    ) : (
      <YTransform uniqueKey={initialLoad}>
        <NotFoundPage />
      </YTransform>
    )
  ) : (
    <YTransformWrapper>
      <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
        <Loader />
      </Stack>
    </YTransformWrapper>
  );
};
const YTransformWrapper = ({ children }) => {
  const { initialLoad } = useJobApplications();
  return <YTransform uniqueKey={initialLoad}>{children}</YTransform>;
};

const JobApplicationComponent = () => {
  const { applicationsData } = useJobApplications();

  const { job, applications } = applicationsData;

  const [section, setSection] = useState(JobApplicationSections.APPLIED);

  const sectionApplications = applications[section].list;

  const [checkList, setCheckList] = useState(new Set<string>());

  const [jobUpdate, setJobUpdate] = useState(false);

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
    setCheckList(new Set<string>());
  };

  return (
    <JobScreening
      textJobStatus={capitalize(job.status)}
      textRole={capitalize(job.job_title)}
      textApplicantsNumber={`(${applicationsData.count} applicants)`}
      isAll={section === JobApplicationSections.APPLIED}
      countAll={applications.applied.count}
      onClickAllApplicant={{
        onClick: () => handleSetSection(JobApplicationSections.APPLIED),
        style: {
          color:
            section === JobApplicationSections.APPLIED ? 'white' : 'inherit',
        },
      }}
      isInterviewing={section === JobApplicationSections.INTERVIEWING}
      countInterviewing={applications.interviewing.count}
      onClickInterviewing={{
        onClick: () => handleSetSection(JobApplicationSections.INTERVIEWING),
        style: {
          color:
            section === JobApplicationSections.INTERVIEWING
              ? 'white'
              : 'inherit',
        },
      }}
      isRejected={section === JobApplicationSections.REJECTED}
      countRejected={applications.rejected.count}
      onClickRejected={{
        onClick: () => handleSetSection(JobApplicationSections.REJECTED),
        style: {
          color:
            section === JobApplicationSections.REJECTED ? 'white' : 'inherit',
        },
      }}
      isSelected={section === JobApplicationSections.SELECTED}
      countSelected={applications.selected.count}
      onClickSelected={{
        onClick: () => handleSetSection(JobApplicationSections.SELECTED),
        style: {
          color:
            section === JobApplicationSections.SELECTED ? 'white' : 'inherit',
        },
      }}
      slotSearch={
        <SearchField
          applications={sectionApplications}
          section={section}
          jobUpdate={jobUpdate}
          setFilteredApplications={setFilteredApplications}
        />
      }
      slotCandidateJobCard={
        <ApplicantsList
          applications={filteredApplications}
          checkList={checkList}
          setCheckList={setCheckList}
          jobUpdate={jobUpdate}
        />
      }
      slotAddCandidates={<AddCandidates />}
      slotSelectActionBar={
        <Stack style={{ backgroundColor: 'white' }}>
          <Stack
            style={{
              opacity: jobUpdate ? 0.5 : 1,
              pointerEvents: jobUpdate ? 'none' : 'auto',
            }}
          >
            <ActionBar
              section={section}
              checkList={checkList}
              setCheckList={setCheckList}
              setJobUpdate={setJobUpdate}
            />
          </Stack>
        </Stack>
      }
      bottomBarVisibility={checkList.size !== 0}
      linkActiveJobs={{
        href: '/jobs',
      }}
      jobLink={{
        href: `https://dev.aglinthq.com/job-post/${job.id}`,
        target: '_blank',
      }}
    />
  );
};

const ApplicantsList = ({
  applications,
  checkList,
  setCheckList,
  jobUpdate,
}: {
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  jobUpdate: boolean;
}) => {
  return applications.length === 0 ? (
    <ApplicantsListEmpty />
  ) : (
    <>
      {applications.map((application, i) => {
        const styles =
          jobUpdate && checkList.has(application.application_id)
            ? { opacity: 0.5, pointerEvent: 'none' }
            : { opacity: 1, pointerEvent: 'auto' };
        return (
          <Stack key={application.application_id} style={styles}>
            <ApplicationCard
              application={application}
              index={i}
              checkList={checkList}
              setCheckList={setCheckList}
            />
          </Stack>
        );
      })}
    </>
  );
};

const ActionBar = ({
  section,
  checkList,
  setCheckList,
  setJobUpdate,
}: {
  section: JobApplicationSections;
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleUpdateJobStatus } = useJobApplications();

  const handleUpdateJobs = async (destination: JobApplicationSections) => {
    setJobUpdate(true);
    await handleUpdateJobStatus(checkList, {
      source: section,
      destination,
    });
    setCheckList(new Set<string>());
    setJobUpdate(false);
  };

  const isChecked = checkList.size !== 0;
  const showNew = isChecked && section === JobApplicationSections.REJECTED;
  const showInterview = isChecked && section === JobApplicationSections.APPLIED;
  const showSelected =
    isChecked &&
    (section === JobApplicationSections.APPLIED ||
      section === JobApplicationSections.INTERVIEWING);
  const showReject =
    isChecked &&
    (section === JobApplicationSections.APPLIED ||
      section === JobApplicationSections.INTERVIEWING ||
      section === JobApplicationSections.SELECTED);

  return (
    <SelectActionBar
      isInterview={showInterview}
      onClickInterview={{
        onClick: async () =>
          await handleUpdateJobs(JobApplicationSections.INTERVIEWING),
      }}
      isQualified={showSelected}
      onClickQualified={{
        onClick: async () =>
          await handleUpdateJobs(JobApplicationSections.SELECTED),
      }}
      isDisqualified={showReject}
      onClickDisqualified={{
        onClick: async () =>
          await handleUpdateJobs(JobApplicationSections.REJECTED),
      }}
      onClickMoveNew={{
        onClick: async () =>
          await handleUpdateJobs(JobApplicationSections.APPLIED),
      }}
      onClickClear={{
        onClick: () => setCheckList(new Set<string>()),
      }}
      textSelected={`${checkList.size} candidates selected`}
      isMoveNew={showNew}
    />
  );
};

const AddCandidates = () => {
  const { openImportCandidates, setOpenImportCandidates } =
    useJobApplications();
  return (
    <>
      <MuiPopup
        props={{
          open: openImportCandidates,
        }}
      >
        <ImportCandidates />
      </MuiPopup>
      <AddCandidateDropdown
        onClickManual={{ onClick: () => setOpenImportCandidates(true) }}
      />
    </>
  );
};
export default JobApplicationsDashboard;
