import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';
import { useState } from 'react';

import { JobScreening } from '@/devlink2';
import { JobApplication } from '@/src/context/JobApplicationsContext/types';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import ApplicationCard from './ApplicationCard';
import CompanyLogo from './Common/CompanyLogo';
import ImportCandidates from './ImportCandidates';
import SearchField from './SearchField';
import { getApplicantCount } from './utils';
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

  const { job } = applicationsData;

  const applicantCounts = getApplicantCount(applicationsData.applications);

  const [filteredApplications, setFilteredApplications] = useState(
    applicationsData.applications,
  );
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
          <CompanyLogo companyName={job.company} companyLogo={job.logo} />
        }
        textRole={job.job_title}
        textCompanyLocation={job.company}
        slotCandidateJobCard={
          <ApplicantsList applications={filteredApplications} />
        }
        countAllApplicant={`${applicantCounts.all} applicants`}
        countScreening={`${applicantCounts.screening} applicants`}
        countShortlisted={`${applicantCounts.shortlisted} applicants`}
        countSelected={`${applicantCounts.selected} applicants`}
        slotSearchInput={
          <SearchField setFilteredApplications={setFilteredApplications} />
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
