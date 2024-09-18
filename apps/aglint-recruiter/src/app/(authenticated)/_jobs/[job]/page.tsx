import { ApplicationsDashboard } from '@/job/components';
import { useJobApplicationsPrefetch } from '@/job/hooks';

const Page = () => {
  void useJobApplicationsPrefetch();
  return <ApplicationsDashboard />;
};

export default Page;
