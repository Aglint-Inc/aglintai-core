/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';

import { supabaseWrap } from '../components/JobsDashboard/JobPostCreateUpdate/utils';
import { supabase } from '../utils/supabase/client';

const Page = () => {
  return (
    <>
      <Comp />
    </>
  );
};

export default Page;

const Comp = () => {
  // const { } = useAuthDetails();
  const handleClick = async () => {
    const seed_Interview_plan = {
      plan_id: '76f6d467-950a-4d11-95c5-c45804f44786',
      sessions: [
        {
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          session_order: 1,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'panel',
          location: '',
        },
        {
          module_id: null,
          session_order: 2,
          session_duration: 30,
          break_duration: 24 * 60 * 60,
          interview_cnt: 1,
          session_type: 'debrief',
          location: '',
        },
        {
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          session_order: 3,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'individual',
          location: '',
        },
        {
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          session_order: 4,
          session_duration: 30,
          break_duration: 24 * 60 * 60,
          interview_cnt: 1,
          session_type: 'individual',
          location: '',
        },
        {
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          session_order: 5,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'individual',
          location: '',
        },
      ],
      session_relation: [
        {
          session_id: '25e667ba-41b2-4604-80f6-ce3661c870f7',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
      ],
    };

    try {
      const sessions = [];
      seed_Interview_plan.sessions.forEach(async (sess) => {
        const rec = supabaseWrap(
          await supabase
            .from('interview_session')
            .insert({
              break_duration: sess.break_duration,
              interviewer_cnt: sess.interview_cnt,
              module_id: sess.module_id,
              session_type: sess.session_type as any,
              session_order: sess.session_order,
              session_duration: sess.session_duration,
            })
            .select(),
        );
        console.log(rec);
        sessions.push(rec[0]);
      });
      console.log(sessions);
      // seed_Interview_plan.session_relation.forEach(async (reln) => {
      //   supabaseWrap(
      //     await supabase.from('interview_session_relation').insert({
      //       session_id: reln.session_id,
      //       interview_module_relation_id: reln.interview_module_relation_id,
      //       // interviewer_type: reln.interviewer_type as any,
      //     }),
      //   );
      // });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const sessions = [
        {
          id: '8e017bad-4b5e-45b1-b91d-44fee879776c',
          created_at: '2024-04-01T10:07:06.826456+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: null,
          session_order: 1,
          session_duration: 30,
          break_duration: 30,
          interviewer_cnt: 1,
          session_type: 'panel',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 1',
        },
        {
          id: 'dd541013-39ef-4d5f-9862-67d10186e180',
          created_at: '2024-04-01T10:07:06.72572+00:00',
          module_id: null,
          interview_plan_id: null,
          session_order: 2,
          session_duration: 30,
          break_duration: 86400,
          interviewer_cnt: 1,
          session_type: 'debrief',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 2',
        },
        {
          id: 'ab8fea09-c638-4403-a3ca-8cfae659fbb1',
          created_at: '2024-04-01T10:07:06.807092+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: null,
          session_order: 3,
          session_duration: 30,
          break_duration: 30,
          interviewer_cnt: 1,
          session_type: 'individual',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 3',
        },
        {
          id: '889a0e19-5a3b-4dab-a199-ded61997dda2',
          created_at: '2024-04-01T10:07:06.759923+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: null,
          session_order: 4,
          session_duration: 30,
          break_duration: 86400,
          interviewer_cnt: 1,
          session_type: 'individual',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 4',
        },

        {
          id: 'e22f9df3-9cc0-4030-8171-b9dcd5d3ebd4',
          created_at: '2024-04-01T10:07:06.874566+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: null,
          session_order: 5,
          session_duration: 30,
          break_duration: 30,
          interviewer_cnt: 1,
          session_type: 'individual',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 5',
        },
      ];

      const sess_relns = [
        {
          session_id: '8e017bad-4b5e-45b1-b91d-44fee879776c',
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
        {
          session_id: 'e22f9df3-9cc0-4030-8171-b9dcd5d3ebd4',
          interview_module_relation_id: '8a88736f-1d37-4dca-a3c9-410206864522',
        },
        {
          session_id: '889a0e19-5a3b-4dab-a199-ded61997dda2',
          interview_module_relation_id: '8a88736f-1d37-4dca-a3c9-410206864522',
        },
        {
          session_id: 'ab8fea09-c638-4403-a3ca-8cfae659fbb1',
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
      ];

      // sess_relns.forEach(async (reln) => {
      //   supabaseWrap(
      //     await supabase.from('interview_session_relation').insert({
      //       session_id: reln.session_id,
      //       interview_module_relation_id: reln.interview_module_relation_id,
      //     }),
      //   );
      //   console.log('nvekjn');
      // });

      // console.log('nfwkejefnk');

      sessions.forEach(async (s) => {
        supabaseWrap(
          await supabase
            .from('interview_session')
            .update({
              session_order: s.session_order,
              break_duration: s.break_duration,
              name: s.name,
            })
            .eq('id', s.id),
        );
      });
      // console.log('nfwkejefnk');

      //
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleUpdate}>on CLIKC</button>
    </>
  );
};
