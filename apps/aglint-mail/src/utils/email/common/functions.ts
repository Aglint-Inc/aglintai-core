import { scheduleTypeIcons, sessionTypeIcons } from '../../assets/common';

export function durationCalculator(min) {
  const m = min % 60;
  const h = Math.floor(min / 60);

  if (h > 0)
    if (m > 0) return `${h}:${m} Hours`;
    else return `${h} Hours`;
  return `${m} Minutes`;
}

type SessionTypeEnum = 'individual' | 'debrief' | 'panel';

export function sessionTypeIcon(platform: SessionTypeEnum) {
  if (platform === 'individual') return sessionTypeIcons.individual;
  if (platform === 'debrief') return sessionTypeIcons.debrief;
  if (platform === 'panel') return sessionTypeIcons.panel;
}

type ScheduleTypeEnum =
  | 'zoom'
  | 'google_meet'
  | 'phone_call'
  | 'in_person_meeting';

export function scheduleTypeIcon(platform: ScheduleTypeEnum) {
  if (platform === 'zoom') return scheduleTypeIcons.zoom;
  if (platform === 'google_meet') return scheduleTypeIcons.google_meet;
  if (platform === 'phone_call') return scheduleTypeIcons.phone_call;
  if (platform === 'in_person_meeting')
    return scheduleTypeIcons.in_person_meeting;
}

export function platformRemoveUnderscore(name) {
  if (name === 'google_meet') return 'Google Meet';
  else if (name === 'in_person_meeting') return 'In Person Meeting';
  else if (name === 'phone_call') return 'Phone Call';
  else if (name === 'zoom') return 'Zoom';
}

export function numberToOrdinal(number: number): string {
  const j = number % 10;
  const k = number % 100;

  if (j === 1 && k !== 11) {
    return `${number}st`;
  }
  if (j === 2 && k !== 12) {
    return `${number}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${number}rd`;
  }
  return `${number}th`;
}
