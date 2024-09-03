import {
  type employmentTypeEnum,
  type RecruiterUserType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { Autocomplete, Drawer, Stack } from '@mui/material';
import converter from 'number-to-words';
import { useState } from 'react';

import { useToast } from '@/components/hooks/use-toast';
import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { InviteTeamCard } from '@/devlink/InviteTeamCard';
import { TeamInvite } from '@/devlink/TeamInvite';
import { TeamInvitesBlock } from '@/devlink/TeamInvitesBlock';
import { TeamPendingInvites } from '@/devlink/TeamPendingInvites';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useAllDepartments } from '@/src/queries/departments';
import { useAllMembers } from '@/src/queries/members';
import { useAllOfficeLocations } from '@/src/queries/officeLocations';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';
import timeZone from '@/src/utils/timeZone';

import { useRolesOptions } from '../hooks';
import { inviteUserApi, reinviteUser } from '../utils';

const AddMember = ({
  open,
  menu,
  memberList,
  pendingList,
  onClose,
  defaultRole,
}: {
  open: boolean;
  menu: 'addMember' | 'pendingMember';
  memberList: { id: string; name: string }[];
  pendingList?: RecruiterUserType[];
  onClose: () => void;
  defaultRole?: {
    role: string;
    role_id: string;
  };
}) => {
  const { recruiter, recruiterUser } = useAuthDetails();
  const { data: locations } = useAllOfficeLocations();
  const { data: departments } = useAllDepartments();
  const { refetchMembers } = useAllMembers();
  const [form, setForm] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    linked_in: string;
    employment: employmentTypeEnum;
    position: string;
    location_id: number;
    department_id: number;
    role: string;
    role_id: string;
    manager_id: string;
  }>({
    first_name: null,
    last_name: null,
    email: null,
    linked_in: null,
    employment: null,
    location_id: null,
    position: null,
    department_id: null,
    role_id: defaultRole?.role_id ? defaultRole.role_id : null,
    role: defaultRole?.role ? defaultRole.role : null,
    manager_id: null,
  });

  const [inviteData, setInviteData] = useState<Omit<typeof form, 'role'>[]>([]);

  const [formError, setFormError] = useState<{
    first_name: boolean;
    email: boolean;
    linked_in: boolean;
    department: boolean;
    employment: boolean;
    location: boolean;
    position: boolean;
    role: boolean;
    manager: boolean;
  }>({
    first_name: false,
    email: false,
    linked_in: false,
    employment: false,
    department: false,
    location: false,
    position: false,
    role: false,
    manager: false,
  });

  const [isDisable, setIsDisable] = useState(false);
  const [isResendDisable, setResendDisable] = useState<string>(null);
  const [isInviteCardVisible, setInviteCardVisible] = useState(false);
  const { data: roleOptions } = useRolesOptions();
  const { toast } = useToast();
  const checkValidation = () => {
    let flag = false;
    let temp = { ...formError };
    if (!form.first_name || form.first_name.trim() === '') {
      temp = { ...temp, first_name: true };
      flag = true;
    }
    if (!form?.email?.trim().length) {
      temp = { ...temp, email: true };
      flag = true;
    } else if (
      !(
        form?.email?.split('@')[1] === recruiter?.email?.split('@')[1] ||
        recruiterUser.primary
      )
    ) {
      toast({
        variant: 'destructive',
        title:
          'The user you are trying to invite is outside of the organization. Please contact your Primary Admin for assistance',
      });
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
    if (!form.department_id) {
      temp = { ...temp, department: true };
      flag = true;
    }
    if (!form.position || form.position.trim() === '') {
      temp = { ...temp, position: true };
      flag = true;
    }
    if (!form.role_id || form.role_id.trim() === '') {
      temp = { ...temp, role: true };
      flag = true;
    }
    if (!form.location_id) {
      temp = { ...temp, location: true };
      flag = true;
    }
    if (
      form.role !== 'admin' &&
      (!form.manager_id || form.manager_id.trim() === '')
    ) {
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
    try {
      const resData = await inviteUserApi(
        {
          ...form,
          department_id: form.department_id,
          office_location_id: form.location_id,
          scheduling_settings: {
            ...recruiter.scheduling_settings,
            timeZone: timeZone.find(
              (item) =>
                item.label ===
                locations.find((loc) => loc.id === form.location_id).timezone,
            ),
          } as schedulingSettingType,
        },
        recruiter.id,
      );

      let { created } = resData;
      if (created) {
        refetchMembers();
        setInviteData((prev) => [
          ...prev,
          {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            linked_in: form.linked_in,
            department_id: form.department_id,
            location_id: form.location_id,
            position: form.position,
            role_id: form.role_id,
            manager_id: form.manager_id,
            employment: form.employment,
          },
        ]);
        setInviteCardVisible(true);
        toast({
          variant: 'default',
          title: 'Invite sent successfully.',
        });
        setIsDisable(false);
        setForm({
          first_name: null,
          last_name: null,
          email: null,
          linked_in: null,
          department_id: null,
          location_id: null,
          position: null,
          role: null,
          role_id: null,
          employment: null,
          manager_id: null,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to invite user',
        description: String(error),
      });
    } finally {
      setIsDisable(false);
    }
  };
  const memberListObj = memberList.reduce((acc, curr) => {
    acc[curr.id] = curr.name;
    return acc;
  }, {});
  const isSubmittable = !(
    form.first_name &&
    form.email &&
    form.employment &&
    form.position &&
    form.department_id &&
    form.location_id &&
    (form.role === 'admin' ? !!form.role : !!form.role && !!form.manager_id)
  );

  return (
    <Drawer open={open} onClose={onClose} anchor='right'>
      <Stack sx={{ width: '600px', height: '100%' }}>
        {menu === 'addMember' ? (
          <>
            <TeamInvite
              isFixedButtonVisible
              slotPrimaryButton={
                <ButtonSolid
                  textButton='Done'
                  size={2}
                  isDisabled={!inviteData?.length}
                  onClickButton={{
                    onClick: () => {
                      onClose(),
                        setInviteData([]),
                        setForm({
                          ...form,
                          first_name: null,
                          last_name: null,
                          email: null,
                          department_id: null,
                          position: null,
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
                          variant='rounded-medium'
                        />
                      }
                    />
                  </>
                );
              })}
              slotForm={
                <Stack spacing={2} component={'form'} autoComplete='on'>
                  <Stack direction={'row'} gap={2} width={'100%'}>
                    <UITextField
                      value={form.first_name ? form.first_name : ''}
                      name='first_name'
                      placeholder='First Name'
                      label='First Name'
                      required
                      error={formError.first_name}
                      helperText={
                        formError.first_name ? 'First name must required' : ''
                      }
                      onFocus={() => {
                        setFormError({ ...formError, first_name: false });
                      }}
                      onChange={(e) => {
                        setForm({ ...form, first_name: e.target.value });
                      }}
                    />
                    <UITextField
                      value={form.last_name ? form.last_name : ''}
                      name='last_name'
                      placeholder='Last Name'
                      label='Last Name'
                      onChange={(e) => {
                        setForm({ ...form, last_name: e.target.value });
                      }}
                    />
                  </Stack>

                  <UITextField
                    value={form.email ? form.email : ''}
                    name='email'
                    placeholder='Email'
                    label='Email'
                    required
                    error={formError.email}
                    helperText={
                      formError.email ? 'Please enter valid email' : ''
                    }
                    onFocus={() => {
                      setFormError({ ...formError, email: false });
                    }}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value.trim() });
                    }}
                  />
                  <UITextField
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
                    <UITextField
                      fullWidth
                      value={form.position ? form.position : ''}
                      name='title'
                      placeholder='Enter title'
                      label='Title'
                      required
                      error={formError.position}
                      helperText={
                        formError.position ? 'Title must required' : ''
                      }
                      onFocus={() => {
                        setFormError({ ...formError, position: false });
                      }}
                      onChange={(e) => {
                        setForm({ ...form, position: e.target.value });
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

                  <Stack direction={'row'} gap={2}>
                    <Autocomplete
                      fullWidth
                      value={
                        locations.find((loc) => form.location_id === loc.id) ||
                        null
                      }
                      onChange={(event, newValue) => {
                        setForm({
                          ...form,
                          location_id: newValue.id,
                        });
                      }}
                      getOptionLabel={(item) =>
                        capitalizeFirstLetter(
                          // @ts-ignore
                          `${item.city}, ${item.region}, ${item.country}`,
                        )
                      }
                      options={locations}
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
                          required
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
                      value={
                        departments.find(
                          (dep) => form.department_id === dep.id,
                        ) || null
                      }
                      onChange={(event: any, newValue) => {
                        setForm({
                          ...form,
                          department_id: newValue.id,
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

                  <Stack direction={'row'} gap={2}>
                    <Stack width={'100%'} maxWidth={'276px'}>
                      <Autocomplete
                        fullWidth
                        value={{ name: form.role, id: form.role_id }}
                        getOptionLabel={(option) =>
                          capitalizeFirstLetter(option.name)
                        }
                        onChange={(event: any, newValue) => {
                          setForm({
                            ...form,
                            role: newValue && newValue.name,
                            role_id: newValue && newValue.id,
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
                            error={formError.role}
                            helperText={
                              formError.role ? 'Role must required' : ''
                            }
                            onFocus={() => {
                              setFormError({ ...formError, role: false });
                            }}
                          />
                        )}
                      />
                    </Stack>

                    {form.role != 'admin' && (
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
                          return memberListObj[String(option)];
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
                </Stack>
              }
              slotButtons={
                <Stack
                  display={'flex'}
                  flexDirection={'row'}
                  gap={'8px'}
                  width={'100%'}
                >
                  <Stack width={'100%'} marginTop={'16px'}>
                    <ButtonSoft
                      isLeftIcon={false}
                      isRightIcon={false}
                      size='2'
                      color={'neutral'}
                      textButton='Cancel'
                      onClickButton={{
                        onClick: () => {
                          onClose(),
                            setInviteData([]),
                            setForm({
                              ...form,
                              first_name: null,
                              last_name: null,
                              email: null,
                              department_id: null,
                              position: null,
                              employment: null,
                              role: null,
                              role_id: null,
                              manager_id: null,
                              location_id: null,
                              linked_in: null,
                            });
                        },
                      }}
                    />
                  </Stack>
                  <Stack width={'100%'} marginTop={'16px'}>
                    <ButtonSolid
                      isLeftIcon={false}
                      isRightIcon={false}
                      size='2'
                      isDisabled={isSubmittable}
                      onClickButton={{
                        onClick: () => {
                          setIsDisable(true);
                          if (checkValidation()) {
                            inviteUser();
                          }
                        },
                      }}
                      textButton={'Invite'}
                    />
                  </Stack>
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
                      department_id: null,
                      position: null,
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
                    variant='rounded-medium'
                  />
                }
                slotButton={
                  <ButtonSoft
                    textButton={'Resend'}
                    isLeftIcon={false}
                    isRightIcon={false}
                    size='2'
                    onClickButton={{
                      onClick: () => {
                        setResendDisable(member.user_id);
                        reinviteUser(member.email, recruiterUser.user_id).then(
                          ({ error, emailSend }) => {
                            setResendDisable(null);
                            if (!error && emailSend) {
                              return toast({
                                variant: 'default',
                                title: 'Invite sent successfully.',
                              });
                            }
                            return toast({
                              variant: 'destructive',
                              title: 'Failed to resend invite',
                              description: error,
                            });
                          },
                        );
                      },
                    }}
                    isDisabled={isResendDisable === member.user_id}
                  ></ButtonSoft>
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

// const CustomTextField = (props: TextFieldProps) => {
//   const label = props.label;
//   return (
//     <Stack width={'100%'}>
//       {Boolean(label) && (
//         <Typography fontSize={'14px'} marginBottom={'3px'}>
//           {label}
//           {props.required && <Typography />}
//         </Typography>
//       )}
//       <TextField {...{ ...props, label: undefined }} />
//     </Stack>
//   );
// };
