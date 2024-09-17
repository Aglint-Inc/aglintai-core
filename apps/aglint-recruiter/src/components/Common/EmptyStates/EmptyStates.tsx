import {
  Briefcase,
  Calendar,
  ClipboardList,
  Search,
  Users,
} from 'lucide-react';
import React from 'react';

type TabType =
  | 'job-Dashboard-NoInterview'
  | 'job-Dashboard-NoApplicants'
  | 'candidate-search-history'
  | 'job-jobList'
  | 'schedule-NoInterview'
  | 'schedule-NoActivity'
  | 'task-NoCandidate'
  | 'task-NoJob'
  | 'task-NoSession'
  | 'task-NoProgress';

function EmptyState({ type }: { type: TabType }) {
  if (type === 'candidate-search-history')
    return (
      <div className='flex h-full w-full flex-col items-center justify-center'>
        <Search className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No search history found.</p>
      </div>
    );

  if (
    type === 'job-Dashboard-NoApplicants' ||
    type === 'job-Dashboard-NoInterview'
  )
    return (
      <div className='flex w-full flex-col items-center justify-center'>
        <Users className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No {type} data found</p>
      </div>
    );

  if (type === 'job-jobList')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Briefcase className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No jobs found.</p>
      </div>
    );

  if (type === 'schedule-NoInterview')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Calendar className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No interview types found.</p>
      </div>
    );

  if (type === 'schedule-NoActivity')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <ClipboardList className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No activities found.</p>
      </div>
    );

  if (type === 'task-NoCandidate')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Users className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No candidates found.</p>
      </div>
    );

  if (type === 'task-NoJob')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Briefcase className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No jobs found.</p>
      </div>
    );

  if (type === 'task-NoSession')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Calendar className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No sessions found.</p>
      </div>
    );

  if (type === 'task-NoProgress')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <ClipboardList className='mb-2 h-16 w-16 text-gray-400' />
        <p className='text-sm text-gray-500'>No progress found.</p>
      </div>
    );
}

export default EmptyState;
