import { useRouter } from 'next/router';

import JobSubNavbar from './JobSubNavBar';

function SubNavBar() {
  const router = useRouter();
  return router.pathname === '/jobs' && !router.query.id && <JobSubNavbar />;
}

export default SubNavBar;

