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
import { LibraryBig } from 'lucide-react';
import { useState } from 'react';

import { useAllInterviewModules } from '@/authenticated/hooks';
import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';
import { useAllDepartments } from '@/queries/departments';

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
      <div className='fixed inset-0 flex items-center justify-center'>
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
    <div className='p-4'>
      <div>
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          isFilterApplied={isFilterApplied}
          selectedDepartments={selectedDepartments}
          setDepartments={setDepartments}
        />
        <div className='flex flex-row justify-between'>
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
        </div>
        <Card className='w-full'>
          <CardContent className='p-0'>
            <Table>
              <TableHeader>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
