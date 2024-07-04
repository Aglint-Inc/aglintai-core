import { Dialog } from '@mui/material';

import { ImportCandidates } from '@/devlink/ImportCandidates';
import { useApplicationsStore } from '@/src/context/ApplicationsContext/store';

import { ImportCsv } from './importCsv';
import { ImportManual } from './importManual';
import { ImportResume } from './importResume';

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
