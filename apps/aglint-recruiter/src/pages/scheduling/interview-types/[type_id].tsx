import Seo from '@/components/Common/Seo';
import ModuleMembersComp from '@/components/Scheduling/InterviewTypes/DetailPage';
import SchedulingProvider from '@/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  return (
    <>
      <Seo title={`Scheduling`} description='AI for People Products' />
      <ModuleMembersComp />
    </>
  );
};

ModuleMembers.privateProvider = function privateProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;
