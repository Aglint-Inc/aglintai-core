/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { AssignedNameCard } from '@devlink2/AssignedNameCard';
import { AssignedToList } from '@devlink2/AssignedToList';
import { RequestCardSkeleton } from '@devlink2/RequestCardSkeleton';
import { Avatar, Popover, Stack, TextField } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { type Dispatch, useEffect, useState } from 'react';

import axios from '@/client/axios';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import {
  type BodyParamsFetchUserDetails,
  type CompanyMembersAPI,
} from '@/pages/api/scheduling/fetchUserDetails';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
type MemberType = CompanyMembersAPI[number];
function MemberList({
  members,
  selectedMemberId,
  width,
  onChange,
}: {
  members: any;
  selectedMemberId: string;
  width?: string;
  onChange?: Dispatch<string>;
}) {
  const selectedMembers =
    members && members.find((member) => member.user_id === selectedMemberId);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [filteredMembers, setFilteredMembers] = useState<MemberType[]>([]);
  useEffect(() => {
    if (members) {
      setFilteredMembers(members);
    }
  }, [members]);
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
        {members ? (
          <AssignedNameCard
            textName={getFullName(
              selectedMembers?.first_name,
              selectedMembers?.last_name,
            )}
            textRole={capitalizeFirstLetter(selectedMembers?.role)}
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
        <TextField
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          fullWidth
          sx={{
            p: '10px',
          }}
          placeholder='Search by name.'
          onChange={(e) => {
            const text = String(e.target.value).toLowerCase();
            setFilteredMembers(
              members.filter((ele) =>
                ele.first_name.toLowerCase().includes(text),
              ),
            );
          }}
        />
        {filteredMembers.length === 0 && (
          <GlobalEmptyState iconName={'Search'} textDesc={'No members found'} />
        )}
        <Stack maxHeight={'250px'} overflow={'auto'} width={width}>
          {filteredMembers
            .filter(({ user_id }) => user_id !== selectedMemberId)
            .map((member) => (
              <AssignedToList
                key={member.user_id}
                onClickCard={{
                  onClick: async () => {
                    setAnchorEl(null);
                    onChange(member.user_id);
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

export const useMemberList = () => {
  const { recruiter_id } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_members_list', recruiter_id],
    refetchInterval: 30000,
    refetchOnMount: true,
    queryFn: () => getMembersList({ recruiter_id }),
    gcTime: 20000,
    enabled: !!recruiter_id,
  });

  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_members_list', recruiter_id],
    });
  return { ...query, refetch };
};

const getMembersList = async ({ recruiter_id }: { recruiter_id: string }) => {
  const bodyParams: BodyParamsFetchUserDetails = {
    recruiter_id: recruiter_id,
    includeSupended: true,
  };
  const resMem = (await axios.post(
    '/api/scheduling/fetchUserDetails',
    bodyParams,
  )) as { data: MemberType[] };

  return resMem.data;
};
