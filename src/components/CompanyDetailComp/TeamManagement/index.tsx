import { InputAdornment, Stack } from '@mui/material';
import axios from 'axios';
import converter from 'number-to-words';
import { useEffect, useState } from 'react';

import { TeamUsersList } from '@/devlink/TeamUsersList';
import { TeamEmpty } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import AUIButton from '../../Common/AUIButton';
import Icon from '../../Common/Icons/Icon';
import { ShowCode } from '../../Common/ShowCode';
import UITextField from '../../Common/UITextField';
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
  const { recruiterUser, members, setMembers, handelMemberUpdate } =
    useAuthDetails();

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
        .map((item) => String(item.department).toLowerCase()),
    ),
  ];

  const uniqueLocations = [
    ...new Set(
      members
        .filter((ele) => ele.interview_location)
        .map(
          (item) =>
            item.interview_location &&
            String(item.interview_location).toLowerCase(),
        ),
    ),
  ];

  const uniqueRoles = [
    ...new Set(
      members
        .filter((ele) => ele.role)
        .map((item) => item.role && String(item.role).toLowerCase()),
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
  ];

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
        selectedStatus.includes(String(member.join_status).toLowerCase());
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
                placeholder='Search by name,email or position'
                onChange={handleSearchInputChange}
                borderRadius={10}
                height={42}
              />
            </Stack>
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
            <FilterDropDown
              icon={<UserRoleIcon />}
              title={'Role'}
              itemList={uniqueRoles}
              selectedItems={selectedRoles}
              setSelectedItems={setSelectedRoles}
            />
            <FilterDropDown
              icon={<StatusIcon />}
              title={'Status'}
              itemList={uniqueStatus}
              selectedItems={selectedStatus}
              setSelectedItems={setSelectedStatus}
            />
          </>
        }
        slotTeamList={
          <>
            <ShowCode>
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
                      toast.error('Cannot remove admin account');
                    } else {
                      try {
                        await axios.post('/api/supabase/deleteuser', {
                          user_id: member.user_id,
                        });
                      } catch (error) {
                        toast.error('This user is connect with scheduling');
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
                        `${member.first_name}'s account is ${updatedMem.is_suspended ? 'Suspended' : 'Activated'}.`,
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
          <AUIButton
            size='small'
            onClick={() => {
              setOpenDrawer({ open: true, window: 'addMember' });
            }}
          >
            Invite Member
          </AUIButton>
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
          member={editMember}
          onClose={() => {
            setEditMember(null);
          }}
        />
      ) : (
        <AddMember
          open={openDrawer.open}
          menu={openDrawer.window}
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
