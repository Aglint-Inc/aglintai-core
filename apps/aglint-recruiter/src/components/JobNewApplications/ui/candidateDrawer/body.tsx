import { Stack } from '@mui/material';
import type { ReactNode } from 'react';

import { CandidateSideDrawer } from '@/devlink/CandidateSideDrawer';
import { GeneralError } from '@/devlink/GeneralError';
import { ResumeNotFound } from '@/devlink/ResumeNotFound';
import { ResumeNotParsable } from '@/devlink/ResumeNotParsable';
import { ResumeErrorBlock } from '@/devlink2/ResumeErrorBlock';
import ResumeWait from '@/public/lottie/ResumeWait';
import { useApplication } from '@/src/context/ApplicationContext';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';

import { Details } from './details';
import { Interview } from './interview';
import { Meta } from './meta';
import { Tabs } from './tabs';
import { TopBar } from './topBar';

type Props = {
  topBar: ReactNode;
  meta: ReactNode;
  details: ReactNode;
  interview: ReactNode;
  tabs: ReactNode;
};

const Body = (props: Partial<Props>) => {
  const blocker = useBlocker();
  if (blocker)
    return (
      <CandidateSideDrawer
        slotTopBar={props.topBar ?? <TopBar />}
        slotBasicInfo={blocker}
        isTabs={false}
        slotNewTabPill={<></>}
        slotTabContent={<></>}
      />
    );
  return (
    <CandidateSideDrawer
      slotTopBar={props.topBar ?? <TopBar />}
      slotBasicInfo={props.meta ?? <Meta />}
      slotNewTabPill={props.tabs ?? <Tabs />}
      slotTabContent={
        <TabContent interview={props.interview} details={props.details} />
      }
    />
  );
};

Body.TopBar = TopBar;
Body.Meta = Meta;
Body.Tabs = Tabs;
Body.Details = Details;
Body.Interview = Interview;

export { Body };

const TabContent = (props: Partial<Pick<Props, 'details' | 'interview'>>) => {
  const tab = useApplicationStore(({ tab }) => tab);
  switch (tab) {
    case 'Details':
      return props.details ?? <Details />;
    case 'Screening':
    case 'Assessment':
    case 'Interview':
      return props.interview ?? <Interview />;
    case 'Tasks':
    case 'Activity':
      return <></>;
  }
};

const useBlocker = () => {
  const { details, meta } = useApplication();
  if (details.status === 'error' || meta.status === 'error')
    return (
      <Stack width={'700px'}>
        <GeneralError
          onClickRetry={{
            onClick: () => {
              details.refetch();
              meta.refetch();
            },
          }}
        />
      </Stack>
    );
  switch (meta?.data?.resume_processing_state) {
    case 'fetching':
      return <ResumeErrorBlock slotLottie={<ResumeWait />} />;
    case 'processing':
      return <ResumeErrorBlock slotLottie={<ResumeWait />} />;
    case 'unavailable':
      return <ResumeNotFound />;
    case 'unparsable':
      return <ResumeNotParsable />;
  }
  return undefined;
};
