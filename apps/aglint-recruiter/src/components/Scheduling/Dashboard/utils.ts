import dayjs from 'dayjs';

import {
  type useInterviewConversion,
  type useInterviewMeetingStatus,
} from '@/src/queries/scheduling-dashboard';

export const interviewConversionTimeFormat = (
  type: Parameters<typeof useInterviewConversion>[0],
  interviewConversion: ReturnType<typeof useInterviewConversion>['data'],
): typeof interviewConversion => {
  const timelines = interviewConversion.map(({ timeline, count }) => ({
    timeline: dayjs(timeline).tz('Africa/Abidjan').format(),
    count,
  }));
  const endTime = timelines[timelines.length - 1];
  return timeStampTimeline(timelines[0].timeline, endTime.timeline, type)
    .map((timeline) => ({
      timeline,
      count: 0,
    }))
    .reverse()
    .map((curr) => {
      const hit = timelines.find((f) => curr.timeline === f.timeline);
      if (hit) return { ...hit, timeline: timestampFormat(type, hit.timeline) };
      return { ...curr, timeline: timestampFormat(type, curr.timeline) };
    });
};

export const interviewMeetingTimeFormat = (
  type: Parameters<typeof useInterviewMeetingStatus>[0],
  interviewMeetingStatus: ReturnType<typeof useInterviewMeetingStatus>['data'],
): typeof interviewMeetingStatus => {
  const timelines = interviewMeetingStatus.map(({ timeline, ...rest }) => ({
    ...rest,
    timeline: dayjs(timeline).tz('Africa/Abidjan').format(),
  }));
  const endTime = timelines[timelines.length - 1];
  return timeStampTimeline(timelines[0].timeline, endTime.timeline, type)
    .map((timeline) => ({
      timeline,
      waiting: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      reschedule: 0,
      not_scheduled: 0,
    }))
    .reverse()
    .map((curr) => {
      const hit = timelines.find((f) => curr.timeline === f.timeline);
      if (hit) return { ...hit, timeline: timestampFormat(type, hit.timeline) };
      return { ...curr, timeline: timestampFormat(type, curr.timeline) };
    });
};

const timeStampTimeline = (
  startTime: string,
  endTime: string,
  type: Parameters<typeof useInterviewMeetingStatus>[0],
) => {
  const time1 = dayjs(startTime);
  const time2 = dayjs(endTime);
  const loop =
    type === 'day' ? 7 : type === 'week' ? 4 : type === 'month' ? 12 : 10;
  const timeline: string[] = [];
  for (let i = 0; i < loop; i++) {
    const newTime = time2.subtract(i, `${type}s`);
    if (time1 <= newTime)
      timeline.push(
        time2.subtract(i, `${type}s`).tz('Africa/Abidjan').format(),
      );
    else break;
  }
  return timeline;
};

const timestampFormat = (
  type: Parameters<typeof useInterviewMeetingStatus>[0],
  timestamp: string,
) => {
  const time = dayjs(timestamp);
  switch (type) {
    case 'day':
      return time.format('ddd');
    case 'week':
      return time.format('DD MMM');
    case 'month':
      return time.format('MMM YY');
    case 'year':
      return time.format('YYYY');
  }
};
