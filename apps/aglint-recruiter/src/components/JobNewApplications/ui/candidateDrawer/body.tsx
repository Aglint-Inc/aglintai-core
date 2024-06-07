import { ReactNode } from 'react';

import { CandidateSideDrawer } from '@/devlink/CandidateSideDrawer';
import { useApplicationStore } from '@/src/context/ApplicationContext/store';

import { Details } from './details';
import { Meta } from './meta';
import { Tabs } from './tabs';
import { TopBar } from './topBar';

type Props = {
  topBar: ReactNode;
  meta: ReactNode;
  tabs?: ReactNode;
  content?: ReactNode;
};

const Body = (props: Props) => {
  return (
    <CandidateSideDrawer
      slotTopBar={props.topBar ?? <></>}
      slotBasicInfo={props.meta ?? <></>}
      slotNewTabPill={props.tabs ?? <></>}
      slotTabContent={props.content ?? <></>}
    />
  );
};

const Content = () => {
  const tab = useApplicationStore(({ tab }) => tab);
  switch (tab) {
    case 'Details':
      return <Details />;
    case 'Screening':
    case 'Assessment':
    case 'Interview':
    case 'Tasks':
    case 'Activity':
      return <></>;
  }
};

Body.TopBar = TopBar;
Body.Meta = Meta;
Body.Tabs = Tabs;
Body.Content = Content;

export { Body };
