//import ResizeWindowContext from '@context/resizeWindow/context';
import { Avatar, Drawer, LinearProgress, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { LottieComponentProps } from 'lottie-react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { NavBottom } from '@/devlink/NavBottom';
import { CompanyProfileHeader } from '@/devlink2/CompanyProfileHeader';
import { NavProfileBlock } from '@/devlink2/NavProfileBlock';
import { ResponsiveBanner } from '@/devlink2/ResponsiveBanner';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useResizeWindow } from '@/src/context/ResizeWindow/ResizeWindow';
import { isEnvProd } from '@/src/utils/isEnvProd';
import ROUTES from '@/src/utils/routing/routes';

import Icon from '../Common/Icons/Icon';
import MenuLottie from '../Common/Lotties/MenuLottie';
import CompanyList from './CompanyList';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children }) {
  const lottieRef = useRef<LottieComponentProps>(null);
  const { handleLogout } = useAuthDetails();
  const { recruiter, recruiterUser, userDetails } = useAuthDetails();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { windowSize } = useResizeWindow();
  const [expand, setExpand] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const companyName = recruiter?.name;
  const logo = recruiter?.logo;
  const profileName = `${recruiterUser?.first_name} ${recruiterUser?.last_name}`;
  const profileImage = recruiterUser?.profile_image;

  const handleSignOut = () => {
    queryClient.removeQueries();
    handleLogout();
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && windowSize.innerWidth > 991) {
      if (
        router.pathname === ROUTES['/jobs']() ||
        router.pathname === ROUTES['/company']() ||
        router.pathname === ROUTES['/candidates/history']() ||
        router.pathname === ROUTES['/notifications']() ||
        router.pathname === ROUTES['/profile']()
      ) {
        setExpand(true);
      } else {
        setExpand(false);
      }
    } else {
      setExpand(false);
    }
  }, []);

  useEffect(() => {
    if (windowSize?.innerWidth < 991) {
      const status = router.query.status;
      if (status) {
        setExpand(false);
      }
      if (
        router.pathname === ROUTES['/candidates/history']() ||
        router.pathname === ROUTES['/notifications']() ||
        router.pathname === ROUTES['/company']()
      ) {
        setExpand(false);
      }
      setTimeout(() => {
        setLoadingProgress(false);
      }, 1000);
    }
  }, [router]);
  if (isEnvProd() && windowSize?.innerWidth < 1000) {
    return <ResponsiveBanner />;
  }
  return (
    <Stack zIndex={2000} direction={'row'}>
      <Stack
        display={windowSize?.innerWidth < 991 ? 'none' : 'flex'}
        direction={'row'}
      >
        <Stack
          paddingTop={'12px !important'}
          borderRight={'1px solid'}
          borderColor='var(--neutral-6)'
          position={'relative'}
          // p={'28px 20px 12px 16px'}
          // pt={'28px'}
          // bgcolor={'#25282A'}
          width={'68px'}
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
              {userDetails?.user.user_metadata.role?.toLowerCase() ===
              'company' ? (
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
              ) : (
                <Stack direction={'row'} mb={'20px !important'}>
                  <CompanyList />
                </Stack>
              )}
              <SideNavbar />
            </Stack>
            <NavBottom
              onClickProfile={{
                onClick: () => router.push(ROUTES['/profile']()),
              }}
              onClickLogout={{
                onClick: () => {
                  handleSignOut();
                },
              }}
              slotProfile={
                <Avatar
                  src={profileImage}
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
        {/* ========================================  mobile navebar ======================================== */}
        <Stack display={windowSize?.innerWidth < 991 ? 'block' : 'none'}>
          <Stack
            zIndex={2000}
            width={'100vw'}
            position={'absolute'}
            top={0}
            left={0}
            sx={{
              transition: 'opacity 0.2s',
              opacity: loadingProgress ? 1 : 0,
            }}
          >
            <LinearProgress
              sx={{
                height: '1px',
                borderRadius: 'var(--radius-2)',
                backgroundColor: '#3d1100',
                '& span': {
                  backgroundColor: 'var(--accent-4)',
                },
              }}
            />
          </Stack>
          <Stack width={'100%'} minHeight={'66px'} />
          <Stack
            position={'fixed'}
            top={-1}
            right={0}
            zIndex={6}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'100%'}
            direction={'row'}
            bgcolor={'#25282a'}
            justifyContent={'right'}
          />
          <Stack
            position={'fixed'}
            top={-1}
            left={0}
            zIndex={9}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'100%'}
            direction={'row'}
            justifyContent={'left'}
          >
            <Stack
              onClick={() => {
                setExpand((pre) => !pre);
              }}
              width={'130px'}
              position={'absolute'}
              top={'-33px'}
              left={'-44px'}
            >
              <MenuLottie lottieRef={lottieRef} isStop={expand} />
            </Stack>
            <Stack
              width={'calc(100% - 80px)'}
              position={'absolute'}
              top={'17px'}
              left={'60px'}
            >
              <CompanyProfileHeader
                onclickCompany={{
                  onClick: () => router.push(ROUTES['/company']()),
                }}
                companyName={companyName}
                slotLogo={
                  <Avatar
                    src={logo}
                    variant='rounded'
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: '#fff',
                      '& .MuiAvatar-img ': {
                        objectFit: 'cover',
                      },
                    }}
                  />
                }
              />
            </Stack>
          </Stack>
          <Stack width={'100vw'}>
            <Drawer
              sx={{
                '& .MuiDrawer-paper': {
                  width: '100%',
                  padding: '0 var(--space-5) var(--space-2) var(--space-5)',
                },
                zIndex: 8,
              }}
              transitionDuration={400}
              anchor={'left'}
              onClose={() => setExpand(false)}
              open={windowSize?.innerWidth < 991 && expand}
              variant='persistent'
            >
              <Stack
                height={'100%'}
                justifyContent={'space-between'}
                pt={'88px'}
              >
                <Stack spacing={'var(--space-2)'}>
                  <SideNavbar />
                </Stack>
              </Stack>
              <NavProfileBlock
                onclickProfile={{
                  onClick: () => router.push(ROUTES['/profile']()),
                }}
                onclickLogout={{
                  onClick: () => {
                    handleSignOut();
                  },
                }}
                profileName={profileName}
                slotProfileImage={
                  <Avatar
                    src={profileImage}
                    variant='rounded'
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: '#1f1f1f',
                      '& .MuiAvatar-img ': {
                        objectFit: 'cover',
                      },
                    }}
                  />
                }
              />
            </Drawer>
            <Stack
              zIndex={7}
              position={'fixed'}
              top={0}
              left={0}
              height={'100vh'}
              bgcolor={'#00000088'}
              width={'100vw'}
              sx={{
                pointerEvents: !expand && 'none',
                opacity: expand ? 1 : 0,
                transition: 'opacity 0.4s',
              }}
              onClick={() => setExpand(false)}
            ></Stack>
          </Stack>
        </Stack>
        {children}
        {/* {checkPermissions(PERMISSIONS[String(router.pathname)]) ? (
          children
        ) : (
          <NotFoundPage />
        )} */}
      </Stack>
    </Stack>
  );
}
