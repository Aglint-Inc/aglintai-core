import Seo from '@/src/components/Common/Seo';
import ModuleMembersComp from '@/src/components/Scheduling/InterviewTypes/DetailPage';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

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
