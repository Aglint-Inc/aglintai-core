import { InputAdornment, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import converter from 'number-to-words';
import { useEffect, useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { TeamUsersList } from '@/devlink/TeamUsersList';
import { TeamEmpty } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { API_get_last_login } from '@/src/pages/api/get_last_login/types';
import toast from '@/src/utils/toast';

// import AUIButton from '../../Common/AUIButton';
import Icon from '../../Common/Icons/Icon';
import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';
import DynamicLoader from '../../Scheduling/Interviewers/DynamicLoader';
import AddMember from './AddMemberDialog';
import EditMember from './EditMemberDialog';
import FilterDropDown from './FilterDropDown';
import DepartmentIcon from './Icons/DepartmentIcon';
import LocationIcon from './Icons/LocationIcon';
import StatusIcon from './Icons/StatusIcon';
import UserRoleIcon from './Icons/UserRoleIcon';
import Member from './MemberList';

type ItemType = string;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
const TeamManagement = () => {
  const { recruiterUser, setMembers, handelMemberUpdate } = useAuthDetails();
  const { data: members, isFetching } = useTeamMembers();
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    window: 'addMember' | 'pendingMember';
  }>({
    open: false,
    window: 'addMember',
  });
  const [editMember, setEditMember] = useState<(typeof members)[0] | null>(
    null,
  );

  // filter members
  const [searchText, setSearchText] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);

  const filterMembers = (searchText: string) => {
    const filtered = members.filter(
      (member) =>
        member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
        member.position.toLowerCase().includes(searchText.toLowerCase()) ||
        member.email.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredMembers(filtered);
  };

  const [selectedDepartments, setSelectedDepartments] = useState<ItemType[]>(
    [],
  );

  const [selectedLocations, setSelectedLocations] = useState<ItemType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ItemType[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<ItemType[]>([]);

  const uniqueDepartments = [
    ...new Set(
      members
        .filter((ele) => ele.department)
        .map((item) => String(item.department)),
    ),
  ];

  

  const uniqueLocations = [
    ...new Set(
      members
        .filter((ele) => ele.interview_location)
        .map(
          (item) =>
            item.interview_location &&
            String(item.interview_location),
        ),
    ),
  ];

  const uniqueRoles = [
    ...new Set(
      members
        .filter((ele) => ele.role)
        .map((item) => item.role && String(item.role)),
    ),
  ];

  const uniqueStatus = [
    ...new Set(
      members
        .filter((ele) => ele.role)
        .map(
          (item) => item.join_status && String(item.join_status).toLowerCase(),
        ),
    ),
  ].map((item) => (item === 'joined' ? 'active' : item));

  useEffect(() => {
    const debouncedFilter = debounce(filterMembers, 300);
    debouncedFilter(searchText);
    return () => clearTimeout(debouncedFilter as any);
  }, [searchText]);

  useEffect(() => {
    const filtered = members.filter((member) => {
      const departmentMatch =
        !selectedDepartments.length ||
        selectedDepartments.includes(String(member.department).toLowerCase());
      const locationMatch =
        !selectedLocations.length ||
        selectedLocations.includes(
          String(member.interview_location).toLowerCase(),
        );
      const statusMatch =
        !selectedStatus.length ||
        selectedStatus
          .map((item) => (item === 'active' ? 'joined' : item))
          .includes(String(member.join_status).toLowerCase());
      const roleMatch =
        !selectedRoles.length ||
        selectedRoles.includes(String(member.role).toLowerCase());

      return departmentMatch && locationMatch && statusMatch && roleMatch;
    });

    setFilteredMembers(filtered);
  }, [
    selectedDepartments,
    selectedLocations,
    selectedStatus,
    selectedRoles,
    members,
  ]);

  const handleSearchInputChange = (e: any) => {
    const input = e.target.value.trim();
    setSelectedDepartments([]);
    setSelectedLocations([]);
    setSelectedRoles([]);
    setSelectedStatus([]);
    if (input) setSearchText(e.target.value);
  };
  // end

  const pendingList = members.filter(
    (member) => member.join_status?.toLocaleLowerCase() === 'invited',
  );
  const inviteUser = pendingList.length;

  return (
    <>
      <TeamUsersList
        slotSearchAndFilter={
          <>
            <Stack marginRight={5}>
              <UITextField
                width='400px'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Icon variant='JobSearch' height='14' />
                    </InputAdornment>
                  ),
                }}
                placeholder='Search by Name, Email or Title'
                onChange={handleSearchInputChange}
                borderRadius={10}
                height={42}
              />
            </Stack>
            <Stack display={'flex'} flexDirection={'row'} gap={'10px'}>
              <FilterDropDown
                icon={<StatusIcon />}
                title={'Status'}
                itemList={uniqueStatus}
                selectedItems={selectedStatus}
                setSelectedItems={setSelectedStatus}
              />
              <FilterDropDown
                icon={<UserRoleIcon />}
                title={'Role'}
                itemList={uniqueRoles}
                selectedItems={selectedRoles}
                setSelectedItems={setSelectedRoles}
              />
              <FilterDropDown
                title={'Department'}
                itemList={uniqueDepartments}
                selectedItems={selectedDepartments}
                setSelectedItems={setSelectedDepartments}
                icon={<DepartmentIcon />}
              />
              <FilterDropDown
                icon={<LocationIcon />}
                title={'Location'}
                itemList={uniqueLocations}
                selectedItems={selectedLocations}
                setSelectedItems={setSelectedLocations}
              />
            </Stack>
          </>
        }
        slotTeamList={
          <>
            <ShowCode>
              <ShowCode.When isTrue={!filteredMembers.length && isFetching}>
                <Stack
                  width={'100%'}
                  height={'100%'}
                  minHeight={'300px'}
                  position={'relative'}
                >
                  <DynamicLoader />
                </Stack>
              </ShowCode.When>
              <ShowCode.When isTrue={filteredMembers.length === 0}>
                <TeamEmpty />
              </ShowCode.When>
            </ShowCode>
            <ShowCode.When isTrue={filteredMembers.length > 0}>
              {filteredMembers?.map((member) => (
                <Member
                  key={member.user_id}
                  member={member}
                  editMember={() => setEditMember(member)}
                  removeMember={async () => {
                    if (recruiterUser?.user_id === member.user_id) {
                      toast.error(
                        "Can't remove admin account; it's the primary one.",
                      );
                    } else {
                      try {
                        await axios.post('/api/supabase/deleteuser', {
                          user_id: member.user_id,
                        });
                      } catch (error) {
                        toast.error(
                          "This member is tied to an active schedule, so removal is unavailable until it's finished.",
                        );
                        return null;
                      }
                      setMembers((members) =>
                        members.filter((mem) => mem.user_id !== member.user_id),
                      );
                    }
                  }}
                  updateMember={(updatedMem) => {
                    handelMemberUpdate({
                      user_id: member.user_id,
                      data: updatedMem,
                    }).then(() => {
                      toast.success(
                        `${member.first_name}'s account is ${updatedMem.is_suspended ? 'suspended successfully' : 'activated successfully'}.`,
                      );
                    });
                  }}
                  canSuspend={
                    member.join_status !== 'invited' && member.role !== 'admin'
                  }
                />
              ))}
            </ShowCode.When>
          </>
        }
        slotInviteBtn={
          <>
            <ButtonPrimaryRegular
              isStartIcon={true}
              slotStartIcon={
                <>
                  <svg
                    width='15'
                    height='16'
                    viewBox='0 0 15 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M3 4.25C2.78125 4.25 2.60156 4.32031 2.46094 4.46094C2.32031 4.60156 2.25 4.78125 2.25 5V5.9375L6.84375 9.28906C7.28125 9.58594 7.71875 9.58594 8.15625 9.28906L12.75 5.9375V5C12.75 4.78125 12.6797 4.60156 12.5391 4.46094C12.3984 4.32031 12.2188 4.25 12 4.25H3ZM2.25 6.875V11C2.25 11.2188 2.32031 11.3984 2.46094 11.5391C2.60156 11.6797 2.78125 11.75 3 11.75H12C12.2188 11.75 12.3984 11.6797 12.5391 11.5391C12.6797 11.3984 12.75 11.2188 12.75 11V6.875L8.60156 9.89844C8.27344 10.1484 7.90625 10.2734 7.5 10.2734C7.09375 10.2734 6.72656 10.1484 6.39844 9.89844L2.25 6.875ZM1.5 5C1.51562 4.57812 1.66406 4.22656 1.94531 3.94531C2.22656 3.66406 2.57812 3.51563 3 3.5H12C12.4219 3.51563 12.7734 3.66406 13.0547 3.94531C13.3359 4.22656 13.4844 4.57812 13.5 5V11C13.4844 11.4219 13.3359 11.7734 13.0547 12.0547C12.7734 12.3359 12.4219 12.4844 12 12.5H3C2.57812 12.4844 2.22656 12.3359 1.94531 12.0547C1.66406 11.7734 1.51562 11.4219 1.5 11V5Z'
                      fill='white'
                    />
                  </svg>
                </>
              }
              textLabel='Invite Member'
              onClickButton={{
                onClick: () => {
                  setOpenDrawer({ open: true, window: 'addMember' });
                },
              }}
            />

            {/* <AUIButton
              size='small'
              onClick={() => {
                setOpenDrawer({ open: true, window: 'addMember' });
              }}
            >
              Invite Member
            </AUIButton> */}
          </>
        }
        pendInvitesVisibility={Boolean(inviteUser)}
        onClickViewPendingInvites={{
          onClick: () => {
            setOpenDrawer({ open: true, window: 'pendingMember' });
          },
        }}
        textPending={`You currently have ${converter.toWords(
          pendingList?.length,
        )} pending invites awaiting your response.`}
      />

      {editMember ? (
        <EditMember
          open={Boolean(editMember)}
          memberList={members
            .map((mem) => ({
              id: mem.user_id,
              name: `${mem.first_name} ${mem.last_name}`.trim(),
            }))
            .filter((mem) => mem.id !== editMember.user_id)}
          member={editMember}
          onClose={() => {
            setEditMember(null);
          }}
        />
      ) : (
        <AddMember
          open={openDrawer.open}
          menu={openDrawer.window}
          memberList={members.map((mem) => ({
            id: mem.user_id,
            name: `${mem.first_name} ${mem.last_name}`.trim(),
          }))}
          pendingList={pendingList}
          onClose={() => {
            setOpenDrawer({ open: false, window: null });
          }}
        />
      )}
    </>
  );
};

export default TeamManagement;

const useTeamMembers = () => {
  const { members, recruiter } = useAuthDetails();
  const query = useQuery({
    queryKey: ['TeamMembers'],
    queryFn: () => {
      return getLastLogins(
        members.map((item) => item.user_id),
        recruiter.id,
      ).then((data) => {
        return members.map((member) => {
          return { ...member, last_login: data[member.user_id] };
        });
      });
    },
    initialData: [] as unknown as ((typeof members)[number] & {
      last_login: string;
    })[],
    enabled: Boolean(members?.length),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (query.data && members.length) {
      query.refetch();
    }
  }, [members, query.refetch]);
  return query;
};

const getLastLogins = (ids: string[], recruiter_id: string) => {
  const body: API_get_last_login['request'] = { ids, recruiter_id };
  return axios
    .post<API_get_last_login['response']>('/api/get_last_login', body)
    .then(({ data: { data, error } }) => {
      if (error) throw new Error(error);
      const tempData: { [key: string]: string } = {};
      data.forEach((item) => {
        tempData[item.id] = item.last_login;
      });
      return tempData;
    });
};
