import Seo from '@/src/components/Common/Seo';
import ModuleMembersComp from '@/src/components/Scheduling/Modules/ModuleMembers';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  return (
    <>
      <Seo
        title={`Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <ModuleMembersComp />
    </>
  );
};

ModuleMembers.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;
