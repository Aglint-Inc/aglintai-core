import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import { TabInterviewerDetail } from '.';

function Tabs() {
  const router = useRouter();
  const user_id = router.query.member_id as string;
  const tabs: { name: string; queryParam: string }[] = [
    {
      name: 'Overview',
      queryParam: 'overview',
    },
    {
      name: 'Interview Types',
      queryParam: 'interviewtypes',
    },
    {
      name: 'Schedules',
      queryParam: 'allschedules',
    },
    {
      name: 'Availability',
      queryParam: 'availibility',
    },
    {
      name: 'Keywords',
      queryParam: 'keywords',
    },
  ];

  const tab = (router.query.tab || 'overview') as TabInterviewerDetail;

  const sections = tabs.map((item) => item.queryParam);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(tab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    router.push(`/scheduling/interviewer/${user_id}?tab=${pre}`);
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.push(`/scheduling/interviewer/${user_id}?tab=${next}`);
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  return (
    <>
      {tabs.map((item, i) => [
        <NewTabPill
          key={i}
          textLabel={item.name}
          isPillActive={tab === item.queryParam}
          onClickPill={{
            onClick: () => {
              router.push(
                `/scheduling/interviewer/${user_id}?tab=${item.queryParam}`,
              );
            },
          }}
        />,
      ])}
    </>
  );
}

export default Tabs;
