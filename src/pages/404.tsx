import { Page404 } from '@/devlink';

import Seo from '../components/Common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='Page not found'
        description='AI Powered Talent Development Platform.'
      />
      <Page404 />
    </>
  );
}

// NotFoundPage.publicProvider = (page) => {
//   return <>{page}</>;
// };
