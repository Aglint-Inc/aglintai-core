import { useJobApplications } from '@context/JobApplicationsContext';
import { JobApplication } from '@context/JobApplicationsContext/types';
import { Stack, Typography } from '@mui/material';

import NotFoundPage from '@/src/pages/404';
import { YTransform } from '@/src/utils/framer-motions/Animation';

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
      <Loader />
    </YTransformWrapper>
  );
};

const YTransformWrapper = ({ children }) => {
  const { initialLoad } = useJobApplications();
  return (
    <YTransform uniqueKey={initialLoad}>
      <Stack
        width={'89.5vw'}
        height={'100vh'}
        alignItems={'center'}
        justifyContent={'space-evenly'}
      >
        {children}
      </Stack>
    </YTransform>
  );
};

const JobApplicationComponent = () => {
  return (
    <Stack
      width={'89.5vw'}
      height={'100vh'}
      alignItems={'center'}
      justifyContent={'space-evenly'}
    >
      <CompanyCard />
      <ApplicantList />
    </Stack>
  );
};

const CompanyCard = () => {
  const { applicationsData } = useJobApplications();
  const job = applicationsData.job;
  return (
    <Stack flexDirection={'row'}>
      <CompanyLogo companyName={job.company} companyLogo={job.logo} />
      <Stack>
        <Typography>{job.job_title}</Typography>
        <Typography>{`${job.company}, ${job.location}`}</Typography>
      </Stack>
    </Stack>
  );
};

const ApplicantList = () => {
  const { applicationsData } = useJobApplications();
  return (
    <Stack>
      {applicationsData.applications.map((application) => (
        <ApplicantListItem
          key={application.application_id}
          application={application}
        />
      ))}
    </Stack>
  );
};

const ApplicantListItem = ({
  application,
}: {
  application: JobApplication;
}) => {
  return (
    <Stack flexDirection={'row'} gap={2}>
      <Stack> {application.first_name}</Stack>
      <Stack>{application.email}</Stack>
    </Stack>
  );
};

export default JobApplicationsDashboard;
