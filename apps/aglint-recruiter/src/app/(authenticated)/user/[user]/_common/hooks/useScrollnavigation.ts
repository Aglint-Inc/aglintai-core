import { useEffect, useRef, useState } from 'react';

export type sectionKeys =
  | 'overview'
  | 'qualifications'
  | 'performance'
  | 'availability'
  | 'pendingActions'
  | 'recentActivity'
  | 'upcomingInterviews'
  | 'recentInterviews'
  | 'interviewFeedback'
  | 'scheduleAvailabilityRef'
  | 'meetingOverview'
  | 'calendar';

export const useScrollNavigation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    qualifications: useRef<HTMLDivElement>(null),
    performance: useRef<HTMLDivElement>(null),
    availability: useRef<HTMLDivElement>(null),
    pendingActions: useRef<HTMLDivElement>(null),
    recentActivity: useRef<HTMLDivElement>(null),
    upcomingInterviews: useRef<HTMLDivElement>(null),
    recentInterviews: useRef<HTMLDivElement>(null),
    interviewFeedback: useRef<HTMLDivElement>(null),
    scheduleAvailabilityRef: useRef<HTMLDivElement>(null),
    meetingOverview: useRef<HTMLDivElement>(null),
    calendar: useRef<HTMLDivElement>(null),
  };

  const handleScroll = () => {
    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (
        ref.current &&
        ref.current.getBoundingClientRect().top < 90 &&
        ref.current.getBoundingClientRect().top > 0
      ) {
        setActiveSection(key);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionKey: sectionKeys) => {
    const section = sectionRefs[sectionKey].current;

    if (section) {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: sectionTop - 80, behavior: 'smooth' });
    }
  };

  return { activeSection, scrollToSection, sectionRefs };
};
