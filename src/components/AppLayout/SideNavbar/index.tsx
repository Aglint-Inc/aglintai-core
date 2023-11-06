import { Collapse, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { NavJobSubLink, SoonBadge, TicketSublink } from '@/devlink';
import {
  RsnDatabaseIcon,
  RsnJobsIcon,
  RsnSettingsIcon,
  RsnTicketsIcon,
} from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { useSupportContext } from '@/src/context/SupportContext/SupportContext';
import { pageRoutes } from '@/src/utils/pageRouting';
function SideNavbar() {
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const [subNabOpen, setSubNavOpen] = useState(true);

  function openCloseSubNav(route: string) {
    if (router.pathname.includes(route)) {
      setSubNavOpen((pre) => !pre);
    } else {
      setSubNavOpen(true);
    }
  }

  const newNaveList = useMemo(() => {
    const tempList = navList;
    if (recruiter?.id === process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_ID) {
      return tempList.filter((x) => x.route === '/support');
    }
    return tempList;
  }, [recruiter]);

  return (
    <Stack>
      {newNaveList.map((item, i) => {
        return (
          <Collapse
            key={i}
            sx={{
              borderRadius: '8px',
              transition: 'all 0.5s',
              bgcolor:
                !router.pathname.includes(item.route) ||
                item.SubComponents !== null
                  ? 'transparent'
                  : 'rgba(255, 255, 255, 0.1)',
            }}
            collapsedSize={48}
            in={router.pathname.includes(item.route) && subNabOpen}
          >
            <Stack
              sx={{
                '&:hover': {
                  opacity: 1,
                },
                height: '48px',
                p: '12px 10px 14px 10px',
                opacity: !router.pathname.includes(item.route) ? 0.6 : 1,
                zIndex: 2,
                cursor: 'pointer',
              }}
              onClick={() => {
                openCloseSubNav(item.route);
                if (router.pathname !== item.route) {
                  router.push(item.route);
                }
              }}
              direction={'row'}
              alignItems={'center'}
              spacing={'8px'}
              color={'white.700'}
            >
              <Stack style={{ transform: 'translateY(1px)' }}>
                {item.icon}
              </Stack>
              <Typography
                color={'white.700'}
                fontSize={'14px'}
                fontStyle={'normal'}
                fontWeight={400}
                lineHeight={'20px'}
                letterSpacing={'-0.154px'}
              >
                {item.text}
              </Typography>
              <Stack style={{ transform: 'translateY(2px)' }}>
                {item.comingsoon && <SoonBadge />}
              </Stack>
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
    </Stack>
  );
}

export default SideNavbar;

function JobSubNavbar() {
  const router = useRouter();
  const { jobsData } = useJobs();
  return (
    <NavJobSubLink
      onClickJobAll={{
        style: {
          borderRadius: '8px',
          backgroundColor:
            router.query.status === 'all'
              ? 'rgba(255,255,255,0.1)'
              : 'transparent',
        },
        onClick: () => router.push(`${pageRoutes.JOBS}?status=all`),
      }}
      onClickJobActive={{
        style: {
          borderRadius: '8px',
          backgroundColor:
            router.query.status === 'active'
              ? 'rgba(255,255,255,0.1)'
              : 'transparent',
        },
        onClick: () => router.push(`${pageRoutes.JOBS}?status=published`),
      }}
      onClickJobInactive={{
        style: {
          borderRadius: '8px',
          backgroundColor:
            router.query.status === 'inactive'
              ? 'rgba(255,255,255,0.1)'
              : 'transparent',
        },
        onClick: () => router.push(`${pageRoutes.JOBS}?status=draft`),
      }}
      onClickJobClosed={{
        style: {
          borderRadius: '8px',
          backgroundColor:
            router.query.status === 'close'
              ? 'rgba(255,255,255,0.1)'
              : 'transparent',
        },
        onClick: () => router.push(`${pageRoutes.JOBS}?status=closed`),
      }}
      isJobAll={router.query.status === 'all'}
      activeCount={
        jobsData?.jobs?.filter((job) => job.status == 'published').length || 0
      }
      allCount={jobsData?.jobs?.length || 0}
      inActiveCount={
        jobsData?.jobs?.filter((job) => job.status == 'draft').length || 0
      }
      closedCount={
        jobsData?.jobs?.filter((job) => job.status == 'closed').length || 0
      }
      isJobActive={router.query.status === 'published'}
      isJobInactive={router.query.status === 'draft'}
      isJobClosed={router.query.status === 'closed'}
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
          style: {
            borderRadius: '8px',
            backgroundColor:
              router.query.status === 'all'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
          },
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=all`);
          },
        }}
        inProgressCount={allFilter['in progress']}
        isInProgressActive={router.query.status === 'in progress'}
        onClickInProgress={{
          style: {
            borderRadius: '8px',
            backgroundColor:
              router.query.status === 'in progress'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
          },
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=in progress`);
          },
        }}
        resolvedCount={allFilter.Resolved}
        isResolvedActive={router.query.status === 'resolved'}
        onClickResolve={{
          style: {
            borderRadius: '8px',
            backgroundColor:
              router.query.status === 'resolved'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
          },
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=resolved`);
          },
        }}
        openCount={allFilter.open}
        isOpenActive={router.query.status === 'open'}
        onClickOpen={{
          style: {
            borderRadius: '8px',
            backgroundColor:
              router.query.status === 'open'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
          },
          onClick: () => {
            router.push(`${pageRoutes.SUPPORT}?status=open`);
          },
        }}
        onHoldCount={allFilter['on hold']}
        isOnHoldActive={router.query.status === 'on hold'}
        onClickOnHold={{
          style: {
            borderRadius: '8px',
            backgroundColor:
              router.query.status === 'on hold'
                ? 'rgba(255,255,255,0.1)'
                : 'transparent',
          },
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
    icon: <RsnJobsIcon />,
    text: 'Jobs',
    SubComponents: <JobSubNavbar />,
    route: pageRoutes.JOBS,
    comingsoon: false,
  },
  {
    icon: <RsnDatabaseIcon />,
    text: 'Candidates',
    SubComponents: null,
    route: pageRoutes.CANDIDATES,
    comingsoon: true,
  },
  {
    icon: <RsnTicketsIcon />,
    text: 'Tickets',
    SubComponents: <SupportSubNavbar />,
    route: pageRoutes.SUPPORT,
    comingsoon: false,
  },
  {
    icon: <RsnSettingsIcon />,
    text: 'Company Settings',
    SubComponents: null,
    route: pageRoutes.COMPANY,
    comingsoon: false,
  },
];
