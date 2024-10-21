import { Loader } from '@/common/Loader';
import { usePortalSettings } from '@/company/context/PortalsettingsContext';

import CandidatePortalSettings from './CandidatePortalSettings';

function PortalSettings() {
  const { isLoading } = usePortalSettings();
  return (
    <div className='max-w-[70%]'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CandidatePortalSettings />
        </>
      )}
    </div>
  );
}

export default PortalSettings;
