import { Checkbox } from '@devlink/Checkbox';
import { GlobalIcon } from '@devlink/GlobalIcon';
import { Text } from '@devlink/Text';
import { ButtonFilter } from '@devlink2/ButtonFilter';
import { FilterDropdown } from '@devlink2/FilterDropdown';
import { capitalize, Popover, Stack, Typography } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import {
  FilterType,
  setFilter,
  setFilterVisible,
  useFilterCandidateStore,
} from '../../filter-store';

export type UserType = {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  position: string;
  role: string;
  profile_image: string;
};

function FilterCordinator() {
  const { recruiter } = useAuthDetails();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState('');
  const [members, setMembers] = useState<UserType[]>([]);
  const filter = useFilterCandidateStore((state) => state.filter);
  const filterVisible = useFilterCandidateStore((state) => state.filterVisible);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const open = Boolean(anchorEl);
  const id = open ? 'recruiting_coordinator' : undefined;

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
      const { data, error } = await supabase.rpc('search_members', {
        recruiter_id_param: recruiter.id,
        name_param: searchText,
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
    }
  }, 300);

  return (
    <>
      <ButtonFilter
        slotLeftIcon={
          <Stack>
            <GlobalIcon iconName='group' />
          </Stack>
        }
        isActive={filter.coordinator_ids.length > 0}
        isDotVisible={filter.coordinator_ids.length > 0}
        onClickStatus={{
          id: FilterType.coordinator + 'click',
          onClick: handleClick,
        }}
        textLabel={'Co-ordinator'}
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
            <Stack width={'320px'} p={'var(--space-1)'}>
              <Stack overflow={'auto'} height={'310px'}>
                {members.length > 0 ? (
                  members.map((member, i) => (
                    <Stack
                      key={i}
                      direction={'row'}
                      sx={{
                        alignItems: 'center',
                        ':hover': { bgcolor: 'var(--neutral-2)' },
                        borderRadius: 'var(--radius-2)',
                      }}
                      spacing={1}
                      padding={'var(--space-1) var(--space-1)'}
                    >
                      <Checkbox
                        isChecked={
                          !!filter.coordinator_ids.find(
                            (mem) => mem.user_id === member.user_id,
                          )
                        }
                        onClickCheck={{
                          onClick: () => {
                            const isThere = !!filter.coordinator_ids.find(
                              (mem) => mem.user_id === member.user_id,
                            );
                            if (isThere) {
                              setFilter({
                                coordinator_ids: filter.coordinator_ids.filter(
                                  (mem) => mem.user_id !== member.user_id,
                                ),
                              });
                            } else {
                              setFilter({
                                coordinator_ids: [
                                  ...filter.coordinator_ids,
                                  member,
                                ],
                              });
                            }
                          },
                        }}
                      />

                      <Stack
                        direction={'row'}
                        width={'100%'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        spacing={'var(--space-1)'}
                      >
                        <Stack
                          direction={'row'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                          spacing={'var(--space-1)'}
                        >
                          <MuiAvatar
                            level={getFullName(
                              member.first_name,
                              member.last_name,
                            )}
                            src={member.profile_image}
                            variant={'rounded-small'}
                          />
                          <Typography variant='body1'>
                            {getFullName(member.first_name, member.last_name)}
                          </Typography>
                        </Stack>

                        <Text
                          size={1}
                          weight={'regular'}
                          color={'neutral'}
                          content={
                            member?.position ? capitalize(member.position) : ''
                          }
                        />
                      </Stack>
                    </Stack>
                  ))
                ) : (
                  <Stack
                    width={'100%'}
                    height={'310px'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <GlobalIcon iconName='person' size={8} />
                    No Co-ordinator found
                  </Stack>
                )}
              </Stack>
            </Stack>
          }
          onClickDelete={{
            onClick: () => {
              setFilter({ coordinator_ids: [] });
              setFilterVisible(
                filterVisible.filter((f) => f !== FilterType.coordinator),
              );
            },
          }}
          onClickReset={{
            onClick: () => {
              setFilter({ coordinator_ids: [] });
            },
          }}
        />
      </Popover>
    </>
  );
}

export default FilterCordinator;
