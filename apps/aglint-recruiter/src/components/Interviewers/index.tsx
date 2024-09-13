import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
import { Input } from '@components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  BookOpen,
  Briefcase,
  Clock,
  Clock8,
  GraduationCap,
  Layers,
  MapPin,
} from 'lucide-react';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import UITypography from '../Common/UITypography';
import { useAllInterviewModules } from '../Scheduling/InterviewTypes/queries/hooks';
import { useAllInterviewers } from './hook';

function Interviewers() {
  const { data: interviewers, isLoading } = useAllInterviewers();

  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<number[]>([]);
  const [selectedLocations, setLocations] = useState<number[]>([]);
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);

  if (isLoading) return <>Loading</>;

  //isFilterApplied
  //   const isFilterApplied =
  //     !!selectedDepartments.length ||
  //     !!searchText.length ||
  //     !!selectedLocations.length ||
  //     !!selectedInterviewTypes.length;

  const filteredInterviewers = interviewers.filter((interviewer) => {
    if (searchText.length !== 0) {
      return interviewer.name
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase());
    } else return true;
  });

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Header
          searchText={searchText}
          selectedDepartments={selectedDepartments}
          selectedLocations={selectedLocations}
          setSearchText={setSearchText}
          selectedInterviewTypes={selectedInterviewTypes}
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
                {filteredInterviewers.map((interviewer, i) => (
                  <InterviewerList key={i} interviewer={interviewer} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Interviewers;

const InterviewerList = ({
  interviewer,
}: {
  interviewer: ReturnType<typeof useAllInterviewers>['data'][number];
}) => {
  const location = [
    interviewer.location?.city,
    interviewer.location?.region,
    interviewer.location?.country,
  ]
    .filter((loc) => loc)
    .join(', ');

  const isQualifed = interviewer.qualified_types?.length !== 0;
  const qualified_first = interviewer.qualified_types?.slice(0, 2);
  const qualified_second = interviewer.qualified_types?.slice(2);
  return (
    <TableRow
      onClick={() =>
        window.open(`/user/profile/${interviewer.user_id}`, '_target')
      }
      className='cursor-pointer'
    >
      <TableCell>
        <div className='flex items-center space-x-3'>
          <Avatar>
            <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
            <AvatarFallback>
              {interviewer.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium'>{interviewer.name}</div>
            <div className='text-sm text-gray-500'>
              {interviewer.role || '-'}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex flex-col w-[300px] gap-1'>
          <div className='flex items-center m-0 gap-2'>
            <BookOpen className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.department?.name || '-'}
            </UITypography>
          </div>
          <div className='flex items-center m-0 gap-2'>
            <MapPin className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {location || '-'}
            </UITypography>
          </div>
          <div className='flex items-center m-0 gap-2'>
            <Clock8 className='h-4 w-4 text-gray-400' />
            <UITypography variant='p' type='small'>
              {interviewer.time_zone?.toString() || '-'}
            </UITypography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className='flex gap-2 flex-wrap'>
          {isQualifed ? (
            <>
              {qualified_first.map((qua) => (
                <Badge
                  key={qua.id}
                  variant='outline'
                  className='bg-indigo-50 text-indigo-800 border-indigo-200'
                >
                  <Layers className='h-3 w-3 mr-1' />
                  {qua.name}
                </Badge>
              ))}
              {qualified_second?.length ? (
                <Badge
                  variant='outline'
                  className='bg-indigo-50 text-indigo-800 border-indigo-200'
                >
                  +{qualified_second.length}
                </Badge>
              ) : (
                ''
              )}
            </>
          ) : (
            '-'
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant='secondary' className='bg-blue-100 text-blue-800'>
          <Clock className='h-3 w-3 mr-1' />
          {interviewer.completed_count}
        </Badge>
      </TableCell>
      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-green-100 text-green-800'>
            <Briefcase className='h-3 w-3 mr-1' />
            {interviewer.completed_count}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <div className='flex items-center space-x-2'>
          <Badge variant='secondary' className='bg-purple-100 text-purple-800'>
            <GraduationCap className='h-3 w-3 mr-1' />
            {interviewer.training_types?.length}
          </Badge>
        </div>
      </TableCell>
    </TableRow>
  );
};

type HeaderProps = {
  searchText: string;
  selectedDepartments: number[];
  selectedLocations: number[];
  selectedInterviewTypes: string[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setDepartments: Dispatch<SetStateAction<number[]>>;
  setLocations: Dispatch<SetStateAction<number[]>>;
  setInterviewTypes: Dispatch<SetStateAction<string[]>>;
};

const Header = ({
  searchText,
  selectedDepartments,
  selectedLocations,
  selectedInterviewTypes,
  setSearchText,
  setDepartments,
  setLocations,
  setInterviewTypes,
}: HeaderProps) => {
  const { data: departments } = useAllDepartments();
  const { data: locations } = useAllOfficeLocations();
  const { data: InterivewTypes } = useAllInterviewModules();

  //Location filter List
  const locationList = locations?.length
    ? locations.map((loc) => ({
        name: loc.city + ', ' + loc.region + ', ' + loc.country,
        value: loc.id,
      }))
    : [];

  //Department filter list
  const departmentList = departments?.length
    ? departments.map((dep) => ({ name: dep.name, value: dep.id }))
    : [];

  // Interview Type filter list
  const InterviewTypeOptions = InterivewTypes?.length
    ? InterivewTypes.map((type) => ({
        name: type.name,
        value: type.id,
      }))
    : [];

  //isFilterApplied
  const isFilterApplied =
    !!selectedDepartments.length ||
    !!searchText.length ||
    !!selectedLocations.length ||
    !!selectedInterviewTypes.length;

  useEffect(() => {
    setDepartments([]);
    setLocations([]);
    setInterviewTypes([]);
  });

  console.log(isFilterApplied);

  return (
    <>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>
        Interviewer Management
      </h1>
      <div className='mb-6 flex justify-between items-center'>
        <div className='flex space-x-4 flex-1'>
          <Input
            placeholder='Search interviewers...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='max-w-xs'
          />
          {/* ----- department */}
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Department' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Departments</SelectItem>
              {departmentList.map((dep) => (
                <SelectItem key={dep.value} value={dep.value.toString()}>
                  {dep.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* ----- locationList */}
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Location' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Location</SelectItem>
              {locationList.map((loc) => (
                <SelectItem key={loc.value} value={loc.value.toString()}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* ----- InterviewTypeOptions */}
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Interview Types' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='All'>All Interview Types</SelectItem>
              {InterviewTypeOptions.map((type) => (
                <SelectItem key={type.value} value={type.value.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
