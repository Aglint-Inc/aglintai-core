import { Dialog } from '@mui/material';
import { useState } from 'react';

import { JobDashboardEmpty } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import { LeverModalComp } from './LeverModal';

export default function EmptyJobDashboard({
  heading,
  handleClickAddJob,
  showMsg = true,
}) {
  const { recruiter } = useAuthDetails();
  const [state, setState] = useState(STATE_LEVER_DIALOG.INITIAL);
  const [isLeverOpen, setIsLeverOpen] = useState(false);

  const handleClose = () => {
    setIsLeverOpen(false);
  };

  return (
    <>
      <Dialog open={isLeverOpen} onClose={handleClose} maxWidth={'lg'}>
        <LeverModalComp
          state={state}
          handleClose={handleClose}
          setState={setState}
        />
      </Dialog>

      <JobDashboardEmpty
        isAtsOptionVisible={true}
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
            window.open(
              `mailto:customersuccess@aglinthq.com?subject=${encodeURIComponent(
                `Aglint: Request Integration with Greenhouse`,
              )}&body=${encodeURIComponent(
                `
Hello,

Requesting integration of Greenhouse into Aglint

Thank you,
[Your Name]
                  `,
              )}`,
            );
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
              setState(STATE_LEVER_DIALOG.API);
              setIsLeverOpen(true);
            } else {
              setState(STATE_LEVER_DIALOG.LISTJOBS);
              setIsLeverOpen(true);
            }
          },
        }}
      />
    </>
  );
}

export const STATE_LEVER_DIALOG = {
  INITIAL: 'INITIAL',
  FETCHING: 'FETCHING',
  API: 'API',
  LISTJOBS: 'LISTJOBS',
  IMPORTING: 'IMPORTING',
  ERROR: 'ERROR',
};
