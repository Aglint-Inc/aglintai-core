import { getFullName } from '@aglint/shared-utils';
import { Building, CircleDot, Locate, User } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useTeamMembers } from '@/company/hooks/useTeamMembers';
import FilterHeader from '@/components/Common/FilterHeader';
import { type FiltersTypes } from '@/components/Common/FilterHeader/filters';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import dayjs from '@/utils/dayjs';

import AddMember from './Dialog/AddMemberDialog';
import { TeamManagementUI } from './ui/TeamManagementUI';

type ItemType = string;

const TeamManagement = () => {
  const { checkPermissions } = useRolesAndPermissions();
  const { data: members, isPending, remote_sync } = useTeamMembers();

  const timeStamp = remote_sync?.lastSync;
  const last_sync = timeStamp ? dayjs(timeStamp).fromNow() : 'Never';

  // filter members
  const [searchText, setSearchText] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);

  const [selectedDepartments, setSelectedDepartments] = useState<ItemType[]>(
    [],
  );

  const [selectedLocations, setSelectedLocations] = useState<ItemType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ItemType[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<ItemType[]>([]);

  const uniqueDepartments = [
    ...members.reduce((acc, curr) => {
      if (curr.department?.name) acc.add(curr.department.name);
      return acc;
    }, new Set<string>()),
  ];

  const uniqueLocations = [
    ...members.reduce((acc, curr) => {
      if (curr.office_location?.city) {
        acc.add(curr.office_location.city);
      }
      return acc;
    }, new Set<string>()),
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
        .filter((ele) => Boolean(ele.status?.length))
        .map((item) => item.status && String(item.status).toLowerCase()),
    ),
  ].map((item) => (item === 'joined' ? 'active' : item));

  useEffect(() => {
    const filtered = members.filter((member) => {
      const departmentMatch =
        !selectedDepartments.length ||
        selectedDepartments.includes(member.department?.name);
      const locationMatch =
        !selectedLocations.length ||
        selectedLocations.includes(member.office_location?.city);
      const statusMatch =
        !selectedStatus.length ||
        selectedStatus.includes(String(member.status).toLowerCase());
      const roleMatch =
        !selectedRoles.length || selectedRoles.includes(String(member.role));

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
  const canManage = checkPermissions(['manage_users']);
  const [isInitialLoading, setIsInitialLoading] = useState(
    filteredMembers.length ? false : true,
  );

  useEffect(() => {
    if (filteredMembers.length) setIsInitialLoading(false);
  }, [filteredMembers.length]);

  const [open, setOpen] = useState(false);

  const memberList = members
    .filter((mem) => mem.status === 'active')
    .map((mem) => ({
      id: mem.user_id,
      name: getFullName(mem.first_name, mem.last_name),
    }));

  const filters = [
    {
      name: 'Status',
      type: 'filter',
      icon: <CircleDot size={12} />,
      options: uniqueStatus,
      setValue: setSelectedStatus,
      value: selectedStatus,
    },
    {
      name: 'Role',
      type: 'filter',
      icon: <User size={12} />,
      options: uniqueRoles,
      setValue: setSelectedRoles,
      value: selectedRoles,
    },
    {
      name: 'Department',
      type: 'filter',
      icon: <Building size={12} />,
      options: uniqueDepartments,
      setValue: setSelectedDepartments,
      value: selectedDepartments,
    },
    {
      name: 'Location',
      type: 'filter',
      icon: <Locate size={12} />,
      options: uniqueLocations,
      setValue: setSelectedLocations,
      value: selectedLocations,
    },
  ] as FiltersTypes[];

  return (
    <>
      {/* Dialog */}
      <AddMember
        memberList={memberList || []}
        menu='addMember'
        onClose={() => setOpen(false)}
        open={open}
        defaultRole={{
          role: 'Hiring Manager',
          role_id: '5aac490c-cfcb-4e41-8756-5aca8532edf8',
        }}
        pendingList={[]}
      />

      <TeamManagementUI
        canManage={canManage}
        filteredMembers={filteredMembers}
        isRemoteSync={remote_sync.isEnabled}
        isTableLoading={
          (!filteredMembers.length && isPending) || isInitialLoading
        }
        last_sync={last_sync}
        remote_sync={remote_sync.sync}
        setOpen={setOpen}
        filter={
          <FilterHeader
            search={{
              setValue: setSearchText,
              value: searchText,
              placeholder: 'Search users',
            }}
            isResetAll={true}
            filters={filters}
          />
        }
      />
    </>
  );
};

export default TeamManagement;
