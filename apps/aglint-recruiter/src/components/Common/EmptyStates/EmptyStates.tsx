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
      <div className='flex flex-col items-center justify-center h-full w-full'>
        <Search className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No search history found.</p>
      </div>
    );

  if (
    type === 'job-Dashboard-NoApplicants' ||
    type === 'job-Dashboard-NoInterview'
  )
    return (
      <div className='flex flex-col items-center justify-center w-full'>
        <Users className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No {type} data found</p>
      </div>
    );

  if (type === 'job-jobList')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Briefcase className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No jobs found.</p>
      </div>
    );

  if (type === 'schedule-NoInterview')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Calendar className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No interview types found.</p>
      </div>
    );

  if (type === 'schedule-NoActivity')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <ClipboardList className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No activities found.</p>
      </div>
    );

  if (type === 'task-NoCandidate')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Users className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No candidates found.</p>
      </div>
    );

  if (type === 'task-NoJob')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Briefcase className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No jobs found.</p>
      </div>
    );

  if (type === 'task-NoSession')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <Calendar className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No sessions found.</p>
      </div>
    );

  if (type === 'task-NoProgress')
    return (
      <div className='flex flex-col items-center justify-center p-8 text-center'>
        <ClipboardList className='w-16 h-16 text-gray-400 mb-2' />
        <p className='text-sm text-gray-500'>No progress found.</p>
      </div>
    );
}

export default EmptyState;
