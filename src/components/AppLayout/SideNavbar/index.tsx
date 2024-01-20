import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useMemo } from 'react';

import {
  NavAssistant,
  NavCd,
  NavCompanySetting,
  NavJobs,
  NavTickets,
} from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { useSupportContext } from '@/src/context/SupportContext/SupportContext';
import { pageRoutes } from '@/src/utils/pageRouting';

function SideNavbar() {
  let isAssistantEnabled = posthog.isFeatureEnabled('isAssistantEnabled');
  let isSupportEnabled = posthog.isFeatureEnabled('isSupportEnabled');
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();

  const navList = [
    {
      icon: <NavJobs isActive={false} />,
      text: 'Jobs',
      SubComponents: null,
      route: pageRoutes.JOBS,
      comingsoon: false,
      isvisible: true,
    },
    {
      icon: <NavCd isActive={false} />,
      text: 'Candidates',
      SubComponents: null,
      route: pageRoutes.CANDIDATES,
      comingsoon: false,
      isvisible: true,
    },
    {
      icon: <NavTickets isActive={false} />,
      text: 'Tickets',
      SubComponents: null,
      route: pageRoutes.SUPPORT,
      comingsoon: false,
      isvisible: isSupportEnabled,
    },
    {
      icon: <NavAssistant isActive={false} />,
      text: 'Assistant',
      SubComponents: null,
      route: pageRoutes.ASSISTANT,
      comingsoon: false,
      isvisible: isAssistantEnabled,
    },
    {
      icon: <NavCompanySetting isActive={false} />,
      text: 'Company Settings',
      SubComponents: null,
      route: pageRoutes.COMPANY + '?tab=basic-info',
      comingsoon: false,
      isvisible: true,
    },
  ];

  const newNaveList = useMemo(() => {
    let tempList = navList;
    // if (recruiter?.id === process.env.NEXT_PUBLIC_DEFAULT_SUPPORT_COMPANY_ID) {
    //   tempList = tempList.filter((x) => x.route === pageRoutes.SUPPORT);
    // }
    if (recruiterUser?.role.toLowerCase() !== 'admin')
      tempList = tempList.filter((x) => x.text !== 'Company Settings');
    return tempList;
  }, [recruiter, recruiterUser]);
  return (
    <>
      {newNaveList.map((item, i) => {
        if (item.isvisible)
          return (
            <Stack
              key={i}
              onClick={() => {
                if (router.pathname !== item.route) {
                  router.push(item.route);
                }
              }}
              direction={'row'}
              alignItems={'center'}
              color={'white.700'}
              borderRadius={'10px'}
              bgcolor={
                router.pathname.includes(item.route?.replace('/history', '')) &&
                'rgba(233, 235, 237, 0.5)'
              }
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(233, 235, 237, 0.5)',
                },
              }}
            >
              {item.icon}
            </Stack>
          );
      })}
    </>
  );
}

export default SideNavbar;

// function SupportSubNavbar() {
//   const router = useRouter();
//   const { allFilter } = useSupportContext();
//   return (
//     <>
//       <TicketSublink
//         allCount={allFilter.all}
//         isAllActive={router.query.status === 'all'}
//         onClickAll={{
//           style: {
//             borderRadius: '8px',
//             backgroundColor:
//               router.query.status === 'all'
//                 ? 'rgba(255,255,255,0.1)'
//                 : 'transparent',
//           },
//           onClick: () => {
//             router.push(`${pageRoutes.SUPPORT}?status=all`);
//           },
//         }}
//         inProgressCount={allFilter['in progress']}
//         isInProgressActive={router.query.status === 'in progress'}
//         onClickInProgress={{
//           style: {
//             borderRadius: '8px',
//             backgroundColor:
//               router.query.status === 'in progress'
//                 ? 'rgba(255,255,255,0.1)'
//                 : 'transparent',
//           },
//           onClick: () => {
//             router.push(`${pageRoutes.SUPPORT}?status=in progress`);
//           },
//         }}
//         resolvedCount={allFilter.Resolved}
//         isResolvedActive={router.query.status === 'resolved'}
//         onClickResolve={{
//           style: {
//             borderRadius: '8px',
//             backgroundColor:
//               router.query.status === 'resolved'
//                 ? 'rgba(255,255,255,0.1)'
//                 : 'transparent',
//           },
//           onClick: () => {
//             router.push(`${pageRoutes.SUPPORT}?status=resolved`);
//           },
//         }}
//         openCount={allFilter.open}
//         isOpenActive={router.query.status === 'open'}
//         onClickOpen={{
//           style: {
//             borderRadius: '8px',
//             backgroundColor:
//               router.query.status === 'open'
//                 ? 'rgba(255,255,255,0.1)'
//                 : 'transparent',
//           },
//           onClick: () => {
//             router.push(`${pageRoutes.SUPPORT}?status=open`);
//           },
//         }}
//         onHoldCount={allFilter['on hold']}
//         isOnHoldActive={router.query.status === 'on hold'}
//         onClickOnHold={{
//           style: {
//             borderRadius: '8px',
//             backgroundColor:
//               router.query.status === 'on hold'
//                 ? 'rgba(255,255,255,0.1)'
//                 : 'transparent',
//           },
//           onClick: () => {
//             router.push(`${pageRoutes.SUPPORT}?status=on hold`);
//           },
//         }}
//       />
//     </>
//   );
// }
