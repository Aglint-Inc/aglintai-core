import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@components/ui/dropdown-menu';
// import { LogOut, User } from 'lucide-react';
// import Link from 'next/link';
import type { useCandidatePortalNavbar } from '@/candidate/authenticated/hooks';

export default function NavProfile({
  // application_id,
  candidate,
}: {
  application_id: string;
  candidate: ReturnType<typeof useCandidatePortalNavbar>['data']['candidate'];
}) {
  return (
    <Avatar className='h-10 w-10 cursor-pointer rounded-md'>
      <AvatarImage
        className='rounded-md object-cover'
        src={candidate?.avatar}
        alt='@shadcn'
      />
      <AvatarFallback className='rounded-md'>
        {candidate.first_name.charAt(0) + candidate.last_name.charAt(0)}
      </AvatarFallback>
    </Avatar>

    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Avatar className='w-10 h-10 cursor-pointer rounded-md'>
    //       <AvatarImage
    //         className='object-cover rounded-md'
    //         src={candidate?.avatar}
    //         alt='@shadcn'
    //       />
    //       <AvatarFallback className='bg-primary rounded-mds text-primary-foreground'>
    //         {candidate.first_name.slice(0, 2)}
    //       </AvatarFallback>
    //     </Avatar>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent
    //     className='w-56 border-none'
    //     align='end'
    //     side='bottom'
    //   >
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuGroup>
    //       <Link href={`/candidate/${application_id}/profile`} passHref>
    //         <DropdownMenuItem>
    //           <User className='mr-2 h-4 w-4' />
    //           <span>My profile</span>
    //         </DropdownMenuItem>
    //       </Link>
    //     </DropdownMenuGroup>
    //     <DropdownMenuSeparator />

    //     <DropdownMenuItem>
    //       <LogOut className='mr-2 h-4 w-4' />
    //       <span>Log out</span>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
