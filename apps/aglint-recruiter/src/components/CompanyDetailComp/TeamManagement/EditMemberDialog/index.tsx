import { employmentTypeEnum, RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Drawer, Stack } from '@mui/material';
import { useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { InviteTeamCard } from '@/devlink/InviteTeamCard';
import { TeamInvite } from '@/devlink/TeamInvite';
import Icon from '@/src/components/Common/Icons/Icon';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import timeZone from '@/src/utils/timeZone';
import toast from '@/src/utils/toast';

import { useRolesOptions } from '../hooks';

const EditMember = ({
  open,
  member,
  memberList,
  onClose,
}: {
  open: boolean;
  member: RecruiterUserType & { role_id: string; created_by: string };
  memberList: { id: string; name: string }[];
  onClose: () => void;
}) => {
  const { data: roleOptions } = useRolesOptions();
  const { handleMemberUpdate, recruiter, recruiterUser } = useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    linked_in: string;
    location: ReturnType<
      typeof useAuthDetails
    >['recruiter']['office_locations'][number];
    employment: employmentTypeEnum;
    designation: string;
    department: string;
    role: string;
    role_id: string;
    manager_id: string;
    created_by: string;
    user_id: string;
  }>({
    first_name: member.first_name,
    last_name: member.last_name,
    linked_in: member.linked_in,
    location: recruiter.office_locations.find(
      (loc) =>
        `${loc.city}, ${loc.region}, ${loc.country}` ===
        member.interview_location,
    ),
    employment: member.employment,
    department: member.department,
    designation: member.position,
    role: member.role,
    role_id: member.role_id,
    manager_id: member.manager_id,
    created_by: member?.created_by,
    user_id: member?.user_id,
  });

  const [inviteData, setInviteData] = useState<
    {
      name: string;
      email: string;
      role: RecruiterUserType['role'];
      manager_id: string;
    }[]
  >([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    department: boolean;
    linked_in: boolean;
    location: boolean;
    employment: boolean;
    designation: boolean;
    role: boolean;
    manager: boolean;
  }>({
    first_name: false,
    department: false,
    linked_in: false,
    location: false,
    employment: false,
    designation: false,
    role: false,
    manager: false,
  });

  const [isDisable, setIsDisable] = useState(false);

  const checkValidation = () => {
    const temp = { ...formError };

    let flag = false;

    if (!form.first_name || form.first_name.trim() === '') {
      temp.first_name = true;
      flag = true;
    }
    if (!form.department || form.department.trim() === '') {
      temp.department = true;
      flag = true;
    }
    if (!form.designation || form.designation.trim() === '') {
      temp.designation = true;
      flag = true;
    }
    if (!form.role_id || form.role_id.trim() === '') {
      temp.role = true;
      flag = true;
    }

    if (!permissionCheck()) {
      temp.manager = true;
      flag = true;
    }
    if (flag) {
      setFormError(temp);
      setIsDisable(false);
    }
    return !flag;
  };

  function permissionCheck() {
    if (recruiterUser.role === 'admin') {
      if (
        recruiterUser.user_id === form.user_id ||
        form.role !== 'admin' ||
        recruiterUser.user_id === form.created_by
      ) {
        return true;
      } else if (
        form.role === 'admin' &&
        recruiterUser.created_by === form.user_id
      ) {
        toast.error('Permission Denied');
        // toast.error('You cannot edit power admin detail');
        return false;
      } else if (
        form.role === 'admin' &&
        recruiterUser.user_id !== form.created_by
      ) {
        toast.error('Permission Denied');
        // toast.error('You cannot edit another admin detail');
        return false;
      }
    }
    toast.error('Permission Denied');
    // toast.error('Admin only edit Team member details');
    return false;
  }

  const memberListObj = memberList.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '600px', height: '100%' }}>
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
                <UITextField
                  // sx={{ width: '50% !important' }}
                  value={form.first_name ? form.first_name : ''}
                  placeholder='First Name'
                  label='First Name'
                  helperText={
                    formError.first_name ? 'First name must required' : ''
                  }
                  required
                  error={formError.first_name}
                  onFocus={() => {
                    setFormError({ ...formError, first_name: false });
                  }}
                  onChange={(e) => {
                    setForm({ ...form, first_name: e.target.value });
                  }}
                />
                <UITextField
                  // sx={{ width: '50% !important' }}
                  value={form.last_name ? form.last_name : ''}
                  placeholder='Last Name'
                  label='Last Name'
                  onChange={(e) => {
                    setForm({ ...form, last_name: e.target.value });
                  }}
                />
              </Stack>
              <UITextField
                value={form.linked_in ? form.linked_in : ''}
                name='LinkedIn'
                placeholder='URL'
                label='LinkedIn'
                error={formError.linked_in}
                onFocus={() => {
                  setFormError({ ...formError, linked_in: false });
                }}
                onChange={(e) => {
                  setForm({ ...form, linked_in: e.target.value.trim() });
                }}
              />
              <Stack flexDirection={'row'} gap={2} width={'100%'}>
                <UITextField
                  value={form.designation ? form.designation : ''}
                  placeholder='Enter Title'
                  label='Title'
                  required
                  helperText={
                    formError.designation ? 'Title must required' : ''
                  }
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
                  getOptionLabel={(option) => capitalizeFirstLetter(option)}
                  renderInput={(params) => (
                    <UITextField
                      {...params}
                      error={formError.employment}
                      onFocus={() => {
                        setFormError({
                          ...formError,
                          employment: false,
                        });
                      }}
                      required
                      name='Employment'
                      placeholder='Select Employment Type'
                      label='Employment'
                    />
                  )}
                />
              </Stack>

              <Stack flexDirection={'row'} gap={2} width={'100%'}>
                <Autocomplete
                  fullWidth
                  value={form.location || null}
                  onChange={(_, newValue) => {
                    setForm({
                      ...form,
                      // @ts-ignore
                      location: newValue,
                    });
                  }}
                  getOptionLabel={(item) =>
                    capitalizeFirstLetter(
                      // @ts-ignore
                      `${item.city}, ${item.region}, ${item.country}`,
                    )
                  }
                  options={recruiter?.office_locations}
                  renderOption={(props, item) => (
                    <li {...props}>
                      {capitalizeFirstLetter(
                        // @ts-ignore
                        `${item.city}, ${item.region}, ${item.country}`,
                      )}
                    </li>
                  )}
                  renderInput={(params) => (
                    <UITextField
                      {...params}
                      error={formError.location}
                      onFocus={() => {
                        setFormError({
                          ...formError,
                          location: false,
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
                  value={recruiter?.departments.find(
                    (dep) => dep.name === form.department,
                  )}
                  onChange={(event: any, newValue) => {
                    setForm({
                      ...form,
                      department: newValue.name,
                    });
                  }}
                  getOptionLabel={(op) => capitalizeFirstLetter(op.name)}
                  options={recruiter?.departments}
                  renderOption={(props, op) => (
                    <li {...props}>{capitalizeFirstLetter(op.name)}</li>
                  )}
                  renderInput={(params) => (
                    <UITextField
                      {...params}
                      error={formError.department}
                      onFocus={() => {
                        setFormError({ ...formError, department: false });
                      }}
                      name='Department'
                      placeholder='Select Department'
                      label='Department'
                      required
                      helperText={
                        formError.department
                          ? 'Department is must required'
                          : ''
                      }
                    />
                  )}
                />
              </Stack>

              {(member.role !== 'admin' ||
                member.created_by === recruiterUser.user_id) && (
                <Stack direction={'row'} gap={2}>
                  <Autocomplete
                    fullWidth
                    value={{ name: form.role, id: form.role_id }}
                    getOptionLabel={(option) =>
                      capitalizeFirstLetter(option.name)
                    }
                    onChange={(event: any, newValue) => {
                      setForm({
                        ...form,
                        role: newValue.name,
                        role_id: newValue.id,
                      });
                    }}
                    id='controllable-states-demo'
                    options={roleOptions}
                    renderOption={(props, op) => (
                      <li {...props}>{capitalizeFirstLetter(op.name)}</li>
                    )}
                    renderInput={(params) => (
                      <UITextField
                        {...params}
                        name='Role'
                        placeholder='Choose Role'
                        label='Role'
                        required
                        helperText={formError.role ? 'Role must required' : ''}
                        error={formError.role}
                        onFocus={() => {
                          setFormError({ ...formError, role: false });
                        }}
                      />
                    )}
                  />
                  {form.role !== 'admin' && (
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
                        <UITextField
                          {...params}
                          name='manager'
                          placeholder='Select Manager'
                          label='Manager'
                          required
                          error={formError.manager}
                          onFocus={() => {
                            setFormError({ ...formError, manager: false });
                          }}
                          helperText={
                            formError.manager ? 'Manager must required' : ''
                          }
                        />
                      )}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          }
          slotButtons={
            <Stack
              width={'100%'}
              display={'flex'}
              flexDirection={'row'}
              gap={'8px'}
            >
              <Stack width={'100%'} marginTop={'var(--space-2)'}>
                <ButtonSoft
                  color={'neutral'}
                  size={2}
                  textButton='Cancel'
                  onClickButton={{
                    onClick: () => {
                      onClose(),
                        setInviteData([]),
                        setForm({
                          first_name: null,
                          last_name: null,
                          department: null,
                          employment: null,
                          linked_in: null,
                          location: null,
                          designation: null,
                          role: null,
                          role_id: null,
                          manager_id: null,
                          created_by: null,
                          user_id: null,
                        });
                    },
                  }}
                />
              </Stack>
              <Stack width={'100%'} marginTop={'var(--space-2)'}>
                <ButtonSolid
                  size={2}
                  textButton='Update'
                  color={'accent'}
                  isLoading={isDisable}
                  isDisabled={recruiterUser.role !== 'admin' || isDisable}
                  onClickButton={{
                    onClick: () => {
                      setIsDisable(true);
                      if (checkValidation()) {
                        // inviteUser();
                        handleMemberUpdate({
                          user_id: member.user_id,
                          data: {
                            first_name: form.first_name,
                            last_name: form.last_name,
                            interview_location:
                              form.location &&
                              `${form.location.city}, ${form.location.region}, ${form.location.country}`,
                            linked_in: form.linked_in,
                            employment: form.employment,
                            department: form.department,
                            position: form.designation,
                            role_id: form.role_id,
                            manager_id: form.manager_id,
                            scheduling_settings: {
                              ...member.scheduling_settings,
                              timeZone: timeZone.find(
                                (item) =>
                                  item.label === form.location?.timezone,
                              ),
                            },
                          },
                        })
                          .then(() => {
                            onClose();
                            toast.success('Member updated successfully.');
                          })
                          .catch((error) => {
                            toast.error(
                              String(error || 'Error updating member.'),
                            );
                            setIsDisable(false);
                          });
                      }
                    },
                  }}
                />
              </Stack>
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
                  linked_in: null,
                  location: null,
                  designation: null,
                  role: 'recruiter',
                  role_id: null,
                  manager_id: null,
                  created_by: null,
                  user_id: null,
                });
            },
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default EditMember;
