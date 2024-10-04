import {
  type employmentTypeEnum,
  type RecruiterUserType,
} from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { type Dispatch, type SetStateAction } from 'react';

import type {
  useTenant,
  useTenantOfficeLocations,
  useTenantRoles,
} from '@/company/hooks';
import { UIButton } from '@/common/UIButton';
import UITextField from '@/common/UITextField';
import { type useAllDepartments } from '@/queries/departments';
import { api } from '@/trpc/client';
import { numberToText } from '@/utils/number/numberToText';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import { type InviteUserFormErrorType, type InviteUserFormType } from '..';

type Props = {
  form: InviteUserFormType;
  menu: 'addMember' | 'pendingMember';
  formError: InviteUserFormErrorType;
  setForm: Dispatch<SetStateAction<InviteUserFormType>>;
  locations: ReturnType<typeof useTenantOfficeLocations>['data'];
  departments: ReturnType<typeof useAllDepartments>['data'];
  roleOptions: ReturnType<typeof useTenantRoles>['data'];
  memberList: {
    id: string;
    name: string;
  }[];
  pendingList: RecruiterUserType[];
  isResendDisable: string | null;
  setResendDisable: Dispatch<SetStateAction<string | null>>;
  recruiterUser: ReturnType<typeof useTenant>['recruiter_user'];
};

export const AddMemberDialogUI = ({
  form,
  menu,
  formError,
  setForm,
  locations,
  departments,
  roleOptions,
  memberList,
  pendingList,
  isResendDisable,
  setResendDisable,
  recruiterUser,
}: Props) => {
  const { toast } = useToast();
  const { mutateAsync: reinviteUser } =
    api.tenant['resend-invite'].useMutation();
  if (!roleOptions) {
    toast({
      variant: 'destructive',
      title: 'failed to load role Options',
    });
    roleOptions = [];
  }
  return (
    <div className='mt-4 space-y-4'>
      {menu === 'addMember' ? (
        <>
          <form className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <UITextField
                value={form.first_name || ''}
                name='first_name'
                placeholder='First Name'
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                className={formError.first_name ? 'border-red-500' : ''}
              />
              <UITextField
                value={form.last_name || ''}
                name='last_name'
                placeholder='Last Name'
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />
            </div>
            <UITextField
              value={form.email || ''}
              name='email'
              placeholder='Email'
              onChange={(e) =>
                setForm({ ...form, email: e.target.value.trim() })
              }
              className={formError.email ? 'border-red-500' : ''}
            />
            <UITextField
              value={form.linked_in || ''}
              name='LinkedIn'
              placeholder='Enter linkedin URL'
              onChange={(e) =>
                setForm({ ...form, linked_in: e.target.value.trim() })
              }
              className={formError.linked_in ? 'border-red-500' : ''}
            />
            <div className='grid grid-cols-2 gap-4'>
              <UITextField
                value={form.position || ''}
                name='title'
                placeholder='Enter title'
                onChange={(e) => setForm({ ...form, position: e.target.value })}
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
                onValueChange={(value) => {
                  const role =
                    roleOptions.find((op) => op.id === value)?.name || null;
                  setForm({
                    ...form,
                    role_id: value,
                    role,
                  });
                }}
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
          <div className='flex space-x-2'></div>
          {/* {isDisable && (
          <div className='flex items-center justify-center'>
            <Loader2 className='h-6 w-6 animate-spin text-primary' />
          </div>
        )} */}
        </>
      ) : menu === 'pendingMember' ? (
        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            You currently have {numberToText(pendingList?.length)} pending
            invites awaiting your response.
          </p>
          {pendingList.map((member) => (
            <Alert
              key={member.user_id}
              className='flex items-center justify-between'
            >
              <div className='flex items-center space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={member.profile_image || undefined}
                    alt={getFullName(member.first_name, member.last_name)}
                  />
                  <AvatarFallback>
                    {getFullName(member.first_name, member.last_name).charAt(0)}
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
                  if (recruiterUser.user_id)
                    reinviteUser({ email: member.email })
                      .then(() => {
                        setResendDisable(null);
                        toast({
                          variant: 'default',
                          title: 'Invite sent successfully.',
                        });
                      })
                      .catch(() => {
                        setResendDisable(null);
                        toast({
                          variant: 'destructive',
                          title: 'Failed to resend invite',
                        });
                      });
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
  );
};
