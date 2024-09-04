import { type employmentTypeEnum } from '@aglint/shared-types';
import { useEffect, useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import axios from '@/src/client/axios';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { type ApiResponseGetMember } from '@/src/pages/api/get_member';
import { type API_setMembersWithRole } from '@/src/pages/api/setMembersWithRole/type';
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
  refetch: () => Promise<void>;
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
    location_id: number;
    employment: employmentTypeEnum;
    position: string;
    department_id: number;
    role: string;
    role_id: string;
    manager_id: string;
    phone: string;
    profile_image: string;
  } | null>(null);

  const [formError, setFormError] = useState({
    first_name: false,
    department: false,
    linked_in: false,
    location: false,
    employment: false,
    position: false,
    phone: false,
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
        location_id: member.office_location_id,
        employment: member.employment,
        profile_image: member.profile_image,
        department_id: member.department_id,
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
    if (!form.department_id) {
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
        department_id: form.department_id,
        office_location_id: form.location_id,
        user_id: member.user_id,
      };
      await axios
        .call<API_setMembersWithRole>('POST', '/api/setMembersWithRole', {
          data,
        })
        .then((res) => res.data);
      onClose();
      await refetch();
    } catch (e) {
      //
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className='sm:max-w-[600px]'>
        <SheetHeader>
          <SheetTitle>Update Details</SheetTitle>
        </SheetHeader>
        {form && (
          <div className='space-y-4 mt-4'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src={form.profile_image} alt={form.first_name} />
                <AvatarFallback>{form.first_name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>
                  <span className='text-red-500'>Change profile photo</span>{' '}
                  (optional)
                </p>
                <p className='text-xs text-gray-500'>
                  Upload a square profile image (PNG or JPEG). Maximum size: 5
                  MB.
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='first_name'>First Name</Label>
                <Input
                  id='first_name'
                  value={form.first_name}
                  onChange={(e) =>
                    setForm({ ...form, first_name: e.target.value })
                  }
                  className={formError.first_name ? 'border-red-500' : ''}
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='last_name'>Last Name</Label>
                <Input
                  id='last_name'
                  value={form.last_name}
                  onChange={(e) =>
                    setForm({ ...form, last_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='linked_in'>LinkedIn</Label>
              <Input
                id='linked_in'
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
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
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
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Select
                  value={form.location_id.toString()}
                  onValueChange={(value) =>
                    setForm({ ...form, location_id: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Choose Location' />
                  </SelectTrigger>
                  <SelectContent>
                    {officeLocations.map((location) => (
                      <SelectItem
                        key={location.id}
                        value={location.id.toString()}
                      >
                        {capitalizeFirstLetter(
                          `${location.city}, ${location.region}, ${location.country}`,
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='department'>Department</Label>
                <Select
                  value={form.department_id.toString()}
                  onValueChange={(value) =>
                    setForm({ ...form, department_id: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Department' />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={department.id.toString()}
                      >
                        {capitalizeFirstLetter(department.name)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {(member.recruiter_relation[0].roles.name !== 'admin' ||
              member.recruiter_relation[0].created_by ===
                recruiterUser.user_id) &&
              member.user_id !== recruiterUser.user_id && (
                <>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='role'>Role</Label>
                      <Select
                        value={form.role_id}
                        onValueChange={(value) => {
                          const selectedRole = roleOptions.find(
                            (role) => role.id === value,
                          );
                          setForm({
                            ...form,
                            role: selectedRole.name,
                            role_id: value,
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Choose Role' />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {capitalizeFirstLetter(role.name)}
                            </SelectItem>
                          ))}
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
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input
                      id='phone'
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className={formError.phone ? 'border-red-500' : ''}
                    />
                  </div>
                </>
              )}

            <div className='flex justify-end space-x-2 mt-6'>
              <Button variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (checkValidation()) {
                    updateHandle();
                  }
                }}
                disabled={recruiterUser.role !== 'admin' || isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditMember;
