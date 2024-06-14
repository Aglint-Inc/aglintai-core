import { InputAdornment, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import converter from 'number-to-words';
import { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { TeamUsersList } from '@/devlink/TeamUsersList';
import { TeamEmpty } from '@/devlink3/TeamEmpty';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { API_get_last_login } from '@/src/pages/api/get_last_login/types';
import toast from '@/src/utils/toast';

// import AUIButton from '../../Common/AUIButton';
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
        .filter((ele) => Boolean(ele.department?.length))
        .map((item) => item.department),
    ),
  ];

  const uniqueLocations = [
    ...new Set(
      members
        .filter((ele) => Boolean(ele.interview_location?.length))
        .map((item) => item.interview_location),
    ),
  ];

  const uniqueRoles = [
    ...new Set(
      members
        .filter((ele) => Boolean(ele.role?.length))
        .map((item) => item.role && String(item.role)),
    ),
  ];

  const uniqueStatus = [
    ...new Set(
      members
        .filter((ele) => Boolean(ele.join_status?.length))
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
        selectedDepartments.includes(String(member.department));
      const locationMatch =
        !selectedLocations.length ||
        selectedLocations.includes(String(member.interview_location));
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
                width='250px'
                height={32}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <GlobalIcon iconName='search' size='5'/>
                    </InputAdornment>
                  ),
                }}
                placeholder='Search Interviewer'
                onChange={handleSearchInputChange}
              />
            </Stack>
            <Stack display={'flex'} flexDirection={'row'} gap={'var(--space-2)'}>
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
          <ButtonSolid
            isRightIcon={false}
            isLeftIcon={true}
            size={'2'}
            textButton ={'Invite'}
            iconName = {'send'}
            onClickButton={{
              onClick: () => {
                setOpenDrawer({ open: true, window: 'addMember' });
              }
            }}
          />
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
