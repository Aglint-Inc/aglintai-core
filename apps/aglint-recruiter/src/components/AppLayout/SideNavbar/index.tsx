import { BriefcaseBusiness, Calendar, LayoutGrid, LayoutList, LibraryBig, ListTodo, Search, Settings, Users, UsersRound, Workflow } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { NavLink } from '@/devlink/NavLink';
import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import toast from '@/src/utils/toast';

import AllCandidates from '../IconsSideBar/AllCandidates';
import CompanySettingsIcon from '../IconsSideBar/CompanySettingsIcon';
import IntegrationIcon from '../IconsSideBar/IntegrationIcon';
import Interviewers from '../IconsSideBar/Interviewers';
import InterviewTypeIcon from '../IconsSideBar/InterviewType';
import JobsIcon from '../IconsSideBar/JobsIcon';
import RequestIcon from '../IconsSideBar/RequestIcon';
import SchedulerIcon from '../IconsSideBar/SchedulerIcon';
import SourcingHubIcon from '../IconsSideBar/SourcingHubIcon';
import TaskIcon from '../IconsSideBar/TaskIcon';
import WorkFlowIcon from '../IconsSideBar/WorkFlowIcon';
import { LinkProps } from './type';
import { navList } from './utils';

function SideNavbar() {
  const router = useRouterPro();
  const pathName = router.pathName;
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
    case 'Requests':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<LayoutList strokeWidth={1.5} size={22} />}
        />
      );
    //return <AssistantLogo isActive={active} />;
    case 'Jobs':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<BriefcaseBusiness strokeWidth={1.5} size={22} />}
        />
      );
    case 'Interviews':
      return (
        <NavLink
          texttooltip={module}
          isActive={active}
          slotIcon={<Calendar strokeWidth={1.5} size={22} />}
        />
      );
    case 'Interview Types':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<LibraryBig strokeWidth={1.5} size={22} />}
        />
      );
    case 'Candidates':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Users strokeWidth={1.5} size={22} />}
        />
      );
    case 'Interviewers':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Users strokeWidth={1.5} size={22} />}
        />
      );
    case 'Sourcing Hub':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Search strokeWidth={1.5} size={22} />}
        />
      );
    case 'Integrations':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<LayoutGrid strokeWidth={1.5} size={22} />}
        />
      );
    case 'Company Settings':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Settings strokeWidth={1.5} size={22} />}
        />
      );
    case 'Workflows':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<Workflow strokeWidth={1.5} size={22} />}
        />
      );
    case 'Tasks':
      return (
        <NavLink
          isActive={active}
          texttooltip={module}
          slotIcon={<ListTodo strokeWidth={1.5} size={22} />}
        />
      );
    // case 'Requests':
    //   return (
    //     <NavLink
    //       isActive={active}
    //       texttooltip={module}
    //       slotIcon={<TaskIcon />}
    //     />
    //   );
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
  const router = useRouterPro();
  return (
    <Link href={path}>
      <LinkIcon module={module} active={active.includes(router.pathName)} />
    </Link>
  );
};
