/* eslint-disable security/detect-object-injection */
import {
  type CalConflictType,
  type SchedulingSettingType,
} from '@aglint/shared-types';

export const getCalEventType = (
  cal_event_summary: string,
  comp_schedule_setting: Pick<SchedulingSettingType, 'schedulingKeyWords'>,
): CalConflictType => {
  if (!cal_event_summary) {
    return 'cal_event';
  }
  const scheduling_keywords = comp_schedule_setting.schedulingKeyWords;
  const is_soft_conflict = scheduling_keywords.SoftConflicts.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLowerCase()),
  );
  if (is_soft_conflict) return 'soft';
  const is_ooo_conflict = scheduling_keywords.outOfOffice.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_ooo_conflict) return 'ooo';

  const is_recruiting_block = scheduling_keywords.recruitingBlocks.some(
    (key_word) =>
      cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_recruiting_block) return 'recruiting_blocks';
  const is_free_block = scheduling_keywords.free.some((key_word) =>
    cal_event_summary.toLowerCase().includes(key_word.toLocaleLowerCase()),
  );
  if (is_free_block) return 'free_time';

  return 'cal_event';
};
