import OpenAI from 'openai';
import {ZodType, ZodTypeDef} from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import {ScheduleTool} from '../../../types/app_types/scheduleAgentTypes';
import {dayjsLocal} from '../../../utils/dayjsLocal/dayjsLocal';
import {SessionsCombType} from '@aglint/shared-types';

export const createOpenAiTool = ({
  description,
  name,
  schema,
}: {
  name: ScheduleTool;
  description: string;
  schema: ZodType<any, ZodTypeDef, any>;
}): OpenAI.Chat.Completions.ChatCompletionTool => {
  const tool: OpenAI.Chat.Completions.ChatCompletionTool = {
    type: 'function',
    function: {
      name: name,
      description: description,
      parameters: zodToJsonSchema(schema),
    },
  };
  return tool;
};

export const findInterviewSlotOnThatDay = (
  sessionComb: SessionsCombType[],
  cand_time_zone: string
) => {
  const filterSlotsTime = (
    timing: 'morning' | 'afternoon' | 'evening' | 'early_morning' | 'night'
  ) => {
    const filterSlotsByHr = (start_hour: number, end_hour: number) => {
      return sessionComb.filter(s => {
        const slot_start_hour = dayjsLocal(s.sessions[0].start_time)
          .tz(cand_time_zone)
          .format('HH');
        return (
          Number(slot_start_hour) >= start_hour &&
          Number(slot_start_hour) <= end_hour
        );
      });
    };

    const mapSlot = (slot: SessionsCombType) => {
      return `${dayjsLocal(slot.sessions[0].start_time).tz(cand_time_zone).format('h:mm A')}`;
    };
    let slots_str = '';
    if (timing === 'morning') {
      const filtered_slots = filterSlotsByHr(9, 11);
      slots_str = filtered_slots.slice(0, 2).map(mapSlot).join('\n');
    } else if (timing === 'afternoon') {
      const filtered_slots = filterSlotsByHr(12, 16);
      slots_str = filtered_slots.slice(0, 2).map(mapSlot).join('\n');
    } else if (timing === 'evening') {
      const filtered_slots = filterSlotsByHr(17, 20);
      slots_str = filtered_slots.slice(0, 2).map(mapSlot).join('\n');
    } else if (timing === 'early_morning') {
      const filtered_slots = filterSlotsByHr(0, 7);
      slots_str = [...filtered_slots]
        .reverse()
        .slice(0, 2)
        .map(mapSlot)
        .join('\n');
    } else if (timing === 'night') {
      const filtered_slots = filterSlotsByHr(21, 23);
      slots_str = filtered_slots.slice(0, 2).map(mapSlot).join('\n');
    }
    return slots_str;
  };

  let slots_str = '';
  const morning_slots_str = filterSlotsTime('morning');
  const afternoon_slots_str = filterSlotsTime('afternoon');
  if (morning_slots_str.length > 0) {
    slots_str += `Morning Slots :\n${morning_slots_str}\n\n`;
  }

  if (afternoon_slots_str.length > 0) {
    slots_str += `Afternoon Slots :\n${afternoon_slots_str}\n\n`;
  }

  // no slots on morning or afternoon
  if (slots_str.length === 0) {
    const evening_slots = filterSlotsTime('evening');
    slots_str += `Evening Slots :\n${evening_slots}\n\n`;
    const early_morning = filterSlotsTime('early_morning');
    slots_str += `Early Morning Slots :\n${early_morning}\n\n`;
    // Extreme condition
    if (slots_str.length === 0) {
      const night_slots = filterSlotsTime('night');
      slots_str += `Night Slots :\n${night_slots}`;
    }
  }

  return slots_str;
};
