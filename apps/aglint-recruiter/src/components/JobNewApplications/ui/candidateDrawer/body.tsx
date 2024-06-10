import { Stack } from '@mui/material';
import type { ReactNode } from 'react';

import { CandidateSideDrawer } from '@/devlink/CandidateSideDrawer';
import { GeneralError } from '@/devlink/GeneralError';
import Loader from '@/src/components/Common/Loader';
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
  const {
    application: { status, refetch },
  } = useApplication();
  const tab = useApplicationStore(({ tab }) => tab);
  if (status === 'error')
    return (
      <Stack width={'700px'} height={'100%'}>
        <GeneralError onClickRetry={{ onClick: () => refetch() }} />
      </Stack>
    );
  if (status === 'pending')
    return (
      <Stack width={'700px'} height={'100%'}>
        <Loader />
      </Stack>
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
