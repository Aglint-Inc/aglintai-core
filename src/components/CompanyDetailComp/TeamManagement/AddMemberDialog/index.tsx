import { Avatar, Drawer, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import { TeamInvite, TeamInvitesBlock, TeamPendingInvites } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

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

  const [isDisable, setIsDisable] = useState(false);
  const [isResendDisable, setResendDisable] = useState(false)

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
              <Stack spacing={2}>
                <TextField
                  value={form.name}
                  label='Name'
                  error={formError.name}
                  onFocus={() => {
                    setFormError({ ...formError, name: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
                <TextField
                  value={form.email}
                  label='Email'
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
                  disabled={isDisable}
                  size='medium'
                  onClick={() => {
                    setIsDisable(true);
                    if (checkValidation()) {
                      inviteUser(form, userDetails.user.id).then(
                        ({ error, created }) => {
                          if (!error && created) {
                            updateMemberList();
                            toast.success('Invite sent');
                            setIsDisable(false);
                            form.name = null;
                            form.email = null;
                            return onClose();
                          } else {
                            toast.error('User allready exists');
                            setIsDisable(false);
                          }
                          // @ts-ignore
                          return null;
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
                    disabled={isResendDisable}
                    size='small'
                    onClick={() => {
                      setResendDisable(true);
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
