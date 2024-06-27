import { PlanCombinationRespType } from '../../scheduleTypes';
import { TableType } from './index.types';

export type FilterJSON = {
  end_date: string;
  start_date: string;
};

export type CustomInterviewFilterJson = TableType<
  'interview_filter_json',
  { filter_json: FilterJSON; selected_options: PlanCombinationRespType[] }
>;
