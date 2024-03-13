import axios from 'axios';
import converter from 'number-to-words';
import { useState } from 'react';

import { TeamUsersList } from '@/devlink/TeamUsersList';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import AddMember from './AddMemberDialog';
import EditMember from './EditMemberDialog';
import Member from './MemberList';
import AUIButton from '../../Common/AUIButton';

const TeamManagement = () => {
  const { recruiterUser, members, setMembers } = useAuthDetails();
  const [openDrawer, setOpenDrawer] = useState<{
    open: boolean;
    window: 'addMember' | 'pendingMember';
  }>({
    open: false,
    window: 'addMember'
  });
  const [editMember, setEditMember] = useState<(typeof members)[0] | null>(
    null
  );
  const pendingList = members.filter(
    (member) => member.join_status?.toLocaleLowerCase() === 'invited'
  );
  const inviteUser = pendingList.length;

  return (
    <>
      <TeamUsersList
        slotTeamList={
          <>
            {members?.map((member) => (
              // <Stack
              //   key={member.user_id}
              //   style={{ cursor: 'pointer' }}
              //   onClick={() => {
              //     setEditMember(member);
              //   }}
              // >
              <Member
                key={member.user_id}
                member={member}
                editMember={() => setEditMember(member)}
                removeMember={async () => {
                  if (recruiterUser?.user_id === member.user_id) {
                    toast.error('Cannot remove admin account');
                  } else {
                    await axios.post('/api/supabase/deleteuser', {
                      user_id: member.user_id
                    });
                    setMembers((members) =>
                      members.filter((mem) => mem.user_id !== member.user_id)
                    );
                  }
                }}
              />
              // </Stack>
            ))}
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
          }
        }}
        textPending={`You currently have ${converter.toWords(
          pendingList?.length
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
