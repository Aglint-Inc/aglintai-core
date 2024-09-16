import {
  type employmentTypeEnum,
  type RecruiterUserType,
  type schedulingSettingType,
} from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Loader2 } from 'lucide-react';
import converter from 'number-to-words';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useAllDepartments } from '@/queries/departments';
import { useAllMembers } from '@/queries/members';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import { getFullName } from '@/utils/jsonResume';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import timeZone from '@/utils/timeZone';

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
  const { toast } = useToast();
  const { recruiter, recruiterUser } = useAuthDetails();
  const { data: locations } = useAllOfficeLocations();
  const { data: departments } = useAllDepartments();
  const { refetchMembers } = useAllMembers();
  const initform = {
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
  };
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
  }>(initform);

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
  const { data: roleOptions } = useRolesOptions();

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
      flag = !linkedInURLPattern.test(form.linked_in);
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

      const { created } = resData;
      if (created) {
        refetchMembers();
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
    <UIDialog
      open={open}
      onClose={() => {
        onClose();
        setForm(initform);
      }}
      title={menu === 'addMember' ? 'Add Member' : 'Pending Invites'}
      size='lg'
      slotButtons={<></>}
    >
      <div className='mt-4 space-y-4 '>
        {menu === 'addMember' ? (
          <>
            <form className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  value={form.first_name || ''}
                  name='first_name'
                  placeholder='First Name'
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  className={formError.first_name ? 'border-red-500' : ''}
                />
                <Input
                  value={form.last_name || ''}
                  name='last_name'
                  placeholder='Last Name'
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>
              <Input
                value={form.email || ''}
                name='email'
                placeholder='Email'
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value.trim() })
                }
                className={formError.email ? 'border-red-500' : ''}
              />
              <Input
                value={form.linked_in || ''}
                name='LinkedIn'
                placeholder='Enter linkedin URL'
                onChange={(e) =>
                  setForm({ ...form, linked_in: e.target.value.trim() })
                }
                className={formError.linked_in ? 'border-red-500' : ''}
              />
              <div className='grid grid-cols-2 gap-4'>
                <Input
                  value={form.position || ''}
                  name='title'
                  placeholder='Enter title'
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  className={formError.position ? 'border-red-500' : ''}
                />
                <Select
                  value={form.employment || ''}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      employment: value as employmentTypeEnum,
                    })
                  }
                >
                  <SelectTrigger
                    className={formError.employment ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder='Select Employment Type' />
                  </SelectTrigger>
                  <SelectContent>
                    {['contractor', 'fulltime', 'parttime'].map((option) => (
                      <SelectItem key={option} value={option}>
                        {capitalizeFirstLetter(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <Select
                  value={form.location_id?.toString()}
                  onValueChange={(value) =>
                    setForm({ ...form, location_id: Number(value) })
                  }
                >
                  <SelectTrigger
                    className={formError.location ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder='Choose Location' />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={loc.id.toString()}>
                        {capitalizeFirstLetter(
                          `${loc.city}, ${loc.region}, ${loc.country}`,
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={form.department_id?.toString()}
                  onValueChange={(value) =>
                    setForm({ ...form, department_id: Number(value) })
                  }
                >
                  <SelectTrigger
                    className={formError.department ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder='Select Department' />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dep) => (
                      <SelectItem key={dep.id} value={dep.id.toString()}>
                        {capitalizeFirstLetter(dep.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <Select
                  value={form.role_id?.toString()}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      role_id: value,
                      role: roleOptions.find((op) => op.id === value)?.name,
                    })
                  }
                >
                  <SelectTrigger
                    className={formError.role ? 'border-red-500' : ''}
                  >
                    <SelectValue placeholder='Choose Role' />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((op) => (
                      <SelectItem key={op.id} value={op.id.toString()}>
                        {capitalizeFirstLetter(op.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.role !== 'admin' && (
                  <Select
                    value={form.manager_id || ''}
                    onValueChange={(value) =>
                      setForm({ ...form, manager_id: value })
                    }
                  >
                    <SelectTrigger
                      className={formError.manager ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder='Select Manager' />
                    </SelectTrigger>
                    <SelectContent>
                      {memberList.length ? (
                        memberList.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className='p-3 text-center'>No Managers</div>
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </form>
            <div className='flex space-x-2'>
              <UIButton variant='outline' className='w-full' onClick={onClose}>
                Cancel
              </UIButton>
              <UIButton
                variant='default'
                className='w-full'
                disabled={isSubmittable}
                onClick={() => {
                  setIsDisable(true);
                  if (checkValidation()) {
                    inviteUser();
                  }
                }}
              >
                Invite
              </UIButton>
            </div>
            {isDisable && (
              <div className='flex justify-center items-center'>
                <Loader2 className='w-6 h-6 animate-spin text-primary' />
              </div>
            )}
          </>
        ) : menu === 'pendingMember' ? (
          <div className='space-y-4'>
            <p className='text-sm text-gray-500'>
              You currently have {converter.toWords(pendingList?.length)}{' '}
              pending invites awaiting your response.
            </p>
            {pendingList.map((member) => (
              <Alert
                key={member.user_id}
                className='flex items-center justify-between'
              >
                <div className='flex items-center space-x-4'>
                  <Avatar>
                    <AvatarImage
                      src={member.profile_image}
                      alt={getFullName(member.first_name, member.last_name)}
                    />
                    <AvatarFallback>
                      {getFullName(member.first_name, member.last_name).charAt(
                        0,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <AlertTitle>
                      {member.first_name + ' ' + member.last_name}
                    </AlertTitle>
                    <AlertDescription>{member.email}</AlertDescription>
                  </div>
                </div>
                <UIButton
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    setResendDisable(member.user_id);
                    reinviteUser(member.email, recruiterUser.user_id).then(
                      ({ error, emailSend }) => {
                        setResendDisable(null);
                        if (!error && emailSend) {
                          toast({
                            variant: 'default',
                            title: 'Invite sent successfully.',
                          });
                        } else {
                          toast({
                            variant: 'destructive',
                            title: 'Failed to resend invite',
                            description: error,
                          });
                        }
                      },
                    );
                  }}
                  disabled={isResendDisable === member.user_id}
                >
                  Resend
                </UIButton>
              </Alert>
            ))}
          </div>
        ) : null}
      </div>
    </UIDialog>
  );
};

export default AddMember;
