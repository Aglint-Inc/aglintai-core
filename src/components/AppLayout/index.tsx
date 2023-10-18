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
        >
          <Stack height={'calc(100vh - 28px)'}>
            <Stack pb={'30px'} pt={'20px'}>
              <svg
                width='160'
                height='26'
                viewBox='0 0 160 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_3672_19477)'>
                  <path
                    d='M19.5151 12.4552C16.8576 11.7893 15.5257 11.4625 14.607 10.5438C13.6883 9.61894 13.3615 8.29327 12.6956 5.63577L11.7152 1.72043L10.7348 5.63577C10.0689 8.29327 9.74212 9.6251 8.8234 10.5438C7.89851 11.4625 6.57285 11.7893 3.91535 12.4552L0 13.4356L3.91535 14.416C6.57285 15.0819 7.90468 15.4087 8.8234 16.3274C9.74212 17.2523 10.0689 18.578 10.7348 21.2355L11.7152 25.1508L12.6956 21.2355C13.3615 18.578 13.6883 17.2461 14.607 16.3274C15.5319 15.4087 16.8576 15.0819 19.5151 14.416L23.4304 13.4356L19.5151 12.4552Z'
                    fill='#FF6224'
                  />
                  <path
                    d='M35.5867 21.4037C34.7597 21.4037 33.9879 21.2567 33.2712 20.9626C32.5729 20.6502 32.0032 20.2 31.5621 19.6119C31.1395 19.0055 30.9281 18.2521 30.9281 17.3516C30.9281 16.0652 31.3784 15.0361 32.2788 14.2643C33.1977 13.4925 34.5484 13.1066 36.3309 13.1066H40.19V12.7482C40.19 11.9396 39.9603 11.37 39.5009 11.0392C39.0599 10.7084 38.1594 10.543 36.7995 10.543C35.311 10.543 33.8776 10.7727 32.4994 11.2321V8.61344C33.1058 8.37454 33.8409 8.18159 34.7046 8.03457C35.5867 7.86918 36.5423 7.78649 37.5714 7.78649C39.5377 7.78649 41.0537 8.19077 42.1196 8.99935C43.2038 9.78956 43.7459 11.0667 43.7459 12.8309V21.128H40.5208L40.3279 19.9427C39.8133 20.4021 39.1793 20.7605 38.4259 21.0178C37.6724 21.275 36.726 21.4037 35.5867 21.4037ZM36.6066 18.9504C37.4335 18.9504 38.1502 18.8126 38.7567 18.5369C39.3631 18.2613 39.8409 17.9121 40.19 17.4894V15.422H36.4136C34.9618 15.422 34.236 16.0193 34.236 17.2138C34.236 18.3715 35.0262 18.9504 36.6066 18.9504Z'
                    fill='white'
                  />
                  <path
                    d='M52.5313 25.9795C51.5573 25.9795 50.5558 25.9152 49.5267 25.7865C48.5159 25.6579 47.6614 25.4741 46.9631 25.2352V22.4512C47.6982 22.6901 48.5619 22.8738 49.5542 23.0025C50.5466 23.1495 51.4746 23.223 52.3383 23.223C53.6063 23.223 54.5252 23.1495 55.0948 23.0025C55.6645 22.8738 55.9494 22.6349 55.9494 22.2858C55.9494 21.9917 55.8207 21.7896 55.5634 21.6793C55.3245 21.5691 54.81 21.5139 54.0198 21.5139H50.4639C48.13 21.5139 46.9631 20.6502 46.9631 18.9228C46.9631 18.3899 47.1101 17.9029 47.4042 17.4619C47.6982 17.0208 48.1668 16.6717 48.81 16.4144C47.3215 15.6609 46.5772 14.3929 46.5772 12.6104C46.5772 10.9197 47.1009 9.69767 48.1484 8.94422C49.1959 8.1724 50.7487 7.78649 52.8069 7.78649C53.2296 7.78649 53.689 7.82324 54.1852 7.89675C54.6997 7.95188 55.0857 8.00701 55.3429 8.06214H60.2495L60.1668 10.4052H58.0994C58.6691 10.9381 58.954 11.6824 58.954 12.638C58.954 13.9795 58.5313 15.0545 57.686 15.8631C56.8406 16.6533 55.591 17.0484 53.9371 17.0484C53.6431 17.0484 53.3582 17.0392 53.0826 17.0208C52.8253 16.9841 52.5588 16.9473 52.2832 16.9106C51.7319 16.9841 51.2633 17.1127 50.8774 17.2965C50.5098 17.4802 50.3261 17.7283 50.3261 18.0407C50.3261 18.4634 50.7028 18.6747 51.4562 18.6747H55.15C56.4731 18.6747 57.493 18.9779 58.2097 19.5844C58.9264 20.1724 59.2847 21.0361 59.2847 22.1755C59.2847 23.4619 58.7059 24.4175 57.5481 25.0423C56.3904 25.6671 54.7181 25.9795 52.5313 25.9795ZM52.8345 14.9534C53.9371 14.9534 54.6997 14.7697 55.1224 14.4021C55.5634 14.0162 55.784 13.373 55.784 12.4726C55.784 11.5721 55.5634 10.9197 55.1224 10.5154C54.6997 10.1111 53.9371 9.90901 52.8345 9.90901C51.787 9.90901 51.0336 10.1111 50.5742 10.5154C50.1147 10.9014 49.885 11.5537 49.885 12.4726C49.885 13.3179 50.0964 13.9427 50.519 14.347C50.9601 14.7513 51.7319 14.9534 52.8345 14.9534Z'
                    fill='white'
                  />
                  <path
                    d='M66.411 21.4037C65.143 21.4037 64.215 21.1097 63.6269 20.5216C63.0572 19.9335 62.7724 18.9963 62.7724 17.71V2.5491H66.4937V17.4067C66.4937 17.8662 66.5856 18.1877 66.7693 18.3715C66.9531 18.5369 67.2196 18.6196 67.5687 18.6196C68.0465 18.6196 68.4784 18.5553 68.8643 18.4266V20.9902C68.166 21.2659 67.3482 21.4037 66.411 21.4037Z'
                    fill='white'
                  />
                  <path
                    d='M71.1989 5.66397V2.74206H75.251V5.66397H71.1989ZM71.5022 21.128V10.8187H69.545L69.8758 8.06214H75.2234V21.128H71.5022Z'
                    fill='white'
                  />
                  <path
                    d='M78.6676 21.128V8.06214H82.1133L82.2511 9.30257C82.784 8.89828 83.4548 8.54912 84.2633 8.25509C85.0903 7.94269 85.954 7.78649 86.8545 7.78649C88.5819 7.78649 89.8407 8.19077 90.6309 8.99935C91.4211 9.80793 91.8162 11.0576 91.8162 12.7482V21.128H88.0949V12.9412C88.0949 12.0591 87.9111 11.4343 87.5436 11.0667C87.1944 10.6992 86.5329 10.5154 85.5589 10.5154C84.9892 10.5154 84.4103 10.6441 83.8223 10.9014C83.2526 11.1586 82.7748 11.4802 82.3889 11.8661V21.128H78.6676Z'
                    fill='white'
                  />
                  <path
                    d='M100.304 21.4037C98.797 21.4037 97.676 21.0086 96.9409 20.2184C96.2242 19.4282 95.8659 18.3531 95.8659 16.9933V10.9289H94.019V8.06214H95.8659V5.25049L99.5872 4.14788V8.06214H102.895L102.674 10.9289H99.5872V16.7452C99.5872 17.4619 99.7526 17.958 100.083 18.2337C100.414 18.491 100.929 18.6196 101.627 18.6196C102.142 18.6196 102.674 18.5277 103.226 18.344V20.9075C102.822 21.0729 102.38 21.1924 101.903 21.2659C101.425 21.3577 100.892 21.4037 100.304 21.4037Z'
                    fill='white'
                  />
                </g>
                <path
                  d='M112.551 10V3.35226H116.907V4.02323H113.397V6.34581H116.525V7.00645H113.397V10H112.551ZM119.77 10.1032C118.917 10.1032 118.294 9.88645 117.902 9.4529C117.517 9.01247 117.324 8.37936 117.324 7.55355C117.324 6.73462 117.52 6.10495 117.912 5.66452C118.305 5.22409 118.924 5.00387 119.77 5.00387C120.617 5.00387 121.236 5.22409 121.628 5.66452C122.021 6.10495 122.217 6.73462 122.217 7.55355C122.217 8.37936 122.024 9.01247 121.639 9.4529C121.253 9.88645 120.631 10.1032 119.77 10.1032ZM119.77 9.38065C120.355 9.38065 120.768 9.23613 121.009 8.9471C121.25 8.65118 121.37 8.18667 121.37 7.55355C121.37 6.92043 121.247 6.45936 120.999 6.17032C120.758 5.87441 120.348 5.72645 119.77 5.72645C119.192 5.72645 118.779 5.87441 118.532 6.17032C118.291 6.45936 118.17 6.92043 118.17 7.55355C118.17 8.18667 118.291 8.65118 118.532 8.9471C118.773 9.23613 119.185 9.38065 119.77 9.38065ZM123.458 10V5.1071H124.222L124.284 5.72645C124.524 5.56817 124.807 5.42366 125.13 5.2929C125.46 5.16215 125.784 5.06581 126.1 5.00387V5.66452C125.908 5.70581 125.698 5.7643 125.471 5.84C125.244 5.90882 125.027 5.98796 124.82 6.07742C124.614 6.16688 124.442 6.25979 124.304 6.35613V10H123.458ZM112.551 22V15.3523H117.041V16.0232H113.397V18.3458H116.669V19.0065H113.397V21.3394H117.041V22H112.551ZM118.276 22V17.1071H119.04L119.092 17.6645C119.353 17.4581 119.629 17.2963 119.918 17.1794C120.214 17.0624 120.53 17.0039 120.867 17.0039C121.232 17.0039 121.514 17.0624 121.714 17.1794C121.92 17.2963 122.072 17.4615 122.168 17.6748C122.402 17.4822 122.67 17.3239 122.973 17.2C123.276 17.0692 123.637 17.0039 124.057 17.0039C124.614 17.0039 125.027 17.1484 125.296 17.4374C125.571 17.7196 125.709 18.1566 125.709 18.7484V22H124.872V18.831C124.872 18.3974 124.78 18.0981 124.594 17.9329C124.415 17.7677 124.122 17.6852 123.716 17.6852C123.448 17.6852 123.19 17.7299 122.942 17.8194C122.701 17.9088 122.495 18.0465 122.323 18.2323C122.364 18.4043 122.385 18.6039 122.385 18.831V22H121.59V18.8516C121.59 18.4387 121.521 18.1428 121.383 17.9639C121.246 17.7781 120.974 17.6852 120.568 17.6852C120.293 17.6852 120.028 17.7471 119.773 17.871C119.525 17.988 119.305 18.1359 119.112 18.3148V22H118.276ZM127.107 24.2297V17.1071H127.83L127.892 17.6232C128.119 17.4099 128.366 17.2551 128.635 17.1587C128.91 17.0555 129.23 17.0039 129.595 17.0039C130.283 17.0039 130.823 17.1966 131.215 17.5819C131.608 17.9604 131.804 18.5935 131.804 19.4813C131.804 20.3622 131.608 21.0194 131.215 21.4529C130.823 21.8865 130.279 22.1032 129.584 22.1032C128.944 22.1032 128.401 21.9484 127.953 21.6387V24.2297H127.107ZM129.357 21.4219C129.908 21.4219 130.31 21.2671 130.565 20.9574C130.827 20.6409 130.957 20.1488 130.957 19.4813C130.957 18.8413 130.837 18.3837 130.596 18.1084C130.355 17.8262 129.949 17.6852 129.378 17.6852C129.096 17.6852 128.834 17.7333 128.593 17.8297C128.353 17.926 128.139 18.074 127.953 18.2735V20.9368C128.125 21.0882 128.328 21.2086 128.562 21.2981C128.796 21.3806 129.061 21.4219 129.357 21.4219ZM134.108 22.1032C133.777 22.1032 133.516 22.0172 133.323 21.8452C133.137 21.6662 133.044 21.3669 133.044 20.9471V15.0426H133.891V20.8542C133.891 21.0606 133.925 21.2017 133.994 21.2774C134.063 21.3531 134.17 21.391 134.314 21.391C134.472 21.391 134.627 21.3703 134.779 21.329V22C134.669 22.0413 134.558 22.0688 134.448 22.0826C134.338 22.0963 134.225 22.1032 134.108 22.1032ZM137.996 22.1032C137.143 22.1032 136.52 21.8865 136.128 21.4529C135.742 21.0125 135.55 20.3794 135.55 19.5535C135.55 18.7346 135.746 18.1049 136.138 17.6645C136.53 17.2241 137.15 17.0039 137.996 17.0039C138.843 17.0039 139.462 17.2241 139.854 17.6645C140.247 18.1049 140.443 18.7346 140.443 19.5535C140.443 20.3794 140.25 21.0125 139.865 21.4529C139.479 21.8865 138.856 22.1032 137.996 22.1032ZM137.996 21.3806C138.581 21.3806 138.994 21.2361 139.235 20.9471C139.476 20.6512 139.596 20.1867 139.596 19.5535C139.596 18.9204 139.472 18.4594 139.225 18.1703C138.984 17.8744 138.574 17.7265 137.996 17.7265C137.418 17.7265 137.005 17.8744 136.757 18.1703C136.517 18.4594 136.396 18.9204 136.396 19.5535C136.396 20.1867 136.517 20.6512 136.757 20.9471C136.998 21.2361 137.411 21.3806 137.996 21.3806ZM142.038 23.8168C141.714 23.8168 141.432 23.772 141.191 23.6826V23.0013C141.308 23.0426 141.415 23.0701 141.511 23.0839C141.615 23.0976 141.718 23.1045 141.821 23.1045C142.055 23.1045 142.237 23.0632 142.368 22.9806C142.506 22.8981 142.626 22.7708 142.729 22.5987C142.833 22.4335 142.946 22.2168 143.07 21.9484L140.913 17.1071H141.79L143.493 21.0503L145.248 17.1071H146.115L144.061 21.7832C143.889 22.1755 143.713 22.523 143.535 22.8258C143.356 23.1355 143.149 23.3763 142.915 23.5484C142.681 23.7273 142.389 23.8168 142.038 23.8168ZM149.089 22.1032C148.215 22.1032 147.561 21.8933 147.127 21.4735C146.694 21.0538 146.477 20.4069 146.477 19.5329C146.477 18.7484 146.663 18.1325 147.035 17.6852C147.413 17.231 148.008 17.0039 148.82 17.0039C149.302 17.0039 149.698 17.0933 150.007 17.2723C150.324 17.4443 150.558 17.6852 150.709 17.9948C150.868 18.2976 150.947 18.6417 150.947 19.0271V19.9458H147.324C147.351 20.3174 147.43 20.6099 147.561 20.8232C147.699 21.0366 147.902 21.1914 148.17 21.2877C148.445 21.3772 148.807 21.4219 149.254 21.4219C149.756 21.4219 150.217 21.3359 150.637 21.1639V21.8245C150.424 21.914 150.183 21.9828 149.915 22.031C149.653 22.0791 149.378 22.1032 149.089 22.1032ZM147.324 19.3368H150.193V18.9342C150.193 18.5351 150.087 18.2288 149.873 18.0155C149.667 17.7953 149.323 17.6852 148.841 17.6852C148.256 17.6852 147.857 17.8228 147.644 18.0981C147.43 18.3733 147.324 18.7862 147.324 19.3368ZM152.188 22V17.1071H152.951L153.013 17.7265C153.254 17.5682 153.536 17.4237 153.86 17.2929C154.19 17.1622 154.514 17.0658 154.83 17.0039V17.6645C154.638 17.7058 154.428 17.7643 154.201 17.84C153.973 17.9088 153.757 17.988 153.55 18.0774C153.344 18.1669 153.172 18.2598 153.034 18.3561V22H152.188ZM157.244 22.1032C156.927 22.1032 156.624 22.0826 156.335 22.0413C156.053 22 155.816 21.9449 155.623 21.8761V21.1329C155.857 21.2155 156.101 21.2774 156.356 21.3187C156.618 21.36 156.876 21.3806 157.13 21.3806C157.564 21.3806 157.874 21.3359 158.059 21.2465C158.245 21.1501 158.338 20.9746 158.338 20.72C158.338 20.5342 158.286 20.3931 158.183 20.2968C158.087 20.2004 157.935 20.1144 157.729 20.0387C157.529 19.963 157.271 19.8735 156.955 19.7703C156.673 19.674 156.421 19.5742 156.201 19.471C155.981 19.3677 155.809 19.2301 155.685 19.0581C155.561 18.8791 155.499 18.6417 155.499 18.3458C155.499 17.9123 155.651 17.5819 155.954 17.3548C156.256 17.1209 156.745 17.0039 157.419 17.0039C157.681 17.0039 157.932 17.0245 158.173 17.0658C158.414 17.1002 158.624 17.1449 158.803 17.2V17.9432C158.369 17.7987 157.953 17.7265 157.554 17.7265C157.127 17.7265 156.817 17.7712 156.624 17.8606C156.439 17.9432 156.346 18.1015 156.346 18.3355C156.346 18.4938 156.387 18.6211 156.47 18.7174C156.559 18.8069 156.693 18.886 156.872 18.9548C157.058 19.0168 157.295 19.0959 157.584 19.1923C157.963 19.3092 158.269 19.4297 158.503 19.5535C158.737 19.6774 158.909 19.8288 159.019 20.0077C159.129 20.1867 159.184 20.4206 159.184 20.7097C159.184 21.1914 159.016 21.5458 158.679 21.7729C158.341 21.9931 157.863 22.1032 157.244 22.1032Z'
                  fill='white'
                />
                <defs>
                  <clipPath id='clip0_3672_19477'>
                    <rect
                      width='103.226'
                      height='24.2591'
                      fill='white'
                      transform='translate(0 1.72043)'
                    />
                  </clipPath>
                </defs>
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
                    sx={{ width: '100%', height: '100%' }}
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
                  sx={{ width: '100%', height: '100%' }}
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
