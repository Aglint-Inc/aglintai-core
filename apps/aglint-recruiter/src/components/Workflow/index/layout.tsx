import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@components/ui/breadcrumb';
import React from 'react';

import { WithPermission } from '../../withPermission';
import Create from './popup/create';

type LayoutProps = React.PropsWithChildren;
const Layout = (props: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='sticky top-0 z-10 bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex-1'>
            <BreadCrumbs />
          </div>
          <div>
            <Actions />
          </div>
        </div>
      </header>
      <main className='flex-grow container mx-auto px-4 py-8'>
        {props.children}
      </main>
    </div>
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
