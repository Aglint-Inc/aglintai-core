import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useKeyPress } from '@/hooks/useKeyPress';

import { type TabInterviewerDetail } from '.';
import UITab, { UITabWrapper } from '@/components/Common/UITab';

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
    {
      name: 'Aglint AI Instruction',
      queryParam: 'aglintaiinstruction',
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
      <UITabWrapper>
        {tabs.map((item, index) => (
          <UITab
            key={index}
            textLabel={item.name}
            isPillActive={tab === item.queryParam}
            onClickPill={() => {
              const currentQuery = { ...router.query };
              currentQuery.tab = item.queryParam;
              router.replace({
                pathname: router.pathname,
                query: currentQuery,
              });
            }}
          />
        ))}
      </UITabWrapper>
    </>
  );
}

export default Tabs;
