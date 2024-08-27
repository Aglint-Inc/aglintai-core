import React from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';

import { WithPermission } from '../../withPermission';
import Create from './popup/create';

type LayoutProps = React.PropsWithChildren;
const Layout = (props: LayoutProps) => {
  return (
    <PageLayout
    isHeaderDividerVisible={false}
      slotTopbarLeft={<BreadCrumbs />}
      slotTopbarRight={<Actions />}
      slotBody={props.children}
    />
  );
};

export default Layout;

const BreadCrumbs = () => {
  return <Breadcrum textName={'Workflows'} />;
};

const Actions = () => {
  return (
    <WithPermission permission={['manage_workflow']}>
      <Create />
    </WithPermission>
  );
};
