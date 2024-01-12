import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { NavCd, NavCompanySetting, NavJobs } from '@/devlink';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
// import { useSupportContext } from '@/src/context/SupportContext/SupportContext';
import { pageRoutes } from '@/src/utils/pageRouting';
function SideNavbar() {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();

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
              router.pathname.includes(item.route) && 'rgba(233, 235, 237, 0.5)'
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

const navList = [
  {
    icon: <NavJobs isActive={false} />,
    text: 'Jobs',
    SubComponents: null,
    route: pageRoutes.JOBS,
    comingsoon: false,
  },
  {
    icon: <NavCd isActive={false} />,
    text: 'Candidates',
    SubComponents: null,
    route: pageRoutes.CANDIDATES,
    comingsoon: true,
  },
  // {
  //   icon: <RsnTicketsIcon />,
  //   text: 'Tickets',
  //   SubComponents: <SupportSubNavbar />,
  //   route: pageRoutes.SUPPORT,
  //   comingsoon: false,
  // },
  // {
  //   icon: <AssistantIcon />,
  //   text: 'Assistant',
  //   SubComponents: null,
  //   route: pageRoutes.ASSISTANT,
  //   comingsoon: false,
  // },
  {
    icon: <NavCompanySetting isActive={false} />,
    text: 'Company Settings',
    SubComponents: null,
    route: pageRoutes.COMPANY,
    comingsoon: false,
  },
];

// function AssistantIcon() {
//   return (
//     <svg
//       width='16'
//       height='16'
//       viewBox='0 0 16 16'
//       fill='none'
//       xmlns='http://www.w3.org/2000/svg'
//     >
//       <path
//         d='M2.60001 6.05C2.62918 6.85208 2.9573 7.55937 3.58438 8.17187C3.68647 8.28854 3.70834 8.41979 3.65001 8.56562C3.41668 9.01771 3.13959 9.45521 2.81876 9.87812C3.51876 9.80521 4.18959 9.61562 4.83126 9.30937C4.94793 9.25104 5.07918 9.18542 5.22501 9.1125C5.28334 9.08333 5.35626 9.07604 5.44376 9.09062C5.77918 9.16354 6.11459 9.2 6.45001 9.2C7.58751 9.17083 8.50626 8.85 9.20626 8.2375C9.92084 7.625 10.2854 6.89583 10.3 6.05C10.2854 5.20417 9.92084 4.475 9.20626 3.8625C8.50626 3.25 7.58751 2.92917 6.45001 2.9C5.31251 2.92917 4.39376 3.25 3.69376 3.8625C2.97918 4.475 2.61459 5.20417 2.60001 6.05ZM6.45001 2.2C7.73334 2.22917 8.80522 2.60833 9.66563 3.3375C10.5261 4.05208 10.9708 4.95625 11 6.05C10.9708 7.14375 10.5261 8.05521 9.66563 8.78437C8.80522 9.49896 7.73334 9.87083 6.45001 9.9C6.10001 9.9 5.7573 9.87083 5.42188 9.8125C5.3198 9.85625 5.21772 9.9 5.11563 9.94375C4.28438 10.3375 3.38751 10.5562 2.42501 10.6C2.20626 10.5854 2.04584 10.476 1.94376 10.2719C1.85626 10.0677 1.88543 9.88542 2.03126 9.725H2.05313C2.37397 9.34583 2.65834 8.92292 2.90626 8.45625C2.61459 8.13542 2.37397 7.77083 2.18438 7.3625C1.9948 6.96875 1.90001 6.53125 1.90001 6.05C1.92918 4.95625 2.37397 4.05208 3.23438 3.3375C4.0948 2.60833 5.16668 2.22917 6.45001 2.2ZM11.6781 5.72187C11.6636 5.47396 11.6271 5.23333 11.5688 5C12.8083 5.07292 13.8292 5.46667 14.6313 6.18125C15.4479 6.91042 15.8708 7.8 15.9 8.85C15.9 9.33125 15.8052 9.76875 15.6156 10.1625C15.4261 10.5708 15.1854 10.9354 14.8938 11.2562C15.1417 11.7229 15.4333 12.1458 15.7688 12.525C15.9 12.6854 15.9292 12.875 15.8563 13.0938C15.7542 13.2833 15.5938 13.3854 15.375 13.4C14.4125 13.3563 13.5156 13.1375 12.6844 12.7438C12.5823 12.7 12.4802 12.649 12.3781 12.5906C12.0427 12.6635 11.7 12.7 11.35 12.7C10.4458 12.6854 9.62918 12.4885 8.90001 12.1094C8.18543 11.7156 7.63855 11.1979 7.25938 10.5562C7.5073 10.5125 7.75522 10.4615 8.00313 10.4031C8.32397 10.8698 8.77605 11.249 9.35938 11.5406C9.92813 11.8323 10.5917 11.9854 11.35 12C11.6854 12 12.0208 11.9635 12.3563 11.8906C12.4438 11.876 12.524 11.8833 12.5969 11.9125C12.7281 11.9854 12.8594 12.051 12.9906 12.1094C13.6177 12.401 14.2813 12.5906 14.9813 12.6781C14.6604 12.2552 14.3833 11.8177 14.15 11.3656C14.0917 11.2198 14.1136 11.0885 14.2156 10.9719C14.8427 10.3594 15.1708 9.65208 15.2 8.85C15.1854 8.04792 14.8573 7.34792 14.2156 6.75C13.574 6.15208 12.7281 5.80937 11.6781 5.72187Z'
//         fill='white'
//         // style='fill:white;fill:white;fill-opacity:1;'
//       />
//     </svg>
//   );
// }
