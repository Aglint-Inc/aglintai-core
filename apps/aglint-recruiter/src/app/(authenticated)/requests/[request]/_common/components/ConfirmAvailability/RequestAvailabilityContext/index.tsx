/* eslint-disable no-unused-vars */
import { type CandReqSlotsType } from '@aglint/shared-types';
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react';

interface ContextValue {
  selectedDayAvailableBlocks: CandReqSlotsType['selected_dates'] | null;
  setSelectedDayAvailableBlocks: Dispatch<
    SetStateAction<CandReqSlotsType['selected_dates'] | null>
  >;
  selectedDateSlots: CandReqSlotsType[];
  setSelectedDateSlots: Dispatch<SetStateAction<CandReqSlotsType[]>>;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}
const defaultProvider: ContextValue = {
  selectedDayAvailableBlocks: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDayAvailableBlocks: () => {},
  selectedDateSlots: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedDateSlots: () => {},
  selectedIndex: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSelectedIndex: () => {},
};
const AvailabilityContext = createContext<ContextValue>(defaultProvider);
const useAvailabilityContext = () => useContext(AvailabilityContext);
function AvailabilityProvider({ children }) {
  const [selectedDayAvailableBlocks, setSelectedDayAvailableBlocks] =
    useState<CandReqSlotsType['selected_dates']>(null);

  const [selectedDateSlots, setSelectedDateSlots] = useState<
    CandReqSlotsType[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <AvailabilityContext.Provider
      value={{
        selectedDayAvailableBlocks,
        setSelectedDayAvailableBlocks,
        selectedDateSlots,
        setSelectedDateSlots,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
}

export { AvailabilityProvider, useAvailabilityContext };
