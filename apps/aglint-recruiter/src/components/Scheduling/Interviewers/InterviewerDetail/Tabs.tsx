import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { NewTabPill } from '@/devlink3/NewTabPill';
import { useKeyPress } from '@/src/hooks/useKeyPress';

import { TabInterviewerDetail } from '.';

function Tabs() {
  const router = useRouter();
  const tabs: { name: string; queryParam: string }[] = [
    {
      name: 'Overview',
      queryParam: 'overview',
    },
    {
      name: 'Qualified',
      queryParam: 'qualified',
    },
    {
      name: 'Training',
      queryParam: 'training',
    },
    {
      name: 'Calendar',
      queryParam: 'calendar',
    },
    {
      name: 'Availability',
      queryParam: 'availibility',
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
    const currentQuery = { ...router.query };
    currentQuery.tab = pre;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    const currentQuery = { ...router.query };
    currentQuery.tab = next;
    router.replace({
      pathname: router.pathname,
      query: currentQuery,
    });
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
              const currentQuery = { ...router.query };
              currentQuery.tab = item.queryParam;
              router.replace({
                pathname: router.pathname,
                query: currentQuery,
              });
            },
          }}
        />,
      ])}
    </>
  );
}

export default Tabs;
