import { ApplicationsDashboard } from '@/job/components';
import { useApplicationsPrefetch } from '@/job/hooks';

const Page = () => {
  void useApplicationsPrefetch();
  return <ApplicationsDashboard />;
};

export default Page;
