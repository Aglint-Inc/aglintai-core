import { useToast } from '@components/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  BriefcaseBusiness,
  Calendar,
  GitGraph,
  LayoutGrid,
  LayoutList,
  LibraryBig,
  ListTodo,
  Search,
  Settings,
  Users,
  Workflow,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { useRouterPro } from '@/hooks/useRouterPro';

import { type LinkProps } from './type';
import { navList } from './utils';

function SideNavbar() {
  const router = useRouterPro();
  const pathName = router.pathName;
  const { checkPermissions } = useRolesAndPermissions();
  const { toast } = useToast();

  useEffect(() => {
    const tempR = navList.find((item) => {
      return pathName?.includes(item.route.split('?')[0]);
    })?.permission;
    if (tempR && !checkPermissions(tempR)) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description:
          'This section of the application is not accessible to you.',
      });
      router.back();
    }
  }, [pathName, checkPermissions, router, toast]);

  return (
    <div className='flex flex-col items-center space-y-3 p-4 w-16'>
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
  const baseClasses =
    'flex flex-col items-center space-y-2 p-2 rounded-md transition-colors duration-200';
  const activeClasses = active ? 'bg-gray-200 text-black' : 'text-gray-500';
  const hoverClasses = 'hover:bg-gray-200';

  const iconMap = {
    Requests: <LayoutList className='w-6 h-6' strokeWidth={1.5} />,
    Jobs: <BriefcaseBusiness className='w-6 h-6' strokeWidth={1.5} />,
    Interviews: <Calendar className='w-6 h-6' strokeWidth={1.5} />,
    'Interview Pools': <LibraryBig className='w-6 h-6' strokeWidth={1.5} />,
    Candidates: <Users className='w-6 h-6' strokeWidth={1.5} />,
    Interviewers: <Users className='w-6 h-6' strokeWidth={1.5} />,
    'Sourcing Hub': <Search className='w-6 h-6' strokeWidth={1.5} />,
    Integrations: <LayoutGrid className='w-6 h-6' strokeWidth={1.5} />,
    'Company Settings': <Settings className='w-6 h-6' strokeWidth={1.5} />,
    Workflows: <Workflow className='w-6 h-6' strokeWidth={1.5} />,
    Tasks: <ListTodo className='w-6 h-6' strokeWidth={1.5} />,
    Analytics: <GitGraph className='w-6 h-6' strokeWidth={1.5} />,
  };

  return (
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
    <Link href={path} passHref>
      <LinkIcon module={module} active={active.includes(router.pathName)} />
    </Link>
  );
};
