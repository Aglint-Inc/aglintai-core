import { Autocomplete, Avatar, Drawer, Stack, TextField } from '@mui/material';
import { useState } from 'react';

import {
  InviteTeamCard,
  TeamInvite,
  TeamInvitesBlock,
  TeamPendingInvites
} from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import Icon from '@/src/components/Common/Icons/Icon';
import Loader from '@/src/components/Common/Loader';
import { schedulingSettingType } from '@/src/components/Scheduling/Settings/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterUserType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { capitalize } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { inviteUserApi, reinviteUser } from '../utils';

const AddMember = ({
  open,
  menu,
  pendingList,
  onClose
}: {
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  pendingList: RecruiterUserType[];
  onClose: () => void;
}) => {
  const { userDetails, setMembers, recruiter, recruiterUser } =
    useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
    department: string;
    role: RecruiterUserType['role'];
    scheduling_settings: schedulingSettingType;
  }>({
    first_name: null,
    last_name: null,
    email: null,
    designation: null,
    department: null,
    role: null,
    scheduling_settings: null
  });

  const [inviteData, setInviteData] = useState<
    {
      first_name: string;
      last_name: string;
      email: string;
      department: string;
      designation: string;
      role: RecruiterUserType['role'];
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    email: boolean;
    department: boolean;
    designation: boolean;
    role: boolean;
  }>({
    first_name: false,
    email: false,
    department: false,
    designation: false,
    role: false
  });

  const [isDisable, setIsDisable] = useState(false);
  const [isResendDisable, setResendDisable] = useState(false);
  const [isInviteCardVisible, setInviteCardVisible] = useState(false);

  const checkValidation = () => {
    let flag = false;
    let temp = { ...formError };
    if (!form.first_name || form.first_name.trim() === '') {
      temp = { ...temp, first_name: true };
      flag = true;
    }
    if (
      !form.email ||
      form.email.trim() === '' ||
      form.email.split('@')[1] !== recruiter.email.split('@')[1]
    ) {
      if (form.email.split('@')[1] !== recruiter.email.split('@')[1]) {
        toast.error(`Email doesn't match with organization!`);
      }
      temp = { ...temp, email: true };
      flag = true;
    }
    if (!form.department || form.department.trim() === '') {
      temp = { ...temp, department: true };
      flag = true;
    }
    if (!form.designation || form.designation.trim() === '') {
      temp = { ...temp, designation: true };
      flag = true;
    }
    if (!form.role || form.role.trim() === '') {
      temp = { ...temp, role: true };
      flag = true;
    }
    if (flag) {
      setFormError(temp);
      setIsDisable(false);
      return false;
    }
    return true;
  };
  const inviteUser = async () => {
    const res = await inviteUserApi(
      {
        ...form,
        scheduling_settings:
          recruiter.scheduling_settings as schedulingSettingType
      },
      userDetails.user.id,
      {
        name: recruiterUser.first_name,
        email: recruiterUser.email
      }
    );

    if (res.status === 200) {
      let { error, created, user } = res.data;
      if (!error && created) {
        setMembers((prev) => [...prev, user]);
        setInviteData((prev) => [
          ...prev,
          {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            department: form.department,
            designation: form.designation,
            role: form.role.toLowerCase() as typeof form.role
          }
        ]);
        setInviteCardVisible(true);
        toast.success('Invite sent');
        setIsDisable(false);
        setForm({
          first_name: null,
          last_name: null,
          email: null,
          department: null,
          designation: null,
          role: null,
          scheduling_settings: null
        });
      } else {
        toast.error('User allready exists');
      }
    }
    setIsDisable(false);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px' }}>
        {menu === 'addMember' ? (
          <>
            <TeamInvite
              textTitle={'Add Member'}
              isInviteSentVisible={false}
              isInviteTeamCardVisible={isInviteCardVisible}
              slotInviteTeamCard={inviteData.map((data) => {
                return (
                  <>
                    <InviteTeamCard
                      textEmail={data.email}
                      textName={data.first_name}
                      slotAvatar={<Icon variant='UserSolo' />}
                    />
                  </>
                );
              })}
              slotForm={
                <Stack spacing={2}>
                  <TextField
                    value={form.first_name ? form.first_name : ''}
                    placeholder='First Name'
                    error={formError.first_name}
                    onFocus={() => {
                      setFormError({ ...formError, first_name: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, first_name: e.target.value });
                    }}
                  />
                  <TextField
                    value={form.last_name ? form.last_name : ''}
                    placeholder='Last Name'
                    onChange={(e) => {
                      setForm({ ...form, last_name: e.target.value });
                    }}
                  />
                  <TextField
                    value={form.email ? form.email : ''}
                    placeholder='Email'
                    error={formError.email}
                    onFocus={() => {
                      setFormError({ ...formError, email: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                  <TextField
                    value={form.designation ? form.designation : ''}
                    placeholder='Designation'
                    error={formError.designation}
                    onFocus={() => {
                      setFormError({ ...formError, designation: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, designation: e.target.value });
                    }}
                  />
                  <Autocomplete
                    fullWidth
                    value={form.department}
                    onChange={(event: any, newValue: string | null) => {
                      setForm({
                        ...form,
                        department: newValue
                      });
                    }}
                    options={recruiter?.departments?.map((departments) =>
                      capitalize(departments)
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={formError.department}
                        onFocus={() => {
                          setFormError({ ...formError, department: false });
                        }}
                        name='Department'
                        placeholder='Department'
                      />
                    )}
                  />
                  <Autocomplete
                    fullWidth
                    value={form.role}
                    onChange={(event: any, newValue: string | null) => {
                      setForm({
                        ...form,
                        role: newValue as 'member' | 'interviewer' | 'scheduler'
                      });
                    }}
                    id='controllable-states-demo'
                    options={(
                      [
                        'member',
                        'interviewer',
                        'scheduler'
                      ] as Database['public']['Enums']['agent_type'][]
                    ).map((role) => capitalize(role))}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='Role'
                        placeholder='Role'
                        error={formError.role}
                        onFocus={() => {
                          setFormError({ ...formError, role: false });
                        }}
                      />
                    )}
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
                    setForm({
                      ...form,
                      first_name: null,
                      last_name: null,
                      email: null,
                      department: null,
                      designation: null
                    });
                }
              }}
            />
            {isDisable && <Loader />}
          </>
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
                      height: '100%'
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
                        }
                      );
                    }}
                  >
                    Resend
                  </AUIButton>
                }
              />
            ))}
            onClickClose={{
              onClick: () => onClose()
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
