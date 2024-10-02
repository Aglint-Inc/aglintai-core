'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { LibraryBig } from 'lucide-react';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useAllInterviewModules } from '@/authenticated/hooks';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';
import { useAllDepartments } from '@/queries/departments';

import { InterviewPoolList } from './InterviewPoolList';
const useHeaderPropContext = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const isFilterApplied = !!selectedDepartments?.length || !!searchText?.length;
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const handleTabChange = (value: string) => {
    if (value === 'active' || value === 'archived') {
      setActiveTab(value);
    }
  };
  return {
    searchText,
    setSearchText,
    selectedDepartments,
    setDepartments,
    isFilterApplied,
    activeTab,
    setActiveTab,
    handleTabChange,
  };
};

const InterviewPoolHeader =
  createContext<ReturnType<typeof useHeaderPropContext>>(null);

export const HeaderPropProvider = ({ children }: PropsWithChildren) => {
  const { ...value } = useHeaderPropContext();
  return (
    <InterviewPoolHeader.Provider value={{ ...value }}>
      {children}
    </InterviewPoolHeader.Provider>
  );
};

export const useHeaderProp = () => {
  const context = useContext(InterviewPoolHeader);
  return context;
};

export default function InterviewTypesPage() {
  const { searchText, selectedDepartments, isFilterApplied, activeTab } =
    useHeaderProp();

  const { data: allModules, isLoading: modulesLoading } =
    useAllInterviewModules();
  const { isLoading: departmentLoading } = useAllDepartments();

  if (modulesLoading || departmentLoading)
    return (
      <div className='fixed inset-0 flex items-center justify-center'>
        <Loader />
      </div>
    );

  //filtering

  const archiveFiltered = (allModules || []).filter((module) => {
    return activeTab === 'active' ? !module.is_archived : module.is_archived;
  });

  const filteredInterviewModules = isFilterApplied
    ? archiveFiltered.filter((interviewType) => {
        const isSearch =
          searchText.length !== 0
            ? interviewType?.name
                ?.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            : true;

        const isDepartment = selectedDepartments?.length
          ? selectedDepartments.includes(
              interviewType?.department_id?.toString() ?? '',
            )
          : true;

        return isSearch && isDepartment;
      })
    : archiveFiltered;

  return (
    <>
      <Table>
        <TableHeader className='bg-gray-100'>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Monthly Schedules</TableHead>
            <TableHead>Avg. Duration</TableHead>
            <TableHead>Open Positions</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInterviewModules?.length > 0 ? (
            filteredInterviewModules.map((type, i) => (
              <InterviewPoolList interviewType={type} key={i} />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {filteredInterviewModules?.length === 0 ? (
        <div className='flex w-full items-center justify-center'>
          <GlobalEmpty
            icon={<LibraryBig strokeWidth={1} className='h-10 w-10' />}
            header={'No Interview pools found'}
            description='Create a new interview pool to get started.'
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
