import { type InterviewSessionApiRespType } from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

const calcInterversCombsForSesson = (
  sessions: InterviewSessionApiRespType[],
  is_training_optional: boolean,
) => {
  const findCombinationOfStrings = (str_arr: string[], comb: number) => {
    const total_combs: string[][] = [];

    const findCombinationUtil = (
      arr: string[],
      single_comb: string[],
      start: number,
      end: number,
      index: number,
      r: number,
    ) => {
      if (index === r) {
        total_combs.push([...single_comb]);
        return;
      }

      for (let i = start; i <= end && end - i + 1 >= r - index; ++i) {
        single_comb[Number(index)] = arr[Number(i)];
        findCombinationUtil(arr, single_comb, i + 1, end, index + 1, r);
      }
    };
    const temp_arr = Array(comb).fill('');
    findCombinationUtil(str_arr, temp_arr, 0, str_arr.length - 1, 0, comb);

    return total_combs;
  };

  /**
   *
   * @param session session details
   * @param comb - number of interviewer needed  in the session
   * @returns combination of sessions with possible interviewers
   */
  const calcSingleSessionCombinations = (
    session: InterviewSessionApiRespType,
    comb: number,
  ) => {
    if (comb === 0 || comb > session.qualifiedIntervs.length) {
      throw new CApiError(
        'CLIENT',
        `Required number of interviewers is ${comb} found only ${session.qualifiedIntervs.length}`,
      );
    }

    const session_combs: InterviewSessionApiRespType[] = [];
    const combs = findCombinationOfStrings(
      [...session.qualifiedIntervs.map((int) => int.user_id)],
      comb,
    );
    for (const comb of combs) {
      const qualifiedIntervs = comb.map((id) => {
        const inter = session.qualifiedIntervs.find((i) => i.user_id === id);
        if (!inter) {
          throw new CApiError(
            'SERVER_ERROR',
            'qualified Interviewer not found',
          );
        }
        return {
          ...inter,
        };
      });
      // NOTE: optional trining ints
      if (is_training_optional && session.trainingIntervs.length > 0) {
        session_combs.push({
          ...session,
          trainingIntervs: [],
          qualifiedIntervs: [...qualifiedIntervs],
        });
      }
      session_combs.push({
        ...session,
        qualifiedIntervs: [...qualifiedIntervs],
      });
    }
    return session_combs;
  };

  const total_combs: InterviewSessionApiRespType[][] = [];

  for (const session of sessions) {
    let required_interviewer_cnt = session.interviewer_cnt;
    if (session.session_type === 'debrief') {
      required_interviewer_cnt = session.qualifiedIntervs.length;
    }
    const combs = calcSingleSessionCombinations(
      session,
      required_interviewer_cnt,
    );
    total_combs.push(combs);
  }

  return total_combs;
};
export const calcIntsCombsForEachSessionRound = (
  session_rounds: InterviewSessionApiRespType[][],
  is_training_optional: boolean,
) => {
  const ints_combs_for_each_round: InterviewSessionApiRespType[][][] = [];

  for (const curr_round of session_rounds) {
    const ints_cmobs_for_curr_round = calcInterversCombsForSesson(
      curr_round,
      is_training_optional,
    );
    ints_combs_for_each_round.push(ints_cmobs_for_curr_round);
  }
  return ints_combs_for_each_round;
};
