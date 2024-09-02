import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import TrainingCompletionRates from './TrainingCompletionRates';

const initialData = [
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
  {
    name: 'Charlie Davis',
    status: 'Training',
    dateEntered: '2023-05-10',
    daysInTraining: 21,
    graduationDate: '-',
    averageTimeToGraduation: '-',
  },
];

export default function Component() {
  const [data, setData] = useState(initialData);
  // const [statusFilter, setStatusFilter] = useState('All');
  // const [searchTerm, setSearchTerm] = useState('');

  // const filteredData = data.filter(
  //   (row) =>
  //     (statusFilter === 'All' || row.status === statusFilter) &&
  //     (row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       row.status.toLowerCase().includes(searchTerm.toLowerCase())),
  // );

  //no use
  useEffect(() => {
    setData(initialData);
  }, []);
  const statusCounts = data.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  const completionRate = {
    Graduated: data.filter((d) => d.status === 'Graduated').length,
    'Non-Graduated': data.filter((d) => d.status !== 'Graduated').length,
  };

  const completionData = Object.entries(completionRate).map(
    ([status, count]) => ({ status, count }),
  );

  const averageTimeData = data
    .filter((d) => d.status === 'Graduated')
    .map((d) => ({
      date: d.graduationDate,
      averageTime: parseInt(d.averageTimeToGraduation),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className='container mx-auto p-4 space-y-4'>
      <Card className='border-none shadow-none'>
        <CardContent className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <Card className='border-none shadow-none'>
            <CardHeader>
              <CardTitle className='text-md font-semibold text-center'>
                Number of Interviewers by Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={200}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='status' />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='count' fill='hsl(var(--chart-1))' />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className='border-none shadow-none'>
            <CardHeader>
              <CardTitle className='text-md font-semibold text-center'>
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={200}>
                <PieChart>
                  <Pie
                    data={completionData}
                    dataKey='count'
                    nameKey='status'
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    fill='hsl(var(--chart-2))'
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className='border-none shadow-none'>
            <CardHeader>
              <CardTitle className='text-md font-semibold text-center'>
                Average Time to Graduation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={200}>
                <LineChart data={averageTimeData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='date' />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type='monotone'
                    dataKey='averageTime'
                    stroke='hsl(var(--chart-3))'
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </CardContent>
        <TrainingCompletionRates />
      </Card>
    </div>
  );
}
