import {
  InterviewModuleRelationType,
  InterviewModuleType,
  RecruiterUserType
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

export const fetchInterviewModule = async (recruiter_id: string) => {
  try {
    const { data: dataModule, error: errorModule } = await supabase
      .from('interview_module')
      .select('*')
      .eq('recruiter_id', recruiter_id);
    if (errorModule) {
      throw errorModule;
    }
    const moduleIds = dataModule.map((panel) => panel.id);
    const { data: dataRel, error: errorRel } = await supabase
      .from('interview_module_relation')
      .select('*')
      .in('module_id', moduleIds);

    if (errorRel) {
      throw errorRel;
    }
    const intPan = dataModule.map((module) => {
      const members = dataRel.filter((rel) => rel.module_id === module.id);
      return {
        ...module,
        relations: members
      };
    });

    return intPan;
  } catch (e) {
    toast.error('Error fetching interview panel');
    return [];
  }
};

export const createModule = async ({
  name,
  recruiter_id,
  selectedUsers
}: {
  name: string;
  recruiter_id: string;
  selectedUsers: RecruiterUserType[];
}) => {
  const { data: interPan, error: errorModule } = await supabase
    .from('interview_module')
    .insert({ name: name, recruiter_id: recruiter_id })
    .select();

  if (errorModule) {
    throw errorModule;
  }

  const insertToRelation = selectedUsers.map((user) => {
    return {
      module_id: interPan[0].id,
      user_id: user.user_id
    };
  });

  const { data: interRel, error: errorRel } = await supabase
    .from('interview_module_relation')
    .insert(insertToRelation)
    .select();

  if (errorRel) {
    throw errorModule;
  }

  const { data: interAval, error: errorAval } = await supabase
    .from('interview_availabilties')
    .select()
    .in(
      'user_id',
      selectedUsers.map((user) => user.user_id)
    );

  if (errorAval) {
    throw errorAval;
  }

  const insertToAval = selectedUsers.filter((user) => {
    return !interAval.some((aval) => aval.user_id === user.user_id);
  });

  const insertToAvalData = insertToAval.map((user) => {
    return {
      user_id: user.user_id
    };
  });

  const { data: interAvalInsert, error: errorAvalInsert } = await supabase
    .from('interview_availabilties')
    .insert(insertToAvalData);

  if (errorAvalInsert) {
    throw errorAvalInsert;
  }

  return {
    interviewModule: interPan[0],
    interviewModuleRelations: interRel,
    interviewAvailabilities: interAvalInsert
  };
};

export const editModuleFunctio = async ({
  panel,
  name,
  selectedUsers
}: {
  panel: InterviewModuleType & {
    relations: InterviewModuleRelationType[];
  };
  name: string;
  selectedUsers: RecruiterUserType[];
}) => {
  try {
    // Update interview panel details
    const { error: errorModuleUpdate } = await supabase
      .from('interview_module')
      .update({ name: name })
      .eq('id', panel.id);

    if (errorModuleUpdate) {
      throw errorModuleUpdate;
    }

    // Identify existing user relations
    const existingUserIds = panel.relations.map((rel) => rel.user_id);

    // Find newly added users and removed users
    const addedUsers = selectedUsers.filter(
      (user) => !existingUserIds.includes(user.user_id)
    );
    const removedUsers = panel.relations.filter(
      (rel) => !selectedUsers.find((user) => user.user_id === rel.user_id)
    );

    // Update interview panel relation for added users
    const insertToRelation = addedUsers.map((user) => ({
      module_id: panel.id,
      user_id: user.user_id
    }));

    const { error: errorRelAdded } = await supabase
      .from('interview_module_relation')
      .insert(insertToRelation);

    if (errorRelAdded) {
      throw errorRelAdded;
    }

    // Delete interview panel relation for removed users
    const { error: errorRelDeleted } = await supabase
      .from('interview_module_relation')
      .delete()
      .in(
        'id',
        removedUsers.map((user) => user.id)
      ); // Assuming each relation has a unique identifier "id"

    if (errorRelDeleted) {
      throw errorRelDeleted;
    }

    // Fetch all current relations after the update
    const { data: updatedRelations, error: errorUpdatedRelations } =
      await supabase
        .from('interview_module_relation')
        .select('*')
        .eq('panel_id', panel.id);

    if (errorUpdatedRelations) {
      throw errorUpdatedRelations;
    }

    // Return updated panel details
    return {
      panelId: panel.id,
      name: name,
      selectedUsers: selectedUsers,
      updatedRelations: updatedRelations
      // Include other relevant return data
    };
  } catch (error) {
    throw new Error('Error editing interview panel');
  }
};
