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
import CompanyLogo from './Common/CompanyLogo';
import ImportCandidates from './ImportCandidates';
import SearchField from './SearchField';
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

  const { job,applications } = applicationsData;

  const [section, setSection] = useState(JobApplicationSections.APPLIED);

  // eslint-disable-next-line security/detect-object-injection
  const sectionApplications = applications[section].list;

  const [filteredApplications, setFilteredApplications] =
    useState(sectionApplications);

  const handleSetSection = () => {
    setSection((prev) =>
      prev === JobApplicationSections.APPLIED
        ? JobApplicationSections.INTERVIEWING
        : JobApplicationSections.APPLIED,
    );
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
        onClickImportCandidate={{
          onClick: () => setOpenImportCandidates(true),
        }}
        slotProfileImage={
          <Stack
            onClick={() => {
              handleSetSection();
            }}
          >
            <CompanyLogo companyName={job.company} companyLogo={job.logo} />
          </Stack>
        }
        textRole={job.job_title}
        textCompanyLocation={job.company}
        slotCandidateJobCard={
          <ApplicantsList applications={filteredApplications} />
        }
        countAllApplicant={`${applications.applied.count} applicants`}
        countScreening={`${applications.interviewing.count} applicants`}
        countShortlisted={`${applications.rejected.count} applicants`}
        countSelected={`${applications.selected.count} applicants`}
        slotSearchInput={
          <SearchField
            applications={sectionApplications}
            section={section}
            setFilteredApplications={setFilteredApplications}
          />
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
