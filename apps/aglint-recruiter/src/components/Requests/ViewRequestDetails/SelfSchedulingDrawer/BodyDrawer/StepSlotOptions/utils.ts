import { PlanCombinationRespType } from '@aglint/shared-types';

export function extractPlanData(
  sessionsArray: PlanCombinationRespType[],
): (PlanCombinationRespType & { dateRange: string[] })[] {
  return sessionsArray.map((plan) => ({
    plan_comb_id: plan.plan_comb_id,
    sessions: plan.sessions,
    no_slot_reasons: [],
    dateRange: [
      ...new Set(
        plan.sessions.map((session) => session.start_time.split('T')[0]),
      ),
    ],
  }));
}

export function groupByDateRange(
  plansData: (PlanCombinationRespType & {
    dateRange: string[];
  })[],
): {
  dateArray: string[];
  plans: PlanCombinationRespType[];
}[] {
  const groupedData: {
    [dateRange: string]: PlanCombinationRespType[];
  } = {};

  plansData.forEach((plan) => {
    const dateRangeKey = JSON.stringify(plan.dateRange);
    if (!groupedData[String(dateRangeKey)]) {
      groupedData[String(dateRangeKey)] = [];
    }
    groupedData[String(dateRangeKey)].push({
      plan_comb_id: plan.plan_comb_id,
      sessions: plan.sessions,
      no_slot_reasons: [],
    });
  });

  return Object.entries(groupedData).map(([dateRange, plans]) => ({
    dateArray: JSON.parse(dateRange),
    plans: plans.map((plan) => ({
      plan_comb_id: plan.plan_comb_id,
      sessions: plan.sessions.flatMap((session) => session),
      no_slot_reasons: [],
    })),
  }));
}
