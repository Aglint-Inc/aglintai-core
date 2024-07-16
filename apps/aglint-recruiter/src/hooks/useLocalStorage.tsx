/* eslint-disable security/detect-object-injection */
import { useState } from 'react';

import { initialFilterState } from '../components/Scheduling/Schedules/ScheduleStatesContext';

const initialLocalState = {
  scheduleFilterIds: initialFilterState,
};

type LocalStorage = typeof initialLocalState;

export const useLocalStorage = <T extends keyof LocalStorage>(key: T) => {
  const item = JSON.parse(localStorage.getItem(key)) as LocalStorage[T];
  const [state, setState] = useState<LocalStorage[T]>(
    item ?? initialLocalState[key],
  );
  const set = (
    // eslint-disable-next-line no-unused-vars
    input: LocalStorage[T] | ((prev?: LocalStorage[T]) => LocalStorage[T]),
  ) => {
    const value = typeof input === 'function' ? input(state) : input;
    setState(() => {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    });
  };

  return [state, set, initialLocalState[key]] as const;
};
