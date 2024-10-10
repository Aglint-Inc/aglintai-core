import {
  type employmentTypeEnum,
  type RecruiterUserType,
} from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import { useState } from 'react';

import { useIntegrations } from '@/authenticated/hooks';
import { useAllDepartments } from '@/authenticated/hooks/useAllDepartments';
import { UIButton } from '@/common/UIButton';
import UIDialog from '@/common/UIDialog';
import {
  useTenant,
  useTenantMembers,
  useTenantOfficeLocations,
  useTenantRoles,
} from '@/company/hooks';
import { api } from '@/trpc/client';
import timeZone from '@/utils/timeZone';

import { defaultSchedulingSettings } from './contants';
import { AddMemberDialogUI } from './ui/AddMemberDialogUI';

export type InviteUserFormType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  linked_in: string | null;
  employment: employmentTypeEnum | null;
  position: string | null;
  location_id: number | null;
  department_id: number | null;
  role: string | null;
  role_id: string | null;
  manager_id: string | null;
};
export type InviteUserFormErrorType = {
  first_name: boolean;
  email: boolean;
  linked_in: boolean;
  department: boolean;
  employment: boolean;
  location: boolean;
  position: boolean;
  role: boolean;
  manager: boolean;
};

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
  const { mutateAsync: inviteUserApi } = api.tenant.invite.useMutation();
  const { recruiter_user } = useTenant();
  const { data: locations } = useTenantOfficeLocations();
  const { data: departments } = useAllDepartments();
  const { refetch: refetchMembers } = useTenantMembers();
  const initForm: InviteUserFormType = {
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
  const { data: integrations } = useIntegrations();
  const [form, setForm] = useState<InviteUserFormType>(initForm);

  const [formError, setFormError] = useState<InviteUserFormErrorType>({
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
  const [isResendDisable, setResendDisable] = useState<string | null>(null);
  const { data: roleOptions } = useTenantRoles();

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
        form?.email?.split('@')[1] ===
        integrations?.google_workspace_domain?.split('//')[1]
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
    const linkedInURLPattern =
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(https?:\/\/)?((www|in)\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    if (form.linked_in?.length && !linkedInURLPattern.test(form.linked_in)) {
      temp = { ...temp, linked_in: true };
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
      const resData = await inviteUserApi([
        {
          email: form.email!,
          first_name: form.first_name!,
          last_name: form.last_name || undefined,
          position: form.position!,
          role_id: form.role_id!,
          manager_id: form.manager_id || undefined,
          employment: form.employment!,
          department_id: form.department_id!,
          office_location_id: form.location_id!,
          scheduling_settings: {
            ...defaultSchedulingSettings,
            timeZone: timeZone.find(
              (item) =>
                item.tzCode ===
                locations.find((loc) => loc.id === form.location_id)?.timezone,
            )!,
          },
        },
      ]);

      const { created } = resData!;
      if (created) {
        refetchMembers();
        toast({
          variant: 'default',
          title: 'Invite sent successfully.',
        });
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
      onClose();
    }
  };

  const isSubmittable = !(
    form.first_name &&
    form.email &&
    form.employment &&
    form.position &&
    form.department_id &&
    form.location_id &&
    (form.role === 'admin' ? form.role_id : form.role_id && form.manager_id)
  );
  return (
    <UIDialog
      open={open}
      onClose={() => {
        onClose();
        setForm(initForm);
      }}
      title={menu === 'addMember' ? 'Add Member' : 'Pending Invites'}
      size='lg'
      slotButtons={
        <>
          <UIButton variant='outline' className='w-full' onClick={onClose}>
            Cancel
          </UIButton>
          <UIButton
            variant='default'
            className='w-full'
            disabled={isSubmittable}
            isLoading={isDisable}
            onClick={() => {
              setIsDisable(true);
              if (checkValidation()) {
                inviteUser();
              }
            }}
          >
            Invite
          </UIButton>
        </>
      }
    >
      <AddMemberDialogUI
        form={form}
        menu={menu}
        formError={formError}
        setForm={setForm}
        locations={locations}
        departments={departments}
        roleOptions={roleOptions}
        memberList={memberList}
        pendingList={pendingList || []}
        isResendDisable={isResendDisable}
        setResendDisable={setResendDisable}
        recruiterUser={recruiter_user}
      />
    </UIDialog>
  );
};

export default AddMember;
