import { CandidatesSchedulingV2 } from '../services/CandidateScheduleV2/CandidatesSchedulingV2';

test('test sum in class file', () => {
  expect(CandidatesSchedulingV2.sum(1, 2)).toBe(3);
});
