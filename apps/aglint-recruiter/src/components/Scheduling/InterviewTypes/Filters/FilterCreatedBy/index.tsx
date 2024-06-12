import {
  LinearProgress,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { capitalize, debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { FilterType } from '../../../Candidates/filter-store';
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
  const { recruiter } = useAuthDetails();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [text, setText] = useState('');
  const [members, setMembers] = useState<UserType[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const createdBy = useFilterModuleStore((state) => state.created_by);

  useEffect(() => {
    handleSearch();
    setCreatedBy([]); //needs a fix
  }, []);

  useEffect(() => {
    if (text) {
      handleSearch();
    }
  }, [text]);

  const open = Boolean(anchorEl);
  const id = open ? 'interview-panels' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    debouncedHandleSearch();
  };

  const debouncedHandleSearch = debounce(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('search_members', {
        recruiter_id_param: recruiter.id,
        name_param: text,
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
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }, 300);

  return (
    <>
      <ButtonFilter
        isActive={createdBy.length > 0}
        isDotVisible={createdBy.length > 0}
        onClickStatus={{
          id: FilterType.coordinator + 'click',
          onClick: handleClick,
        }}
        textLabel={'Created by'}
        slotRightIcon={
          <Stack>
            <svg
              width='15'
              height='16'
              viewBox='0 0 15 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M7.75781 11.2578C7.58594 11.4141 7.41406 11.4141 7.24219 11.2578L2.74219 6.75781C2.58594 6.58594 2.58594 6.41406 2.74219 6.24219C2.91406 6.08594 3.08594 6.08594 3.25781 6.24219L7.5 10.4609L11.7422 6.24219C11.9141 6.08594 12.0859 6.08594 12.2578 6.24219C12.4141 6.41406 12.4141 6.58594 12.2578 6.75781L7.75781 11.2578Z'
                fill='#0F3554'
              />
            </svg>
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
            <Stack minWidth={'250px'}>
              <TextField
                type='search'
                sx={{ pb: 1 }}
                placeholder='Search users'
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <Stack height='10px'>
                {loading && <LinearProgress color='info' />}
              </Stack>

              <Stack maxHeight={'50vh'} overflow={'auto'}>
                {members
                  .filter(
                    (user) =>
                      !selectedMembers.some((u) => u.user_id == user.user_id),
                  )
                  .map((item, index) => (
                    <Stack
                      key={index}
                      direction={'row'}
                      spacing={1}
                      sx={{
                        p: '8px 4px',
                        cursor: 'pointer',
                      }}
                      alignItems={'center'}
                      onClick={() => {
                        setMembers((prev) =>
                          prev.filter((u) => u.user_id !== item.user_id),
                        );
                        setSelectedMembers((prev) => [...prev, item]);
                        setCreatedBy([...createdBy, item.user_id]);
                      }}
                    >
                      <Checkbox isChecked={false} />
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
                  ))}

                {selectedMembers.map((item) => (
                  <Stack
                    key={item.user_id}
                    direction={'row'}
                    spacing={1}
                    sx={{
                      p: '8px 4px',
                      cursor: 'pointer',
                    }}
                    alignItems={'center'}
                    onClick={() => {
                      setMembers((prev) => [...prev, item]);
                      setCreatedBy(
                        createdBy.filter((id) => id !== item.user_id),
                      );
                      setSelectedMembers((prev) => {
                        return prev.filter((u) => u.user_id !== item.user_id);
                      });
                    }}
                  >
                    <Checkbox isChecked={true} />
                    <MuiAvatar
                      src={item.profile_image}
                      level={getFullName(item.first_name, item.last_name)}
                      variant='rounded-small'
                    />
                    <Typography variant='body1'>
                      {capitalize(item.first_name)}
                    </Typography>
                    <Typography variant='caption'>- {item.position}</Typography>
                  </Stack>
                ))}
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
              setSelectedMembers([]);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterCreatedBy;
