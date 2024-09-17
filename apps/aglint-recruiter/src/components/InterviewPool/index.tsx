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

import { Header } from './components/Header';
import { InterviewPoolList } from './components/InterviewPoolList';
import { useAllInterviewModules } from './hook';

export default function InterviewTypesPage() {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');

  const { data: allModules, isLoading: modulesLoading } =
    useAllInterviewModules();
  const { isLoading: departmentLoading } = useAllDepartments();

  if (modulesLoading || departmentLoading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
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
    <div className='min-h-screen py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-8'>
          Interview Pool
        </h1>
        <Card className='w-full'>
          <CardContent className='p-6'>
            <Header
              searchText={searchText}
              setSearchText={setSearchText}
              isFilterApplied={isFilterApplied}
              selectedDepartments={selectedDepartments}
              setDepartments={setDepartments}
            />

            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className='mb-6'
            >
              <TabsList className='bg-gray-100 p-1 rounded-lg'>
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
              <div className='w-full flex items-center justify-center h-[200px]'>
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

// const interviewTypes = [
//   {
//     id: 1,
//     name: 'Final Interview with Hiring Manager',
//     department: 'Product development',
//     monthlySchedules: { completed: 15, scheduled: 8, cancelled: 2 },
//     avgDuration: 60,
//     candidatesPerWeek: 3,
//     upcomingSlots: 5,
//     passRate: 70,
//     openPositions: 3,
//   },
//   {
//     id: 2,
//     name: 'Frontend Technical Interview',
//     department: 'Product development',
//     monthlySchedules: { completed: 22, scheduled: 10, cancelled: 3 },
//     avgDuration: 90,
//     candidatesPerWeek: 5,
//     upcomingSlots: 8,
//     passRate: 60,
//     openPositions: 2,
//   },
//   {
//     id: 3,
//     name: 'DevOps Practical Assessment',
//     department: 'Product development',
//     monthlySchedules: { completed: 18, scheduled: 7, cancelled: 1 },
//     avgDuration: 120,
//     candidatesPerWeek: 4,
//     upcomingSlots: 6,
//     passRate: 55,
//     openPositions: 4,
//   },
//   {
//     id: 4,
//     name: 'System Design and Architecture',
//     department: 'Product development',
//     monthlySchedules: { completed: 12, scheduled: 5, cancelled: 0 },
//     avgDuration: 90,
//     candidatesPerWeek: 3,
//     upcomingSlots: 4,
//     passRate: 65,
//     openPositions: 2,
//   },
//   {
//     id: 5,
//     name: 'Technical Assessment',
//     department: 'Finance and Accounting',
//     monthlySchedules: { completed: 20, scheduled: 9, cancelled: 2 },
//     avgDuration: 60,
//     candidatesPerWeek: 6,
//     upcomingSlots: 10,
//     passRate: 75,
//     openPositions: 1,
//   },
// ];
