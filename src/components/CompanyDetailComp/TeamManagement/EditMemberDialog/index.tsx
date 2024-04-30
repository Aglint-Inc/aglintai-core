import {
  Autocomplete,
  Drawer,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { capitalize } from 'lodash';
import { useState } from 'react';

import { InviteTeamCard, TeamInvite } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import Icon from '@/src/components/Common/Icons/Icon';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { employmentTypeEnum, RecruiterUserType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import toast from '@/src/utils/toast';

import { interviewLocationType } from '../AddMemberDialog';

const EditMember = ({
  open,
  member,
  onClose,
}: {
  open: boolean;
  member: RecruiterUserType;
  onClose: () => void;
}) => {
  const { handelMemberUpdate, recruiter } = useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    interview_location: string;
    employment: employmentTypeEnum;
    designation: string;
    department: string;
    role: RecruiterUserType['role'];
  }>({
    first_name: member.first_name,
    last_name: member.last_name,
    interview_location: member.interview_location,
    employment: member.employment,
    department: member.department,
    designation: member.position,
    role: member.role,
  });

  const [inviteData, setInviteData] = useState<
    {
      name: string;
      email: string;
      role: RecruiterUserType['role'];
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    department: boolean;
    interview_location: boolean;
    employment: boolean;
    designation: boolean;
    role: boolean;
  }>({
    first_name: false,
    department: false,
    interview_location: false,
    employment: false,
    designation: false,
    role: false,
  });

  const [isDisable, setIsDisable] = useState(false);

  const checkValidation = () => {
    if (!form.first_name || form.first_name.trim() === '') {
      setFormError({ ...formError, first_name: true });
      setIsDisable(false);
      return false;
    } else if (!form.department || form.department.trim() === '') {
      setFormError({ ...formError, department: true });
      setIsDisable(false);
      return false;
    } else if (!form.designation || form.designation.trim() === '') {
      setFormError({ ...formError, designation: true });
      setIsDisable(false);
      return false;
    } else if (!form.role || form.role.trim() === '') {
      setFormError({ ...formError, role: true });
      setIsDisable(false);
      return false;
    }
    return true;
  };

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '500px' }}>
        <TeamInvite
          textTitle={'Update Details'}
          isInviteSentVisible={false}
          isInviteTeamCardVisible={false}
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
              <Stack flexDirection={'row'} gap={2} width={'100%'}>
                <CustomTextField
                  // sx={{ width: '50% !important' }}
                  value={form.first_name ? form.first_name : ''}
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
                <CustomTextField
                  // sx={{ width: '50% !important' }}
                  value={form.last_name ? form.last_name : ''}
                  placeholder='Last Name'
                  label='Last Name'
                  onChange={(e) => {
                    setForm({ ...form, last_name: e.target.value });
                  }}
                />
              </Stack>

              <Stack flexDirection={'row'} gap={2} width={'100%'}>
                <CustomTextField
                  value={form.designation ? form.designation : ''}
                  placeholder='Tittle'
                  label='Tittle'
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
                  value={form.employment || ''}
                  onChange={(
                    event: any,
                    newValue: employmentTypeEnum | null,
                  ) => {
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
              </Stack>

              <Stack flexDirection={'row'} gap={2} width={'100%'}>
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
                      placeholder='Location'
                      label='Location'
                    />
                  )}
                />
                <Autocomplete
                  fullWidth
                  value={capitalize(form.department)}
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
              </Stack>

              {member.role !== 'admin' && (
                <Autocomplete
                  fullWidth
                  value={capitalize(form.role)}
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
              )}
            </Stack>
          }
          slotButtons={
            <Stack width={'100%'} marginTop={'10px'}>
              <AUIButton
                disabled={isDisable}
                size='medium'
                onClick={() => {
                  setIsDisable(true);
                  if (checkValidation()) {
                    // inviteUser();
                    handelMemberUpdate({
                      user_id: member.user_id,
                      data: {
                        first_name: form.first_name,
                        last_name: form.last_name,
                        interview_location: form.interview_location,
                        employment: form.employment,
                        department: form.department,
                        position: form.designation,
                        role: form.role.toLowerCase() as typeof form.role,
                      },
                    })
                      .then(() => {
                        onClose();
                        toast.success('Member Updated');
                      })
                      .catch(() => {
                        toast.error('Error Updating Member');
                        setIsDisable(false);
                      });
                  }
                }}
              >
                Update
              </AUIButton>
            </Stack>
          }
          onClickClose={{
            onClick: () => {
              onClose(),
                setInviteData([]),
                setForm({
                  first_name: null,
                  last_name: null,
                  department: null,
                  employment: null,
                  interview_location: null,
                  designation: null,
                  role: 'recruiter',
                });
            },
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default EditMember;

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
