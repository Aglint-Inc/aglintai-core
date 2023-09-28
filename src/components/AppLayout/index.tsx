//import ResizeWindowContext from '@context/resizeWindow/context';
import { Avatar, Drawer, LinearProgress, Stack } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { LottieComponentProps } from 'lottie-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import {
  AglintRecruiterLogo,
  AppLogo,
  NavMenuBottom,
  NotificationAndProfile,
  SettingsAndLogout,
  SideNavMenu,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ResizeWindowContext from '@/src/context/ResizeWindow/context';

import MenuLottie from './MenuLottie';
import { MobileJobNavBar } from './utils';

export default function AppLayout({ children }) {
  const lottieRef = useRef<LottieComponentProps>(null);
  const { handleLogout } = useAuthDetails();
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { windowSize } = useContext(ResizeWindowContext);
  const [expand, setExpand] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);

  useEffect(() => {
    if (windowSize.innerWidth > 991) {
      if (
        router.pathname === pageRoutes.JOBS ||
        router.pathname === pageRoutes.COMPANY ||
        router.pathname === pageRoutes.CANDIDATE_DATABSE ||
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
    if (windowSize.innerWidth > 991) {
      if (
        router.pathname === pageRoutes.JOBS ||
        router.pathname === pageRoutes.COMPANY ||
        router.pathname === pageRoutes.CANDIDATE_DATABSE ||
        router.pathname === pageRoutes.NOTIFICATIONS ||
        router.pathname === pageRoutes.SETTINGS ||
        router.pathname === pageRoutes.PROFILE
      ) {
        setExpand(false);
      }
    } else {
      setExpand(false);
    }
    setTimeout(() => {
      setLoadingProgress(false);
    }, 1000);
  }, [router]);
  // console.log(router, pageRoutes.JOBS);
  return (
    <Stack zIndex={2000} direction={'row'}>
      {/* <Stack
        zIndex={2}
        sx={{
          transition: 'all 0.4s',
          transitionDelay:
            router.pathname !== pageRoutes.DASHBOARD && expand ? '0.4s' : '0s',
          opacity: router.pathname !== pageRoutes.DASHBOARD && expand ? 1 : 0,
          pointerEvents:
            (router.pathname.includes(pageRoutes.JOBS) ||
              router.pathname.includes(pageRoutes.INTERVIEW) ||
              router.pathname.includes(pageRoutes.RESUME) ||
              router.pathname === pageRoutes.COVER_LETTER) &&
            expand
              ? 'auto'
              : 'none',
        }}
        position={'absolute'}
        top={60}
        left={284}
        display={windowSize?.innerWidth < 991 ? 'none' : 'block'}
      >
        <ArrowLeft
          onClickArrowLeft={{
            onClick: () => {
              setExpand(false);
            },
          }}
        />
      </Stack> */}

      <Stack
        display={windowSize?.innerWidth < 991 ? 'none' : 'flex'}
        direction={'row'}
      >
        {/* <Stack position={'relative'}>
          <Stack
            sx={{
              transition: 'all 0.4s',
              transitionDelay: !expand ? '0.4s' : '0s',
              zIndex: 3,
              opacity:
                (router.pathname.includes(pageRoutes.JOBS) ||
                  router.pathname.includes(pageRoutes.INTERVIEW) ||
                  router.pathname.includes(pageRoutes.RESUME) ||
                  router.pathname === pageRoutes.COVER_LETTER) &&
                !expand
                  ? 1
                  : 0,
              pointerEvents:
                (router.pathname.includes(pageRoutes.JOBS) ||
                  router.pathname.includes(pageRoutes.INTERVIEW) ||
                  router.pathname.includes(pageRoutes.RESUME) ||
                  router.pathname === pageRoutes.COVER_LETTER) &&
                !expand
                  ? 'auto'
                  : 'none',
            }}
            position={'absolute'}
            top={60}
            right={0}
          >
            <ArrowRight
              onClickArrowRight={{
                onClick: () => {
                  setExpand(true);
                },
              }}
            />
          </Stack>
          <Stack zIndex={2}>
            <SidemenuLeft
              isDashboard={router.pathname === pageRoutes.DASHBOARD}
              isJobs={router.pathname.includes(pageRoutes.JOBS)}
              isResume={
                router.pathname.includes(pageRoutes.RESUME) ||
                router.pathname === pageRoutes.COVER_LETTER
              }
              isCoach={router.pathname === pageRoutes.Career_COACH}
              isPro={true}
              isInterview={router.pathname.includes(pageRoutes.INTERVIEW)}
              isNotification={router.pathname === pageRoutes.NOTIFICATIONS}
              isSettings={router.pathname === pageRoutes.SETTINGS}
              // isReferral={router.pathname === pageRoutes.REFERRAL}
              onClickInterview={{
                onClick: () => {
                  setExpand(true);
                },
              }}
              onClickJobs={{
                onClick: () => {
                  setExpand(true);
                },
              }}
              onClickResume={{
                onClick: () => {
                  setExpand(true);
                },
              }}
              textNotificationCount={0}
              isNotificationCount={false}
              slotProfileImage={
                <Avatar
                  // src={employeeDtails[0]?.image}
                  variant='rounded'
                  sx={{ width: '100%', height: '100%' }}
                />
              }
              onClickLogout={{
                onClick: handleLogout,
              }}
            />
          </Stack>
        </Stack> */}
        <Stack
          sx={{
            transition: 'width 0.4s, border 0.6s',
          }}
          borderRight={'1px solid'}
          borderColor={'grey.200'}
          position={'relative'}
          p={'14px'}
          bgcolor={'#f8f9f950'}
        >
          <Stack height={'calc(100vh - 28px)'}>
            <Stack pt={'21px'} pb={'24px'}>
              <AglintRecruiterLogo />
            </Stack>
            <Stack height={'100%'} justifyContent={'space-between'}>
              <SideNavMenu
                isMyCandidateDatabase={router.pathname.includes(
                  pageRoutes.CANDIDATE_DATABSE,
                )}
                // isMyCompany={router.pathname.includes(pageRoutes.COMPANY)}
                isMyJobs={router.pathname.includes(pageRoutes.JOBS)}
              />
              <NavMenuBottom
                isMyNotification={router.pathname.includes(
                  pageRoutes.NOTIFICATIONS,
                )}
                slotProfileImage={
                  <Avatar
                    src={recruiter?.logo}
                    variant='rounded'
                    sx={{ width: '100%', height: '100%' }}
                  />
                }
                textEmail={recruiter?.email}
                textName={recruiter?.name}
              />
            </Stack>
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
                height: '2px',
                borderRadius: '5px',
                backgroundColor: '#FDD3C3',
                '& span': {
                  backgroundColor: 'orange.500',
                },
              }}
            />
          </Stack>
          <Stack width={'100%'} minHeight={'66px'}></Stack>
          <Stack
            position={'fixed'}
            top={-1}
            right={0}
            zIndex={6}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'100%'}
            direction={'row'}
            bgcolor={'grey.100'}
            justifyContent={'right'}
            boxShadow={'0px 3px 5px #04444D26'}
          ></Stack>

          <Stack
            position={'fixed'}
            top={-1}
            left={0}
            zIndex={9}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'50%'}
            direction={'row'}
            justifyContent={'left'}
          >
            <Stack width={'100%'} alignItems={'center'} direction={'row'}>
              <Stack
                position={'relative'}
                height={'50px'}
                left={'4px'}
                width={'40px'}
                overflow={'hidden'}
              >
                <Stack
                  onClick={() => {
                    // console.log(lottieRef.current);
                    // lottieRef.current.play();
                    setExpand((pre) => !pre);
                  }}
                  width={'130px'}
                  position={'absolute'}
                  top={'-38px'}
                  left={'-44px'}
                >
                  <MenuLottie lottieRef={lottieRef} isStop={expand} />
                </Stack>
              </Stack>
              <Stack zIndex={2000}>
                <AppLogo />
              </Stack>
            </Stack>
          </Stack>
          <Stack
            position={'fixed'}
            top={1}
            right={10}
            zIndex={7}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'50%'}
            direction={'row'}
            justifyContent={'right'}
          >
            <NotificationAndProfile
              isNotificationCountVisible={false}
              textNotificationCOunt={0}
              slotProfileImage={
                <Avatar
                  // src={employeeDtails[0]?.image}
                  variant='rounded'
                  sx={{ width: '100%', height: '100%' }}
                />
              }
            />
          </Stack>
          <Stack width={'100vw'}>
            <Drawer
              sx={{
                '& .MuiDrawer-paper': {
                  bgcolor: 'grey.100',
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
                justifyContent={'space-between'}
                bgcolor={'grey.100'}
                height={'100dvh'}
                width={300}
                sx={{
                  transition: `transform 0.4s, opacity 0.5s`,
                  opacity: expand ? 1 : 0,
                  transform: expand ? 'none' : 'translate3d(-200px, 0px, 0px)',
                }}
              >
                <Stack
                  borderBottom={'1px solid'}
                  borderColor={'grey.200'}
                  width={'100%'}
                  minHeight={'66px'}
                ></Stack>

                <Stack
                  pt={'30px'}
                  px={'15px'}
                  spacing={'10px'}
                  height={'100%'}
                  // bgcolor={'red.300'}
                >
                  <Stack
                    onClick={() => {
                      setLoadingProgress(true);
                    }}
                  >
                    <MobileJobNavBar
                      collapse={collapse}
                      setCollapse={setCollapse}
                    />
                  </Stack>
                </Stack>

                <Stack
                  py={'10px'}
                  borderTop={'1px solid'}
                  borderColor={'grey.200'}
                >
                  <Stack px={'15px'}>
                    <SettingsAndLogout
                      // onClickReferral={{
                      //   onClick: () => {
                      //     setLoadingProgress(true);
                      //     setCollapse(false);
                      //     router.push(pageRoutes.REFERRAL);
                      //   },
                      // }}
                      onClickSettings={{
                        onClick: () => {
                          setLoadingProgress(true);
                          setCollapse(false);
                          router.push(pageRoutes.SETTINGS);
                        },
                      }}
                      onClickLogout={{ onClick: handleLogout }}
                    />
                  </Stack>
                </Stack>
              </Stack>
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
        {/* end mobile navbar */}
        {children}
      </Stack>
    </Stack>
  );
}
