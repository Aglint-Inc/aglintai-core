import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { useWorkflow } from '@/src/context/Workflows/[id]';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeAll } from '@/src/utils/text/textUtils';

type LayoutProps = React.PropsWithChildren;
const Layout = (props: LayoutProps) => {
  return (
    <PageLayout slotTopbarLeft={<BreadCrumbs />} slotBody={props.children} />
  );
};

export default Layout;

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { workflow } = useWorkflow();
  return (
    <>
      <Breadcrum
        isLink
        onClickLink={{ onClick: () => push(ROUTES['/workflows']()) }}
        textName={'Workflows'}
      />
      <Breadcrum
        showArrow
        textName={workflow ? `${capitalizeAll(workflow.title)}` : '---'}
      />
    </>
  );
};
