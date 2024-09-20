import { NotFound } from '@/components/Common/404';

import Seo from '../components/Common/Seo';

export default function PageNotFound() {
  return (
    <>
      <Seo
        title='Page Not Found - 404 | Aglint AI'
        description='AI for People Products'
      />
      <NotFound />
    </>
  );
}
