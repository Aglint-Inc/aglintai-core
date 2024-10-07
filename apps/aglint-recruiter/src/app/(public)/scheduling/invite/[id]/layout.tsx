import { PublicPageLayout } from '@components/layouts/public-layout';
import { type PropsWithChildren } from 'react';

import Footer from '@/common/Footer';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <PublicPageLayout footer={<Footer brand={true} />}>
      {children}
    </PublicPageLayout>
  );
};

export default Layout;
