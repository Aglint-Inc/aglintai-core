export const meetingPlatform = (schedule_type: string) => {
  if (schedule_type === 'google_meet') return 'Google Meet';
  else if (schedule_type === 'in_person_meeting') return 'In Person Meeting';
  else if (schedule_type === 'phone_call') return 'Phone Call';
  else if (schedule_type === 'zoom') return 'Zoom';
};
