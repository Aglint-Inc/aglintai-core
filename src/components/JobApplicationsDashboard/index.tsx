import { useJobApplications } from '@context/JobApplicationsContext';
import { Stack } from '@mui/material';

import { JobScreening } from '@/devlink';
import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';

import CandidateCard from './CandidateCard';
import { CompanyLogo } from './Common';
import Loader from '../Common/Loader';

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
  const { applicationsData } = useJobApplications();

  const { job, applications } = applicationsData;
  return (
    <JobScreening
      slotProfileImage={
        <CompanyLogo companyName={job.company} companyLogo={job.logo} />
      }
      textRole={job.job_title}
      textCompanyLocation={job.company}
      slotCandidateJobCard={
        <>
          {applications.map((candidate, i) => {
            return <CandidateCard key={i} candidateDetails={candidate} />;
          })}
        </>
      }
    />
  );
};

export default JobApplicationsDashboard;
