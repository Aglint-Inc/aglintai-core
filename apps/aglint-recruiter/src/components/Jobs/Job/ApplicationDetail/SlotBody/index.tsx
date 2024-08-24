import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ApplicationDetail } from '@/devlink2/ApplicationDetail';
import Loader from '@/src/components/Common/Loader';
import { Application, useApplication } from '@/src/context/ApplicationContext';

import { Activity } from '../../Common/CandidateDrawer/Activity';
import { Resume } from '../../Common/CandidateDrawer/Resume';
import CandidateInfo from './CandidateInfo';
import InterviewTabContent from './InterviewTabContent';
import Requests from './Requests';
import Tabs, { TabsType } from './Tabs';

function SlotBody() {
  const router = useRouter();
  const tab = router.query.tab as TabsType;

  const {
    meta: { isLoading: isLoadingDetail },
  } = useApplication();

  if (isLoadingDetail) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <ApplicationDetail
        slotTabBody={
          <Stack height={'100%'}>
            {tab === 'interview' ? (
              <Stack maxWidth={'1400px'} padding={'var(--space-4)'}>
                <InterviewTabContent />
              </Stack>
            ) : tab === 'activity' ? (
              <Stack maxWidth={'600px'} padding={'var(--space-4)'}>
                <Activity />
              </Stack>
            ) : tab === 'resume' ? (
              <Stack
                padding={'var(--space-4)'}
                // height={'1000px'}
                maxWidth={'900px'}
              >
                <Resume />
              </Stack>
            ) : tab === 'scoring' ? (
              <Stack padding={'var(--space-4)'}>
                <Application.Body.Details />
              </Stack>
            ) : tab === 'requests' ? (
              <Requests />
            ) : (
              ''
            )}
          </Stack>
        }
        slotApplicantInfoBox={<CandidateInfo />}
        slotTab={<Tabs />}
      />
    </>
  );
}

export default SlotBody;
