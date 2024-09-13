// // Handle button click actions
// export async function handleClick(
//   api: DatabaseEnums['email_slack_types'],
//   requestDetails: Request,
// ) {
//   if (api === 'onRequestCancel_slack_interviewersOrganizer') {
//     const meta = {
//       session_ids: requestDetails.request_relation.map((r) => r.session_id),
//       request_id: requestDetails.id,
//       event_run_id: null,
//       target_api: api,
//     };

//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_AGENT_API}/api/slack/${meta.target_api}`,
//         meta,
//       );
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       return 'An error occurred during the cancellation process';
//     }
//   } else if (api === 'onRequestCancel_agent_cancelEvents') {
//     const { data } = await supabase
//       .from('request_progress')
//       .insert({
//         status: 'in_progress',
//         event_type: 'CANCEL_INTERVIEW_MEETINGS',
//         request_id: requestDetails.id,
//       })
//       .select()
//       .single();

//     try {
//       await axios.post(
//         `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/cancel_interview_scheduling`,
//         {
//           session_ids: requestDetails.request_relation.map((r) => r.session_id),
//         },
//       );

//       await supabase
//         .from('request_progress')
//         .update({ status: 'completed' })
//         .eq('id', data.id)
//         // eslint-disable-next-line @typescript-eslint/no-empty-function
//         .then(() => {});
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       return 'An error occurred during the cancellation process';
//     }
//   }
// }
