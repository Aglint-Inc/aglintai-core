import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import { useState } from 'react';

import { JobScreening } from '@/devlink2';
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

  // eslint-disable-next-line security/detect-object-injection
  const sectionApplications = applications[section].list;

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = (section) => {
    setSection(section);
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
            <AUIButton onClick={() => setOpenImportCandidates(true)}>
              Edit details
            </AUIButton>
            <AUIButton onClick={() => setOpenImportCandidates(true)}>
              Workflow
            </AUIButton>
          </>
        }
        onClickAllApplicant={{
          onClick: () => handleSetSection(JobApplicationSections.APPLIED),
        }}
        countAll={applications.applied.count}
        onClickInterviewing={{
          onClick: () => handleSetSection(JobApplicationSections.INTERVIEWING),
        }}
        countInterviewing={applications.interviewing.count}
        onClickRejected={{
          onClick: () => handleSetSection(JobApplicationSections.REJECTED),
        }}
        countRejected={applications.rejected.count}
        onClickSelected={{
          onClick: () => handleSetSection(JobApplicationSections.SELECTED),
        }}
        countSelected={`${applications.selected.count} applicants`}
        slotSearch={
          <SearchField
            applications={sectionApplications}
            section={section}
            setFilteredApplications={setFilteredApplications}
          />
        }
        slotCandidateJobCard={
          <ApplicantsList applications={filteredApplications} />
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
}: {
  applications: JobApplication[];
}) => {
  return (
    <>
      {applications.map((application, i) => {
        return (
          <ApplicationCard
            key={application.application_id}
            application={application}
            index={i}
          />
        );
      })}
    </>
  );
};

export default JobApplicationsDashboard;
