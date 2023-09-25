import { Page404 } from '@/devlink';

import Seo from '../components/Common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='Page not found'
        description='AI Powered Talent Development Platform.'
      />
      404
      <Page404 />
    </>
  );
}

// NotFoundPage.getLayout = (page) => {
//   return <>{page}</>;
// };
