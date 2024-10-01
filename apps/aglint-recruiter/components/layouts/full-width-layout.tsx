import React from 'react';

import {
  Layout,
  LayoutBody,
  LayoutContent,
  LayoutFilter,
  LayoutHeader,
  LayoutSidebar,
} from './layout';

interface FullWidthLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  filter?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function FullWidthLayout({
  children,
  header,
  filter,
  sidebar,
}: FullWidthLayoutProps) {
  return (
    <Layout>
      <LayoutBody>
        {sidebar && <LayoutSidebar>{sidebar}</LayoutSidebar>}
        <LayoutContent>
          {header && <LayoutHeader>{header}</LayoutHeader>}
          {filter && <LayoutFilter>{filter}</LayoutFilter>}
          {children}
        </LayoutContent>
      </LayoutBody>
    </Layout>
  );
}
