import Seo from '@/components/Common/Seo';
import InterviewTypeDetail from '@/components/Scheduling/InterviewTypes/DetailPage/new';
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
