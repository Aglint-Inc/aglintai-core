import Interviews from './Interviews';
import SeoSettings from './SEO/SeoSettings';

function SchedulingMainComp() {
  return (
    <>
      <SeoSettings tab={'interviews'} />

      <Interviews />
      {/* <SchedulingDashboard /> */}
    </>
  );
}

export default SchedulingMainComp;
