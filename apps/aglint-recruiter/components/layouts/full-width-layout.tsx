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
  sidebarPosition?: 'left' | 'none';
  sidebarWidth?: number;
}

export function FullWidthLayout({
  children,
  header,
  filter,
  sidebar,
  sidebarPosition = 'none',
  sidebarWidth = 360,
}: FullWidthLayoutProps) {
  return (
    <Layout>
      <LayoutBody sidebarPosition={sidebarPosition}>
        {sidebar && (
          <LayoutSidebar width={sidebarWidth}>{sidebar}</LayoutSidebar>
        )}
        <LayoutContent>
          {header && <LayoutHeader>{header}</LayoutHeader>}
          {filter && <LayoutFilter>{filter}</LayoutFilter>}
          {children}
        </LayoutContent>
      </LayoutBody>
    </Layout>
  );
}
