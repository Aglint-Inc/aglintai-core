import { Page404 } from '@/devlink';

import Seo from '../components/Common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='Page not found'
        description='AI for People Products'
      />
      <Page404 />
    </>
  );
}

// NotFoundPage.publicProvider = (page) => {
//   return <>{page}</>;
// };
