import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useKeyPress } from '@/hooks/useKeyPress';
import ROUTES from '@/utils/routing/routes';

import { type interviewersTab } from './types';

function InterviewersTabs() {
  const router = useRouter();
  const tab = (router.query.tab as interviewersTab) || 'interview_load';

  const tabs: interviewersTab[] = [
    'interview_load',
    'availability',
    'training',
    'metrics',
  ];

  const setTabHandle = (tab: interviewersTab) => {
    router.replace(`${ROUTES['/interviewers']()}?tab=${tab}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (router.isReady && !router.query.tab) {
      setTabHandle('interview_load');
    }
  }, [router]);

  const handleSelectNextSection = () => {
    const currentIndex = tabs.findIndex((t) => t === tab);
    setTabHandle(
      currentIndex === tabs.length - 1 ? tabs[0] : tabs[currentIndex + 1],
    );
  };

  const handleSelectPrevSection = () => {
    const currentIndex = tabs.findIndex((t) => t === tab);
    setTabHandle(
      currentIndex === 0 ? tabs[tabs.length - 1] : tabs[currentIndex - 1],
    );
  };
  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handleSelectPrevSection();
    else if (right) handleSelectNextSection();
  }, [left, right]);

  return (
    <Stack>
      <Tabs value={tab} onValueChange={setTabHandle}>
        <TabsList>
          <TabsTrigger value='interview_load'>Interview Load</TabsTrigger>
          <TabsTrigger value='availability'>Availability</TabsTrigger>
          <TabsTrigger value='training'>Training</TabsTrigger>
          <TabsTrigger value='metrics'>Metrics</TabsTrigger>
        </TabsList>
      </Tabs>
    </Stack>
  );
}

export default InterviewersTabs;
