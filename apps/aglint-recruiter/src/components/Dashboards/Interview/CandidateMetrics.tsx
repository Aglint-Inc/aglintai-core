import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/shadcn/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/shadcn/ui/table';
import React, { useMemo } from 'react';

// Mock data
const candidateData = [
  { name: 'John Doe', stage: 'Initial Screening' },
  { name: 'Jane Smith', stage: 'Technical Interview' },
  { name: 'Alice Johnson', stage: 'HR Interview' },
  { name: 'Bob Williams', stage: 'Technical Interview' },
  { name: 'Eva Brown', stage: 'Offer Stage' },
  { name: 'Mike Davis', stage: 'Initial Screening' },
  { name: 'Sarah Wilson', stage: 'Technical Interview' },
  { name: 'Tom Anderson', stage: 'HR Interview' },
  { name: 'Emily Taylor', stage: 'Initial Screening' },
  { name: 'Chris Martin', stage: 'Offer Stage' },
];

const stages = [
  'Initial Screening',
  'Technical Interview',
  'HR Interview',
  'Offer Stage',
];

export default function CandidateDropoutFunnelReport() {
  const stageCounts = useMemo(() => {
    return stages.map((stage) => ({
      stage,
      count: candidateData.filter((candidate) => candidate.stage === stage)
        .length,
    }));
  }, []);

  const maxCount = Math.max(...stageCounts.map((s) => s.count));

  return (
    <Card className='w-full max-w-4xl mx-auto border-none'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle className='text-md font-semibold'>
            Candidate Dropout Funnel Report
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-8'>
          <div className='flex justify-between items-end h-64'>
            {stageCounts.map((stageData) => (
              <div
                key={stageData.stage}
                className='flex flex-col items-center w-1/4'
              >
                <div
                  className='w-full bg-primary/20 rounded-t-lg relative'
                  style={{ height: `${(stageData.count / maxCount) * 100}%` }}
                >
                  <div className='absolute bottom-2 left-0 right-0 text-center text-sm font-semibold'>
                    {stageData.count}
                  </div>
                </div>
                <div className='w-full h-2 bg-primary'></div>
                <div className='text-xs text-center mt-2'>
                  {stageData.stage}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name of Candidate</TableHead>
              <TableHead>Stage Dropped Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidateData.map((candidate, index) => (
              <TableRow key={index}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.stage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
