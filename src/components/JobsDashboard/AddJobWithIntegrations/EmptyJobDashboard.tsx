import { Dialog } from '@mui/material';

import { JobDashboardEmpty } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useIntegration } from '@/src/context/IntegrationProvider/IntegrationProvider';
import {
  STATE_GREENHOUSE_DIALOG,
  STATE_LEVER_DIALOG,
} from '@/src/context/IntegrationProvider/utils';

import { GreenhouseModal } from './GreenhouseModal';
import { LeverModalComp } from './LeverModal';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  const { handleClose, integration, setIntegration } = useIntegration();
  const { recruiter } = useAuthDetails();

  return (
    <>
      <Dialog
        open={integration.lever.open}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <LeverModalComp />
      </Dialog>

      <Dialog
        open={integration.greenhouse.open}
        onClose={handleClose}
        maxWidth={'lg'}
      >
        <GreenhouseModal />
      </Dialog>

      <JobDashboardEmpty
        isAtsOptionVisible={true}
        isConnectedVisible={recruiter?.lever_key ? true : false}
        isGreenhouseConnected={recruiter?.greenhouse_key ? true : false}
        textHeader={heading}
        isOldTitleVisible={showMsg}
        onClickAddJob={{
          onClick: handleClickAddJob,
        }}
        isSelectTitleVisible={true}
        onClickRequestIntegration={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                'Aglint : Request ATS Integration',
              )}&body=${encodeURIComponent(
                ` 
Hello,

I would like to request an integration.

Thank you,
[Your Name]
`,
              )}`,
            );
          },
        }}
        onClickGreenHouse={{
          onClick: () => {
            if (!recruiter.greenhouse_key) {
              setIntegration((prev) => ({
                ...prev,
                greenhouse: { open: true, step: STATE_GREENHOUSE_DIALOG.API },
              }));
            } else {
              setIntegration((prev) => ({
                ...prev,
                greenhouse: {
                  open: true,
                  step: STATE_GREENHOUSE_DIALOG.LISTJOBS,
                },
              }));
            }
          },
        }}
        onClickAshby={{
          onClick: () => {
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Aglint: Request Integration with Ashby`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Ashby into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
          },
        }}
        onClickLever={{
          onClick: () => {
            if (!recruiter.lever_key) {
              setIntegration((prev) => ({
                ...prev,
                lever: { open: true, step: STATE_LEVER_DIALOG.API },
              }));
            } else {
              setIntegration((prev) => ({
                ...prev,
                lever: { open: true, step: STATE_LEVER_DIALOG.LISTJOBS },
              }));
            }
          },
        }}
      />
    </>
  );
}
