import type { ReactNode } from 'react';

import { CandidateSideDrawer } from '@/devlink/CandidateSideDrawer';
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
