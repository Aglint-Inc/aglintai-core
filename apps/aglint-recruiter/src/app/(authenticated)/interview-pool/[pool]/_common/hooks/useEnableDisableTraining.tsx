import { toast } from '@components/hooks/use-toast';
import React, { useEffect, useState } from 'react';
import { type MemberTypeAutoComplete } from 'src/app/_common/components/MembersTextField';

import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import {
  setIsModuleSettingsDialogOpen,
  setLocalModule,
  useModulesStore,
} from '../stores/store';
import { useModuleAndUsers } from './useModuleAndUsers';

export const useEnableDisableTraining = () => {
  const { localModule } = useModulesStore();
  const { data: editModule } = useModuleAndUsers();
  const utils = api.useUtils();
  const { members } = useSchedulingContext();
  const [isBannerLoading, setBannerLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorApproval, setErrorApproval] = useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState<
    MemberTypeAutoComplete[]
  >([]);
  const [disableOpen, setDisableOpen] = React.useState(false);
  const [isDisableError, setDisableError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const disableError = () => {
    setDisableError(true);
    setTimeout(() => {
      setDisableError(false);
    }, 5000);
  };

  const approvers = members.filter(
    (member) =>
      editModule && editModule.settings.approve_users.includes(member.user_id),
  );

  const updateModule = async () => {
    if (!localModule || !editModule) return;
    if (localModule.settings.reqruire_approval) {
      if (selectedUsers.length === 0) {
        setErrorApproval(true);
        return false;
      }
    }
    try {
      setIsSaving(true);
      if (
        localModule.settings.reqruire_approval &&
        selectedUsers.length === 0
      ) {
        setErrorApproval(true);
        return;
      }
      await supabase
        .from('interview_module')
        .update({
          settings: {
            noReverseShadow: localModule.settings.noReverseShadow,
            noShadow: localModule.settings.noShadow,
            reqruire_approval: localModule.settings.reqruire_approval,
            require_training: localModule.settings.require_training,
          },
        })
        .eq('id', editModule.id)
        .select()
        .throwOnError();

      updateApproveUsers(
        editModule.settings.approve_users,
        selectedUsers.map((sel) => sel.user_id),
        editModule.id,
      );

      utils.interview_pool.module_and_users.invalidate({
        module_id: editModule.id,
      });
      setIsModuleSettingsDialogOpen(false);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update module',
      });
    } finally {
      setErrorApproval(false);
      setIsSaving(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (editModule?.id) {
      setLocalModule(editModule);
      setSelectedUsers(
        members.filter((member) =>
          editModule.settings.approve_users.includes(member.user_id),
        ),
      );
    }
  }, [editModule?.id, members]);

  const enableDiabaleTraining = async ({
    type,
  }: {
    type: 'enable' | 'disable';
  }) => {
    if (!localModule || !editModule) return;
    try {
      setBannerLoading(true);
      await supabase
        .from('interview_module')
        .update({
          settings: {
            noReverseShadow: localModule.settings.noReverseShadow,
            noShadow: localModule.settings.noShadow,
            reqruire_approval: localModule.settings.reqruire_approval,
            require_training: type === 'disable' ? false : true,
          },
        })
        .eq('id', editModule.id)
        .select()
        .throwOnError();

      updateApproveUsers(
        editModule.settings.approve_users,
        selectedUsers.map((sel) => sel.user_id),
        editModule.id,
      );

      utils.interview_pool.module_and_users.invalidate({
        module_id: editModule.id,
      });
      setIsModuleSettingsDialogOpen(false);
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update module',
      });
    } finally {
      setBannerLoading(false);
      setOpen(false);
      setDisableOpen(false);
    }
  };

  return {
    enableDiabaleTraining,
    isBannerLoading,
    open,
    setOpen,
    disableOpen,
    setDisableOpen,
    approvers,
    selectedUsers,
    setSelectedUsers,
    errorApproval,
    setErrorApproval,
    isDisableError,
    setDisableError,
    disableError,
    isSaving,
    setIsSaving,
    updateModule,
  };
};

const updateApproveUsers = async (
  olduser_ids: string[],
  newuser_ids: string[],
  module_id: string,
) => {
  // Calculate the difference
  const usersToDelete = olduser_ids.filter(
    (user_id) => !newuser_ids.includes(user_id),
  );
  const usersToInsert = newuser_ids.filter(
    (user_id) => !olduser_ids.includes(user_id),
  );

  // Delete users no longer approved
  if (usersToDelete.length > 0) {
    await supabase
      .from('interview_module_approve_users')
      .delete()
      .in('user_id', usersToDelete);
  }

  // Insert new approved users
  if (usersToInsert.length > 0) {
    await supabase
      .from('interview_module_approve_users')
      .insert(usersToInsert.map((user_id) => ({ user_id, module_id })));
  }
};
