/* eslint-disable security/detect-object-injection */

// export const mapPriority = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())]?.text;
// };

// export const mapPriorityColor = (level: string) => {
//   return Priority[String(level.toLocaleLowerCase())];
// };

// const Status = {
//   open: '#3498DB',
//   pending: '#F1C40F',
//   'on hold': '#95A5A6',
//   resolved: '#228F67',
//   escalated: '#9B59B6',
//   canceled: '#34495E',
//   reopened: '#E74C3C',
// };
// export const mapStatusColor = (status: string) => {
//   return Status[String(status.toLocaleLowerCase())];
// };

export function fillEmailTemplate(
  template: string,
  email: {
    first_name: string;
    last_name: string;
    job_title: string;
    company_name: string;
    interview_link?: string;
    support_link?: string;
    phone_screening_link?: string;
    recruter_name?: string;
    candidate_name?: string;
    position_name?: string;
    schedule_name?: string;
    team_member_name?: string;
    view_details?: string;
    pick_your_slot_link?: string;
    session_name?: string;
    meeting_link?: string;
    date_range?: string;
    reschedule_reason?: string;
    additional_reschedule_notes?: string;
    cancle_reason?: string;
    availability_link?: string;
  },
) {
  let filledTemplate = template;
  const placeholders = {
    '[firstName]': email.first_name,
    '[lastName]': email.last_name,
    '[jobTitle]': email.job_title,
    '[companyName]': email.company_name,
    '[interviewLink]': email.interview_link,
    '[supportLink]': email.support_link,
    '[phoneScreeningLink]': email.phone_screening_link,
    '[recruiterName]': email.recruter_name,
    '[viewDetailsLink]': email.view_details,
    '[scheduleName]': email.schedule_name,
    '[teamMemberName]': email.team_member_name,
    '[pickYourSlotLink]': email.pick_your_slot_link,
    '[sessionName]': email.session_name,
    '[meetingLink]': email.meeting_link,
    '[dateRange]': email.date_range,
    '[rescheduleReason]': email.reschedule_reason,
    '[additionalRescheduleNotes]': email.additional_reschedule_notes,
    '[cancleReason]': email.cancle_reason,
    '[availabilityLink]': email.availability_link,
  };

  for (const [placeholder, value] of Object.entries(placeholders)) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
    filledTemplate = filledTemplate.replaceAll(regex, value);
  }

  return filledTemplate;
}
