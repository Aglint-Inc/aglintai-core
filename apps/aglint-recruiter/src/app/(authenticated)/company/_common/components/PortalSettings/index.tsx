import { Loader } from '@/common/Loader';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';

import CandidatePortalSettings from './CandidatePortalSettings';

function PortalSettings() {
  const { isPortalLoading } = usePortalSettings();
  return (
    <div className='max-w-[70%]'>
      {isPortalLoading ? <Loader /> : <CandidatePortalSettings />}
    </div>
  );
}

export default PortalSettings;
