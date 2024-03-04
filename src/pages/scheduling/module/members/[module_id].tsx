import ModuleMembersComp from '@/src/components/Scheduling/Modules/ModuleMembers';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  return (
    <>
      <ModuleMembersComp />
    </>
  );
};

ModuleMembers.getProvider = function getProvider(page) {
  return <SchedulingProvider>{page}</SchedulingProvider>;
};
export default ModuleMembers;
