import { useRouter } from 'next/router';

import { NewTabPill } from '@/devlink3/NewTabPill';
import ROUTES from '@/src/utils/routing/routes';

import { useSchedulingApplicationStore } from '../store';

function TabsSchedulingApplication() {
  const router = useRouter();
  const initialSessions = useSchedulingApplicationStore(
    (state) => state.initialSessions,
  );

  const tab = router.query.tab as string;

  const isFeedbackVisible = initialSessions.some(
    (ses) => ses?.interview_meeting?.status === 'completed',
  );

  return (
    <>
      <NewTabPill
        textLabel={'Interview Plan'}
        isPillActive={tab === 'interview_plan' || !tab}
        onClickPill={{
          onClick: () => {
            router.replace(
              ROUTES['/scheduling/application/[application_id]']({
                application_id: router.query.application_id as string,
              }) + '?tab=interview_plan',
              undefined,
              {
                shallow: true,
              },
            );
          },
        }}
      />
      <NewTabPill
        textLabel={'Candidate Detail'}
        isPillActive={tab === 'candidate_detail'}
        onClickPill={{
          onClick: () => {
            router.replace(
              ROUTES['/scheduling/application/[application_id]']({
                application_id: router.query.application_id as string,
              }) + '?tab=candidate_detail',
              undefined,
              {
                shallow: true,
              },
            );
          },
        }}
      />
      {isFeedbackVisible && (
        <>
          <NewTabPill
            textLabel={'Feedback'}
            isPillActive={tab === 'feedback'}
            onClickPill={{
              onClick: () => {
                router.replace(
                  ROUTES['/scheduling/application/[application_id]']({
                    application_id: router.query.application_id as string,
                  }) + '?tab=feedback',
                  undefined,
                  {
                    shallow: true,
                  },
                );
              },
            }}
          />
          {/* <NewTabPill
            textLabel={'Candidate Feedback'}
            isPillActive={tab === 'candidate_feedback'}
            onClickPill={{
              onClick: () => {
                router.replace(
                  ROUTES['/scheduling/application/[application_id]']({
                    application_id: router.query.application_id as string,
                  }) + '?tab=candidate_feedback',
                  undefined,
                  {
                    shallow: true,
                  },
                );
              },
            }}
          /> */}
        </>
      )}
    </>
  );
}

export default TabsSchedulingApplication;
