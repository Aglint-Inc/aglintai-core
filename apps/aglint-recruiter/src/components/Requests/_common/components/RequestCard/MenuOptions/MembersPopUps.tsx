import { useEffect, useState } from 'react';
import { getFullName } from '@aglint/shared-utils';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { AssignedToList } from '@devlink2/AssignedToList';
import { useMemberList } from '@/components/Requests/ViewRequestDetails/Components/MemberList';
import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';
import { useRequests } from '@/context/RequestsContext';
import { type Request } from '@/queries/requests/types';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';
import { Input } from '@components/ui/input';
import { Skeleton } from '@components/ui/skeleton';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@components/ui/dialog';
import { Button } from '@components/ui/button';

function MembersPopUps({
  setOpenAssigneePopup = () => {},
  openAssigneePopup = false,
  selectedRequest = null,
}: {
  setOpenAssigneePopup?: any;
  openAssigneePopup?: boolean;
  selectedRequest?: Request;
}) {
  const { data: members, status } = useMemberList();
  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    if (members) {
      setFilteredMembers(members);
    }
  }, [members]);
  const [selectedMember, setSelectedMember] = useState<MemberType>(null);
  const { handleAsyncUpdateRequest } = useRequests();

  const handleConfirm = async () => {
    if (selectedMember?.user_id) {
      setOpenAssigneePopup(false);
      await handleAsyncUpdateRequest({
        payload: {
          requestId: selectedRequest?.id,
          requestPayload: {
            assignee_id: selectedMember?.user_id,
          },
        },
        loading: false,
        toast: false,
      });
      toast.success(
        `Request reassigned to ${getFullName(selectedMember.first_name, selectedMember.last_name)}`,
      );
    } else {
      toast.message('Please select a member');
    }
  };

  return (
    <Dialog
      open={openAssigneePopup}
      onOpenChange={(open) => setOpenAssigneePopup(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reassign Request</DialogTitle>
        </DialogHeader>
        <div>
          <p>{selectedRequest?.title}</p>
          <Input
            className='w-full p-2.5 mt-4'
            placeholder='Search by name.'
            onChange={(e) => {
              const text = e.target.value.toLowerCase();
              setFilteredMembers(
                members.filter((ele) =>
                  ele.first_name.toLowerCase().includes(text),
                ),
              );
            }}
          />

          {filteredMembers.length === 0 ? (
            <GlobalEmptyState
              iconName={'Search'}
              textDesc={'No members found'}
            />
          ) : status === 'success' ? (
            <div className='h-[150px] max-h-[150px] overflow-auto w-full mt-4'>
              {filteredMembers
                .filter(
                  ({ user_id }) => user_id !== selectedRequest?.assignee_id,
                )
                .map((member) => (
                  <AssignedToList
                    key={member.user_id}
                    onClickCard={{
                      onClick: () => {
                        setSelectedMember(member);
                      },
                      className: `rounded ${
                        selectedMember?.user_id === member.user_id
                          ? 'bg-black/[0.08]'
                          : ''
                      }`,
                    }}
                    textName={getFullName(member.first_name, member.last_name)}
                    textRole={capitalizeFirstLetter(member.role)}
                    slotImage={
                      <Image
                        src={member.profile_image}
                        alt={`${member.first_name} ${member.last_name}`}
                        width={32}
                        height={32}
                        className='rounded'
                      />
                    }
                  />
                ))}
            </div>
          ) : (
            <div className='h-[300px] overflow-auto space-y-1 w-full mt-4'>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpenAssigneePopup(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Change Assignee</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MembersPopUps;
