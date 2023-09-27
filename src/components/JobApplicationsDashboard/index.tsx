import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';

import { JobScreening } from '@/devlink';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import ApplicationCard from './ApplicationCard';
import CompanyLogo from './Common/CompanyLogo';
import ImportCandidates from './ImportCandidates';
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
      <Stack
        width={'100%'}
        height={'100vh'}
        justifyContent={'center'}
        direction={'row'}
      >
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

  const applicantCounts = getApplicantCount(applications);

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
        }
        countAllApplicant={`${applicantCounts.all} applicants`}
        countScreening={`${applicantCounts.screening} applicants`}
        countShortlisted={`${applicantCounts.shortlisted} applicants`}
        countSelected={`${applicantCounts.selected} applicants`}
      />
    </>
  );
};

export default JobApplicationsDashboard;
