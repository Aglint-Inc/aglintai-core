import { Avatar, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { NavBottom } from '@/devlink/NavBottom';
import { ResponsiveBanner } from '@/devlink2/ResponsiveBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useResizeWindow } from '@/src/context/ResizeWindow/ResizeWindow';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import NotFoundPage from '@/src/pages/404';
import { isEnvProd } from '@/src/utils/isEnvProd';
import PERMISSIONS from '@/src/utils/routing/permissions';
import ROUTES from '@/src/utils/routing/routes';

import Icon from '../Common/Icons/Icon';
import { useImrQuery } from '../Scheduling/Interviewers/InterviewerDetail/hooks';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children, appRouter = false }) {
  const { checkPermissions } = useRolesAndPermissions();
  const { handleLogout } = useAuthDetails();
  const { recruiter, recruiterUser } = useAuthDetails();
  const queryClient = useQueryClient();
  const router = useRouterPro();
  const { windowSize } = useResizeWindow();
  const logo = recruiter?.logo;

  const { data: userDetails } = useImrQuery({ user_id: recruiterUser.user_id });

  const handleSignOut = () => {
    queryClient.removeQueries();
    handleLogout();
  };

  if (isEnvProd() && windowSize?.innerWidth < 1000) {
    return <ResponsiveBanner />;
  }
  return (
    <Stack zIndex={2000} direction={'row'}>
      <Stack direction={'row'}>
        <Stack
          paddingTop={'12px !important'}
          borderRight={'1px solid'}
          borderColor='var(--neutral-3)'
          position={'relative'}
          width={'58px'}
          p={'12px 10px'}
        >
          <Stack
            width={'100%'}
            alignItems={'center'}
            height={'100%'}
            justifyContent={'space-between'}
          >
            <Stack
              height={'100%'}
              width={'100%'}
              spacing={'var(--space-2)'}
              alignItems={'center'}
            >
              <Stack direction={'row'} mb={'20px !important'}>
                <Avatar
                  src={logo}
                  variant='rounded'
                  sx={{
                    background: '#fff',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
                    },
                  }}
                >
                  <Icon
                    variant='CompanyOutlined'
                    height='100%'
                    width='100%'
                    color='#87929D'
                  />
                </Avatar>
              </Stack>
              <SideNavbar />
            </Stack>
            <NavBottom
              onClickProfile={{
                onClick: () =>
                  router.push(
                    ROUTES['/user/profile/[user_id]']({
                      user_id: recruiterUser?.user_id,
                    }) + '?profile=true',
                  ),
              }}
              onClickLogout={{
                onClick: () => {
                  handleSignOut();
                },
              }}
              slotProfile={
                <Avatar
                  src={userDetails?.profile_image}
                  variant='rounded'
                  sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiAvatar-img ': {
                      objectFit: 'cover',
                    },
                  }}
                />
              }
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack width={'100%'} height={'100vh'} overflow={'auto'}>
        {appRouter || checkPermissions(PERMISSIONS[String(router.pathName)]) ? (
          children
        ) : (
          <NotFoundPage />
        )}
      </Stack>
    </Stack>
  );
}
