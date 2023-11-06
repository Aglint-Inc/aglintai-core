//import ResizeWindowContext from '@context/resizeWindow/context';
import { Avatar, Drawer, LinearProgress, Stack } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { LottieComponentProps } from 'lottie-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import { NavProfileBlock, RecSideNavProfileBlock } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ResizeWindowContext from '@/src/context/ResizeWindow/context';

import MenuLottie from './MenuLottie';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children }) {
  const lottieRef = useRef<LottieComponentProps>(null);
  const { handleLogout } = useAuthDetails();
  const { recruiter, recruiterUser } = useAuthDetails();
  const router = useRouter();
  const { windowSize } = useContext(ResizeWindowContext);
  const [expand, setExpand] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const companyName = recruiter?.name;
  const logo = recruiter?.logo;
  const profileName = `${recruiterUser?.first_name} ${recruiterUser?.last_name}`;
  const profileImage = recruiterUser?.profile_image;

  useEffect(() => {
    if (windowSize.innerWidth > 991) {
      if (
        router.pathname === pageRoutes.JOBS ||
        router.pathname === pageRoutes.COMPANY ||
        router.pathname === pageRoutes.CANDIDATES ||
        router.pathname === pageRoutes.NOTIFICATIONS ||
        router.pathname === pageRoutes.SETTINGS ||
        router.pathname === pageRoutes.PROFILE
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
    if (windowSize.innerWidth < 991) {
      const status = router.query.status;
      if (status) {
        setExpand(false);
      }
      if (
        router.pathname === pageRoutes.CANDIDATES ||
        router.pathname === pageRoutes.NOTIFICATIONS ||
        router.pathname === pageRoutes.COMPANY
      ) {
        setExpand(false);
      }
      setTimeout(() => {
        setLoadingProgress(false);
      }, 1000);
    }
  }, [router]);
  // console.log(router, pageRoutes.JOBS);
  return (
    <Stack zIndex={2000} direction={'row'}>
      <Stack
        display={windowSize?.innerWidth < 991 ? 'none' : 'flex'}
        direction={'row'}
      >
        <Stack
          sx={{
            transition: 'width 0.4s, border 0.6s',
          }}
          borderRight={'1px solid'}
          borderColor={'grey.200'}
          position={'relative'}
          p={'28px 20px 12px 16px'}
          bgcolor={'#25282A'}
          width={'260px'}
        >
          <Stack height={'calc(100vh - 44px)'}>
            <RecSideNavProfileBlock
              companyName={`${companyName}`}
              onclickCompany={{
                onClick: () => router.push(pageRoutes.COMPANY),
              }}
              slotCompanyLogo={
                <Avatar
                  src={logo}
                  variant='rounded'
                  sx={{
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
                    },
                  }}
                />
              }
            />
            <Stack height={'100%'} justifyContent={'space-between'} pt={'26px'}>
              <Stack spacing={'10px'}>
                <SideNavbar />
              </Stack>
            </Stack>
            <NavProfileBlock
              onclickProfile={{
                onClick: () => router.push(pageRoutes.PROFILE),
              }}
              onclickLogout={{
                onClick: () => {
                  handleLogout();
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
                    background: '#fff',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
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
                borderRadius: '5px',
                backgroundColor: '#3d1100',
                '& span': {
                  backgroundColor: 'orange.500',
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
              <RecSideNavProfileBlock
                companyName={companyName}
                onclickCompany={{
                  onClick: () => router.push(pageRoutes.COMPANY),
                }}
                slotCompanyLogo={
                  <Avatar
                    src={logo}
                    variant='rounded'
                    sx={{
                      width: '100%',
                      height: '100%',
                      background: '#fff',
                      '& .MuiAvatar-img ': {
                        objectFit: 'contain',
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
                  border: 'none !important',
                  bgcolor: '#25282a !important',
                  width: '100%',
                  padding: '0 30px 10px 30px',
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
                <Stack spacing={'10px'}>
                  <SideNavbar />
                </Stack>
              </Stack>
              <NavProfileBlock
                onclickProfile={{
                  onClick: () => router.push(pageRoutes.PROFILE),
                }}
                onclickLogout={{
                  onClick: () => {
                    handleLogout();
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
                      background: '#fff',
                      '& .MuiAvatar-img ': {
                        objectFit: 'contain',
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
      </Stack>
    </Stack>
  );
}
