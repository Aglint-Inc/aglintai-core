export const agent_activities = {
  phone_agent: {
    phone_call: {
      failed: 'Failed to call the candidate',
      candidate_no_answer:
        "{candidate} Didn't Pick Up - Rescheduled Call to {time_format}",
      candidate_reject:
        "{candidate} Didn't Pick Up - Rescheduled Call to {time_format}",
    },
    tools: {
      'find-time-zone': {
        failed_to_find_time_zone:
          'Unable to determine the time zone for the candidate in {location}.',
      },
      'schedule-call': {
        req_scheduled_call:
          '{candidate} has requested to schedule a call on {time_format}.',
        call_schedule_sucess: 'Call successfully scheduled for {time_format}.',
        failed_to_schedule:
          'Unable to schedule the call for {time_format}. {err_msg}',
      },
      'find-interview-slots': {
        req_slot_on_date:
          '{candidate} requested available slots on {date_format}',
        all_slots_booked: 'All slots booked for {date_format}',
        failed_to_fetch_slots:
          'An error occurred while fetching slots for {date_format}. {err_msg}',
      },
      'schedule-interview-slot': {
        req_slot_on_time:
          '{candidate} requested an interview slot on {time_format} ',
        no_slots_found: '{candidate} got empty slot at {time_format}',
        scheduled_sucess:
          'Interview scheduled for {candidate} at {time_format}',
        failed_to_schedule:
          'Unable to schedule the interview for {date_format}. {err_msg}',
      },
      'cancel-interview': {
        candidate_req:
          '{candidate} requested to cancel the scheduled interview',
        sucessessfull_cancel: 'Scheduled interview successfully cancelled',
        failed_cancel_interview:
          'Failed to cancel the scheduled interview. {err_msg}',
      },
    },
    //
  },
  email_agent: {
    repy: {
      failed: 'Agent Failed to reply due to :',
    },
    tools: {
      'find-time-zone': {
        failed_to_find_time_zone:
          'Unable to find the time zone for the candidate in {location}. {err_msg}',
      },
      'find-interview-slots': {
        req_slot_on_date:
          '{candidate} requested available slots on {date_format}',
        all_slots_booked: 'All slots booked for {date_format}',
        failed_to_fetch_slots:
          'An error occurred while fetching slots for {date_format}. {err_msg}',
      },
      'book-interview-slot': {
        req_slot_on_time:
          '{candidate} requested an interview slot on {time_format} ',
        no_slots_found: '{candidate} got empty slot at {time_format}',
        scheduled_sucess:
          'Interview scheduled for {candidate} at {time_format}',
        failed_to_schedule:
          'Unable to schedule the interview for {date_format}. {err_msg}',
      },
      'cancel-interiew-slot': {
        candidate_req:
          '{candidate} requested to cancel the scheduled interview',
        sucessessfull_cancel: 'Scheduled interview successfully cancelled',
        failed_cancel_interview:
          'Failed to cancel the scheduled interview. {err_msg}',
      },
      'get-job-description': {},
    },
  },
};
