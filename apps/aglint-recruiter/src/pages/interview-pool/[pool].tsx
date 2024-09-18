import { useParams } from 'next/navigation';
import InterviewTypeDetail from 'src/app/(authenticated)/_interview-pool/[pool]/_common/components';

import Seo from '@/components/Common/Seo';
import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  const {pool} = useParams() 
  return (
    <>
      <Seo title={`Scheduling`} description='AI for People Products' />
      <InterviewTypeDetail module_id={pool as string}/>
    </>
  );
};

ModuleMembers.privateProvider = function privateProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;
