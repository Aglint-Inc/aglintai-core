import {
  InterviewPanelRelationType,
  InterviewPanelType,
  RecruiterUserType,
} from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

export const fetchInterviewPanel = async (recruiter_id: string) => {
  try {
    const { data: dataPanel, error: errorPanel } = await supabase
      .from('interview_panel')
      .select('*')
      .eq('recruiter_id', recruiter_id);
    if (errorPanel) {
      throw errorPanel;
    }
    const panelIds = dataPanel.map((panel) => panel.id);
    const { data: dataRel, error: errorRel } = await supabase
      .from('interview_panel_relation')
      .select('*')
      .in('panel_id', panelIds);

    if (errorRel) {
      throw errorRel;
    }
    const intPan = dataPanel.map((panel) => {
      const members = dataRel.filter((rel) => rel.panel_id === panel.id);

      return {
        ...panel,
        relations: members,
      };
    });

    return intPan;
  } catch (e) {
    toast.error('Error fetching interview panel');
    return [];
  }
};

export const createPanel = async ({
  name,
  recruiter_id,
  selectedUsers,
}: {
  name: string;
  recruiter_id: string;
  selectedUsers: RecruiterUserType[];
}) => {
  const { data: interPan, error: errorPanel } = await supabase
    .from('interview_panel')
    .insert({ name: name, recruiter_id: recruiter_id })
    .select();

  if (errorPanel) {
    throw errorPanel;
  }

  const insertToRelation = selectedUsers.map((user) => {
    return {
      panel_id: interPan[0].id,
      user_id: user.user_id,
    };
  });

  const { data: interRel, error: errorRel } = await supabase
    .from('interview_panel_relation')
    .insert(insertToRelation)
    .select();

  if (errorRel) {
    throw errorPanel;
  }

  const { data: interAval, error: errorAval } = await supabase
    .from('interview_availabilties')
    .select()
    .in(
      'user_id',
      selectedUsers.map((user) => user.user_id),
    );

  if (errorAval) {
    throw errorAval;
  }

  const insertToAval = selectedUsers.filter((user) => {
    return !interAval.some((aval) => aval.user_id === user.user_id);
  });

  const insertToAvalData = insertToAval.map((user) => {
    return {
      user_id: user.user_id,
    };
  });

  const { data: interAvalInsert, error: errorAvalInsert } = await supabase
    .from('interview_availabilties')
    .insert(insertToAvalData);

  if (errorAvalInsert) {
    throw errorAvalInsert;
  }

  return {
    interviewPanel: interPan[0],
    interviewPanelRelations: interRel,
    interviewAvailabilities: interAvalInsert,
  };
};

export const editPanel = async ({
  panel,
  name,
  selectedUsers,
}: {
  panel: InterviewPanelType & {
    relations: InterviewPanelRelationType[];
  };
  name: string;
  selectedUsers: RecruiterUserType[];
}) => {
  try {
    // Update interview panel details
    const { error: errorPanelUpdate } = await supabase
      .from('interview_panel')
      .update({ name: name })
      .eq('id', panel.id);

    if (errorPanelUpdate) {
      throw errorPanelUpdate;
    }

    // Identify existing user relations
    const existingUserIds = panel.relations.map((rel) => rel.user_id);

    // Find newly added users and removed users
    const addedUsers = selectedUsers.filter(
      (user) => !existingUserIds.includes(user.user_id),
    );
    const removedUsers = panel.relations.filter(
      (rel) => !selectedUsers.find((user) => user.user_id === rel.user_id),
    );

    // Update interview panel relation for added users
    const insertToRelation = addedUsers.map((user) => ({
      panel_id: panel.id,
      user_id: user.user_id,
    }));

    const { error: errorRelAdded } = await supabase
      .from('interview_panel_relation')
      .insert(insertToRelation);

    if (errorRelAdded) {
      throw errorRelAdded;
    }

    // Delete interview panel relation for removed users
    const { error: errorRelDeleted } = await supabase
      .from('interview_panel_relation')
      .delete()
      .in(
        'id',
        removedUsers.map((user) => user.id),
      ); // Assuming each relation has a unique identifier "id"

    if (errorRelDeleted) {
      throw errorRelDeleted;
    }

    // Fetch all current relations after the update
    const { data: updatedRelations, error: errorUpdatedRelations } =
      await supabase
        .from('interview_panel_relation')
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
      updatedRelations: updatedRelations,
      // Include other relevant return data
    };
  } catch (error) {
    throw new Error('Error editing interview panel');
  }
};
