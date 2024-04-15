import Seo from '@/src/components/Common/Seo';
import SchedulingApplication from '@/src/components/Scheduling/AllSchedules/SchedulingApplication';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

export default function SchedulingApplicationPage() {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Scheduling`}
        description='AI Powered Talent Development Platform.'
      />
      <SchedulingApplication />
    </>
  );
}
