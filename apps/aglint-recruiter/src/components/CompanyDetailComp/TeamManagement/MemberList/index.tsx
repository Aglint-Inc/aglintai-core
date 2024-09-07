import { type RecruiterUserType } from '@aglint/shared-types';
import { GlobalBadge } from '@devlink/GlobalBadge';
import { TeamListItem } from '@devlink/TeamListItem';
import { UserInfoTeam } from '@devlink/UserInfoTeam';

import { Avatar, Popover, Stack } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import MuiAvatar from '@/components/Common/MuiAvatar';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useRolesAndPermissions } from '@/context/RolesAndPermissions/RolesAndPermissionsContext';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { capitalizeAll } from '@/utils/text/textUtils';

import { UserListThreeDot } from './ThreeDot';
import { Building2, Globe, Mail, MapPin, Smartphone } from 'lucide-react';
import { Label } from '@components/ui/label';

dayjs.extend(relativeTime);

const Member = ({
  member,
}: {
  member: RecruiterUserType;
  // removeMember: () => void;
  // canSuspend: boolean;
}) => {
  const router = useRouter();
  const { checkPermissions } = useRolesAndPermissions();

  const { recruiterUser } = useAuthDetails();

  const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  const canManage = checkPermissions(['manage_users']);
  return (
    <>
      <Stack>
        <TeamListItem
          onClickMouseHover={{
            ariaOwns: open1 ? 'mouse-over-popover' : undefined,
            ariaHaspopup: 'true',
            onMouseEnter: handlePopoverOpen,
            onMouseLeave: handlePopoverClose,
          }}
          isUserInfoVisible={true}
          slotUserInfo={
            <>
              <Popover
                id='mouse-over-popover'
                sx={{
                  pointerEvents: 'none',
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: '280px',
                      boxShadow: 'none',
                      marginTop: '8px',
                      // Additional styles
                    },
                  },
                }}
                open={open1}
                anchorEl={anchorEl1}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <UserInfoTeam
                  slotDetails={
                    <>
                      <Label>
                        <Building2 className='mr-2 h-4 w-4' />
                        {member.department?.name || '--'}
                      </Label>
                      <Label>
                        <MapPin className='mr-2 h-4 w-4' />
                        {member.office_location?.city || '--'}
                      </Label>
                      <Label>
                        <Globe className='mr-2 h-4 w-4' />
                        {member.office_location?.timezone || '--'}
                      </Label>
                      <Label>
                        <Mail className='mr-2 h-4 w-4' />
                        {member.email || '--'}
                      </Label>
                      <Label>
                        <Smartphone className='mr-2 h-4 w-4' />
                        {member.phone || '--'}
                      </Label>
                    </>
                  }
                  textDesgination={member.position}
                  textName={getFullName(member.first_name, member.last_name)}
                  slotImage={
                    <Avatar src={member.profile_image} variant='rounded' />
                  }
                />
              </Popover>
            </>
          }
          // isDeleteDisable={member.role !== 'admin' ? false : true}
          // isEditInviteVisible={member.join_status === 'invited'}
          slotBadge={
            member.status !== 'active' && (
              <GlobalBadge
                color={
                  member.status === 'suspended'
                    ? 'error'
                    : member.status === 'invited'
                      ? 'warning'
                      : 'success'
                }
                textBadge={capitalize(member.status)}
              />
            )
          }
          slotThreeDot={
            canManage &&
            (member.role !== 'admin' ||
              member.status === 'invited' ||
              recruiterUser.primary ||
              recruiterUser.user_id === member.user_id) && (
              <>
                <UserListThreeDot member={member} />
              </>
            )
          }
          key={1}
          textLastActive={
            member.last_login ? dayjs(member.last_login).fromNow() : '--:--'
          }
          slotProfileImage={
            <Stack
              sx={{
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  ROUTES['/user/profile/[user_id]']({
                    user_id: member.user_id,
                  }) + '?company=true',
                );
              }}
            >
              <MuiAvatar
                src={member.profile_image}
                level={getFullName(member.first_name, member.last_name)}
                variant='rounded-small'
              />
            </Stack>
          }
          userEmail={member.email}
          userName={
            <Link
              href={`/user/profile/${member.user_id}`}
            >{`${member.first_name || ''} ${member.last_name || ''} ${member.user_id === recruiterUser?.user_id ? '(You)' : ''}`}</Link>
          }
          textDepartment={member.department?.name || 'Not Assigned'}
          textLocation={member?.office_location?.city || '--'}
          textDesignation={member.position}
          slotUserRole={<Stack>{capitalizeAll(member.role)}</Stack>}
        />
      </Stack>
    </>
  );
};

export default Member;
