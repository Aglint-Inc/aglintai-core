import { useToast } from '@components/hooks/use-toast';
import { Checkbox } from '@components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ScrollArea } from '@components/ui/scroll-area';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { capitalize, debounce } from 'lodash';
import { ChevronDown, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import SearchField from '@/components/Common/SearchField/SearchField';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';
import { supabase } from '@/utils/supabase/client';

import { setCreatedBy, useFilterModuleStore } from '../../filter-store';

type UserType = {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
  role: string;
  profile_image: string;
};

function FilterCreatedBy() {
  const { toast } = useToast();
  const { recruiter } = useAuthDetails();
  const [members, setMembers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const createdBy = useFilterModuleStore((state) => state.created_by);
  const [createSearchText, setCreateSeachText] = useState('');

  useEffect(() => {
    handleSearch('');
  }, []);

  const handleSearch = (value: string) => {
    setCreateSeachText(value);
    debouncedHandleSearch(value);
  };

  const debouncedHandleSearch = debounce(async (value: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('search_members', {
        recruiter_id_param: recruiter.id,
        name_param: value,
      });

      if (error) throw new Error(error.message);

      const membersMap = (data as { member_info: UserType }[]).map((user) => ({
        user_id: user.member_info.user_id,
        email: user.member_info.email,
        first_name: user.member_info.first_name,
        last_name: user.member_info.last_name,
        position: user.member_info.position,
        role: user.member_info.role,
        profile_image: user.member_info.profile_image,
      }));

      setMembers(membersMap);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e.message,
      });
    } finally {
      setLoading(false);
    }
  }, 300);

  const handleFilterClick = (user_id: string) => {
    if (createdBy.includes(user_id)) {
      setCreatedBy(createdBy.filter((l) => l != user_id));
    } else {
      setCreatedBy([...createdBy, user_id]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonFilter
          isActive={createdBy.length > 0}
          isDotVisible={createdBy.length > 0}
          onClickStatus={{
            id: 'cordinator' + 'click',
            style: {
              whiteSpace: 'nowrap',
              height: '100%',
            },
          }}
          textLabel={'Created by'}
          slotRightIcon={
            <ChevronDown
              size={16}
              color={'var(--neutral-2)'}
              className='transition-transform duration-200 ease-in-out'
            />
          }
        />
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0' align='start'>
        <FilterDropdown
          slotOption={
            <div className='flex flex-col'>
              <div className='p-2'>
                <SearchField
                  value={createSearchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search users'
                  isFullWidth
                  onClear={() => handleSearch('')}
                />
              </div>
              {loading && (
                <div className='h-1 w-full bg-blue-200'>
                  <div
                    className='h-1 animate-pulse bg-blue-600'
                    style={{ width: '50%' }}
                  ></div>
                </div>
              )}
              <ScrollArea className='h-[290px]'>
                {members.length > 0 ? (
                  members.map((item, index) => (
                    <div
                      key={index}
                      className='flex cursor-pointer items-center space-x-2 rounded p-2 hover:bg-neutral-100'
                      onClick={() => handleFilterClick(item.user_id)}
                    >
                      <Checkbox checked={createdBy.includes(item.user_id)} />
                      <MuiAvatar
                        src={item.profile_image}
                        level={getFullName(item.first_name, item.last_name)}
                      />
                      <span className='text-sm font-medium'>
                        {capitalize(item.first_name)}
                      </span>
                      <span className='text-xs text-gray-500'>
                        - {item.position}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className='flex h-full flex-col items-center justify-center'>
                    <User size={16} className='text-neutral-400' />
                    <span className='text-sm text-neutral-400'>
                      No user found
                    </span>
                  </div>
                )}
              </ScrollArea>
            </div>
          }
          isRemoveVisible={false}
          onClickDelete={{
            onClick: () => {
              setCreatedBy([]);
            },
          }}
          onClickReset={{
            onClick: () => {
              setCreatedBy([]);
            },
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default FilterCreatedBy;
