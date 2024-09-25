import { type employmentTypeEnum } from '@aglint/shared-types';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { type MemberType } from 'src/app/_common/types/memberType';

import { useRolesOptions } from '@/authenticated/hooks/useRolesOptions';
import axios from '@/client/axios';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type API_setMembersWithRole } from '@/pages/api/setMembersWithRole/type';
import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { Form } from './EditAdminDialogUI';

export type EditAdminFormType = {
  first_name: string;
  last_name: string;
  linked_in: string;
  location_id: number | null;
  employment: employmentTypeEnum;
  position: string;
  department_id: number | null;
  role: string;
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
  member,
  refetch,
  memberList,
  onClose,
}: {
  open: boolean;
  refetch: any;
  member: MemberType;
  memberList: { id: string; name: string }[];
  onClose: () => void;
}) => {
  const { data: roleOptions } = useRolesOptions();
  const { recruiterUser } = useAuthDetails();
  const { data: departments } = useAllDepartments();
  const { data: officeLocations } = useAllOfficeLocations();
  const [isUpdating, setIsUpdating] = useState(false);
  const imageFile = useRef<File>(null);

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  const initForm: EditAdminFormType = {
    first_name: member.first_name,
    last_name: member.last_name,
    phone: member.phone,
    linked_in: member.linked_in,
    location_id: member.office_location_id,
    employment: member.employment,
    profile_image: member.profile_image,
    department_id: member.department_id,
    position: member.position,
    role: member?.role,
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
    if (recruiterUser?.role === 'admin') {
      if (
        recruiterUser?.user_id === member.user_id ||
        form?.role !== 'admin' ||
        recruiterUser?.user_id === member.created_by
      ) {
        return true;
      } else if (
        form?.role === 'admin' &&
        recruiterUser?.created_by === member.user_id
      ) {
        toast.error('Permission Denied');

        return false;
      } else if (
        form?.role === 'admin' &&
        recruiterUser?.user_id !== member.created_by
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

  const updateHandle = async () => {
    try {
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

      const data = {
        first_name: form?.first_name,
        last_name: form?.last_name,
        linked_in: form?.linked_in,
        employment: form?.employment,
        profile_image: profile_image,
        position: form?.position,
        role_id: form?.role_id,
        phone: form?.phone,
        manager_id: form?.manager_id,
        department_id: form?.department_id,
        office_location_id: form?.location_id,
        user_id: member.user_id,
      };
      await axios
        .call<API_setMembersWithRole>('POST', '/api/setMembersWithRole', {
          data,
        })
        .then((res) => res.data);
      await refetch();
      const profile_pic = profile_image as string;
      setForm({ ...form, profile_image: profile_pic });
      onClose();
    } catch (e) {
      console.error(e);
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
              recruiterUser?.role !== 'admin' || isUpdating || !isProfileChanged
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
          recruiterUser={recruiterUser}
          departments={departments}
          roleOptions={roleOptions}
          memberList={memberList}
        />
      )}
    </UIDialog>
  );
};

export default EditAdminDialog;
