import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@components/ui/breadcrumb';
import { PageLayout } from '@devlink2/PageLayout';
import React from 'react';

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
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Workflows</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const Actions = () => {
  return (
    <WithPermission permission={['manage_workflow']}>
      <Create />
    </WithPermission>
  );
};
