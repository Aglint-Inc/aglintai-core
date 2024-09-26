import { type employmentTypeEnum } from '@aglint/shared-types';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from 'react';
import { type MemberType } from 'src/app/_common/types/memberType';

import type { useTenantRoles } from '@/company/hooks';
import ImageUploadManual from '@/components/Common/ImageUpload/ImageUploadManual';
import UITypography from '@/components/Common/UITypography';
import { type useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type useAllDepartments } from '@/queries/departments';
import { type useAllOfficeLocations } from '@/queries/officeLocations';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

import {
  type EditAdminFormErrorType,
  type EditAdminFormType,
} from './EditAdminDialog';

type Props = {
  form: EditAdminFormType;
  imageFile: MutableRefObject<File | null>;
  setIsImageChanged: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<SetStateAction<EditAdminFormType>>;
  formError: EditAdminFormErrorType;
  officeLocations: ReturnType<typeof useAllOfficeLocations>['data'];
  member: MemberType;
  recruiterUser: ReturnType<typeof useAuthDetails>['recruiterUser'];
  departments: ReturnType<typeof useAllDepartments>['data'];
  roleOptions: ReturnType<typeof useTenantRoles>['data'];
  memberList: { id: string; name: string }[];
};
export const Form = ({
  form,
  imageFile,
  setIsImageChanged,
  setForm,
  formError,
  officeLocations,
  member,
  recruiterUser,
  departments,
  roleOptions,
  memberList,
}: Props) => {
  return (
    <div className='mt-4 space-y-4'>
      <div className='flex items-center space-x-4'>
        <div className='max-w-[64px]'>
          <ImageUploadManual
            image={form.profile_image}
            size={64}
            imageFile={imageFile}
            setChanges={() => {
              setIsImageChanged(true);
            }}
          />
        </div>

        <div>
          <p className='text-sm font-medium'>
            <span className='text-red-500'>Change profile photo</span>{' '}
            (optional)
          </p>
          <p className='text-sm text-gray-500'>
            Upload a square profile image (PNG or JPEG). Maximum size: 5 MB.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='first_name'>First Name</Label>
          <Input
            id='first_name'
            placeholder='Enter first name'
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            className={formError.first_name ? 'border-red-500' : ''}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='last_name'>Last Name</Label>
          <Input
            id='last_name'
            placeholder='Enter last name'
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='linked_in'>LinkedIn</Label>
        <Input
          id='linked_in'
          placeholder='Enter linkedin url'
          value={form.linked_in}
          onChange={(e) =>
            setForm({ ...form, linked_in: e.target.value.trim() })
          }
          className={formError.linked_in ? 'border-red-500' : ''}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='position'>Title</Label>
          <Input
            id='position'
            value={form.position}
            placeholder='Enter position'
            onChange={(e) => setForm({ ...form, position: e.target.value })}
            className={formError.position ? 'border-red-500' : ''}
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='employment'>Employment</Label>
          <Select
            value={form.employment}
            onValueChange={(value) =>
              setForm({
                ...form,
                employment: value as employmentTypeEnum,
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select employment type' />
            </SelectTrigger>
            <SelectContent>
              {['contractor', 'fulltime', 'parttime'].map((type) => (
                <SelectItem key={type} value={type}>
                  {capitalizeFirstLetter(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='location'>Location</Label>
          <Select
            value={form.location_id?.toString()}
            onValueChange={(value) =>
              setForm({ ...form, location_id: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Choose Location' />
            </SelectTrigger>
            <SelectContent>
              {officeLocations?.length ? (
                officeLocations.map((location) => (
                  <SelectItem key={location.id} value={location.id.toString()}>
                    {[location.city, location.region, location.country]
                      .filter((location) => location)
                      .map((location) => capitalizeFirstLetter(location).trim())
                      .join(', ')}
                  </SelectItem>
                ))
              ) : (
                <UITypography className='px-4 py-1 text-sm'>
                  No Location
                </UITypography>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='department'>Department</Label>
          <Select
            value={form.department_id?.toString()}
            onValueChange={(value) =>
              setForm({ ...form, department_id: parseInt(value) })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Department' />
            </SelectTrigger>
            <SelectContent>
              {departments?.length ? (
                departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={department.id.toString()}
                  >
                    {capitalizeFirstLetter(department.name)}
                  </SelectItem>
                ))
              ) : (
                <UITypography className='px-4 py-1 text-sm'>
                  No Departments
                </UITypography>
              )}
            </SelectContent>
          </Select>
        </div>
        {(member.role !== 'admin' ||
          member.created_by === recruiterUser?.user_id ||
          member.user_id !== recruiterUser?.user_id) && (
          <>
            <div className='space-y-2'>
              <Label htmlFor='role'>Role</Label>
              <Select
                value={form.role_id}
                onValueChange={(value) => {
                  const selectedRole = roleOptions?.find(
                    (role) => role.id === value,
                  );
                  const role = selectedRole?.name as string;
                  setForm({
                    ...form,
                    role,
                    role_id: value,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Choose Role' />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions?.length ? (
                    roleOptions.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {capitalizeFirstLetter(role.name)}
                      </SelectItem>
                    ))
                  ) : (
                    <UITypography className='px-4 py-1 text-sm'>
                      No Roles
                    </UITypography>
                  )}
                </SelectContent>
              </Select>
            </div>
            {form.role !== 'admin' && (
              <div className='space-y-2'>
                <Label htmlFor='manager'>Manager</Label>
                <Select
                  value={form.manager_id}
                  onValueChange={(value) =>
                    setForm({ ...form, manager_id: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Manager' />
                  </SelectTrigger>
                  <SelectContent>
                    {memberList.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {capitalizeFirstLetter(member.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className='space-y-2'>
              <Label htmlFor='phone'>Phone</Label>
              <Input
                id='phone'
                placeholder='Enter phone number'
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={formError.phone ? 'border-red-500' : ''}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
