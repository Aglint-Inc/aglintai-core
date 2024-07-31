import React from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';

type LayoutProps = React.PropsWithChildren;
const Layout = (props: LayoutProps) => {
  return (
    <PageLayout
      slotTopbarLeft={<BreadCrumbs />}
      slotTopbarRight={<Actions />}
      slotBody={props.children}
    />
  );
};

export default Layout;

const BreadCrumbs = () => {
  return <Breadcrum textName={'Requests'} />;
};

const Actions = () => {
  return <></>;
};
