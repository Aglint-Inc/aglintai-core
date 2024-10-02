'use client';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  Section,
  SectionDescription,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { type PropsWithChildren } from 'react';

import VerticalNav from './_common/components/SideNav';
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <OneColumnPageLayout
      sidebar={
        <Section>
          <SectionHeaderText>
            <SectionTitle>Settings</SectionTitle>
            <SectionDescription>
              Manage your company settings and preferences.
            </SectionDescription>
          </SectionHeaderText>
          <VerticalNav />
        </Section>
      }
      sidebarPosition='left'
      sidebarWidth={280}
    >
      {children}
    </OneColumnPageLayout>
  );
};

export default Layout;
