import InterviewTypeDetail from 'src/app/(authenticated)/_interview-pool/[pool]/_common/components';

import Seo from '@/components/Common/Seo';
import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  return (
    <>
      <Seo title={`Scheduling`} description='AI for People Products' />
      <InterviewTypeDetail />
    </>
  );
};

ModuleMembers.privateProvider = function privateProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;
