import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import React from 'react';

// import { capitalizeFirstLetter } from '@/utils/text/textUtils';

function MemberCard({
  selectedMember,
}: {
  selectedMember: {
    first_name: string | null | undefined;
    last_name: string | null | undefined;
    profile_image: string | null | undefined;
    role: string | null | undefined;
  };
}) {
  // MemberType should be a type from the API or global
  return (
    <div className='flex items-center space-x-3'>
      {selectedMember?.profile_image &&
      selectedMember?.first_name &&
      selectedMember?.last_name ? (
        <Avatar className='w-6 h-6 rounded-sm'>
          <AvatarImage src={selectedMember?.profile_image} />
          <AvatarFallback className='w-6 h-6 rounded-sm'>
            {selectedMember?.first_name.slice(0, 1)}
            {selectedMember?.last_name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      ) : (
        ''
      )}

      <div>
        {selectedMember?.first_name && selectedMember?.last_name ? (
          <p className=''>
            {getFullName(selectedMember?.first_name, selectedMember?.last_name)}
          </p>
        ) : (
          ''
        )}

        {/* {selectedMember?.role ? (
          <p className='text-xs text-muted-foreground'>
            {capitalizeFirstLetter(selectedMember?.role)}
          </p>
        ) : (
          ''
        )} */}
      </div>
    </div>
  );
}

export default MemberCard;
