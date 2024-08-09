import { employmentTypeEnum, RecruiterUserType } from '@aglint/shared-types';
import { Autocomplete, Drawer, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { InviteTeamCard } from '@/devlink/InviteTeamCard';
import { TeamInvite } from '@/devlink/TeamInvite';
import axios from '@/src/client/axios';
import Icon from '@/src/components/Common/Icons/Icon';
import ImageUploadManual from '@/src/components/Common/ImageUpload/ImageUploadManual';
import UIPhoneInput from '@/src/components/Common/UIPhoneInput';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiResponseGetMember } from '@/src/pages/api/get_member';
import { API_setMembersWithRole } from '@/src/pages/api/setMembersWithRole/type';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { useRolesOptions } from '../hooks';

const EditMember = ({
  open,
  member,
  refetch,
  memberList,
  onClose,
}: {
  open: boolean;
  refetch: () => void;
  member: ApiResponseGetMember;
  memberList: { id: string; name: string }[];
  onClose: () => void;
}) => {
  const { data: roleOptions } = useRolesOptions();
  const { recruiterUser } = useAuthDetails();
  const { data: departments } = useAllDepartments();
  const { data: officeLocations } = useAllOfficeLocations();

  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    linked_in: string;
    location: ReturnType<
      typeof useAuthDetails
    >['recruiter']['office_locations'][number];
    employment: employmentTypeEnum;
    position: string;
    department: ReturnType<
      typeof useAuthDetails
    >['members'][number]['department'];
    role: string;
    role_id: string;
    manager_id: string;
    phone: string;
    profile_image: string;
  } | null>(null);

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
    position: boolean;
    phone: boolean;
    role: boolean;
    manager: boolean;
  }>({
    first_name: false,
    department: false,
    linked_in: false,
    location: false,
    employment: false,
    phone: false,
    position: false,
    role: false,
    manager: false,
  });

  useEffect(() => {
    if (member?.user_id)
      setForm({
        first_name: member.first_name,
        last_name: member.last_name,
        phone: member.phone,
        linked_in: member.linked_in,
        location: member.office_locations,
        employment: member.employment,
        profile_image: member.profile_image,
        department: member.departments,
        position: member.position,
        role: member?.recruiter_relation[0].roles.name,
        role_id: member?.recruiter_relation[0].roles.id,
        manager_id: member?.recruiter_relation[0].manager_id,
      });
  }, [member?.user_id]);

  const [isUpdating, setIsUpdating] = useState(false);

  const checkValidation = () => {
    const temp = { ...formError };

    let flag = false;

    if (!form.first_name || form.first_name.trim() === '') {
      temp.first_name = true;
      flag = true;
    }
    if (!form.department) {
      temp.department = true;
      flag = true;
    }
    if (!form.position || form.position.trim() === '') {
      temp.position = true;
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
      setIsUpdating(false);
    }
    return !flag;
  };

  function permissionCheck() {
    if (recruiterUser.role === 'admin') {
      if (
        recruiterUser.user_id === member.user_id ||
        form.role !== 'admin' ||
        recruiterUser.user_id === member.recruiter_relation[0].created_by
      ) {
        return true;
      } else if (
        form.role === 'admin' &&
        recruiterUser.created_by === member.user_id
      ) {
        toast.error('Permission Denied');

        return false;
      } else if (
        form.role === 'admin' &&
        recruiterUser.user_id !== member.recruiter_relation[0].created_by
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

  const imageFile = useRef(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const updateHandle = async () => {
    try {
      setIsUpdating(true);

      let profile_image = member.profile_image;
      if (isImageChanged) {
        const { data } = await supabase.storage
          .from('recruiter-user')
          .upload(`public/${member.user_id}`, imageFile.current, {
            cacheControl: '3600',
            upsert: true,
          });

        if (data?.path && imageFile?.current?.size) {
          profile_image = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recruiter-user/${data?.path}?t=${new Date().toISOString()}`;
        } else {
          profile_image = null;
        }
        setIsImageChanged(false);
      }

      const data = {
        first_name: form.first_name,
        last_name: form.last_name,
        linked_in: form.linked_in,
        employment: form.employment,
        profile_image: profile_image,
        position: form.position,
        role_id: form.role_id,
        phone: form.phone,
        manager_id: form.manager_id,
        department_id: form.department.id,
        office_location_id: form.location.id,
        user_id: member.user_id,
      };
      await axios
        .call<API_setMembersWithRole>('POST', '/api/setMembersWithRole', {
          data,
        })
        .then((res) => res.data);
      onClose();
      refetch();
    } catch (e) {
      //
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={() => {
        onClose();
      }}
      anchor='right'
    >
      {form && (
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
                <Stack
                  direction={'row'}
                  justifyContent={'flex-start'}
                  alignItems={'center'}
                  spacing={2}
                >
                  <ImageUploadManual
                    image={form.profile_image}
                    size={64}
                    imageFile={imageFile}
                    setChanges={() => {
                      setIsImageChanged(true);
                    }}
                  />
                  <Stack>
                    <Typography fontSize={'13px'}>
                      <span
                        style={{ color: 'var(--error-9)', fontWeight: '500' }}
                      >
                        Change profile photo{' '}
                      </span>
                      ( optional )
                    </Typography>
                    <Typography fontSize={'12px'}>
                      Upload a square profile image (PNG or JPEG). Maximum size:
                      5 MB.
                    </Typography>
                  </Stack>
                </Stack>
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
                    value={form.position ? form.position : ''}
                    placeholder='Enter Title'
                    label='Title'
                    required
                    helperText={formError.position ? 'Title must required' : ''}
                    error={formError.position}
                    onFocus={() => {
                      setFormError({ ...formError, position: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, position: e.target.value });
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
                        location: newValue,
                      });
                    }}
                    getOptionLabel={(item) =>
                      capitalizeFirstLetter(
                        `${item.city}, ${item.region}, ${item.country}`,
                      )
                    }
                    options={officeLocations}
                    renderOption={(props, item) => (
                      <li {...props}>
                        {capitalizeFirstLetter(
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
                    value={form.department}
                    onChange={(event: any, newValue) => {
                      setForm({
                        ...form,
                        department: newValue,
                      });
                    }}
                    getOptionLabel={(op) => capitalizeFirstLetter(op.name)}
                    options={departments}
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

                {(member.recruiter_relation[0].roles.name !== 'admin' ||
                  member.recruiter_relation[0].created_by ===
                    recruiterUser.user_id) &&
                  member.user_id !== recruiterUser.user_id && (
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
                            helperText={
                              formError.role ? 'Role must required' : ''
                            }
                            error={formError.role}
                            onFocus={() => {
                              setFormError({ ...formError, role: false });
                            }}
                          />
                        )}
                      />
                      {form.role !== 'admin' && (
                        <>
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
                                  setFormError({
                                    ...formError,
                                    manager: false,
                                  });
                                }}
                                helperText={
                                  formError.manager
                                    ? 'Manager must required'
                                    : ''
                                }
                              />
                            )}
                          />
                        </>
                      )}
                    </Stack>
                  )}

                {(member.recruiter_relation[0].roles.name !== 'admin' ||
                  member.recruiter_relation[0].created_by ===
                    recruiterUser.user_id) &&
                  member.user_id !== recruiterUser.user_id && (
                    <Stack width={'278px'}>
                      <UIPhoneInput
                        labelSize='small'
                        defaultCountry={'india'}
                        label={'Phone'}
                        placeholder={'Enter a phone number'}
                        value={form.phone}
                        required={true}
                        error={formError.phone}
                        onChange={(value, data, event, formattedValue) => {
                          setForm({
                            ...form,
                            phone: formattedValue,
                          });
                        }}
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
                            location: null,
                            position: null,
                            profile_image: null,
                            phone: null,
                            role: null,
                            role_id: null,
                            manager_id: null,
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
                    isLoading={isUpdating}
                    isDisabled={recruiterUser.role !== 'admin' || isUpdating}
                    onClickButton={{
                      onClick: () => {
                        if (checkValidation()) {
                          updateHandle();
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
                    profile_image: null,
                    location: null,
                    phone: null,
                    position: null,
                    role: null,
                    role_id: null,
                    manager_id: null,
                  });
              },
            }}
          />
        </Stack>
      )}
    </Drawer>
  );
};

export default EditMember;
