import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { BodyWithSidePanel, DarkPill, ScheduleDetailTabs } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import CandidateInfo from './CandidateDetails';
import Feedback from './Feedback';
import Instructions from './Instructions';
import Overview from './Overview';
import RightPanel from './RightPanel';
import { TransformSchedule } from '../Modules/types';
import { ShowCode } from '../../Common/ShowCode';

function SchedulingViewComp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<TransformSchedule>(null);

  useEffect(() => {
    (async () => {
      if (router.isReady && router.query.meeting_id) {
        const { data } = await supabase.rpc(
          'get_interview_schedule_by_meeting_id',
          {
            target_meeting_id: router.query.meeting_id as string,
          },
        );
        if (data.length > 0) {
          const userIds = [];
          const filteredData = (data as unknown as TransformSchedule[])[0];
          filteredData.schedule.confirmed_option?.plans.map((plan) =>
            plan.selectedIntervs.map((interv) =>
              userIds.push(interv.interv_id),
            ),
          );

          setSchedule({
            ...data[0],
          } as unknown as TransformSchedule);
          setLoading(false);
        }
      }
    })();
  }, [router]);

  return (
    <>
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            {!loading && (
              <Breadcrum textName={schedule.schedule.schedule_name} />
            )}
          </>
        }
        slotBody={
          <BodyWithSidePanel
            slotLeft={
              <ScheduleDetailTabs
                slotDarkPills={viewScheduleTabs.map((item, i: number) => {
                  return (
                    <DarkPill
                      isActive={router.query.tab === item.tab}
                      key={i}
                      textPill={item.name}
                      onClickPill={{
                        onClick: () => {
                          router.replace(
                            `/scheduling/view?schedule_id=${router.query.schedule_id}&module_id=${router.query.module_id}&meeting_id=${router.query.meeting_id}&tab=${item.tab}`,
                          );
                        },
                      }}
                    />
                  );
                })}
                slotTabContent={
                  <ShowCode>
                    <ShowCode.When isTrue={router.query.tab === 'overview'}>
                      <Overview schedule={schedule} />
                    </ShowCode.When>
                    <ShowCode.When
                      isTrue={router.query.tab === 'candidate_details'}
                    >
                      <CandidateInfo
                        applications={schedule?.applications}
                        candidate={schedule?.candidates}
                        file={schedule?.file}
                      />
                    </ShowCode.When>
                    <ShowCode.When isTrue={router.query.tab === 'instructions'}>
                      <Instructions />
                    </ShowCode.When>
                    <ShowCode.When isTrue={router.query.tab === 'feedback'}>
                      <Feedback />
                    </ShowCode.When>
                  </ShowCode>
                }
              />
            }
            slotRight={<RightPanel schedule={schedule} />}
          />
        }
        slotTopbarRight={<></>}
      />
    </>
  );
}

export default SchedulingViewComp;

const viewScheduleTabs = [
  { name: 'Overview', tab: 'overview' },

  { name: 'Candidate Details', tab: 'candidate_details' },
  { name: 'Instructions', tab: 'instructions' },
  { name: 'Feedback', tab: 'feedback' },
];
