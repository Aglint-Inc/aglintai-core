import { Button } from '@components/shadcn/ui/button';
import { Calendar } from '@components/shadcn/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/shadcn/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/shadcn/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/shadcn/ui/table';
import { format } from 'date-fns';
import { ArrowUpDown, CalendarIcon, DownloadIcon } from 'lucide-react';
import React, { useState } from 'react';

const initialReportData = [
  {
    name: 'John Doe',
    status: 'Training',
    dateEntered: '2023-01-15',
    daysInTraining: 30,
    graduationDate: '2023-02-14',
    averageTimeToGraduation: 28,
  },
  {
    name: 'Jane Smith',
    status: 'Graduated',
    dateEntered: '2023-02-01',
    daysInTraining: 28,
    graduationDate: '2023-02-28',
    averageTimeToGraduation: 28,
  },
  {
    name: 'Bob Johnson',
    status: 'Paused',
    dateEntered: '2023-03-01',
    daysInTraining: 15,
    graduationDate: '-',
    averageTimeToGraduation: 0,
  },
  // Add more mock data as needed
];

export default function Component() {
  const [reportData, setReportData] = useState(initialReportData);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    return statusMatch && dateMatch;
  });

  const handleDownload = () => {
    // Implement CSV download logic here
  };

  return (
    <Card className='w-full max-w-4xl mx-auto border border-border'>
      <CardHeader>
        <CardTitle className='text-md font-semibold text-primary flex justify-between items-center'>
          Interviewers Training Report
          <Button onClick={handleDownload} variant='outline' size='sm'>
            <DownloadIcon className='mr-2 h-4 w-4' /> Download CSV
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center mb-4'>
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
          <div className='flex gap-2'>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-[180px] justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {startDate ? (
                    format(startDate, 'PPP')
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
                  className='w-[180px] justify-start text-left font-normal'
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {endDate ? format(endDate, 'PPP') : <span>End Date</span>}
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
        <div className='rounded-md border border-border'>
          <Table>
            <TableHeader>
              <TableRow className='border-b border-border'>
                <TableHead className='w-[150px]'>
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
                <TableHead className='text-right'>
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
                  <TableCell className='text-right'>
                    {row.averageTimeToGraduation} days
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
