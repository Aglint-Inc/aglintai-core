import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

const JobPage = () => {
  const router = useRouter();
  return (
    <>
      <Stack>{router.query.id}</Stack>
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return <>{page}</>;
};

export default JobPage;
