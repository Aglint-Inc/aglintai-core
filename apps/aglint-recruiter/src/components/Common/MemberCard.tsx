import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import React from 'react';

import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function MemberCard({
  selectedMember,
}: {
  selectedMember: {
    first_name: string;
    last_name: string;
    profile_image: string;
    role: string;
  };
}) {
  // MemberType should be a type from the API or global
  return (
    <div className='flex items-center space-x-3'>
      <Avatar>
        <AvatarImage src={selectedMember?.profile_image} />
        <AvatarFallback>
          {selectedMember?.first_name.slice(0, 1)}
          {selectedMember?.last_name.slice(0, 1)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className='font-medium'>
          {getFullName(selectedMember?.first_name, selectedMember?.last_name)}
        </p>
        <p className='text-sm text-gray-500'>
          {capitalizeFirstLetter(selectedMember?.role)}
        </p>
      </div>
    </div>
  );
}

export default MemberCard;
