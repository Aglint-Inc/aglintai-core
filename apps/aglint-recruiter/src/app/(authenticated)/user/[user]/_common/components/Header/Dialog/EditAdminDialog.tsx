import { getFullName } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import {
  useTenant,
  useTenantMembers,
  useTenantOfficeLocations,
  useTenantRoles,
} from '@/company/hooks';
import { useTeamMembers } from '@/company/hooks/useTeamMembers';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useRouterPro } from '@/hooks/useRouterPro';
import { useAllDepartments } from '@/queries/departments';
import { type UserUpdateType } from '@/server/api/routers/user/update_admin_user';
import { supabase } from '@/utils/supabase/client';

import { useAdminUpdate } from '../../../hooks/useAdminUpdate';
import { Form } from './EditAdminDialogUI';

type roleEnum =
  | 'recruiter'
  | 'hiring_manager'
  | 'recruiting_coordinator'
  | 'sourcer'
  | 'admin'
  | 'interviewer';

export type EditAdminFormType = {
  first_name: string;
  last_name: string;
  linked_in: string;
  location_id: number | null;
  employment: 'fulltime' | 'parttime' | 'contractor';
  position: string;
  department_id: number | null;
  role: roleEnum;
  role_id: string;
  manager_id: string;
  phone: string;
  profile_image: string;
};
export type EditAdminFormErrorType = {
  first_name: boolean;
  department: boolean;
  linked_in: boolean;
  location: boolean;
  employment: boolean;
  position: boolean;
  phone: boolean;
  role: boolean;
  manager: boolean;
};

const EditAdminDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { recruiter_user } = useTenant();
  const { data: roleOptions } = useTenantRoles();
  const { data: departments } = useAllDepartments();
  const { data: officeLocations } = useTenantOfficeLocations();
  const [isUpdating, setIsUpdating] = useState(false);
  const imageFile = useRef<File>(null);
  const { mutateAsync } = useAdminUpdate();

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const { allMembers } = useTenantMembers();
  const { activeMembers } = useTeamMembers();
  const router = useRouterPro();
  const member = allMembers.find((mem) => mem.user_id === router?.params?.user);

  const memberList = activeMembers
    .map((mem) => ({
      id: mem.user_id ?? '',
      name: getFullName(mem?.first_name ?? '', mem?.last_name ?? ''),
    }))
    .filter((mem) => mem.id !== recruiter_user.user_id);

  const initForm: EditAdminFormType = {
    first_name: member?.first_name,
    last_name: member?.last_name,
    phone: member?.phone,
    linked_in: member?.linked_in,
    location_id: member?.office_location_id,
    employment: member?.employment,
    profile_image: member?.profile_image,
    department_id: member?.department_id,
    position: member?.position,
    role: member?.role as roleEnum,
    role_id: member?.role_id,
    manager_id: member?.manager_id,
  };
  const [form, setForm] = useState<EditAdminFormType>(initForm);
  useEffect(() => {
    if (_.isEqual(initForm, form)) {
      setIsProfileChanged(false);
    } else {
      setIsProfileChanged(true);
    }
  }, [form]);

  const [formError, setFormError] = useState<EditAdminFormErrorType>({
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
    if (member?.user_id) setForm(initForm);
  }, [member?.user_id]);

  const checkValidation = () => {
    const temp = { ...formError };

    let flag = false;

    if (!form?.first_name || form?.first_name.trim() === '') {
      temp.first_name = true;
      flag = true;
    }
    if (!form?.department_id) {
      temp.department = true;
      flag = true;
    }
    if (!form?.position || form?.position.trim() === '') {
      temp.position = true;
      flag = true;
    }
    if (!form?.role_id || form?.role_id.trim() === '') {
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
    if (recruiter_user?.role === 'admin') {
      if (
        recruiter_user?.user_id === member.user_id ||
        form?.role !== 'admin' ||
        recruiter_user?.user_id === member.created_by
      ) {
        return true;
      } else if (
        form?.role === 'admin' &&
        recruiter_user?.created_by === member.user_id
      ) {
        toast({ title: 'Permission Denied' });

        return false;
      } else if (
        form?.role === 'admin' &&
        recruiter_user?.user_id !== member.created_by
      ) {
        toast({ title: 'Permission Denied' });
        // toast.error('You cannot edit another admin detail');
        return false;
      }
    }
    toast({ title: 'Permission Denied' });
    // toast.error('Admin only edit Team member details');
    return false;
  }

  const updateHandle = async () => {
    try {
      if (recruiter_user?.role !== 'admin')
        return toast({ title: 'Permission Denied' });

      setIsUpdating(true);

      let profile_image: string | null = member.profile_image;
      if (isImageChanged) {
        const image = imageFile.current as File;
        const { data } = await supabase.storage
          .from('recruiter-user')
          .upload(`public/${member.user_id}`, image, {
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

      const data: UserUpdateType = {
        first_name: form?.first_name,
        last_name: form?.last_name,
        linked_in: form?.linked_in,
        office_location_id: form?.location_id,
        employment: form?.employment as 'fulltime' | 'parttime' | 'contractor',
        position: form?.position,
        department_id: form?.department_id,
        role_id: form?.role_id,
        phone: form?.phone,
        manager_id: form?.manager_id,
        user_id: member.user_id,
        scheduling_settings: member.scheduling_settings,
        profile_image: profile_image,
        recruiter_id: recruiter_user.recruiter_id,
      };

      await mutateAsync({ ...data });

      const profile_pic = profile_image as string;
      setForm({ ...form, profile_image: profile_pic });
      onClose();
    } catch (e) {
      toast({
        title: 'Profile update Failed',
        description: e.message,
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <UIDialog
      open={open}
      title='Update Details'
      onClose={() => {
        if (member?.user_id) setForm(initForm);
        onClose();
      }}
      slotButtons={
        <>
          <UIButton variant='outline' onClick={onClose}>
            Cancel
          </UIButton>
          <UIButton
            onClick={() => {
              if (checkValidation()) {
                updateHandle();
              }
            }}
            disabled={
              recruiter_user?.role !== 'admin' ||
              isUpdating ||
              (!isProfileChanged && !isImageChanged)
            }
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </UIButton>
        </>
      }
    >
      {form && (
        <Form
          form={form}
          imageFile={imageFile}
          setIsImageChanged={setIsImageChanged}
          setForm={setForm}
          formError={formError}
          officeLocations={officeLocations}
          member={member}
          recruiterUser={recruiter_user}
          departments={departments}
          roleOptions={roleOptions}
          memberList={memberList}
        />
      )}
    </UIDialog>
  );
};

export default EditAdminDialog;
