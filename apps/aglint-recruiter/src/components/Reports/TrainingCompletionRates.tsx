import { format } from 'date-fns';
import { ArrowUpDown, CalendarIcon, DownloadIcon, Search } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const initialReportData = [
  {
    name: 'John Doe',
    status: 'Training',
    dateEntered: '2023-05-01',
    daysInTraining: 30,
    graduationDate: '-',
    averageTimeToGraduation: '-',
  },
  {
    name: 'Jane Smith',
    status: 'Graduated',
    dateEntered: '2023-04-15',
    daysInTraining: 45,
    graduationDate: '2023-05-30',
    averageTimeToGraduation: '45 days',
  },
  {
    name: 'Bob Johnson',
    status: 'Paused',
    dateEntered: '2023-03-01',
    daysInTraining: 60,
    graduationDate: '-',
    averageTimeToGraduation: '-',
  },
  {
    name: 'Alice Brown',
    status: 'Graduated',
    dateEntered: '2023-02-15',
    daysInTraining: 75,
    graduationDate: '2023-05-01',
    averageTimeToGraduation: '75 days',
  },
];

export default function Component() {
  const [reportData, setReportData] = useState(initialReportData);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }

    const sortedData = [...reportData].sort((a, b) => {
      // eslint-disable-next-line security/detect-object-injection
      if (a[column] < b[column]) return sortDirection === 'asc' ? -1 : 1;
      // eslint-disable-next-line security/detect-object-injection
      if (a[column] > b[column]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setReportData(sortedData);
  };

  const filteredData = reportData.filter((row) => {
    const statusMatch = statusFilter === 'All' || row.status === statusFilter;
    const dateMatch =
      (!startDate || new Date(row.dateEntered) >= startDate) &&
      (!endDate || new Date(row.dateEntered) <= endDate);
    const searchMatch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && dateMatch && searchMatch;
  });

  const handleDownload = () => {
    // Implement CSV download logic here
  };

  return (
    <Card className='w-full mx-auto border-none shadow-none'>
      <CardHeader>
        <CardTitle className='text-md font-semibold text-primary flex justify-between items-center'>
          Completion rates for training programs
          <Button onClick={handleDownload} variant='outline' size='sm'>
            <DownloadIcon className='mr-2 h-4 w-4' /> Download CSV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
            <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2'>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='All'>All Statuses</SelectItem>
                  <SelectItem value='Training'>Training</SelectItem>
                  <SelectItem value='Graduated'>Graduated</SelectItem>
                  <SelectItem value='Paused'>Paused</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Filter by department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='All'>All Departments</SelectItem>
                  <SelectItem value='Remote'>Remote</SelectItem>
                  <SelectItem value='Office'>Office</SelectItem>
                  <SelectItem value='Hybrid'>Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Filter by department' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='All'>All Departments</SelectItem>
                  <SelectItem value='Engineering'>Engineering</SelectItem>
                  <SelectItem value='Sales'>Sales</SelectItem>
                  <SelectItem value='Marketing'>Marketing</SelectItem>
                  <SelectItem value='HR'>HR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center space-x-2'>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[130px] justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {startDate ? (
                      format(startDate, 'MM/dd/yy')
                    ) : (
                      <span>Start Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='w-[130px] justify-start text-left font-normal'
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {endDate ? (
                      format(endDate, 'MM/dd/yy')
                    ) : (
                      <span>End Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className='relative w-full sm:w-auto'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8 w-full sm:w-[250px]'
            />
          </div>
        </div>
        <div className='rounded-md border border-border'>
          <Table>
            <TableHeader>
              <TableRow className='border-b border-border'>
                <TableHead className='w-[200px]'>
                  <Button variant='ghost' onClick={() => handleSort('name')}>
                    Name <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant='ghost' onClick={() => handleSort('status')}>
                    Status <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('dateEntered')}
                  >
                    Date entered <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('daysInTraining')}
                  >
                    Days in training <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('graduationDate')}
                  >
                    Graduation date <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant='ghost'
                    onClick={() => handleSort('averageTimeToGraduation')}
                  >
                    Avg. time to graduation{' '}
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((row, index) => (
                <TableRow key={index} className='border-b border-border'>
                  <TableCell className='font-medium'>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.dateEntered}</TableCell>
                  <TableCell>{row.daysInTraining}</TableCell>
                  <TableCell>{row.graduationDate}</TableCell>
                  <TableCell>{row.averageTimeToGraduation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
