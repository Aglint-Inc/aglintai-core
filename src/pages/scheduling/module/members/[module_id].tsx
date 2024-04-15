import Seo from '@/src/components/Common/Seo';
import ModuleMembersComp from '@/src/components/Scheduling/Modules/ModuleMembers';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import SchedulingProvider from '@/src/context/SchedulingMain/SchedulingMainProvider';

const ModuleMembers = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Scheduling`}
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
