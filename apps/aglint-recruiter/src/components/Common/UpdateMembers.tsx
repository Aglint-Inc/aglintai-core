/* eslint-disable no-unused-vars */
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import React, { useState } from 'react';

import UITextField from '@/components/Common/UITextField';

import MemberCard from './MemberCard';

function UpdateMembers({
  updateButton,
  handleChange,
  side = 'left',
}: {
  updateButton: React.ReactNode;
  handleChange: (member: MemberType) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  const { data: members } = useMemberList();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  if (!members) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{updateButton}</PopoverTrigger>
      <PopoverContent
        className='min-w-450 flex flex-col gap-4 p-2'
        align='start'
        side={side}
      >
        <UITextField
          placeholder='Search members'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='w-full h-8'
          width={'100%'}
        />
        <div className='flex flex-col space-y-2 max-h-[300px] overflow-auto'>
          {members
            .filter((member) =>
              member.first_name.toLowerCase().includes(value.toLowerCase()),
            )
            .map((member) => (
              <Label
                key={member.user_id}
                onClick={() => {
                  handleChange(member);
                  setOpen(false);
                }}
                className='cursor-pointer hover:bg-slate-200 p-2 rounded-md'
              >
                <MemberCard selectedMember={member} />
              </Label>
            ))}
          {members.filter((member) =>
            member.first_name.toLowerCase().includes(value.toLowerCase()),
          ).length === 0 ? (
            <p>No member found</p>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateMembers;

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { type MemberType } from '@/components/Scheduling/InterviewTypes/types';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type BodyParamsFetchUserDetails } from '@/pages/api/scheduling/fetchUserDetails';

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
