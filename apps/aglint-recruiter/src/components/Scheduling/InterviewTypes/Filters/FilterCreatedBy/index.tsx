import { LinearProgress, Popover, Stack, Typography } from '@mui/material';
import { capitalize, debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { Checkbox } from '@/devlink/Checkbox';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [members, setMembers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const createdBy = useFilterModuleStore((state) => state.created_by);
  const [createSearchText, setCreateSeachText] = useState('');
  useEffect(() => {
    handleSearch('');
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'interview-panels' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (value) => {
    setCreateSeachText(value);
    debouncedHandleSearch(value);
  };

  const debouncedHandleSearch = debounce(async (value) => {
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

  const handleFilterClick = (user_id) => {
    if (createdBy.includes(user_id)) {
      setCreatedBy(createdBy.filter((l) => l != user_id));
    } else {
      setCreatedBy([...createdBy, user_id]);
    }
  };

  return (
    <>
      <ButtonFilter
        isActive={createdBy.length > 0}
        isDotVisible={createdBy.length > 0}
        onClickStatus={{
          id: 'cordinator' + 'click',
          onClick: handleClick,
        }}
        textLabel={'Created by'}
        slotRightIcon={
          <Stack>
            <GlobalIcon
              iconName={anchorEl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
            />
          </Stack>
        }
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{ vertical: -10, horizontal: 0 }}
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: 'var(--radius-4)',
            borderColor: 'var(--neutral-6)',
            minWidth: '176px',
          },
        }}
      >
        <FilterDropdown
          slotOption={
            <Stack minWidth={'300px'}>
              <Stack height={'40px'}>
                <SearchField
                  value={createSearchText}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder='Search users'
                  isFullWidth
                  onClear={() => handleSearch('')}
                />
                <Stack height='10px'>
                  {loading && <LinearProgress color='info' />}
                </Stack>
              </Stack>
              <Stack height={'290px'} overflow={'auto'}>
                {members.length > 0 ? (
                  members.map((item, index) => (
                    <Stack
                      key={index}
                      direction={'row'}
                      spacing={1}
                      sx={{
                        p: 'var(--space-2) var(--space-3)',
                        cursor: 'pointer',
                        ':hover': { bgcolor: 'var(--neutral-2)' },
                        borderRadius: 'var(--radius-2)',
                      }}
                      alignItems={'center'}
                      onClick={() => {
                        handleFilterClick(item.user_id);
                      }}
                    >
                      <Checkbox isChecked={createdBy.includes(item.user_id)} />
                      <MuiAvatar
                        src={item.profile_image}
                        level={getFullName(item.first_name, item.last_name)}
                        variant='rounded-small'
                      />
                      <Typography variant='body1'>
                        {capitalize(item.first_name)}
                      </Typography>
                      <Typography variant='caption'>
                        - {item.position}
                      </Typography>
                    </Stack>
                  ))
                ) : (
                  <Stack
                    alignItems={'center'}
                    justifyContent={'center'}
                    height={'100%'}
                  >
                    <GlobalIcon iconName='person' size={7} />
                    No user found
                  </Stack>
                )}
              </Stack>
            </Stack>
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
      </Popover>
    </>
  );
}

export default FilterCreatedBy;
