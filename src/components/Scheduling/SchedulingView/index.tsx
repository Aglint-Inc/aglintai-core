import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import { BodyWithSidePanel, DarkPill, ScheduleDetailTabs } from '@/devlink3';
import { supabase } from '@/src/utils/supabase/client';

import CandidateInfo from './CandidateDetails';
import Feedback from './Feedback';
import Instructions from './Instructions';
import Overview from './Overview';
import RightPanel from './RightPanel';
import { TransformSchedule } from '../Modules/types';
import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';

function SchedulingViewComp() {
  const router = useRouter();
  const { data: schedule, isLoading } = useScheduleDetails();

  const viewScheduleTabs = [
    { name: 'Overview', tab: 'overview', hide: false },

    { name: 'Candidate Details', tab: 'candidate_details', hide: false },
    { name: 'Instructions', tab: 'instructions', hide: false },
    {
      name: 'Feedback',
      tab: 'feedback',
      hide: false,
    },
  ];
  return (
    <ShowCode>
      <ShowCode.When isTrue={isLoading}>
        <Loader />
      </ShowCode.When>
      <ShowCode.Else>
        <PageLayout
          onClickBack={{
            onClick: () => {
              window.history.back();
            },
          }}
          isBackButton={true}
          slotTopbarLeft={
            <>
              <Breadcrum textName={schedule?.schedule.schedule_name} />
            </>
          }
          slotBody={
            <BodyWithSidePanel
              slotLeft={
                <ScheduleDetailTabs
                  slotDarkPills={viewScheduleTabs
                    .filter((item) => !item.hide)
                    .map((item, i: number) => {
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
                      <ShowCode.When
                        isTrue={router.query.tab === 'instructions'}
                      >
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
      </ShowCode.Else>
    </ShowCode>
  );
}

export default SchedulingViewComp;

export const useScheduleDetails = () => {
  const router = useRouter();

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['schedule_details'],
    queryFn: () => getSchedule(router?.query?.meeting_id as string),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['schedule_details'] });
  return { ...query, refetch };
};

async function getSchedule(meeting_id: string) {
  const { data, error } = await supabase.rpc(
    'get_interview_schedule_by_meeting_id',
    {
      target_meeting_id: meeting_id as string,
    },
  );
  if (data.length > 0) {
    const userIds = [];
    const filteredData = (data as unknown as TransformSchedule[])[0];
    filteredData.schedule.confirmed_option?.plans.map((plan) =>
      plan.selectedIntervs.map((interv) => userIds.push(interv.interv_id)),
    );
    if (error) throw Error(error.message);
    else return data[0] as unknown as TransformSchedule;
  }
}

export const useModuleDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['module_details'],
    queryFn: () => getModule(router?.query?.module_id as string),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['module_details'] });
  return { ...query, refetch };
};

async function getModule(module_id: string) {
  const { data, error } = await supabase
    .from('interview_module')
    .select()
    .eq('id', module_id)
    .single();
  if (!error) {
    return data;
  }
  if (error) throw Error(error.message);
}
