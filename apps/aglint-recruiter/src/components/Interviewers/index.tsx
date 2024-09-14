import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import { Card, CardContent } from '@components/ui/card';
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
  X,
} from 'lucide-react';
import { type Dispatch, type SetStateAction, useState } from 'react';

import { useAllDepartments } from '@/queries/departments';
import { useAllOfficeLocations } from '@/queries/officeLocations';

import FilterHeader from '../Common/FilterHeader';
import Loader from '../Common/Loader';
import { UIButton } from '../Common/UIButton';
import UITextField from '../Common/UITextField';
import UITypography from '../Common/UITypography';
import { useAllInterviewModules } from '../Scheduling/InterviewTypes/_common/hooks/useAllInterviewModules';
import { useAllInterviewers } from './_hook';

function Interviewers() {
  const { data: interviewers, isLoading } = useAllInterviewers();

  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const [selectedLocations, setLocations] = useState<string[]>([]);
  const [selectedInterviewTypes, setInterviewTypes] = useState<string[]>([]);

  if (isLoading)
    return (
      <div className='flex items-center justify-center w-full h-full'>
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
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
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
              <div className='w-full flex items-center justify-center h-[200px]'>
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
  isFilterApplied: boolean;
  searchText: string;
  selectedDepartments: string[];
  selectedLocations: string[];
  selectedInterviewTypes: string[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setDepartments: Dispatch<SetStateAction<string[]>>;
  setLocations: Dispatch<SetStateAction<string[]>>;
  setInterviewTypes: Dispatch<SetStateAction<string[]>>;
};

const Header = ({
  isFilterApplied,
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

  // options for filter ------------------------
  const locationList = locations?.length
    ? locations.map((loc) => ({
        label: [loc.city, loc.region, loc.country]
          .filter((loc) => loc)
          .join(', '),
        id: loc.id.toString(),
      }))
    : [];

  const departmentList = departments?.length
    ? departments.map((dep) => ({ label: dep.name, id: dep.id.toString() }))
    : [];

  const InterviewTypeOptions = InterivewTypes?.length
    ? InterivewTypes.map((type) => ({
        label: type.name,
        id: type.id.toString(),
      }))
    : [];

  const resetAllFilter = () => {
    setDepartments([]);
    setLocations([]);
    setSearchText('');
    setInterviewTypes([]);
  };

  return (
    <>
      <h1 className='text-3xl font-bold text-gray-900 mb-8'>Interviewers</h1>
      <div className='mb-6 flex justify-between items-center'>
        <UITextField
          placeholder='Search interviewers...'
          fieldSize='medium'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className='w-[250px]'
        />
        <div className='flex items-center gap-2'>
          {isFilterApplied ? (
            <UIButton variant='secondary' size='sm' onClick={resetAllFilter}>
              <X className='h-3 w-3 mr-1' />
              Clear
            </UIButton>
          ) : (
            <></>
          )}
          <FilterHeader
            filters={[
              {
                type: 'filter',
                name: 'Department',
                value: selectedDepartments,
                options: departmentList,
                multiSelect: true,
                setValue: (value) => {
                  setDepartments(value);
                },
              },
              {
                type: 'filter',
                name: 'Location',
                value: selectedLocations,
                options: locationList,
                multiSelect: true,
                setValue: (value) => {
                  setLocations(value);
                },
              },
              {
                type: 'filter',
                name: 'Interview Type',
                value: selectedInterviewTypes,
                options: InterviewTypeOptions,
                multiSelect: true,
                setValue: (value) => {
                  setInterviewTypes(value);
                },
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
