import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

export const BreadCrumb = ({
  AllRoles,
  name,
}: {
  AllRoles: {
    role: string;
    id: string;
    count: { users: number; permissions: number };
    switchRole: () => void;
  }[];
  name: string;
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/company?tab=roles'>Roles</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-1'>
              <span>{capitalizeFirstLetter(name)}</span>
              {/* <ChevronDownCircle size={12}> */}
              <BreadcrumbEllipsis className='h-4 w-4' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
              {AllRoles.map((item) => (
                <DropdownMenuItem key={item.id} onClick={item.switchRole}>
                  {capitalizeFirstLetter(item.role)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
