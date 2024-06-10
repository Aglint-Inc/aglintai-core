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
import { Meta } from './meta';
import { Tabs } from './tabs';
import { TopBar } from './topBar';

type Props = {
  topBar: ReactNode;
  meta: ReactNode;
  details: ReactNode;
  tabs: ReactNode;
};

const Body = (props: Partial<Props>) => {
  const tab = useApplicationStore(({ tab }) => tab);
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
      slotTabContent={tab === 'Details' && (props.details ?? <Details />)}
    />
  );
};

Body.TopBar = TopBar;
Body.Meta = Meta;
Body.Tabs = Tabs;
Body.Details = Details;

export { Body };

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
