import { SeoPro } from '../Common/SeoPro';
import SchedulingDashboard from './Dashboard';

function SchedulingMainComp() {
  return (
    <>
      <SeoPro
        title='Interviews - Scheduler | Aglint AI'
        description='AI for People Products'
      />
      <SchedulingDashboard />
    </>
  );
}

export default SchedulingMainComp;
