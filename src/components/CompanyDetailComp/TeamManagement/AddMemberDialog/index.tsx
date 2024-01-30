import { Avatar, Drawer, Stack } from '@mui/material';
import { useState } from 'react';

import { TeamInvite, TeamInvitesBlock, TeamPendingInvites } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import { CustomTextField } from '..';
import { inviteUser, reinviteUser } from '../utils';

const AddMember = ({
  open,
  menu,
  pendingList,
  onClose,
  updateMemberList,
}: {
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  pendingList: RecruiterUserType[];
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  updateMemberList: () => void;
}) => {
  const { userDetails } = useAuthDetails();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role: RecruiterUserType['role'];
  }>({ name: null, email: null, role: 'recruiter' });

  const [formError, setFormError] = useState<{
    name: boolean;
    email: boolean;
    role: boolean;
  }>({ name: null, email: null, role: null });

  const checkValidation = () => {
    if (!form.name || form.name.trim() === '') {
      setFormError({ ...formError, name: true });
      return false;
    } else if (!form.email || form.email.trim() === '') {
      setFormError({ ...formError, email: true });
      return false;
    } else if (!form.role || form.role.trim() === '') {
      setFormError({ ...formError, role: true });
      return false;
    }
    return true;
  };
  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px' }}>
        {menu === 'addMember' ? (
          <TeamInvite
            slotForm={
              <Stack gap={2}>
                <CustomTextField
                  value={form.name}
                  placeholder='Name'
                  error={formError.name}
                  onFocus={() => {
                    setFormError({ ...formError, name: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
                <CustomTextField
                  value={form.email}
                  placeholder='Email ID'
                  error={formError.email}
                  onFocus={() => {
                    setFormError({ ...formError, email: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </Stack>
            }
            slotButtons={
              <Stack direction={'row'} justifyContent={'end'} width={'100%'}>
                <AUIButton
                  variant='outlined'
                  size='medium'
                  onClick={() => {
                    if (checkValidation()) {
                      inviteUser(form, userDetails.user.id).then(
                        ({ error, created }) => {
                          if (!error && created) {
                            updateMemberList();
                            toast.success('Invite sent');
                            return onClose();
                          }
                          // @ts-ignore
                          return toast.error(error?.message || error);
                        },
                      );
                    }
                  }}
                >
                  Invite
                </AUIButton>
              </Stack>
            }
            onClickClose={{
              onClick: () => onClose(),
            }}
          />
        ) : menu === 'pendingMember' ? (
          <TeamPendingInvites
            slotList={pendingList.map((member) => (
              <TeamInvitesBlock
                key={member.user_id}
                email={member.email}
                name={member.first_name}
                slotImage={
                  <Avatar
                    variant='circular'
                    src={member.profile_image}
                    alt={member.first_name}
                    sx={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
                slotButton={
                  <AUIButton
                    size='small'
                    onClick={() => {
                      reinviteUser(member.email, userDetails.user.id).then(
                        ({ error, emailSend }) => {
                          if (!error && emailSend) {
                            return toast.success('Invite sent');
                          }
                          // @ts-ignore
                          return toast.error(error || error?.message);
                        },
                      );
                    }}
                  >
                    Resend
                  </AUIButton>
                }
              />
            ))}
            onClickClose={{
              onClick: () => onClose(),
            }}
          />
        ) : (
          <></>
        )}
      </Stack>
    </Drawer>
  );
};

export default AddMember;
