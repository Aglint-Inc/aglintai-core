/* eslint-disable no-unused-vars */
import {
  type CandReqSlotsType,
  type DatabaseTable,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface ContextValue {
  selectedRequestAvailability:
    | DatabaseTable['candidate_request_availability']
    | null;
  setSelectedRequestAvailability: Dispatch<
    SetStateAction<DatabaseTable['candidate_request_availability'] | null>
  >;
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
  selectedRequestAvailability: null,
  setSelectedRequestAvailability: () => {},
  selectedDayAvailableBlocks: null,
  setSelectedDayAvailableBlocks: () => {},
  selectedDateSlots: [],
  setSelectedDateSlots: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
};
const AvailabilityContext = createContext<ContextValue>(defaultProvider);
const useAvailabilityContext = () => useContext(AvailabilityContext);
function AvailabilityProvider({ children }) {
  const [selectedRequestAvailability, setSelectedRequestAvailability] =
    useState<DatabaseTable['candidate_request_availability'] | null>(null);
  const [selectedDayAvailableBlocks, setSelectedDayAvailableBlocks] =
    useState<CandReqSlotsType['selected_dates']>(null);

  const [selectedDateSlots, setSelectedDateSlots] = useState<
    CandReqSlotsType[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <AvailabilityContext.Provider
      value={{
        selectedRequestAvailability,
        setSelectedRequestAvailability,
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
