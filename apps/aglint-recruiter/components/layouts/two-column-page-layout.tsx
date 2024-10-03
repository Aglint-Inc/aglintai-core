import React from 'react';

import {
  Layout,
  LayoutBody,
  LayoutContent,
  LayoutHeader,
  LayoutSidebar,
} from './layout';

interface TwoColumnPageLProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  filter?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: string | number;
}

export function TwoColumnPageLayout({
  children,
  header,
  filter,
  sidebar,
  sidebarPosition = 'left',
  sidebarWidth = '16rem',
}: TwoColumnPageLProps) {
  return (
    <Layout>
      <LayoutBody sidebarPosition={sidebarPosition}>
        {sidebarPosition === 'left' && sidebar && (
          <LayoutSidebar width={sidebarWidth}>{sidebar}</LayoutSidebar>
        )}
        <LayoutContent>
          {header && <LayoutHeader>{header}</LayoutHeader>}
          {filter && <LayoutHeader>{filter}</LayoutHeader>}
          {children}
        </LayoutContent>
        {sidebarPosition === 'right' && sidebar && (
          <LayoutSidebar width={sidebarWidth}>{sidebar}</LayoutSidebar>
        )}
      </LayoutBody>
    </Layout>
  );
}
