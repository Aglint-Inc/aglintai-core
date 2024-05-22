import {
  DB,
  employmentTypeEnum,
  RecruiterUserType,
  schedulingSettingType,
} from '@aglint/shared-types';
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

import { ButtonPrimaryRegular } from '@/devlink/ButtonPrimaryRegular';
import { InviteTeamCard } from '@/devlink/InviteTeamCard';
import { TeamInvite } from '@/devlink/TeamInvite';
import { TeamInvitesBlock } from '@/devlink/TeamInvitesBlock';
import { TeamPendingInvites } from '@/devlink/TeamPendingInvites';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
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
  memberList,
  pendingList,
  onClose,
}: {
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  memberList: { id: string; name: string }[];
  pendingList: RecruiterUserType[];
  onClose: () => void;
}) => {
  const { userDetails, setMembers, recruiter } = useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    linked_in: string;
    employment: employmentTypeEnum;
    designation: string;
    interview_location: string;
    department: string;
    role: RecruiterUserType['role'];
    scheduling_settings: schedulingSettingType;
    manager_id: string;
  }>({
    first_name: null,
    last_name: null,
    email: null,
    linked_in: null,
    employment: null,
    interview_location: null,
    designation: null,
    department: null,
    role: null,
    scheduling_settings: null,
    manager_id: null,
  });

  const [inviteData, setInviteData] = useState<
    {
      first_name: string;
      last_name: string;
      email: string;
      linked_in: string;
      employment: employmentTypeEnum;
      department: string;
      interview_location: string;
      designation: string;
      role: RecruiterUserType['role'];
      manager_id: string;
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    email: boolean;
    linked_in: boolean;
    department: boolean;
    employment: boolean;
    interview_location: boolean;
    designation: boolean;
    role: boolean;
    manager: boolean;
  }>({
    first_name: false,
    email: false,
    linked_in: false,
    employment: false,
    department: false,
    interview_location: false,
    designation: false,
    role: false,
    manager: false,
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
        toast.error(`Email domain doesn't match organization.`);
      }
      temp = { ...temp, email: true };
      flag = true;
    }
    if (form.linked_in?.length) {
      const linkedInURLPattern =
        // eslint-disable-next-line security/detect-unsafe-regex
        /^(https?:\/\/)?((www|in)\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
      temp = { ...temp, linked_in: !linkedInURLPattern.test(form.linked_in) };
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
    if (!form.manager_id || form.manager_id.trim() === '') {
      temp = { ...temp, manager: true };
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
      // userDetails.user.id,
      recruiter.id,
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
            linked_in: form.linked_in,
            department: form.department,
            interview_location: form.interview_location,
            designation: form.designation,
            role: form.role.toLowerCase() as typeof form.role,
            manager_id: form.manager_id,
            employment: form.employment,
          },
        ]);
        setInviteCardVisible(true);
        toast.success('Invite sent successfully.');
        setIsDisable(false);
        setForm({
          first_name: null,
          last_name: null,
          email: null,
          linked_in: null,
          department: null,
          interview_location: null,
          designation: null,
          role: null,
          scheduling_settings: null,
          employment: null,
          manager_id: null,
        });
      } else {
        toast.error(
          error?.includes('email address:') ? error : 'Member already exists.',
        );
      }
    }
    setIsDisable(false);
  };
  const memberListObj = memberList.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '600px', height: '100%' }}>
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
                  <Stack direction={'row'} gap={2} width={'100%'}>
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
                  </Stack>

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
                      setForm({ ...form, email: e.target.value.trim() });
                    }}
                  />
                  <CustomTextField
                    value={form.linked_in ? form.linked_in : ''}
                    name='LinkedIn'
                    placeholder='Enter linkedin URL'
                    label='LinkedIn'
                    error={formError.linked_in}
                    onFocus={() => {
                      setFormError({ ...formError, linked_in: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, linked_in: e.target.value.trim() });
                    }}
                  />
                  <Stack direction={'row'} gap={2}>
                    <CustomTextField
                      value={form.designation ? form.designation : ''}
                      name='title'
                      placeholder='Enter title'
                      label='Title'
                      error={formError.designation}
                      onFocus={() => {
                        setFormError({ ...formError, designation: false });
                      }}
                      onChange={(e) => {
                        setForm({ ...form, designation: e.target.value });
                      }}
                    />
                    <Autocomplete
                      // style={{ marginTop: '20px' }}
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
                      getOptionLabel={(option) => capitalizeFirstLetter(option)}
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
                          placeholder='Select Employment Type'
                          label='Employment'
                        />
                      )}
                    />
                  </Stack>

                  <Stack direction={'row'} gap={2}>
                    <Autocomplete
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
                          placeholder='Choose Location'
                          label='Location'
                        />
                      )}
                    />
                    <Autocomplete
                      fullWidth
                      value={form.department}
                      onChange={(event: any, newValue: string | null) => {
                        setForm({
                          ...form,
                          department: newValue,
                        });
                      }}
                      options={recruiter?.departments?.map((departments) =>
                        capitalizeFirstLetter(departments),
                      )}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          error={formError.department}
                          onFocus={() => {
                            setFormError({ ...formError, department: false });
                          }}
                          name='Department'
                          placeholder='Select Department'
                          label='Department'
                        />
                      )}
                    />
                  </Stack>

                  <Stack direction={'row'} gap={2}>
                    <Autocomplete
                      fullWidth
                      value={capitalizeFirstLetter(form.role)}
                      onChange={(event: any, newValue: string | null) => {
                        setForm({
                          ...form,
                          role: newValue as
                            | 'recruiter'
                            | 'interviewer'
                            | 'hiring_manager'
                            | 'recruiting_coordinator'
                            | 'sourcer',
                        });
                      }}
                      id='controllable-states-demo'
                      options={
                        [
                          'recruiter',
                          'interviewer',
                          'hiring_manager',
                          'recruiting_coordinator',
                          'sourcer',
                        ] as DB['public']['Enums']['user_roles'][]
                      }
                      renderOption={(props, op) => (
                        <li {...props}>{capitalizeFirstLetter(op)}</li>
                      )}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          name='Role'
                          placeholder='Choose Role'
                          label='Role'
                          error={formError.role}
                          onFocus={() => {
                            setFormError({ ...formError, role: false });
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      fullWidth
                      value={form.manager_id}
                      onChange={(event: any, newValue: string | null) => {
                        setForm({
                          ...form,
                          manager_id: newValue,
                        });
                      }}
                      id='controllable-states-demo'
                      options={memberList.map((member) => member.id)}
                      getOptionLabel={(option) => {
                        return capitalizeFirstLetter(
                          memberListObj[String(option)],
                        );
                      }}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          name='manager'
                          placeholder='Select Manager'
                          label='Manager'
                          error={formError.manager}
                          onFocus={() => {
                            setFormError({ ...formError, manager: false });
                          }}
                        />
                      )}
                    />
                  </Stack>
                </Stack>
              }
              slotButtons={
                <Stack width={'100%'} marginTop={'16px'}>
                  <AUIButton
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
                            return toast.success('Invite sent successfully.');
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
    <Stack width={'100%'}>
      {Boolean(label) && (
        <Typography fontSize={'14px'} marginBottom={'3px'}>
          {label}
        </Typography>
      )}
      <TextField {...{ ...props, label: undefined }} />
    </Stack>
  );
};
