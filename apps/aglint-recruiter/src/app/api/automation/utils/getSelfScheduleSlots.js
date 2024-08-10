export const getSelfSchudleSlots = async (filter_id) => {
  try {
    const payload = {
      filter_json_id: filter_id,
      candidate_tz: 'Asia/Calcutta',
      api_options: {
        include_conflicting_slots: {
          show_conflicts_events: true,
          show_soft_conflicts: true,
          out_of_working_hrs: true,
        },
      },
    };

    const response = await fetch(
      'https://dev.aglinthq.com/api/scheduling/v1/verify-recruiter-selected-slots',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch slots');
    }

    const data = await response.json();

    const filteredData = data.filter((d) => d.length !== 0);

    const sessions = filteredData.reduce((acc, curr) => {
      const { start_time } = curr[0][0].sessions[0];
      acc.push({
        date: start_time,
        slots: curr[0],
      });
      return acc;
    }, []);

    return sessions;
  } catch (e) {
    throw new Error(e);
  }
};

export const bookSelfScheudle = async ({ filter_id, selectedSlots }) => {
  const candSelectedSlots = selectedSlots.sessions;

  const bodyParams = {
    cand_tz: 'Asia/Calcutta',
    filter_id: filter_id,
    selected_plan: [
      {
        start_time: candSelectedSlots[0].start_time,
        end_time: candSelectedSlots[candSelectedSlots.length - 1].end_time,
      },
    ],
  };

  try {
    await confirmSlots(bodyParams);
  } catch {
    throw new Error('confirm a slot failed');
  }
};

const confirmSlots = async (bodyParams) => {
  try {
    const response = await fetch(
      'https://dev.aglinthq.com/api/scheduling/v1/booking/candidate-self-schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams),
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch slots');
    }
  } catch (e) {
    throw new Error(e);
  }
};

// payload :candidate-self-schedule

// {
//   "cand_tz": "Asia/Calcutta",
//   "filter_id": "7c90e896-dba4-4bcf-98df-fc278184b8c4",
//   "selected_plan": [
//       {
//           "start_time": "2024-08-12T17:00:00+05:30",
//           "end_time": "2024-08-12T18:00:00+05:30"
//       }
//   ]
// }
// [
//   {
//       "slot_comb_id": "Rp5vazNRqViNzYcxvyEfq",
//       "sessions": [
//           {
//               "break_duration": 0,
//               "duration": 30,
//               "interviewer_cnt": 1,
//               "location": null,
//               "module_name": "Initial Screening",
//               "schedule_type": "google_meet",
//               "session_id": "d6f654dc-2b28-465e-bb9a-cffe5f1d7861",
//               "session_name": "Initial Screening",
//               "session_order": 1,
//               "session_type": "panel",
//               "start_time": "2024-08-12T17:00:00+05:30",
//               "end_time": "2024-08-12T17:30:00+05:30",
//               "meeting_id": "cd5f3694-a0e0-4b0a-a91c-89f856b23c04"
//           },
//           {
//               "break_duration": 0,
//               "duration": 30,
//               "interviewer_cnt": 1,
//               "location": null,
//               "module_name": "Technical Assessment",
//               "schedule_type": "google_meet",
//               "session_id": "df847bb8-7bdf-436b-b202-e19597eb3d86",
//               "session_name": "Technical Round I",
//               "session_order": 2,
//               "session_type": "panel",
//               "start_time": "2024-08-12T17:30:00+05:30",
//               "end_time": "2024-08-12T18:00:00+05:30",
//               "meeting_id": "97a4f581-bc34-4c31-bb80-1cc5bd8cc396"
//           }
//       ],
//       "slot_cnt": 1
//   }
// ]
// ------------------------------------
// eSubmit = async ({filter_id,selectedSlots}) => {
//   const candSelectedSlots = selectedSlots.map((s) => s.sessions);

//   const bodyParams: CandidateDirectBookingType = {
//     cand_tz: timezone.tzCode,
//     filter_id: router.queryParams.filter_id as string,
//     task_id: router.queryParams?.task_id as string,
//     selected_plan: candSelectedSlots.map((slot) => ({
//       start_time: slot[0].start_time,
//       end_time: slot[slot.length - 1].end_time,
//     })),
//   };
//   try {
//     if (!isPending) {
//       await mutateAsync({
//         bodyParams,
//         is_agent_link: !meta.data.filter_json.selected_options,
//       });
//     } else {
//       toast.warning('Confirming slots. Please wait.');
//     }
//   } catch {
//     toast.error('Unable to book slots.');
//   }
// };

// const mutateAsync=async()=>({
// bodyParams,
// is_agent_link,
// }: {
// bodyParams: CandidateDirectBookingType;
// is_agent_link: boolean;
// }) => {
// const no_conf_payload: APICandidateConfirmSlotNoConflict = {
//   cand_tz: dayjsLocal.tz.guess(),
//   filter_id: bodyParams.filter_id,
//   selected_slot: {
//     slot_start_time: bodyParams.selected_plan[0].start_time,
//   },
//   agent_type: 'candidate',
//   task_id: bodyParams.task_id,
// };
// if (is_agent_link) {
//   await confirmSlotNoConflict(no_conf_payload);
// } else {
//   await confirmSlots(bodyParams);
// }
// await queryClient.invalidateQueries({ queryKey });
// },
