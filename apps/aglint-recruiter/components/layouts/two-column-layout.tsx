import React from 'react';

import {
  Layout,
  LayoutBody,
  LayoutContent,
  LayoutHeader,
  LayoutSidebar,
} from './layout';

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  filter?: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: string | number;
}

export function TwoColumnLayout({
  children,
  header,
  filter,
  sidebar,
  sidebarPosition = 'left',
  sidebarWidth = '16rem',
}: TwoColumnLayoutProps) {
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
