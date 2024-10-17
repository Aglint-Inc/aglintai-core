import { type InterviewSessionApiRespType } from '@aglint/shared-types';
import { describe, expect, it } from 'vitest';

import { calcInterversCombsForSesson } from '@/services/CandidateSchedule/utils/interviewersCombsForSession';

import { sample_interviewer, sample_session } from './constant/session';

describe('Individual Session', () => {
  describe('given a session with interviewer count verify the number of session combinations that can be made', () => {
    const curr_session = sample_session;
    it('should return 1 combination for 1 interviewer', () => {
      curr_session.qualifiedIntervs = [sample_interviewer];
      curr_session.trainingIntervs = [];
      curr_session.interviewer_cnt = 1;
      const combinations = calcInterversCombsForSesson([curr_session], true);
      expect(combinations[0]).toHaveLength(1); // C(n,1) = 1 combination
    });

    it('should return n combination for n interviewer', () => {
      curr_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.trainingIntervs = [];
      curr_session.interviewer_cnt = 1;
      const combinations = calcInterversCombsForSesson([curr_session], true);
      expect(combinations[0]).toHaveLength(
        curr_session.qualifiedIntervs.length,
      ); // C(n,1) = n combinations
    });

    it('should return correct combinations for 3 interviewers out of 5', () => {
      curr_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.trainingIntervs = [];
      curr_session.interviewer_cnt = 3;
      const combinations = calcInterversCombsForSesson([curr_session], true);
      expect(combinations[0]).toHaveLength(10); // C(5,3) = 10 combinations
    });

    it('should handle cases with training interviewers', () => {
      curr_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.trainingIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.interviewer_cnt = 2;
      const combinations = calcInterversCombsForSesson([curr_session], false);
      expect(combinations[0]).toHaveLength(1); // 2 qualified + 2 training, C(2,2) * C(2,2) = 1 combination
    });

    it('should handle cases with training interviewers', () => {
      curr_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.trainingIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      curr_session.interviewer_cnt = 2;
      const combinations = calcInterversCombsForSesson([curr_session], false);
      expect(combinations[0]).toHaveLength(6);
    });

    it('should throw error when required interviewers are not available', () => {
      curr_session.qualifiedIntervs = [{ ...sample_interviewer }];
      curr_session.trainingIntervs = [];
      curr_session.interviewer_cnt = 2;

      expect(() => calcInterversCombsForSesson([curr_session], true)).toThrow(
        `Required number of interviewers is ${curr_session.interviewer_cnt} found only ${curr_session.qualifiedIntervs.length}`,
      );
    });
  });
  describe('more than one Sessions with fixed breaks', () => {
    it('should return correct combinations for multiple sessions', () => {
      const current_sessions: InterviewSessionApiRespType[] = [];
      sample_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      sample_session.trainingIntervs = [];
      sample_session.interviewer_cnt = 2;

      current_sessions.push({ ...sample_session });
      sample_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      sample_session.trainingIntervs = [];
      sample_session.interviewer_cnt = 1;
      current_sessions.push({ ...sample_session });
      sample_session.qualifiedIntervs = [
        { ...sample_interviewer },
        { ...sample_interviewer },
        { ...sample_interviewer },
      ];
      sample_session.trainingIntervs = [];
      sample_session.interviewer_cnt = 3;
      current_sessions.push({ ...sample_session });
      const combinations = calcInterversCombsForSesson(current_sessions, true);
      expect(combinations[0]).toHaveLength(3); // C(3,3)
      expect(combinations[1]).toHaveLength(2); // C(3,2)
      expect(combinations[2]).toHaveLength(1); // C(3,1)
    });
  });
});
