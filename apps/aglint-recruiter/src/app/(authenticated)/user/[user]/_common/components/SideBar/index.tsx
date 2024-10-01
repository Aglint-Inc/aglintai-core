import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import UITabs from '@/components/Common/UITabs';

import { type sectionKeys } from '../../hooks/useScrollnavigation';

export const SideBar = ({
  scrollToSection,
  activeSection,
}: {
  // eslint-disable-next-line no-unused-vars
  scrollToSection: (sectionKey: sectionKeys) => void;
  activeSection: string;
}) => {
  const tabs = [
    { icon: 'CircleUserRound', name: 'Overview', id: 'overview' },
    { icon: 'CircleCheck', name: 'Qualifications', id: 'qualifications' },
    {
      icon: 'Calendar',
      name: 'Upcoming Interviews',
      id: 'upcomingInterviews',
    },
    { icon: 'Briefcase', name: 'Recent Interviews', id: 'recentInterviews' },
    {
      icon: 'MessageSquare',
      name: 'Interview Feedback',
      id: 'interviewFeedback',
    },
    { icon: 'Projector', name: 'Meeting Overview', id: 'meetingOverview' },
    {
      icon: 'Coffee',
      name: 'Schedule Availability',
      id: 'scheduleAvailabilityRef',
    },
    { icon: 'Calendar', name: 'Calendar', id: 'calendar' },
  ];

  const [inputValue, setInputValue] = useState(activeSection);

  const debouncedChangeHandler = useCallback(
    debounce(
      (value) => {
        setInputValue(value);
      },
      500,
      { leading: false, trailing: true },
    ),
    [],
  );

  useEffect(() => {
    debouncedChangeHandler(activeSection);
  }, [activeSection, inputValue]);

  return (
    <nav className='w-[250px]'>
      <UITabs
        tabs={tabs}
        vertical
        defaultValue={inputValue || tabs[0].id}
        onClick={(value) => {
          scrollToSection(value as sectionKeys);
        }}
      />
    </nav>
  );
};
