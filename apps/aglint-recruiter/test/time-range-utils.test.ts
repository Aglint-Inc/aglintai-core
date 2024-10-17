import { type TimeDurationDayjsType } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { describe, expect, it } from 'vitest';

import {
  isTimeChunksEnclosed,
  isTimeChunksLeftOverlapped,
  isTimeChunksRightOverlapped,
  isTimeChunksUnEnclosed,
} from '@/services/CandidateSchedule/utils/time_range_utils';

// TODO: include all utility function

describe.skip('time range utility functions', () => {
  describe('isTimeChunksLeftOverlapped and isTimeChunksRightOverlapped', () => {
    const cases: {
      chunk1: TimeDurationDayjsType;
      chunk2: TimeDurationDayjsType;
      expected: boolean;
    }[] = [
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 12, 0)),
        },
        expected: true,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 11, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 12, 0)),
        },
        expected: true,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 11, 0)),
        },
        expected: true,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 11, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 12, 0)),
        },
        expected: false,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 10, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 11, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 0, 1, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 0, 1, 10, 30)),
        },
        expected: false,
      },
    ];
    cases.forEach(({ chunk1, chunk2, expected }) => {
      it(`should return ${expected} for chunk1: ${chunk1} and chunk2: ${chunk2}`, () => {
        expect(isTimeChunksLeftOverlapped(chunk1, chunk2)).toBe(expected);
        expect(isTimeChunksRightOverlapped(chunk1, chunk2)).toBe(!expected);
      });
    });
  });

  describe('isTimeChunksEnclosed and isTimeChunksUnEnclosed', () => {
    const cases: {
      chunk1: TimeDurationDayjsType;
      chunk2: TimeDurationDayjsType;
      expected: boolean; // should be true for isTimeChunksEnclosed
    }[] = [
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 8, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 8, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        expected: true,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 8, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        expected: false,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 8, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 11, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 12, 0)),
        },
        expected: false,
      },
      {
        chunk1: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 8, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 10, 0)),
        },
        chunk2: {
          startTime: dayjsLocal(new Date(2024, 6, 10, 9, 0)),
          endTime: dayjsLocal(new Date(2024, 6, 10, 11, 0)),
        },
        expected: false,
      },
    ];

    cases.forEach(({ chunk1, chunk2, expected }) => {
      it(`should return ${expected} for chunk1: ${chunk1} and chunk2: ${chunk2}`, () => {
        expect(isTimeChunksEnclosed(chunk1, chunk2)).toBe(expected);
        expect(isTimeChunksUnEnclosed(chunk1, chunk2)).toBe(!expected);
      });
    });
  });
});
