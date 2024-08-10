// import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

// export const getSelfSchudleSlots = async ({ request_id }) => {
//   try {
//     const filter_json_id = supabaseAdmin
//       .from('interview_filter_json')
//       .select('id')
//       .eq('request_id', request_id);

//     const paylod = {
//       filter_json_id,
//       candidate_tz: 'user_tz',
//       api_options: {
//         include_conflicting_slots: {
//           show_conflicts_events: true,
//           show_soft_conflicts: true,
//           out_of_working_hrs: true,
//         },
//       },
//     };

//     const response = await fetch(
//       '/api/scheduling/v1/verify-recruiter-selected-slots',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...paylod }),
//       },
//     );

//     if (response.status !== 200) {
//       throw new Error('Failed to fetch slots');
//     }

//     return response.data.filter((d) => d.length !== 0);
//   } catch (e) {
//     throw new Error(e);
//   }
// };
