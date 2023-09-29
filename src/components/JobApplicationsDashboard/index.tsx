import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { ApplicantsListEmpty, JobScreening } from '@/devlink2';
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
  const {
    applicationsData,
    openImportCandidates,
    setOpenImportCandidates,
    handleUpdateJobStatus,
  } = useJobApplications();

  const { job, applications } = applicationsData;

  const [section, setSection] = useState(JobApplicationSections.APPLIED);

  // eslint-disable-next-line security/detect-object-injection
  const sectionApplications = applications[section].list;

  const [checkList, setCheckList] = useState(new Set<string>());

  const jobUpdate = useRef(true);

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
    setTimeout(() => {
      setCheckList(new Set<string>());
    }, 500);
  };

  const handleUpdateJobs = async (destination: JobApplicationSections) => {
    await handleUpdateJobStatus(checkList, {
      source: section,
      destination,
    });
    jobUpdate.current = !jobUpdate.current;
    setTimeout(() => {
      setCheckList(new Set<string>());
    }, 500);
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
        slotStopSubmission={
          <>
            <AUIButton
              onClick={async () =>
                await handleUpdateJobs(JobApplicationSections.APPLIED)
              }
            >
              Move to Applied
            </AUIButton>
            <AUIButton
              onClick={async () =>
                await handleUpdateJobs(JobApplicationSections.INTERVIEWING)
              }
            >
              Move to interviewing
            </AUIButton>
            <AUIButton
              onClick={async () =>
                await handleUpdateJobs(JobApplicationSections.SELECTED)
              }
            >
              Move to selected
            </AUIButton>
            <AUIButton
              onClick={async () =>
                await handleUpdateJobs(JobApplicationSections.REJECTED)
              }
            >
              Move to reject
            </AUIButton>
          </>
        }
        onClickAllApplicant={{
          onClick: () => handleSetSection(JobApplicationSections.APPLIED),
          style: {
            color:
              section === JobApplicationSections.APPLIED ? 'white' : 'inherit',
          },
        }}
        countAll={applications.applied.count}
        onClickInterviewing={{
          onClick: () => handleSetSection(JobApplicationSections.INTERVIEWING),
          style: {
            color:
              section === JobApplicationSections.INTERVIEWING
                ? 'white'
                : 'inherit',
          },
        }}
        countInterviewing={applications.interviewing.count}
        onClickRejected={{
          onClick: () => handleSetSection(JobApplicationSections.REJECTED),
          style: {
            color:
              section === JobApplicationSections.REJECTED ? 'white' : 'inherit',
          },
        }}
        countRejected={applications.rejected.count}
        onClickSelected={{
          onClick: () => handleSetSection(JobApplicationSections.SELECTED),
          style: {
            color:
              section === JobApplicationSections.SELECTED ? 'white' : 'inherit',
          },
        }}
        countSelected={applications.selected.count}
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

export default JobApplicationsDashboard;
