import { useRouter } from 'next/router';

import { useAuthDetails } from '../context/AuthContext/AuthContext';
import { Database } from '../types/schema';
import { pageRoutes } from '../utils/pageRouting';

const withRoleProtection = (
  WrappedComponent,
  allowedRoles: Database['public']['Enums']['recruiter_roles'][],
) => {
  return function RoleProtection(props) {
    const { recruiterUser } = useAuthDetails();
    const router = useRouter();

    if (!allowedRoles.includes(recruiterUser.role)) {
      // Redirect to login page or show an error
      router.push(pageRoutes.AGENT);
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withRoleProtection;
