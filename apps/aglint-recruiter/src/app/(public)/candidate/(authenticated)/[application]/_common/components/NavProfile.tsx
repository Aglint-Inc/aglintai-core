import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

import type { useCandidatePortalNavbar } from 'src/app/(public)/candidate/(authenticated)/[application]/_common/hooks';

export default function NavProfile({
  candidate,
}: {
  application_id: string;
  candidate: NonNullable<
    ReturnType<typeof useCandidatePortalNavbar>['data']
  >['candidate'];
}) {
  return (
    <Avatar className='h-10 w-10 cursor-pointer rounded-md'>
      <AvatarImage
        className='rounded-md object-cover'
        src={candidate?.avatar ?? ''}
        alt={candidate?.first_name}
      />
      <AvatarFallback className='rounded-md'>
        {candidate.first_name.charAt(0) + candidate?.last_name?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
