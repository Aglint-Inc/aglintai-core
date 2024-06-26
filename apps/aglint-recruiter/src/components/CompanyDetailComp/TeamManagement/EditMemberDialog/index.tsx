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
import toast from '@/src/utils/toast';

import { interviewLocationType } from '../AddMemberDialog';
import { useRolesOptions } from '../hooks';

const EditMember = ({
  open,
  member,
  memberList,
  onClose,
}: {
  open: boolean;
  member: RecruiterUserType & { role_id: string };
  memberList: { id: string; name: string }[];
  onClose: () => void;
}) => {
  const { data: roleOptions } = useRolesOptions();
  const { handelMemberUpdate, recruiter } = useAuthDetails();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    linked_in: string;
    interview_location: string;
    employment: employmentTypeEnum;
    designation: string;
    department: string;
    role: string;
    role_id: string;
    manager_id: string;
  }>({
    first_name: member.first_name,
    last_name: member.last_name,
    linked_in: member.linked_in,
    interview_location: member.interview_location,
    employment: member.employment,
    department: member.department,
    designation: member.position,
    role: member.role,
    role_id: member.role_id,
    manager_id: member.manager_id,
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
    interview_location: boolean;
    employment: boolean;
    designation: boolean;
    role: boolean;
    manager: boolean;
  }>({
    first_name: false,
    department: false,
    linked_in: false,
    interview_location: false,
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
    if (
      form.role_id != 'admin' &&
      (!form.manager_id || form.manager_id.trim() == '')
    ) {
      temp.manager = true;
      flag = true;
    }
    if (flag) {
      setFormError(temp);
      setIsDisable(false);
    }
    return !flag;
  };

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
                    <UITextField
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
                  value={capitalizeFirstLetter(form.department)}
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
                    <UITextField
                      {...params}
                      error={formError.department}
                      onFocus={() => {
                        setFormError({ ...formError, department: false });
                      }}
                      required
                      helperText={
                        formError.department
                          ? 'Department is must required'
                          : ''
                      }
                      name='Department'
                      placeholder='Select Department'
                      label='Department'
                    />
                  )}
                />
              </Stack>

              {member.role !== 'admin' && (
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
                          interview_location: null,
                          designation: null,
                          role: null,
                          role_id: null,
                          manager_id: null,
                        });
                    },
                  }}
                />
              </Stack>
              <Stack width={'100%'} marginTop={'var(--space-2)'}>
                {/* <AUIButton
                disabled={isDisable}
                size='large'
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
                        linked_in: form.linked_in,
                        employment: form.employment,
                        department: form.department,
                        position: form.designation,
                        role: form.role.toLowerCase() as typeof form.role,
                        manager_id: form.manager_id,
                      },
                    })
                      .then(() => {
                        onClose();
                        toast.success('Member updated successfully.');
                      })
                      .catch(() => {
                        toast.error('Error updating member.');
                        setIsDisable(false);
                      });
                  }
                }}
              >
                Update
              </AUIButton> */}
                <ButtonSolid
                  size={2}
                  textButton='Update'
                  color={'accent'}
                  isDisabled={isDisable}
                  onClickButton={{
                    onClick: () => {
                      setIsDisable(true);
                      if (checkValidation()) {
                        // inviteUser();
                        handelMemberUpdate({
                          user_id: member.user_id,
                          data: {
                            first_name: form.first_name,
                            last_name: form.last_name,
                            interview_location: form.interview_location,
                            linked_in: form.linked_in,
                            employment: form.employment,
                            department: form.department,
                            position: form.designation,
                            role_id: form.role_id,
                            manager_id: form.manager_id,
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
                  interview_location: null,
                  designation: null,
                  role: 'recruiter',
                  role_id: null,
                  manager_id: null,
                });
            },
          }}
        />
      </Stack>
    </Drawer>
  );
};

export default EditMember;
