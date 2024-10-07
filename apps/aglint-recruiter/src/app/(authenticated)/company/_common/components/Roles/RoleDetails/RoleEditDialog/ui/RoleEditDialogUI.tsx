import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Card } from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';

import UITextField from '@/common/UITextField';
import type { useTenantMembers } from '@/company/hooks';

type props = {
  selectedMember: ReturnType<typeof useTenantMembers>['members'][number];
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  filteredMember: ReturnType<typeof useTenantMembers>['members'];
  setSelectedMember: Dispatch<
    SetStateAction<
      ReturnType<typeof useTenantMembers>['members'][number] | null
    >
  >;
  role: string;
};
export const RoleEditDialogUI = ({
  selectedMember,
  search,
  setSearch,
  filteredMember,
  setSelectedMember,
  role,
}: props) => {
  return (
    <div className='space-y-4'>
      {selectedMember ? (
        <>
          <Alert variant='error'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              You are about to update{' '}
              {`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
              &apos;s role.
            </AlertDescription>
          </Alert>
          <div className='space-y-2'>
            <Card className='flex items-center p-4'>
              <Avatar className='mr-4 h-12 w-12'>
                <AvatarImage
                  src={selectedMember.profile_image || ''}
                  alt={`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                />
                <AvatarFallback>
                  {`${selectedMember.first_name?.[0] || ''}${selectedMember.last_name?.[0] || ''}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium'>
                  {`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                </h3>
                <p className='text-sm text-muted-foreground'>
                  {selectedMember.role}
                </p>
              </div>
            </Card>
            <ChevronDown className='mx-auto h-4 w-4' />
            <Card className='flex items-center border border-dashed p-4'>
              <Avatar className='mr-4 h-12 w-12'>
                <AvatarImage
                  src={selectedMember.profile_image || ''}
                  alt={`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                />
                <AvatarFallback>
                  {`${selectedMember.first_name?.[0] || ''}${selectedMember.last_name?.[0] || ''}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium'>
                  {`${selectedMember.first_name || ''} ${selectedMember.last_name || ''}`.trim()}
                </h3>
                <p className='text-sm text-muted-foreground'>{role}</p>
              </div>
            </Card>
          </div>
        </>
      ) : (
        <>
          <UITextField
            type='search'
            placeholder='Search users to Add'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full'
          />
          <ScrollArea className='h-[200px]'>
            {filteredMember.map((member) => (
              <Card
                key={member.user_id}
                className='m-1 flex cursor-pointer items-center p-4 hover:bg-accent'
                onClick={() => setSelectedMember(member)}
              >
                <Avatar className='mr-4 h-10 w-10'>
                  <AvatarImage
                    src={member.profile_image || ''}
                    alt={`${member.first_name || ''} ${member.last_name || ''}`.trim()}
                  />
                  <AvatarFallback>
                    {`${member.first_name?.[0] || ''}${member.last_name?.[0] || ''}`.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='font-medium'>
                    {`${member.first_name || ''} ${member.last_name || ''}`.trim()}
                  </h3>
                  <p className='text-sm text-muted-foreground'>{member.role}</p>
                </div>
              </Card>
            ))}
          </ScrollArea>
        </>
      )}
    </div>
  );
};
