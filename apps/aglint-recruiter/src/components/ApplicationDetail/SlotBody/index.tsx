import { useRouter } from 'next/router';

import Loader from '@/components/Common/Loader';
import { useApplication } from '@/context/ApplicationContext';
import { Activity } from '@/job/components/CandidateDrawer/Activity';
import { Details } from '@/job/components/CandidateDrawer/Details';
import { Resume } from '@/job/components/CandidateDrawer/Resume';

import CandidateInfo from '../_common/components/CandidateInfo';
import Requests from '../_common/components/Requests';
import Tabs, { type TabsType } from '../_common/components/Tabs';
import InterviewTabContent from './InterviewTabContent';
import { ApplicationDetail } from './InterviewTabContent/_common/components/ApplicationDetail';

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
          <div className='h-full'>
            {tab === 'interview' ? (
              <div className='max-w-[1400px] p-4'>
                <InterviewTabContent />
              </div>
            ) : tab === 'activity' ? (
              <div className='max-w-[600px] p-4'>
                <Activity />
              </div>
            ) : tab === 'resume' ? (
              <div className='max-w-[900px] p-4'>
                <Resume />
              </div>
            ) : tab === 'scoring' ? (
              <div className='p-4'>
                <Details />
              </div>
            ) : tab === 'requests' ? (
              <Requests />
            ) : (
              ''
            )}
          </div>
        }
        slotApplicantInfoBox={<CandidateInfo />}
        slotTab={<Tabs />}
      />
    </>
  );
}

export default SlotBody;
