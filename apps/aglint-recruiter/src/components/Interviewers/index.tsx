import { Card, CardContent } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { useState } from 'react';

import Loader from '../Common/Loader';
import { useAllInterviewers } from './_hook';
import { Header } from './components/Header';
import { InterviewerList } from './components/InterviewerList';

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
    <div className='min-h-screen py-8'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
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
          <CardContent className='p-6'>
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
              <div className='flex h-[200px] w-full items-center justify-center'>
                No Interviewers found
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
