import { Avatar, Drawer, MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import {
  InviteTeamCard,
  TeamInvite,
  TeamInvitesBlock,
  TeamPendingInvites,
} from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import Icon from '@/src/components/Common/Icons/Icon';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { capitalize } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { inviteUserApi, reinviteUser } from '../utils';

const AddMember = ({
  open,
  menu,
  pendingList,
  onClose,
}: {
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  pendingList: RecruiterUserType[];
  onClose: () => void;
}) => {
  const { userDetails, setMembers, recruiterUser } = useAuthDetails();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    role: RecruiterUserType['role'];
  }>({ name: null, email: null, role: 'member' });

  const [inviteData, setInviteData] = useState<
    {
      name: string;
      email: string;
      role: RecruiterUserType['role'];
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    name: boolean;
    email: boolean;
    role: boolean;
  }>({ name: null, email: null, role: null });

  const [isDisable, setIsDisable] = useState(false);
  const [isResendDisable, setResendDisable] = useState(false);
  const [isInviteCardVisible, setInviteCardVisisble] = useState(false);

  const checkValidation = () => {
    if (!form.name || form.name.trim() === '') {
      setFormError({ ...formError, name: true });
      setIsDisable(false);
      return false;
    } else if (!form.email || form.email.trim() === '') {
      setFormError({ ...formError, email: true });
      setIsDisable(false);
      return false;
    } else if (!form.role || form.role.trim() === '') {
      setFormError({ ...formError, role: true });
      setIsDisable(false);
      return false;
    }
    return true;
  };
  const inviteUser = async () => {
    const res = await inviteUserApi(form, userDetails.user.id, {
      name: recruiterUser.first_name,
      email: recruiterUser.email,
    });

    if (res.status === 200) {
      let { error, created, user } = res.data;
      if (!error && created) {
        setMembers((prev) => [...prev, user]);
        setInviteData((prev) => [
          ...prev,
          { name: form.name, email: form.email, role: form.role },
        ]);
        setInviteCardVisisble(true);
        toast.success('Invite sent');
        setIsDisable(false);
        setForm({ ...form, name: null, email: null });
      } else {
        toast.error('User allready exists');
        setIsDisable(false);
      }
    }
  };

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px' }}>
        {menu === 'addMember' ? (
          <TeamInvite
            isInviteSentVisible={false}
            isInviteTeamCardVisible={isInviteCardVisible}
            slotInviteTeamCard={inviteData.map((data) => {
              return (
                <>
                  <InviteTeamCard
                    textEmail={data.email}
                    textName={data.name}
                    slotAvatar={<Icon variant='UserSolo' />}
                  />
                </>
              );
            })}
            slotForm={
              <Stack spacing={2}>
                <TextField
                  value={form.name ? form.name : ''}
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
                  value={form.email ? form.email : ''}
                  label='Email'
                  error={formError.email}
                  onFocus={() => {
                    setFormError({ ...formError, email: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
                <TextField
                  value={form.role}
                  label='Role'
                  error={formError.role}
                  onFocus={() => {
                    setFormError({ ...formError, role: false });
                  }}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      role: e.target.value as
                        | 'admin'
                        | 'member'
                        | 'interviewer',
                    });
                  }}
                  select
                >
                  {['member', 'admin', 'interviewer'].map((role) => (
                    <MenuItem key={role} value={role}>
                      {capitalize(role)}
                    </MenuItem>
                  ))}
                </TextField>
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
                      inviteUser();
                    }
                  }}
                >
                  Invite
                </AUIButton>
              </Stack>
            }
            onClickClose={{
              onClick: () => {
                onClose(),
                  setInviteData([]),
                  setForm({ ...form, name: null, email: null });
              },
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
                          return toast.error(error);
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
