import { useRouter } from 'next/router';

import { Breadcrum, PageLayout } from '@/devlink2';
import { DarkPill, ScheduleDetailTabs } from '@/devlink3';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import CandidateInfo from './CandidateDetails';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
// import Feedback from './Feedback';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';

function SchedulingViewComp() {
  const router = useRouter();
  const { data: schedule, isLoading } = useScheduleDetails();

  const viewScheduleTabs = [
    { name: 'Candidate Details', tab: 'candidate_details', hide: false },
    { name: 'Job Details', tab: 'job_details', hide: false },
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
            <ScheduleDetailTabs
              slotScheduleTabOverview={<Overview schedule={schedule} />}
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
                    <Instructions schedule={schedule} />
                  </ShowCode.When>
                  <ShowCode.When isTrue={router.query.tab === 'feedback'}>
                    <FeedbackWindow
                      multiSession={false}
                      interview_sessions={[
                        {
                          id: schedule?.interview_session.id,
                          title: schedule?.interview_session.name,
                          created_at: schedule?.interview_session.created_at,
                        },
                      ]}
                    />
                  </ShowCode.When>
                  <ShowCode.When isTrue={router.query.tab === 'job_details'}>
                    <JobDetails schedule={schedule} />
                  </ShowCode.When>
                </ShowCode>
              }
            />
          }
        />
      </ShowCode.Else>
    </ShowCode>
  );
}

export default SchedulingViewComp;
