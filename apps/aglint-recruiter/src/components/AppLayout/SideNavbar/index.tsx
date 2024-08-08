import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { NavLink } from '@/devlink/NavLink';
import { AssistantLogo } from '@/devlink2/AssistantLogo';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import toast from '@/src/utils/toast';

import AllCandidates from '../IconsSideBar/AllCandidates';
import CompanySettingsIcon from '../IconsSideBar/CompanySettingsIcon';
import IntegrationIcon from '../IconsSideBar/IntegrationIcon';
import Interviewers from '../IconsSideBar/Interviewers';
import InterviewTypeIcon from '../IconsSideBar/InterviewType';
import JobsIcon from '../IconsSideBar/JobsIcon';
import SchedulerIcon from '../IconsSideBar/SchedulerIcon';
import SourcingHubIcon from '../IconsSideBar/SourcingHubIcon';
import TaskIcon from '../IconsSideBar/TaskIcon';
import WorkFlowIcon from '../IconsSideBar/WorkFlowIcon';
import { LinkProps } from './type';
import { navList } from './utils';

function SideNavbar() {
  const router = useRouter();
  const pathName = router.pathname;
  const { checkPermissions } = useRolesAndPermissions();

  useEffect(() => {
    const tempR = navList.find((item) => {
      return pathName?.includes(item.route.split('?')[0]);
    })?.permission;
    if (tempR && !checkPermissions(tempR)) {
      toast.error('This section of the application is not accessible to you.');
      router.back();
    }
  }, [pathName]);

  return (
    <>
      {navList
        .filter((item) =>
          item.permission ? checkPermissions(item.permission) : true,
        )
        .filter((item) => item.isVisible)
        .map((item) => {
          return (
            <LinkComp
              module={item.text}
              key={item.text}
              path={item.route}
              active={item.active}
            />
          );
        })}
    </>
  );
}

export default SideNavbar;

const LinkIcon = ({
  module,
  active,
}: {
  module: LinkProps['module'];
  active: boolean;
}) => {
  switch (module) {
    case 'Aglint AI':
      return <AssistantLogo isActive={active}/>;
    case 'Jobs':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<JobsIcon />}
        />
      );
    case 'Dashboard':
      return (
        <NavLink
          texttooltip={module}
          isActive={active}
          slotIcon={<SchedulerIcon />}
        />
      );
    case 'Interview Types':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<InterviewTypeIcon />}
        />
      );
    case 'Candidates':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<AllCandidates />}
        />
      );
    case 'Interviewers':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Interviewers />}
        />
      );
    case 'Sourcing Hub':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<SourcingHubIcon />}
        />
      );
    case 'Integrations':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<IntegrationIcon />}
        />
      );
    case 'Company Settings':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<CompanySettingsIcon />}
        />
      );
    case 'Workflows':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<WorkFlowIcon />}
        />
      );
    case 'Tasks':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<TaskIcon />}
        />
      );
    case 'Requests':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<TaskIcon />}
        />
      );
  }
};

const LinkComp = ({
  module,
  path,
  active = [],
}: {
  module: LinkProps['module'];
  path: LinkProps['path'] | string;
  active: string[];
}) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <LinkIcon
        module={module}
        active={
          router.pathname === '/user/profile/[user_id]'
            ? router.query.company && active.includes(router.pathname)
            : active.includes(router.pathname)
        }
      />
    </Link>
  );
};
