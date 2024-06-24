import {dayjsLocal} from '../../utils/dayjsLocal/dayjsLocal';
import {formatDate} from '../../utils/scheduling_utils/time_zone';
import {getCachedCandidateInfo} from '../../services/cache/cache-db';

export const agentPrompt = async (cand_phone: string) => {
  const cand_info = await getCachedCandidateInfo(cand_phone);
  const getPlanSummary = () => {
    let summary = '';
    cand_info.interview_sessions.forEach((sess, idx) => {
      summary +=
        `Session ${idx + 1}. ${sess.name}\n` +
        `- duration ${sess.session_duration} ` +
        `- meeting place ${sess.schedule_type} ${
          idx < cand_info.interview_sessions.length - 1
            ? `- meeting break ${sess.break_duration} \n`
            : ''
        }`;
    });
    return summary;
  };

  const getFormatedDate = () => {
    const {filter_json, candidate_tz} = cand_info;
    if (!filter_json.start_date || !filter_json.end_date) {
      return 'candidate can pick any future date';
    }
    return `${formatDate(filter_json.start_date, candidate_tz.tz_code, 'MMMM DD')} - ${formatDate(filter_json.end_date, candidate_tz.tz_code, 'MMMM DD')}`;
  };

  let candidate_details =
    '# Candidate information :\n' + `* Name : ${cand_info.candidate_name} \n`;
  if (cand_info.candidate_tz.tz_code) {
    candidate_details +=
      `* candidate time zone : "${cand_info.candidate_tz.tz_code}" \n` +
      `* Candidate current date and time: ${dayjsLocal().tz(cand_info.comp_scheduling_setting.timeZone.tzCode).format('YYYY MMMM DD dddd hh:mm A ')}\n\n`;
  }

  let interview_dates = '';
  if (cand_info.candidate_tz.tz_code) {
    interview_dates = getFormatedDate();
  }

  const agent_role = `Role : Imagine you are a Interview Scheduler at ${cand_info.company_name} talking with a candidate in the phone call. \n\n`;
  const cancellInterview =
    '# Instruction to cancel the scheduled interview : \n' +
    '* ask specific reason for cancelling the interview.' +
    '* then cancel the interivew (use the tool "cancel-scheduled-interview").\n' +
    '* Note: candididate\'s scheduling status should be "scheduled" to cancel the interview\n' +
    '\n\n';
  const rescheduleInterview =
    // reschedule Interview
    '# Instructions to reschedule the interview : \n' +
    '* cancel the scheduled interview first then proceed to schedule the interview.\n' +
    '* Note: candididate\'s scheduling status should be "scheduled" to reschedule the interview.\n' +
    '\n\n';
  const rescheduleCall =
    '# Instructions to schedule the call to different time :\n' +
    '* Ask the candidate for the time he/she would like the callback, then schedule the call accordingly (use tool "schedule-call").\n\n';
  const interviewSchedule =
    `${cand_info}# Instructions to scheduling the interview:\n` +
    '* Ask candidate to pick one of the date from the given date range.\n' +
    '* Confirm the date of interview and timing to book the interview with the candidate.\n' +
    '* Book the interview slot (use the tool "book-interview-slot").\n' +
    '* let candidate know that he will recieve the confirmation email and interview details.\n' +
    '* then ask the consent from candidate to end the call.\n' +
    '* Note: candididate\'s scheduling status should be "not scheduled" or "cancelled" to schedule the interview.\n' +
    '\n\n';

  const end_call =
    "* after sucessfully completing each candidate's request ask whether he need any assistance or to end the call.\n";

  const interview_plan = '# Interview Plan :\n' + `${getPlanSummary()}\n\n`;
  const general_guidelines =
    '# General guidelines.\n' +
    "* after sucessfully completing each candidate's request ask whether he need any assistant or to end the call.\n" +
    '* Every time before invoking any of the tools. inform candidate to wait for a moment\n' +
    '* Keep your response succinct, short, and get to the point quickly.\n' +
    '* If your role cannot do something, try to steer the conversation back to the goal of the conversation and to your role\n' +
    '* maintain proffessional tone of conversation.\n' +
    '\n\n';

  const getAgentPrompt = () => {
    let all_prompt = '';
    if (
      cand_info.schedule_status === 'waiting' ||
      cand_info.schedule_status === 'cancelled'
    ) {
      // not allowed cancel,
      let agent_task = '';
      agent_task =
        'Your job is to help the candidate to schedule the Interview :\n' +
        'if candidate location is not mentioned ask candidate for the location to find slots in his time zone.' +
        'then find the candidate time zone (use tool "find-time-zone").' +
        'then proceed for scheduling the interview.\n\n';
      all_prompt =
        agent_role +
        agent_task +
        interview_dates +
        interview_plan +
        candidate_details +
        interviewSchedule +
        rescheduleCall +
        end_call +
        general_guidelines;
    } else if (cand_info.schedule_status === 'confirmed') {
      // not allowed reschedule call,
      let agent_task = '';
      agent_task =
        'Your job is to help the candidate to assist further or to end the call :\n\n';
      all_prompt =
        agent_role +
        agent_task +
        interview_dates +
        interview_plan +
        candidate_details +
        interviewSchedule +
        cancellInterview +
        rescheduleInterview +
        end_call +
        general_guidelines;
    }

    return all_prompt;
  };

  return getAgentPrompt();
};
