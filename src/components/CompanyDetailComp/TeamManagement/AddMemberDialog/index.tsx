import {
  Autocomplete,
  Drawer,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import converter from 'number-to-words';
import { useState } from 'react';

import {
  ButtonPrimaryRegular,
  InviteTeamCard,
  TeamInvite,
  TeamInvitesBlock,
  TeamPendingInvites,
} from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { employmentTypeEnum, RecruiterUserType } from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
import { Database } from '@/src/types/schema';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalize } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { inviteUserApi, reinviteUser } from '../utils';
export type interviewLocationType = {
  city: string;
  line1: string;
  line2: string;
  region: string;
  country: string;
  zipcode: string;
  full_address: string;
  is_headquarter: boolean;
};
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
  const { userDetails, setMembers, recruiter, recruiterUser } =
    useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    employment: employmentTypeEnum;
    designation: string;
    interview_location: string;
    department: string;
    role: RecruiterUserType['role'];
    scheduling_settings: schedulingSettingType;
  }>({
    first_name: null,
    last_name: null,
    email: null,
    employment: null,
    interview_location: null,
    designation: null,
    department: null,
    role: null,
    scheduling_settings: null,
  });

  const [inviteData, setInviteData] = useState<
    {
      first_name: string;
      last_name: string;
      email: string;
      employment: employmentTypeEnum;
      department: string;
      interview_location: string;
      designation: string;
      role: RecruiterUserType['role'];
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    email: boolean;
    department: boolean;
    employment: boolean;
    interview_location: boolean;
    designation: boolean;
    role: boolean;
  }>({
    first_name: false,
    email: false,
    employment: false,
    department: false,
    interview_location: false,
    designation: false,
    role: false,
  });

  const [isDisable, setIsDisable] = useState(false);
  const [isResendDisable, setResendDisable] = useState<string>(null);
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
          recruiter.scheduling_settings as schedulingSettingType,
      },
      userDetails.user.id,
      {
        name: recruiterUser.first_name,
        email: recruiterUser.email,
      },
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
            interview_location: form.interview_location,
            designation: form.designation,
            role: form.role.toLowerCase() as typeof form.role,
            employment: form.employment,
          },
        ]);
        setInviteCardVisible(true);
        toast.success('Invite sent');
        setIsDisable(false);
        setForm({
          first_name: null,
          last_name: null,
          email: null,
          department: null,
          interview_location: null,
          designation: null,
          role: null,
          scheduling_settings: null,
          employment: null,
        });
      } else {
        toast.error('User already exists');
      }
    }
    setIsDisable(false);
  };

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px', height: '100%' }}>
        {menu === 'addMember' ? (
          <>
            <TeamInvite
              isFixedButtonVisible
              slotPrimaryButton={
                <ButtonPrimaryRegular
                  isDisabled={!inviteData?.length}
                  textLabel={'Done'}
                  onClickButton={{
                    onClick: () => {
                      onClose(),
                        setInviteData([]),
                        setForm({
                          ...form,
                          first_name: null,
                          last_name: null,
                          email: null,
                          department: null,
                          designation: null,
                        });
                    },
                  }}
                />
              }
              textTitle={'Add Member'}
              isInviteSentVisible={false}
              isInviteTeamCardVisible={isInviteCardVisible}
              slotInviteTeamCard={inviteData.map((data) => {
                return (
                  <>
                    <InviteTeamCard
                      textEmail={data.email}
                      textName={data.first_name + ' ' + data.last_name}
                      slotAvatar={
                        <MuiAvatar
                          // src={data.}
                          level={getFullName(data.first_name, data.last_name)}
                          variant='circular'
                          height='50px'
                          width='50px'
                          fontSize='16px'
                        />
                      }
                    />
                  </>
                );
              })}
              slotForm={
                <Stack spacing={2} component={'form'} autoComplete='on'>
                  <CustomTextField
                    value={form.first_name ? form.first_name : ''}
                    name='first_name'
                    placeholder='First Name'
                    label='First Name'
                    error={formError.first_name}
                    onFocus={() => {
                      setFormError({ ...formError, first_name: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, first_name: e.target.value });
                    }}
                  />
                  {/* <TextField
                    label='First Name'
                    value={form.first_name ? form.first_name : ''}
                    name='first_name'
                    placeholder='First Name'
                    error={formError.first_name}
                    onFocus={() => {
                      setFormError({ ...formError, first_name: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, first_name: e.target.value });
                    }}
                  /> */}
                  <CustomTextField
                    value={form.last_name ? form.last_name : ''}
                    name='last_name'
                    placeholder='Last Name'
                    label='Last Name'
                    onChange={(e) => {
                      setForm({ ...form, last_name: e.target.value });
                    }}
                  />
                  <CustomTextField
                    value={form.email ? form.email : ''}
                    name='email'
                    placeholder='Email'
                    label='Email'
                    error={formError.email}
                    onFocus={() => {
                      setFormError({ ...formError, email: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                  <CustomTextField
                    value={form.designation ? form.designation : ''}
                    name='designation'
                    placeholder='Designation'
                    label='Designation'
                    error={formError.designation}
                    onFocus={() => {
                      setFormError({ ...formError, designation: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, designation: e.target.value });
                    }}
                  />
                  <Autocomplete
                    style={{ marginTop: '20px' }}
                    fullWidth
                    value={form.employment || ''}
                    onChange={(_, newValue: employmentTypeEnum | null) => {
                      setForm({
                        ...form,
                        employment: newValue,
                      });
                    }}
                    options={
                      [
                        'contractor',
                        'fulltime',
                        'parttime',
                      ] as employmentTypeEnum[]
                    }
                    getOptionLabel={(option) => capitalize(option)}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        error={formError.employment}
                        onFocus={() => {
                          setFormError({
                            ...formError,
                            employment: false,
                          });
                        }}
                        name='Employment'
                        placeholder='Employment'
                        label='Employment'
                      />
                    )}
                  />
                  <Autocomplete
                    style={{ marginTop: '20px' }}
                    fullWidth
                    value={form.interview_location || ''}
                    onChange={(event: any, newValue: string | null) => {
                      setForm({
                        ...form,
                        interview_location: newValue,
                      });
                    }}
                    options={recruiter?.office_locations.map(
                      (item: interviewLocationType) => {
                        return `${item.city}, ${item.region}, ${item.country}`;
                      },
                    )}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        error={formError.interview_location}
                        onFocus={() => {
                          setFormError({
                            ...formError,
                            interview_location: false,
                          });
                        }}
                        name='Location'
                        placeholder='Location'
                        label='Location'
                      />
                    )}
                  />
                  <Autocomplete
                    style={{ marginTop: '20px' }}
                    fullWidth
                    value={form.department}
                    onChange={(event: any, newValue: string | null) => {
                      setForm({
                        ...form,
                        department: newValue,
                      });
                    }}
                    options={recruiter?.departments?.map((departments) =>
                      capitalize(departments),
                    )}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        error={formError.department}
                        onFocus={() => {
                          setFormError({ ...formError, department: false });
                        }}
                        name='Department'
                        placeholder='Department'
                        label='Department'
                      />
                    )}
                  />
                  <Autocomplete
                    style={{ marginTop: '20px' }}
                    fullWidth
                    value={form.role}
                    onChange={(event: any, newValue: string | null) => {
                      setForm({
                        ...form,
                        role: newValue as
                          | 'recruiter'
                          | 'interviewer'
                          | 'scheduler',
                      });
                    }}
                    id='controllable-states-demo'
                    options={(
                      [
                        'recruiter',
                        'interviewer',
                        'scheduler',
                      ] as Database['public']['Enums']['agent_type'][]
                    ).map((role) => capitalize(role))}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        name='Role'
                        placeholder='Role'
                        label='Role'
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
                <Stack
                  direction={'row'}
                  justifyContent={'end'}
                  width={'100%'}
                  marginTop={'20px'}
                >
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
                      designation: null,
                    });
                },
              }}
            />
            {isDisable && <DynamicLoader />}
          </>
        ) : menu === 'pendingMember' ? (
          <TeamPendingInvites
            textTitleDescription={`You currently have ${converter.toWords(
              pendingList?.length,
            )} pending invites awaiting your response.`}
            slotList={pendingList.map((member) => (
              <TeamInvitesBlock
                key={member.user_id}
                email={member.email}
                name={member.first_name + ' ' + member.last_name}
                slotImage={
                  <MuiAvatar
                    src={member.profile_image}
                    level={getFullName(member.first_name, member.last_name)}
                    variant='circular'
                    height='100%'
                    width='100%'
                    fontSize='16px'
                  />
                }
                slotButton={
                  <AUIButton
                    disabled={isResendDisable === member.user_id}
                    size='small'
                    onClick={() => {
                      setResendDisable(member.user_id);
                      reinviteUser(member.email, userDetails.user.id).then(
                        ({ error, emailSend }) => {
                          setResendDisable(null);
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

const CustomTextField = (props: TextFieldProps) => {
  const label = props.label;
  return (
    <Stack>
      {Boolean(label) && (
        <Typography fontSize={'14px'} marginBottom={'3px'}>
          {label}
        </Typography>
      )}
      <TextField {...{ ...props, label: undefined }} />
    </Stack>
  );
};
