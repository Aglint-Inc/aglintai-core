import { LogOut, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function NavProfile({ application_id }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='w-10 h-10 cursor-pointer rounded-md'>
          <AvatarImage src='/images/user-4.jpg' alt='@shadcn' />
          <AvatarFallback className='bg-primary text-primary-foreground'>
            FU
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56 border-none'
        align='end'
        side='bottom'
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/candidate/${application_id}/profile`} passHref>
            <DropdownMenuItem>
              <User className='mr-2 h-4 w-4' />
              <span>My profile</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
