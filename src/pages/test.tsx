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
      const plan_id = '6e4ce1b4-6c6f-4f85-916e-c3baf8629fe4';
      const sessions = [
        {
          id: '',
          created_at: '2024-04-01T10:07:06.826456+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          session_order: 1,
          session_duration: 30,
          break_duration: 30,
          interviewer_cnt: 1,
          session_type: 'panel',
          location: null,
          schedule_type: 'zoom',
          name: 'session 1',
        },
        {
          id: '',
          created_at: '2024-04-01T10:07:06.72572+00:00',
          module_id: null,
          interview_plan_id: '6e4ce1b4-6c6f-4f85-916e-c3baf8629fe4',
          session_order: 2,
          session_duration: 30,
          break_duration: 1440,
          interviewer_cnt: 1,
          session_type: 'debrief',
          location: null,
          schedule_type: 'zoom',
          name: 'session 2',
        },
        {
          id: '',
          created_at: '2024-04-01T10:07:06.807092+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: '6e4ce1b4-6c6f-4f85-916e-c3baf8629fe4',
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
          id: '',
          created_at: '2024-04-01T10:07:06.759923+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: '6e4ce1b4-6c6f-4f85-916e-c3baf8629fe4',
          session_order: 4,
          session_duration: 30,
          break_duration: 1440,
          interviewer_cnt: 1,
          session_type: 'individual',
          location: null,
          schedule_type: 'google_meet',
          name: 'session 4',
        },

        {
          id: '',
          created_at: '2024-04-01T10:07:06.874566+00:00',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: '6e4ce1b4-6c6f-4f85-916e-c3baf8629fe4',
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
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
        {
          interview_module_relation_id: '8a88736f-1d37-4dca-a3c9-410206864522',
        },
        {
          interview_module_relation_id: '8a88736f-1d37-4dca-a3c9-410206864522',
        },
        {
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
        {
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
      ];

      sessions.map(async (s, idx) => {
        try {
          const [rec] = supabaseWrap(
            await supabase
              .from('interview_session')
              .insert({
                interview_plan_id: plan_id,
                session_order: s.session_order,
                break_duration: s.break_duration,
                session_duration: s.session_duration,
                interviewer_cnt: s.interviewer_cnt,
                session_type: s.session_type as any,
                schedule_type: s.schedule_type as any,
                module_id: s.module_id,
                name: s.name,
              })
              .select(),
          );
          if (rec.session_type !== 'debrief') {
            supabaseWrap(
              await supabase.from('interview_session_relation').insert({
                session_id: rec.id,
                interview_module_relation_id:
                  sess_relns[idx].interview_module_relation_id,
              }),
            );
          } else {
            supabaseWrap(
              await supabase.from('interview_session_relation').insert({
                session_id: rec.id,
                user_id: '9afe3700-c509-4f65-af0d-7892718ecde2',
              }),
            );
          }
        } catch (err) {
          console.log(err);
        }
      });

      // console.log('nfwkejefnk');

      // sessions.forEach(async (s) => {
      //   console.log(
      //     supabaseWrap(
      //       await supabase
      //         .from('interview_session')
      //         .insert({
      //           session_order: s.session_order,
      //           break_duration: s.break_duration,
      //           name: s.name,
      //         })
      //         .eq('id', s.id)
      //         .select(),
      //     ),
      //   );
      // });
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
