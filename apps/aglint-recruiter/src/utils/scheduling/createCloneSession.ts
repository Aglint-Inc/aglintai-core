/* eslint-disable no-console */
import {
  DatabaseTable,
  DatabaseTableInsert,
  SupabaseType,
} from '@aglint/shared-types';
import { v4 as uuidv4 } from 'uuid';

import { SchedulingApplication } from '@/src/components/Scheduling/CandidateDetails/store';

import { getOrganizerId } from './getOrganizerId';

export const createCloneSession = async ({
  is_get_more_option,
  application_id,
  allSessions,
  session_ids,
  scheduleName,
  supabase,
  recruiter_id,
  rec_user_id,
  meeting_flow,
}: {
  is_get_more_option: boolean;
  application_id: string;
  allSessions: SchedulingApplication['initialSessions'];
  session_ids: string[]; // selected session ids this will be their in scheduling flow it will empty array in session edit
  scheduleName: string;
  recruiter_id: string;
  supabase: SupabaseType;
  rec_user_id: string;
  meeting_flow: DatabaseTable['interview_meeting']['meeting_flow'];
}) => {
  // create schedule first then create sessions and meetings and then create session relation
  let new_schedule_id = uuidv4();
  try {
    const { data, error } = await supabase
      .from('interview_schedule')
      .insert({
        is_get_more_option: is_get_more_option,
        application_id: application_id,
        schedule_name: scheduleName,
        id: new_schedule_id,
        recruiter_id: recruiter_id,
        created_by: rec_user_id,
      })
      .select();

    if (error) throw new Error(error.message);

    const refSessions = allSessions.map((session) => ({
      ...session,
      newId: uuidv4(),
      isSelected: session_ids.includes(session.interview_session.id),
      new_meeting_id: uuidv4(),
      new_schedule_id: new_schedule_id,
    }));

    const organizer_id = await getOrganizerId(application_id, supabase);

    const insertableMeetings: DatabaseTableInsert['interview_meeting'][] =
      refSessions.map((ses) => {
        return {
          interview_schedule_id: ses.new_schedule_id,
          status: ses.isSelected ? 'waiting' : 'not_scheduled',
          instructions: refSessions.find(
            (s) => s.interview_session.id === ses.interview_session.id,
          )?.interview_module?.instructions,
          id: ses.new_meeting_id,
          meeting_flow,
          organizer_id,
        };
      });

    const { data: insertedMeetings } = await supabase
      .from('interview_meeting')
      .upsert(insertableMeetings)
      .select()
      .throwOnError();

    const insertableSessions: DatabaseTableInsert['interview_session'][] =
      allSessions.map((session) => ({
        interview_plan_id: null,
        id: refSessions.find(
          (ref) => ref.interview_session.id === session.interview_session.id,
        ).newId,
        break_duration: session.interview_session.break_duration,
        interviewer_cnt: session.interview_session.interviewer_cnt,
        location: session.interview_session.location,
        module_id: session.interview_session.module_id,
        name: session.interview_session.name,
        schedule_type: session.interview_session.schedule_type,
        session_duration: session.interview_session.session_duration,
        session_order: session.interview_session.session_order,
        session_type: session.interview_session.session_type,
        meeting_id: refSessions.find(
          (ref) => ref.interview_session.id === session.interview_session.id,
        ).new_meeting_id,
      }));

    const { error: errorInsertedSessions } = await supabase
      .from('interview_session')
      .insert(insertableSessions);

    if (errorInsertedSessions) throw new Error(errorInsertedSessions.message);

    let insertableUserRelation: DatabaseTableInsert['interview_session_relation'][] =
      [];

    refSessions.map((session) => {
      session.users?.map((user) => {
        const insertRel: DatabaseTableInsert['interview_session_relation'] = {
          interview_module_relation_id: user.interview_module_relation?.id,
          interviewer_type: user.interview_session_relation.interviewer_type,
          session_id: session.newId,
          training_type: user.interview_session_relation.training_type,
          user_id: user.user_details.user_id,
        };
        insertableUserRelation.push(insertRel);
      });
    });

    const { error: errorInsertedUserRelation } = await supabase
      .from('interview_session_relation')
      .insert(insertableUserRelation);

    if (errorInsertedUserRelation)
      throw new Error(errorInsertedUserRelation.message);

    const newSessionIds = refSessions
      .filter((ses) => ses.isSelected)
      .map((session) => session.newId);

    const updatedRefSessions = refSessions.map((ses) => ({
      ...ses,
      interview_meeting: insertedMeetings.find(
        (meet) => meet.id === ses.new_meeting_id,
      ),
    }));

    // task session replace
    const oldSessionIds = refSessions.map((ses) => ses.interview_session.id);

    const { data: taskSelRel, error: errTaskSelRel } = await supabase
      .from('task_session_relation')
      .select()
      .in('session_id', oldSessionIds);

    if (errTaskSelRel) throw new Error(errTaskSelRel.message);

    if (taskSelRel.length > 0) {
      const { error: errTaskUpdSesRel } = await supabase
        .from('task_session_relation')
        .upsert(
          taskSelRel.map((taskRel) => ({
            id: taskRel.id,
            session_id: refSessions.find(
              (ses) => ses.interview_session.id === taskRel.session_id,
            ).newId,
            task_id: taskRel.task_id,
          })),
        );

      if (errTaskUpdSesRel) throw new Error(errTaskUpdSesRel.message);
    }
    // task session replace

    return {
      schedule: data[0],
      session_ids: newSessionIds, // new session ids selected
      refSessions: updatedRefSessions,
      organizer_id,
    };
  } catch (e) {
    await supabase
      .from('interview_schedule')
      .delete()
      .eq('id', new_schedule_id);
    console.log(e.message);
  }
};
