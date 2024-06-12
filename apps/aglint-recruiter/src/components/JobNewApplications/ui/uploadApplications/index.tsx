import { Dialog } from '@mui/material';

import { ImportCandidates } from '@/devlink/ImportCandidates';
import { ImportCsv } from '@/devlink/ImportCsv';
import { ImportResume } from '@/devlink/ImportResume';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';

import { ImportManual } from './importManual';

const UploadApplications = () => {
  const { importPopup, setImportPopup } = useApplicationsStore(
    ({ importPopup, setImportPopup }) => ({ importPopup, setImportPopup }),
  );
  return (
    <Dialog
      open={importPopup}
      onClose={() => setImportPopup(false)}
      maxWidth='md'
    >
      <ImportCandidates
        isImportDescVisible={false}
        isListingCountVisible={true}
        slotAddManually={<ImportManual />}
        slotImportCsv={<ImportCsv />}
        onClickClose={{
          onClick: () => setImportPopup(false),
        }}
        slotImportResume={<ImportResume />}
      />
    </Dialog>
  );
};

export { UploadApplications };
