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
          session_id: '69ac1684-f0b1-48d2-8a8f-e66c18d3d526',
          module_id: 'e2c5305a-e497-475e-902e-97a33445cdab',
          interview_plan_id: '76f6d467-950a-4d11-95c5-c45804f44786',
          session_order: 1,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'panel',
          location: '',
        },
        {
          session_id: 'ce8cada6-fb80-432f-a5c0-4642e35d2158',
          module_id: null,
          interview_plan_id: '76f6d467-950a-4d11-95c5-c45804f44786',
          session_order: 2,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'debrief',
          location: '',
        },
        {
          session_id: '9ca69514-249a-40b3-bd10-413cb9773bbe',
          module_id: '24535995-ec9e-4c91-a273-859e3c41bfe4',
          interview_plan_id: '76f6d467-950a-4d11-95c5-c45804f44786',
          session_order: 3,
          session_duration: 30,
          break_duration: 30,
          interview_cnt: 1,
          session_type: 'individual',
          location: '',
        },
      ],
      session_relation: [
        {
          session_id: '9ca69514-249a-40b3-bd10-413cb9773bbe',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '497f4850-0ae2-441d-a99a-f7bf88815bfd',
        },
        {
          session_id: '9ca69514-249a-40b3-bd10-413cb9773bbe',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '8a88736f-1d37-4dca-a3c9-410206864522',
        },
        {
          session_id: '9ca69514-249a-40b3-bd10-413cb9773bbe',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '8bb875a8-5b0e-4053-a064-dec6f7d7b7f8',
        },
        {
          session_id: 'ce8cada6-fb80-432f-a5c0-4642e35d2158',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '8bb875a8-5b0e-4053-a064-dec6f7d7b7f8',
        },
        {
          session_id: 'ce8cada6-fb80-432f-a5c0-4642e35d2158',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '8bb875a8-5b0e-4053-a064-dec6f7d7b7f8',
        },

        //
        {
          session_id: 'ce8cada6-fb80-432f-a5c0-4642e35d2158',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '3bb17a78-1cf7-4453-bcfe-1dbd04e4f0fa',
        },
        {
          session_id: 'ce8cada6-fb80-432f-a5c0-4642e35d2158',
          interviewer_type: 'interviewer',
          interview_module_relation_id: '3bb17a78-1cf7-4453-bcfe-1dbd04e4f0fa',
        },
      ],
    };

    try {
      // seed_Interview_plan.sessions.forEach(async (sess) => {
      //   const rec = supabaseWrap(
      //     await supabase.from('interview_session').insert({
      //       interview_plan_id: sess.interview_plan_id,
      //       break_duration: sess.break_duration,
      //       interviewer_cnt: sess.interview_cnt,
      //       module_id: sess.module_id,
      //       session_type: sess.session_type as any,
      //       session_order: sess.session_order,
      //       session_duration: sess.session_duration,
      //     }),
      //   );
      //   console.log(rec);
      // });

      seed_Interview_plan.session_relation.forEach(async (reln) => {
        supabaseWrap(
          await supabase.from('interview_session_relation').insert({
            session_id: reln.session_id,
            interview_module_relation_id: reln.interview_module_relation_id,
            // interviewer_type: reln.interviewer_type as any,
          }),
        );
      });
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleClick}>on CLIKC</button>
    </>
  );
};
