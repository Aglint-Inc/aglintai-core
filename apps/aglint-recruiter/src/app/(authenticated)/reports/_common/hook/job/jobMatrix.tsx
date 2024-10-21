import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { type CandidatesExp } from '@/routers/analytics/candidate/candidates_exp';
import { type CandidatesSkills } from '@/routers/analytics/candidate/candidates_skills';
import type { LocationCount } from '@/routers/analytics/job/locations_count';
import type { ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import { supabase } from '@/utils/supabase/client';

import { useAnalyticsContext } from '../../context/AnalyticsContext/AnalyticsContextProvider';

const useJobLocationCountProcedure = (
  input: LocationCount['input'],
): ProcedureQuery<LocationCount> =>
  api.analytics.job.location_count.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export function useJobLocations() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const [view, setView] = useState<'city' | 'state' | 'country'>('city');
  const { data, isFetching, isError } = useJobLocationCountProcedure({
    recruiter_id: recruiter.id,
    locations: filters.location ? [filters.location] : undefined,
    departments: filters.department ? [filters.department] : undefined,
    data_range: filters.dateRange,
  });
  const filterData = (data || []).reduce(
    (acc, curr) => {
      const tempKey = curr[view] || 'Not Provided';
      acc[tempKey] = {
        name: tempKey,
        value: (acc[tempKey]?.value || 0) + curr.app_count,
      };
      return acc;
    },
    {} as { [key: string]: { name: string; value: number } },
  );
  let tempData = (Object.values(filterData || {}) || []).sort(
    (a, b) => b.value - a.value,
  );
  if (tempData.length > 5) {
    const temp = tempData.slice(0, 5);
    const temp_other = tempData.slice(5).reduce(
      (acc, curr) => {
        acc.value += curr.value;
        return acc;
      },
      { name: 'other', value: 0 },
    );
    tempData = [...temp, temp_other];
    const temp_sum = tempData.reduce((acc, curr) => acc + curr.value, 0) / 100;
    tempData = tempData.map((item) => ({
      name: item.name,
      value: Math.round((item.value / temp_sum) * 100) / 100,
      //   @ts-ignore
      //   value: +(Math.round(item.value / temp_sum + 'e+2') + 'e-2'),
    }));
  }
  return {
    data: tempData,
    view,
    setView,
    isFetching,
    isError,
  };
}

const useCandidateExpProcedure = (
  input: CandidatesExp['input'],
): ProcedureQuery<CandidatesExp> =>
  api.analytics.candidate.candidates_exp.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export function useCandidateExp() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();

  const { data, isFetching, isError } = useCandidateExpProcedure({
    recruiter_id: recruiter.id,
    locations: filters.location ? [filters.location] : undefined,
    departments: filters.department ? [filters.department] : undefined,
    data_range: filters.dateRange,
  });

  const processData = (data || []).map((item) => ({
    ...item,
    tenure: Math.round(item.total_exp / item.count),
    years: Math.round(item.total_exp / 12),
  }));
  const tempLen = processData.length / 100;
  const avg_tenure =
    Math.round(
      processData.reduce((acc, curr) => acc + curr.tenure, 0) / tempLen / 12,
    ) / 100;
  const avg_total_exp =
    Math.round(
      processData.reduce((acc, curr) => acc + curr.years, 0) / tempLen,
    ) / 100;

  const gData: {
    Tenure: { [key: number]: { candidates: number; months: number } };
    Experience: { [key: number]: { candidates: number; years: number } };
  } = {
    Tenure: {},
    Experience: {},
  };
  processData.forEach((curr) => {
    gData.Tenure[curr.tenure] = {
      candidates: curr.count,
      months: curr.tenure,
    };
    gData.Experience[curr.years] = {
      candidates: curr.count,
      years: curr.years,
    };
  });
  return {
    data: {
      Tenure: Object.values(gData.Tenure),
      Experience: Object.values(gData.Experience),
      avg_tenure,
      avg_total_exp,
    },
    isFetching,
    isError,
  };
}

const useCandidateSkillsProcedure = (
  input: CandidatesSkills['input'],
): ProcedureQuery<CandidatesSkills> =>
  api.analytics.candidate.candidates_skills.useQuery(input, {
    enabled: !!input.recruiter_id,
  });

export function useCandidateSkills() {
  const { recruiter } = useTenant();
  const { filters } = useAnalyticsContext();
  const [view, setView] = useState<'Top skills' | 'JD Skills'>('Top skills');
  const { data: skills } = useQuery({
    queryKey: ['job', filters.job, 'skills'],
    queryFn: async () =>
      ((
        await supabase
          .from('public_jobs')
          .select('jd_json->skills')
          .eq('id', filters.job!)
          .single()
          .throwOnError()
      )?.data?.skills || []) as string[],
    enabled: !!filters.job,
  });
  const { data, isFetching, isError } = useCandidateSkillsProcedure({
    recruiter_id: recruiter.id,
    locations: filters.location ? [filters.location] : undefined,
    departments: filters.department ? [filters.department] : undefined,
    data_range: filters.dateRange,
  });
  const mappedData =
    (view === 'JD Skills'
      ? data?.filter((item) => skills?.includes(item.skill))
      : data) || [];
  const pData = [...mappedData.slice(0, 10)].map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }));
  return {
    data: pData,
    view,
    setView,
    isFetching,
    isError,
  };
}
