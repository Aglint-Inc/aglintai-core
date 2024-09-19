import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
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
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-md font-semibold'>
            Candidate Dropout Funnel Report
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='mb-8'>
          <div className='flex h-64 items-end justify-between'>
            {stageCounts.map((stageData) => (
              <div
                key={stageData.stage}
                className='flex w-1/4 flex-col items-center'
              >
                <div
                  className='relative w-full rounded-t-lg bg-primary/20'
                  style={{ height: `${(stageData.count / maxCount) * 100}%` }}
                >
                  <div className='absolute bottom-2 left-0 right-0 text-center text-sm font-semibold'>
                    {stageData.count}
                  </div>
                </div>
                <div className='h-2 w-full bg-primary'></div>
                <div className='mt-2 text-center text-xs'>
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
