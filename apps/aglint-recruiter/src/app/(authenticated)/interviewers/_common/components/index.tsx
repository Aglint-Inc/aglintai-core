import { Card, CardContent } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Users } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import { useAllInterviewers } from '../hooks/useAllInterviewers';
import { InterviewerList } from './InterviewerList';

const InterviewerHeader = createContext(undefined);

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
export const InterviewerHeaderProvider = ({ children }) => {
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

function Interviewers() {
  const { data: interviewers, isLoading } = useAllInterviewers();
  const {
    isFilterApplied,
    searchText,
    selectedDepartments,
    selectedLocations,
    selectedInterviewTypes,
  } = useInterviewerHeaderContext();

  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );

  const filteredInterviewers = isFilterApplied
    ? interviewers.filter((interviewer) => {
        const userInterviewTypeIds = [
          ...interviewer.qualified_types,
          ...interviewer.training_types,
        ]?.map((interviewType) => interviewType.id);

        const isSearch =
          searchText.length !== 0
            ? interviewer.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            : true;

        const isInterviewType = selectedInterviewTypes?.length
          ? userInterviewTypeIds.some((item) =>
              selectedInterviewTypes.includes(item),
            )
          : true;

        const isDepartment = selectedDepartments?.length
          ? selectedDepartments.includes(interviewer.department?.id.toString())
          : true;

        const isLocation = selectedLocations.length
          ? selectedLocations.includes(interviewer.location?.id.toString())
          : true;

        return isSearch && isDepartment && isLocation && isInterviewType;
      })
    : interviewers;

  return (
    <div className='w-full p-4'>
      <div className=''>
        <Card>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Department & Location</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Interview Hours</TableHead>
                  <TableHead>Interviews</TableHead>
                  <TableHead>Training</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviewers?.length ? (
                  filteredInterviewers.map((interviewer, i) => (
                    <InterviewerList key={i} interviewer={interviewer} />
                  ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
            {filteredInterviewers?.length === 0 ? (
              <div className='flex w-full items-center justify-center'>
                <GlobalEmpty
                  icon={<Users strokeWidth={1} className='h-10 w-10' />}
                  header={'No Interviewers found'}
                  description='Create a new interview pool to get started.'
                />
              </div>
            ) : (
              <></>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Interviewers;
