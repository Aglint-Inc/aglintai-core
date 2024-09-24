import { Card, CardContent } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Users } from 'lucide-react';
import { useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import { useAllInterviewers } from '../hooks/useAllInterviewers';
import { Header } from './Header';
import { InterviewerList } from './InterviewerList';

function Interviewers() {
  const { data: interviewers, isLoading } = useAllInterviewers();

  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [selectedLocations, setLocations] = useState<string[]>([]);
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);

  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );

  const isFilterApplied =
    !!selectedDepartments?.length ||
    !!selectedInterviewTypes?.length ||
    !!selectedLocations?.length ||
    !!searchText?.length;

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
    <div className='container-lg mx-auto w-full px-12'>
      <div className=''>
        <Header
          isFilterApplied={isFilterApplied}
          searchText={searchText}
          selectedDepartments={selectedDepartments}
          selectedLocations={selectedLocations}
          selectedInterviewTypes={selectedInterviewTypes}
          setSearchText={setSearchText}
          setDepartments={setDepartments}
          setLocations={setLocations}
          setInterviewTypes={setInterviewTypes}
        />

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
               <GlobalEmpty iconSlot={<Users strokeWidth={1} className="w-10 h-10" />} text={'No Interviewers found'} height='400px'/>
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
