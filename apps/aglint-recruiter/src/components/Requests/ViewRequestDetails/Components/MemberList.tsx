/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import { Avatar, Popover, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { AssignedNameCard } from '@/devlink2/AssignedNameCard';
import { AssignedToList } from '@/devlink2/AssignedToList';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { MemberType } from '@/src/components/Scheduling/InterviewTypes/types';
import { useRequests } from '@/src/context/RequestsContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

function MemberList({
  members,
  selectedMemberId,
}: {
  members: MemberType[];
  selectedMemberId: string;
}) {
  const { handleAsyncUpdateRequest } = useRequests();
  const { query } = useRouter();

  const selectedMembers = members.find(
    (member) => member.user_id === selectedMemberId,
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div
        //@ts-ignore
        onClick={handleClick}
        style={{
          paddingBottom: '5px',
        }}
      >
        {selectedMembers?.user_id ? (
          <AssignedNameCard
            textName={getFullName(
              selectedMembers?.first_name,
              selectedMembers?.last_name,
            )}
            textRole={selectedMembers?.position}
            slotImage={
              <Avatar variant='rounded' src={selectedMembers?.profile_image} />
            }
          />
        ) : (
          <RequestCardSkeleton />
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack maxHeight={'300px'} overflow={'auto'} width={'375px'}>
          {members
            .filter(({ user_id }) => user_id !== selectedMemberId)
            .map((member) => (
              <AssignedToList
                key={member.user_id}
                onClickCard={{
                  onClick: async () => {
                    setAnchorEl(null);
                    await handleAsyncUpdateRequest({
                      payload: {
                        requestId: String(query?.id),
                        requestPayload: {
                          assignee_id: member.user_id,
                        },
                      },
                      loading: false,
                      toast: false,
                    });
                  },
                }}
                textName={getFullName(member.first_name, member.last_name)}
                textRole={capitalizeFirstLetter(member.role)}
                slotImage={
                  <Avatar src={member.profile_image} variant='rounded' />
                }
              />
            ))}
        </Stack>
      </Popover>
    </>
  );
}

export default MemberList;
