/* eslint-disable no-unused-vars */
import { DatabaseTable, PlanCombinationRespType } from '@aglint/shared-types';
import axios from 'axios';
import {
  createContext,
  Dispatch,
  SetStateAction,
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
  selectedDayAvailableBlocks: PlanCombinationRespType[][] | null;
  setSelectedDayAvailableBlocks: Dispatch<
    SetStateAction<PlanCombinationRespType[][] | null>
  >;
  selectedDateSlots: { round: number; dateSlots: PlanCombinationRespType[] }[];
  setSelectedDateSlots: Dispatch<
    SetStateAction<{ round: number; dateSlots: PlanCombinationRespType[] }[]>
  >;
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
    useState<PlanCombinationRespType[][]>(null);

  const [selectedDateSlots, setSelectedDateSlots] = useState<
    { round: number; dateSlots: PlanCombinationRespType[] }[]
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
