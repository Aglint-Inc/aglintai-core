import { createContext, useContext, useState } from 'react';

const InterviewerHeader = createContext<
  ReturnType<typeof useInterviewHeader> | undefined
>(undefined);

const useInterviewHeader = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [selectedLocations, setLocations] = useState<string[]>([]);
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);
  const isFilterApplied =
    !!selectedDepartments?.length ||
    !!selectedInterviewTypes?.length ||
    !!selectedLocations?.length ||
    !!searchText?.length;

  return {
    isFilterApplied,
    searchText,
    setSearchText,
    selectedDepartments,
    setDepartments,
    selectedLocations,
    setLocations,
    selectedInterviewTypes,
    setInterviewTypes,
  };
};
export const InterviewerHeaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const values = useInterviewHeader();
  return (
    <InterviewerHeader.Provider value={{ ...values }}>
      {children}
    </InterviewerHeader.Provider>
  );
};

export const useInterviewerHeaderContext = () => {
  const context = useContext(InterviewerHeader);
  if (!context) throw new Error('out of boundry');
  return context;
};
