//import ResizeWindowContext from '@context/resizeWindow/context';
import { Avatar, Drawer, LinearProgress, Stack } from '@mui/material';
import { pageRoutes } from '@utils/pageRouting';
import { LottieComponentProps } from 'lottie-react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import {
  AglintRecruiterLogo,
  NavMenuBottom,
  NotificationAndProfile,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ResizeWindowContext from '@/src/context/ResizeWindow/context';

import MenuLottie from './MenuLottie';
import SideNavbar from './SideNavbar';

export default function AppLayout({ children }) {
  const lottieRef = useRef<LottieComponentProps>(null);
  const { handleLogout } = useAuthDetails();
  const { recruiter, userDetails, recruiterUser } = useAuthDetails();
  const router = useRouter();
  const { windowSize } = useContext(ResizeWindowContext);
  const [expand, setExpand] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const userEmail = userDetails.user.email;
  const profileImage = recruiterUser.profile_image;

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
          bgcolor={'#25282a'}
          width={'260px'}
        >
          <Stack height={'calc(100vh - 28px)'}>
            <Stack pb={'30px'} pt={'20px'}>
            <svg width="120" height="26" viewBox="0 0 50 12" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M9.45261 5.32443C8.16538 5.00188 7.52028 4.84359 7.07527 4.39859C6.63027 3.9506 6.47198 3.30848 6.14942 2.02125L5.67455 0.124756L5.19968 2.02125C4.87713 3.30848 4.71884 3.95358 4.27383 4.39859C3.82584 4.84359 3.18372 5.00188 1.8965 5.32443L0 5.7993L1.8965 6.27417C3.18372 6.59673 3.82883 6.75502 4.27383 7.20002C4.71884 7.64801 4.87713 8.29013 5.19968 9.57736L5.67455 11.4739L6.14942 9.57736C6.47198 8.29013 6.63027 7.64503 7.07527 7.20002C7.52326 6.75502 8.16538 6.59673 9.45261 6.27417L11.3491 5.7993L9.45261 5.32443Z" fill="#FF6224"/>
             <path d="M17.2373 9.65883C16.8367 9.65883 16.4629 9.58762 16.1157 9.4452C15.7775 9.29388 15.5015 9.0758 15.2879 8.79096C15.0832 8.49722 14.9808 8.13227 14.9808 7.69611C14.9808 7.07302 15.1989 6.57455 15.6351 6.20069C16.0801 5.82684 16.7344 5.63992 17.5978 5.63992H19.4671V5.46634C19.4671 5.07469 19.3558 4.79875 19.1333 4.63852C18.9196 4.4783 18.4835 4.39819 17.8248 4.39819C17.1038 4.39819 16.4095 4.50946 15.7419 4.73199V3.46356C16.0356 3.34784 16.3917 3.25438 16.81 3.18317C17.2373 3.10306 17.7002 3.063 18.1986 3.063C19.1511 3.063 19.8854 3.25883 20.4017 3.65049C20.9269 4.03324 21.1894 4.65188 21.1894 5.5064V9.52531H19.6273L19.5338 8.95118C19.2846 9.17371 18.9775 9.34729 18.6125 9.47191C18.2476 9.59652 17.7892 9.65883 17.2373 9.65883ZM17.7313 8.47051C18.1319 8.47051 18.479 8.40376 18.7728 8.27024C19.0665 8.13672 19.2979 7.96759 19.4671 7.76286V6.76147H17.6378C16.9346 6.76147 16.583 7.05076 16.583 7.62935C16.583 8.19013 16.9658 8.47051 17.7313 8.47051Z" fill="white"/>
            <path d="M25.4448 11.8752C24.9731 11.8752 24.488 11.8441 23.9895 11.7818C23.4999 11.7195 23.086 11.6305 22.7478 11.5147V10.1662C23.1038 10.2819 23.5222 10.3709 24.0028 10.4332C24.4835 10.5045 24.933 10.5401 25.3514 10.5401C25.9656 10.5401 26.4106 10.5045 26.6866 10.4332C26.9625 10.3709 27.1005 10.2552 27.1005 10.0861C27.1005 9.94367 27.0382 9.84576 26.9135 9.79235C26.7978 9.73894 26.5486 9.71224 26.1658 9.71224H24.4434C23.313 9.71224 22.7478 9.29388 22.7478 8.45716C22.7478 8.19903 22.819 7.96314 22.9614 7.74951C23.1038 7.53588 23.3308 7.36676 23.6423 7.24214C22.9213 6.87719 22.5608 6.263 22.5608 5.39958C22.5608 4.58067 22.8145 3.98873 23.3219 3.62378C23.8293 3.24993 24.5814 3.063 25.5784 3.063C25.7831 3.063 26.0056 3.0808 26.246 3.11641C26.4952 3.14311 26.6821 3.16982 26.8067 3.19652H29.1834L29.1433 4.33143H28.1419C28.4179 4.58957 28.5558 4.95007 28.5558 5.41293C28.5558 6.06272 28.3511 6.58345 27.9416 6.9751C27.5322 7.35786 26.9269 7.54923 26.1258 7.54923C25.9834 7.54923 25.8454 7.54478 25.7119 7.53588C25.5873 7.51808 25.4582 7.50028 25.3247 7.48247C25.0576 7.51808 24.8307 7.58039 24.6437 7.6694C24.4657 7.75841 24.3767 7.87858 24.3767 8.0299C24.3767 8.23463 24.5592 8.337 24.9241 8.337H26.7133C27.3542 8.337 27.8482 8.48387 28.1953 8.77761C28.5425 9.06245 28.7161 9.48081 28.7161 10.0327C28.7161 10.6558 28.4357 11.1186 27.8749 11.4213C27.3141 11.7239 26.5041 11.8752 25.4448 11.8752ZM25.5917 6.53449C26.1258 6.53449 26.4952 6.44548 26.6999 6.26745C26.9135 6.08053 27.0204 5.76898 27.0204 5.33282C27.0204 4.89666 26.9135 4.58067 26.6999 4.38484C26.4952 4.18901 26.1258 4.0911 25.5917 4.0911C25.0843 4.0911 24.7194 4.18901 24.4969 4.38484C24.2743 4.57176 24.1631 4.88776 24.1631 5.33282C24.1631 5.74228 24.2654 6.04492 24.4701 6.24075C24.6838 6.43658 25.0576 6.53449 25.5917 6.53449Z" fill="white"/>
              <path d="M32.1678 9.65883C31.5536 9.65883 31.1041 9.51641 30.8193 9.23157C30.5433 8.94673 30.4054 8.49277 30.4054 7.86968V0.526145H32.2079V7.72281C32.2079 7.94534 32.2524 8.10111 32.3414 8.19012C32.4304 8.27024 32.5595 8.31029 32.7286 8.31029C32.96 8.31029 33.1692 8.27914 33.3561 8.21683V9.45855C33.0179 9.59207 32.6218 9.65883 32.1678 9.65883Z" fill="white"/>
              <path d="M34.487 2.03491V0.619608H36.4497V2.03491H34.487ZM34.6339 9.52531V4.53171H33.6859L33.8461 3.19652H36.4364V9.52531H34.6339Z" fill="white"/>
              <path d="M38.1046 9.52531V3.19652H39.7736L39.8404 3.79736C40.0985 3.60153 40.4234 3.4324 40.8151 3.28998C41.2156 3.13866 41.634 3.063 42.0701 3.063C42.9068 3.063 43.5166 3.25883 43.8993 3.65049C44.2821 4.04214 44.4735 4.64743 44.4735 5.46634V9.52531H42.671V5.5598C42.671 5.13254 42.582 4.8299 42.4039 4.65188C42.2348 4.47385 41.9144 4.38484 41.4426 4.38484C41.1666 4.38484 40.8863 4.44715 40.6014 4.57176C40.3255 4.69638 40.0941 4.85215 39.9071 5.03908V9.52531H38.1046Z" fill="white"/>
              <path d="M48.5847 9.65883C47.8548 9.65883 47.3118 9.46745 46.9558 9.0847C46.6086 8.70195 46.435 8.18122 46.435 7.52253V4.58512H45.5405V3.19652H46.435V1.83463L48.2376 1.30055V3.19652H49.8398L49.733 4.58512H48.2376V7.40236C48.2376 7.74951 48.3177 7.98985 48.4779 8.12336C48.6381 8.24798 48.8873 8.31029 49.2256 8.31029C49.4748 8.31029 49.733 8.26579 50 8.17677V9.4185C49.8042 9.49861 49.5905 9.55647 49.3591 9.59207C49.1277 9.63658 48.8695 9.65883 48.5847 9.65883Z" fill="white"/>
              </svg>
            </Stack>
            <Stack height={'100%'} justifyContent={'space-between'}>
              <Stack spacing={'10px'}>
                <SideNavbar />
              </Stack>
              <NavMenuBottom
                isMyNotification={router.pathname.includes(
                  pageRoutes.NOTIFICATIONS,
                )}
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
                isMyCompany={router.pathname.includes(pageRoutes.COMPANY)}
                textEmail={userEmail}
                textName={recruiterUser?.first_name}
                onClickLogout={{
                  onClick: (e) => {
                    handleLogout(e);
                  },
                }}
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
                height: '1px',
                borderRadius: '5px',
                backgroundColor: '#3d1100',
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
            bgcolor={'#25282a'}
            justifyContent={'right'}
            // boxShadow={'0px 3px 5px #04444D26'}
          ></Stack>

          <Stack
            position={'fixed'}
            top={-1}
            left={0}
            zIndex={9}
            minHeight={'66px'}
            maxHeight={'66px'}
            width={'60%'}
            direction={'row'}
            justifyContent={'left'}
          >
            <Stack width={'100%'} alignItems={'center'} direction={'row'}>
              <Stack
                position={'relative'}
                height={'53px'}
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
                <AglintRecruiterLogo />
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
            width={'40%'}
            direction={'row'}
            justifyContent={'right'}
            color={'white.700'}
          >
            <NotificationAndProfile
              isNotificationCountVisible={true}
              textNotificationCOunt={0}
              slotProfileImage={
                <Avatar
                  src={recruiter?.logo}
                  variant='rounded'
                  sx={{
                    width: '100%',
                    height: '100%',
                    '& .MuiAvatar-img ': {
                      objectFit: 'contain',
                    },
                  }}
                />
              }
            />
          </Stack>
          <Stack width={'100vw'}>
            <Drawer
              sx={{
                '& .MuiDrawer-paper': {
                  border: 'none !important',
                  bgcolor: '#25282a !important',
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
                bgcolor={'#25282a !important'}
                height={'100dvh'}
                width={300}
                sx={{
                  transition: `transform 0.4s, opacity 0.5s`,
                  opacity: expand ? 1 : 0,
                  transform: expand ? 'none' : 'translate3d(-200px, 0px, 0px)',
                }}
              >
                <Stack width={'100%'} minHeight={'66px'}></Stack>

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
                    <Stack spacing={'10px'}>
                      <SideNavbar />
                    </Stack>
                  </Stack>
                </Stack>

                <Stack py={'10px'}>
                  <Stack px={'15px'}>
                    <NavMenuBottom
                      isNotificationVisible={false}
                      isProfileVisible={false}
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
                      isMyCompany={router.pathname.includes(pageRoutes.COMPANY)}
                      textEmail={recruiter?.email}
                      textName={recruiter?.name}
                      onClickLogout={{
                        onClick: (e) => {
                          handleLogout(e);
                        },
                      }}
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
