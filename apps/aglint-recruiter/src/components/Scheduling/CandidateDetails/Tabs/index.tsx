import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useKeyPress } from '@/src/hooks/useKeyPress';
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

  let sections: string[] = ['interview_plan', 'candidate_detail'];
  if (isFeedbackVisible) {
    sections.push('feedback');
  }
  // sections.push('candidate_feedback'); //enable when candidate feedback enable
  const tabCount: number = sections.length - 1;
  const currentTab: string = (router.query.tab || 'interview_plan') as string;
  const currentIndex: number = sections.indexOf(currentTab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    router.replace(
      ROUTES['/scheduling/application/[application_id]']({
        application_id: router.query.application_id as string,
      }) + `?tab=${pre}`,
      undefined,
      {
        shallow: true,
      },
    );
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.replace(
      ROUTES['/scheduling/application/[application_id]']({
        application_id: router.query.application_id as string,
      }) + `?tab=${next}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

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
