import { BriefcaseBusiness, Calendar, LayoutGrid, LayoutList, LibraryBig, ListTodo, Search, Settings, Users, Workflow } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

import { useRolesAndPermissions } from '@/src/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import toast from '@/src/utils/toast';

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
    <div className="flex flex-col items-center space-y-4 p-4 w-16">
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
    </div>
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
  const baseClasses = "flex flex-col items-center space-y-2 p-2 rounded-md transition-colors duration-200";
  const activeClasses = active ? "bg-gray-200 text-black" : "text-gray-500";
  const hoverClasses = "hover:bg-gray-200";

  const iconMap = {
    'Requests': <LayoutList className="w-6 h-6" strokeWidth={1.5}/>,
    'Jobs': <BriefcaseBusiness className="w-6 h-6" strokeWidth={1.5}/>,
    'Interviews': <Calendar className="w-6 h-6" strokeWidth={1.5}/>,
    'Interview Types': <LibraryBig className="w-6 h-6" strokeWidth={1.5}/>,
    'Candidates': <Users className="w-6 h-6" strokeWidth={1.5}/>,
    'Interviewers': <Users className="w-6 h-6" strokeWidth={1.5}/>,
    'Sourcing Hub': <Search className="w-6 h-6" strokeWidth={1.5}/>,
    'Integrations': <LayoutGrid className="w-6 h-6" strokeWidth={1.5}/>,
    'Company Settings': <Settings className="w-6 h-6" strokeWidth={1.5}/>,
    'Workflows': <Workflow className="w-6 h-6" strokeWidth={1.5}/>,
    'Tasks': <ListTodo className="w-6 h-6" strokeWidth={1.5}/>,
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`${baseClasses} ${activeClasses} ${hoverClasses}`}>
            {iconMap[module]}
          </div>
        </TooltipTrigger>
        <TooltipContent align='center' side='right'>
          <p>{module}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
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
    <Link href={path} legacyBehavior>
      <a>
        <LinkIcon module={module} active={active.includes(router.pathName)} />
      </a>
    </Link>
  );
};
