import { DB } from '@aglint/shared-types';
import { useRouter } from 'next/router';

import { useAuthDetails } from '../context/AuthContext/AuthContext';
import { pageRoutes } from '../utils/pageRouting';
import toast from '../utils/toast';

const withRoleProtection = (
  WrappedComponent,
  allowedRoles: DB['public']['Enums']['user_roles'][],
) => {
  return function RoleProtection(props) {
    const { recruiterUser } = useAuthDetails();
    const router = useRouter();

    if (recruiterUser)
      if (!allowedRoles.includes(recruiterUser.role)) {
        // Redirect to login page or show an error
        switch (recruiterUser.role) {
          case 'interviewer': {
            router.push(pageRoutes.SCHEDULING);
            toast.warning('You are not authorized to access this page.');
            return null;
          }
          default: {
            router.push(pageRoutes.AGENT);
            toast.warning('You are not authorized to access this page.');
            return null;
          }
        }
      }
    return <WrappedComponent {...props} />;
  };
};

export default withRoleProtection;
