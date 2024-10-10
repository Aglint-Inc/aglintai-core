import {
  type PlanCombinationRespType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { dayjsLocal, ScheduleUtils } from '@aglint/shared-utils';

type CandidateSelfScheduleSlotsType = {
  interview_start_date: string;
  interview_rounds: {
    current_round_idx: number;
    current_interview_date: string;
    current_day_slots: {
      start_time: string;
      end_time: string;
    }[];
  }[];
};
type PlanPackageMap = {
  [start_date: string]: {
    [round: number]: {
      start_time: string;
      end_time: string;
    }[];
  };
};
export const transformPlanCombinationPack = (
  verified_options: PlanCombinationRespType[],
  candidate_tz: string,
) => {
  const all_verfied_plans_map: PlanPackageMap = {};

  const sesn_round_cnt = ScheduleUtils.getSessionRounds(
    verified_options[0].sessions.map((s) => ({
      break_duration: s.break_duration,
      session_duration: s.duration,
      session_order: s.session_order,
    })),
  ).length;

  for (const slot_package of verified_options) {
    const interview_start_date = dayjsLocal(slot_package.sessions[0].start_time)
      .tz(candidate_tz)
      .startOf('date')
      .format();
    const slot_rounds: SessionCombinationRespType[][] =
      ScheduleUtils.getSessionRounds(
        slot_package.sessions.map((s) => ({
          ...s,
          break_duration: s.break_duration,
          session_duration: s.duration,
          session_order: s.session_order,
        })),
      ) as unknown as SessionCombinationRespType[][];
    if (all_verfied_plans_map[interview_start_date] === undefined) {
      all_verfied_plans_map[interview_start_date] = {};
    }

    for (
      let current_round = 0;
      current_round < sesn_round_cnt;
      ++current_round
    ) {
      const round_start_time = dayjsLocal(
        slot_rounds[current_round][0].start_time,
      )
        .tz(candidate_tz)
        .format();
      const round_end_time = dayjsLocal(
        slot_rounds[current_round][slot_rounds[current_round].length - 1]
          .end_time,
      )
        .tz(candidate_tz)
        .format();
      if (!all_verfied_plans_map[interview_start_date][current_round]) {
        all_verfied_plans_map[interview_start_date][current_round] = [
          {
            start_time: dayjsLocal(slot_rounds[current_round][0].start_time)
              .tz(candidate_tz)
              .format(),
            end_time: dayjsLocal(
              slot_rounds[current_round][slot_rounds[current_round].length - 1]
                .end_time,
            )
              .tz(candidate_tz)
              .format(),
          },
        ];
        continue;
      }
      if (
        !all_verfied_plans_map[interview_start_date][current_round].find(
          (t) => t.start_time === round_start_time,
        )
      ) {
        all_verfied_plans_map[interview_start_date][current_round].push({
          start_time: round_start_time,
          end_time: round_end_time,
        });
      }
    }
  }
  const candidate_slots: CandidateSelfScheduleSlotsType[] = [];

  for (const [int_start_date, rounds] of Object.entries(
    all_verfied_plans_map,
  )) {
    candidate_slots.push({
      interview_start_date: int_start_date,
      interview_rounds: [],
    });
    for (const [round, time_slots] of Object.entries(rounds)) {
      const cround: CandidateSelfScheduleSlotsType['interview_rounds'][0] = {
        current_round_idx: Number(round),
        current_interview_date: dayjsLocal(time_slots[0].start_time)
          .tz(candidate_tz)
          .startOf('day')
          .format(),
        current_day_slots: time_slots,
      };
      candidate_slots[candidate_slots.length - 1].interview_rounds.push(cround);
    }
  }

  return candidate_slots;
};
