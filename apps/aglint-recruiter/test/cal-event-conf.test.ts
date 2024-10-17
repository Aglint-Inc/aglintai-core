// quote.service.mock.test.ts
import { type CalConflictType } from '@aglint/shared-types';
import { describe, expect, it } from 'vitest';

import { getCalEventType } from '@/services/CandidateSchedule/utils/getCalEventType';

import { sample_scheduling_setting } from './constant/companyScheduleSettings';

describe('identifies correct calender event type', () => {
  const summaries: { summary: string; expected_type: CalConflictType }[] = [
    {
      summary: 'Daily Standup at 09:00 AM',
      expected_type: 'soft',
    },
    {
      summary: 'Maternity Leave till some days',
      expected_type: 'ooo',
    },
    {
      summary: 'this is a Recruiting Blocks',
      expected_type: 'recruiting_blocks',
    },

    {
      summary: 'Team Lunch at 12:00 PM',
      expected_type: 'free_time',
    },
    {
      summary: 'Project Meeting at 12:00 PM',
      expected_type: 'cal_event',
    },
    {
      summary: 'Vacation',
      expected_type: 'ooo',
    },
    {
      summary: 'Dedicated Recruiting',
      expected_type: 'recruiting_blocks',
    },
    {
      summary: 'Sprint Planning',
      expected_type: 'soft',
    },
    {
      summary: 'Client Call at 12:00 PM',
      expected_type: 'cal_event',
    },
  ];

  summaries.forEach(({ summary, expected_type }) => {
    it(`Event : ${summary} should be of type ${expected_type}`, () => {
      const type = getCalEventType(summary, sample_scheduling_setting);
      expect(type).toEqual(expected_type);
    });
  });
});
