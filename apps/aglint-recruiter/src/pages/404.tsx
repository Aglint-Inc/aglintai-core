import { Page404 } from '@/devlink/Page404';

import Seo from '../components/Common/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='Page Not Found - 404 | Aglint AI'
        description='AI for People Products'
      />
      <Page404 />
    </>
  );
}

// NotFoundPage.publicProvider = (page) => {
//   return <>{page}</>;
// };
