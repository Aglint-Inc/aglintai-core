'use client';
import { Card, CardContent } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';

import { Loader } from '@/components/Common/Loader';
import { useAllDepartments } from '@/queries/departments';

import { useAllInterviewModules } from '../hooks';
import { Header } from './Header';
import { InterviewPoolList } from './InterviewPoolList';

export default function InterviewTypesPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const { data: allModules, isLoading: modulesLoading } =
    useAllInterviewModules();
  const { isLoading: departmentLoading } = useAllDepartments();

  if (modulesLoading || departmentLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );

  const handleTabChange = (value: string) => {
    if (value === 'active' || value === 'archived') {
      setActiveTab(value);
    }
  };

  //filtering

  const archiveFiltered = allModules.filter((module) => {
    return activeTab === 'active' ? !module.is_archived : module.is_archived;
  });

  const isFilterApplied = !!selectedDepartments?.length || !!searchText?.length;

  const filteredInterviewModules = isFilterApplied
    ? archiveFiltered.filter((interviewType) => {
        const isSearch =
          searchText.length !== 0
            ? interviewType?.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            : true;

        const isDepartment = selectedDepartments?.length
          ? selectedDepartments.includes(
              interviewType.department_id?.toString(),
            )
          : true;

        return isSearch && isDepartment;
      })
    : archiveFiltered;

  return (
    <div className='container mx-auto w-full'>
      <div className=''>
        <h1 className='mb-8 text-3xl font-bold text-gray-900'>
          Interview Pool
        </h1>
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          isFilterApplied={isFilterApplied}
          selectedDepartments={selectedDepartments}
          setDepartments={setDepartments}
        />
        <Card className='w-full'>
          <CardContent className='p-6'>
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className='mb-6'
            >
              <TabsList className='rounded-lg bg-gray-100 p-1'>
                <TabsTrigger
                  value='active'
                  className='data-[state=active]:bg-white data-[state=active]:shadow'
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value='archived'
                  className='data-[state=active]:bg-white data-[state=active]:shadow'
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Monthly Schedules</TableHead>
                  <TableHead>Avg. Duration</TableHead>
                  <TableHead>Candidates/Week</TableHead>
                  <TableHead>Upcoming Slots</TableHead>
                  <TableHead>Pass Rate</TableHead>
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
              <div className='flex h-[200px] w-full items-center justify-center'>
                No Interview pools found
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
