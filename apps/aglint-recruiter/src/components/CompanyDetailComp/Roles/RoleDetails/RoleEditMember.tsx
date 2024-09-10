import { AlertCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { updateMember } from '@/context/AuthContext/utils';
import { useAllMembers } from '@/queries/members';
import { useRoleAndPermissionsHook } from '@/queries/RolesSettings';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Card } from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';

function RoleEditMember({
  role,
  close,
}: {
  role: { role: string; id: string; assignedTo: string[] };
  close: () => void;
}) {
  const { members } = useAllMembers();
  const { refetch } = useRoleAndPermissionsHook();
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<
    (typeof members)[number] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredMember = members
    .filter(
      (member) =>
        member.role_id !== role.id &&
        !(role.assignedTo || []).includes(member.user_id),
    )
    .filter(
      (member) =>
        `${member.first_name || ''} ${member.last_name || ''}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        member.role.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <Dialog open={true} onOpenChange={close}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update Role</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          {selectedMember ? (
            <>
              <Alert variant='destructive'>
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
                  <Avatar className='h-12 w-12 mr-4'>
                    <AvatarImage
                      src={selectedMember.profile_image}
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
                <Card className='flex items-center p-4 border border-dashed'>
                  <Avatar className='h-12 w-12 mr-4'>
                    <AvatarImage
                      src={selectedMember.profile_image}
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
                    <p className='text-sm text-muted-foreground'>{role.role}</p>
                  </div>
                </Card>
              </div>
            </>
          ) : (
            <>
              <Input
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
                    className='cursor-pointer hover:bg-accent p-4 flex items-center'
                    onClick={() => setSelectedMember(member)}
                  >
                    <Avatar className='h-10 w-10 mr-4'>
                      <AvatarImage
                        src={member.profile_image}
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
                      <p className='text-sm text-muted-foreground'>
                        {member.role}
                      </p>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true);
              await updateMember({
                data: {
                  user_id: selectedMember.user_id,
                  role_id: role.id,
                },
              });
              refetch();
              setIsLoading(false);
              close();
            }}
            disabled={!selectedMember || isLoading}
          >
            {isLoading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RoleEditMember;
