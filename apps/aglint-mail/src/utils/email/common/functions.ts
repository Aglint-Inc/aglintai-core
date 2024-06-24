export function durationCalculator(min) {
  const m = min % 60;
  const h = Math.floor(min / 60);

  if (h > 0)
    if (m > 0) return `${h}:${m} Hours`;
    else return `${h} Hours`;
  return `${m} Minutes`;
}

export function sessionTypeIcon(platform) {
  if (platform === 'individual')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/individual.png';
  if (platform === 'debrief')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/debrief.png';
  if (platform === 'panel')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/panel.png';
}

export function scheduleTypeIcon(platform) {
  if (platform === 'zoom')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png';
  if (platform === 'google_meet')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png';
  if (platform === 'phone_call')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/google_meet.png';
  if (platform === 'in_person_meeting')
    return 'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/in_person_meeting.png';
}

export const durationIcon =
  'https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/duration.png';

export function platformRemoveUnderscore(name) {
  if (name === 'google_meet') return 'Google Meet';
  else if (name === 'in_person_meeting') return 'In Person Meeting';
  else if (name === 'phone_call') return 'Phone Call';
  else if (name === 'zoom') return 'Zoom';
}
