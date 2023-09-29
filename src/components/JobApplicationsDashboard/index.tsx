/* eslint-disable security/detect-object-injection */
import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import {
  Dispatch,
  forwardRef,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';

import { ApplicantsListEmpty, JobScreening, SelectActionBar } from '@/devlink2';
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
import AUIButton from '../Common/AUIButton';
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
  const { applicationsData, openImportCandidates, setOpenImportCandidates } =
    useJobApplications();

  const { job, applications } = applicationsData;

  const [section, setSection] = useState(JobApplicationSections.APPLIED);

  const sectionApplications = applications[section].list;

  const [checkList, setCheckList] = useState(new Set<string>());

  const jobUpdate = useRef(true);

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
    setCheckList(new Set<string>());
  };

  return (
    <>
      <MuiPopup
        props={{
          open: openImportCandidates,
        }}
      >
        <ImportCandidates />
      </MuiPopup>
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
            jobUpdate={jobUpdate.current}
            setFilteredApplications={setFilteredApplications}
          />
        }
        slotCandidateJobCard={
          <ApplicantsList
            applications={filteredApplications}
            checkList={checkList}
            setCheckList={setCheckList}
          />
        }
        slotAddCandidates={
          <AUIButton onClick={() => setOpenImportCandidates(true)}>
            Import candidates
          </AUIButton>
        }
        slotSelectActionBar={
          <ActionBar
            ref={jobUpdate}
            section={section}
            checkList={checkList}
            setCheckList={setCheckList}
          />
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
    </>
  );
};

const ApplicantsList = ({
  applications,
  checkList,
  setCheckList,
}: {
  applications: JobApplication[];
  checkList: Set<string>;
  setCheckList: Dispatch<SetStateAction<Set<string>>>;
}) => {
  return applications.length === 0 ? (
    <ApplicantsListEmpty />
  ) : (
    <>
      {applications.map((application, i) => {
        return (
          <ApplicationCard
            key={application.application_id}
            application={application}
            index={i}
            checkList={checkList}
            setCheckList={setCheckList}
          />
        );
      })}
    </>
  );
};

const ActionBar = forwardRef(function ActionBar(
  {
    section,
    checkList,
    setCheckList,
  }: {
    section: JobApplicationSections;
    checkList: Set<string>;
    setCheckList: Dispatch<SetStateAction<Set<string>>>;
  },
  jobUpdate: MutableRefObject<boolean>,
) {
  const { handleUpdateJobStatus } = useJobApplications();

  const handleUpdateJobs = async (destination: JobApplicationSections) => {
    await handleUpdateJobStatus(checkList, {
      source: section,
      destination,
    });
    jobUpdate.current = !jobUpdate.current;
    setCheckList(new Set<string>());
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
});
export default JobApplicationsDashboard;
