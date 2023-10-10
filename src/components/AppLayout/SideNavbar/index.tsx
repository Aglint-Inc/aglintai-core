import { Collapse, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  BriefcaseIcon,
  CandidateIcon,
  NavJobSubLink,
  TicketSublink,
} from '@/devlink';
import { useJobs } from '@/src/context/JobsContext';
import { useSupportContext } from '@/src/context/SupportContext/SupportContext';
import { pageRoutes } from '@/src/utils/pageRouting';
function SideNavbar() {
  const router = useRouter();

  const [subNabOpen, setSubNavOpen] = useState(true);

  function openCloseSubNav(route: string) {
    if (router.pathname.includes(route)) {
      setSubNavOpen((pre) => !pre);
    } else {
      setSubNavOpen(true);
    }
  }

  return (
    <>
      {navList.map((item, i) => {
        return (
          <Collapse
            key={i}
            sx={{
              borderRadius: '8px',
              transition: 'all 0.5s',
              bgcolor: !router.pathname.includes(item.route)
                ? 'transparent'
                : 'rgba(255, 255, 255, 0.06)',
            }}
            collapsedSize={32}
            in={router.pathname.includes(item.route) && subNabOpen}
          >
            <Stack
              sx={{
                '&:hover': {
                  opacity: 1,
                },
                height: '32px',
                p: '6px 10px',
                opacity: !router.pathname.includes(item.route) ? 0.6 : 1,
                zIndex: 2,
                cursor: 'pointer',
              }}
              onClick={() => {
                openCloseSubNav(item.route);
                router.push(item.route);
              }}
              direction={'row'}
              alignItems={'center'}
              spacing={'8px'}
              color={'white.700'}
            >
              {item.icon}
              <Typography
                color={'white.700'}
                fontSize={'14px'}
                fontStyle={'normal'}
                fontWeight={400}
                lineHeight={' 20px'}
                letterSpacing={'-0.154px'}
              >
                {item.text}
              </Typography>
            </Stack>
            <Stack
              sx={{
                transition: `transform 0.4s, opacity ${
                  router.pathname.includes(item.route) ? '0.8s' : '0.2s'
                }`,
                opacity: router.pathname.includes(item.route) ? 1 : 0,

                transform: router.pathname.includes(item.route)
                  ? 'none'
                  : 'translate3d(0px, -50px, 0px)',
                pointerEvents: !router.pathname.includes(item.route)
                  ? 'none'
                  : 'auto',
              }}
              px={'10px'}
            >
              {item.SubComponents}
            </Stack>
          </Collapse>
        );
      })}
    </>
  );
}

export default SideNavbar;

function JobSubNavbar() {
  const router = useRouter();
  const { jobsData } = useJobs();
  return (
    <NavJobSubLink
      onClickJobAll={{
        onClick: () => router.push(`${pageRoutes.JOBS}?status=all`),
      }}
      onClickJobActive={{
        onClick: () => router.push(`${pageRoutes.JOBS}?status=active`),
      }}
      onClickJobInactive={{
        onClick: () => router.push(`${pageRoutes.JOBS}?status=inactive`),
      }}
      onClickJobClosed={{
        onClick: () => router.push(`${pageRoutes.JOBS}?status=close`),
      }}
      isJobAll={
        router.query.status === 'all' ||
        (router.pathname === pageRoutes.JOBS &&
          router.query.status !== 'active' &&
          router.query.status !== 'inactive' &&
          router.query.status !== 'close')
      }
      activeCount={
        jobsData?.jobs?.filter(
          (job) =>
            (job.active_status.interviewing.isActive ||
              job.active_status.sourcing.isActive) &&
            !job.active_status.closed.isActive,
        ).length || 0
      }
      allCount={jobsData?.jobs?.length || 0}
      inActiveCount={
        jobsData?.jobs?.filter(
          (job) =>
            !(
              job.active_status.interviewing.isActive ||
              job.active_status.sourcing.isActive
            ) && !job.active_status.closed.isActive,
        ).length || 0
      }
      closedCount={
        jobsData?.jobs?.filter((job) => job.active_status.closed.isActive)
          .length || 0
      }
      isJobActive={router.query.status === 'active'}
      isJobInactive={router.query.status === 'inactive'}
      isJobClosed={router.query.status === 'close'}
    />
  );
}

function SupportSubNavbar() {
  const router = useRouter();
  const { allFilter } = useSupportContext();
  return (
    <>
      <TicketSublink
        allCount={allFilter.all}
        isAllActive={router.query.status === 'all'}
        onClickAll={{
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=all`);
          },
        }}
        inProgressCount={allFilter['in progress']}
        isInProgressActive={router.query.status === 'in progress'}
        onClickInProgress={{
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=in progress`);
          },
        }}
        resolvedCount={allFilter.Resolved}
        isResolvedActive={router.query.status === 'resolve'}
        onClickResolve={{
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=resolved`);
          },
        }}
        openCount={allFilter.open}
        isOpenActive={router.query.status === 'open'}
        onClickOpen={{
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=open`);
          },
        }}
        onHoldCount={allFilter['on hold']}
        isOnHoldActive={router.query.status === 'on hold'}
        onClickOnHold={{
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=on hold`);
          },
        }}
      />
    </>
  );
}

const navList = [
  {
    icon: <BriefcaseIcon />,
    text: 'Jobs',
    SubComponents: <JobSubNavbar />,
    route: pageRoutes.JOBS,
  },
  {
    icon: <CandidateIcon />,
    text: 'Candidates',
    SubComponents: '',
    route: pageRoutes.CANDIDATES,
  },
  {
    icon: <ChatIcon />,
    text: 'Tickets',
    SubComponents: <SupportSubNavbar />,
    route: pageRoutes.SUPPORT,
  },
];

function ChatIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
    >
      <path
        d='M6.66634 2H9.33301C12.2785 2 14.6663 4.38781 14.6663 7.33333C14.6663 10.2789 12.2785 12.6667 9.33301 12.6667V15C5.99967 13.6667 1.33301 11.6667 1.33301 7.33333C1.33301 4.38781 3.72082 2 6.66634 2ZM7.99967 11.3333H9.33301C11.5421 11.3333 13.333 9.54247 13.333 7.33333C13.333 5.12419 11.5421 3.33333 9.33301 3.33333H6.66634C4.4572 3.33333 2.66634 5.12419 2.66634 7.33333C2.66634 9.74 4.30773 11.3104 7.99967 12.9865V11.3333Z'
        fill='white'
      />
    </svg>
  );
}
