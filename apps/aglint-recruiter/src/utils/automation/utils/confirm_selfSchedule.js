import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

//get filter id --------------------------
export const getFilterJson = async (request_id) => {
  const {
    error,
    data: [filter_json],
  } = await supabaseAdmin
    .from('interview_filter_json')
    .select('id')
    .eq('request_id', request_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to fetch filter_id');
  }
  return filter_json.id;
};

//get slots ------------------------------

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
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/verify-recruiter-selected-slots`,
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

// confirm slot ----------------------------------

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/booking/candidate-self-schedule`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyParams),
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch slots');
    }
  } catch {
    throw new Error('confirm a slot failed');
  }
};
