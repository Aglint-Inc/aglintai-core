import { Badge } from '@components/ui/badge';
import { TableCell, TableRow } from '@components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Users,
  XCircle,
} from 'lucide-react';

import { UIButton } from '@/components/Common/UIButton';

export const InterviewPoolList = ({ type }) => {
  const handleInterviewTypeClick = (id: number) => {
    console.log(id);
  };
  return (
    <TableRow
      key={type.id}
      className='cursor-pointer hover:bg-gray-50'
      onClick={() => handleInterviewTypeClick(type.id)}
    >
      <TableCell className='font-medium'>{type.name}</TableCell>
      <TableCell>{type.department}</TableCell>
      <TableCell>
        <div className='flex space-x-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant='secondary'
                  className='bg-green-100 text-green-800'
                >
                  <CheckCircle className='h-3 w-3 mr-1' />
                  {type.monthlySchedules.completed}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Completed Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant='secondary'
                  className='bg-blue-100 text-blue-800'
                >
                  <Calendar className='h-3 w-3 mr-1' />
                  {type.monthlySchedules.scheduled}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Scheduled Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant='secondary' className='bg-red-100 text-red-800'>
                  <XCircle className='h-3 w-3 mr-1' />
                  {type.monthlySchedules.cancelled}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancelled Interviews (This Month)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant='outline'
                className='bg-purple-50 text-purple-800 border-purple-200'
              >
                <Clock className='h-3 w-3 mr-1' />
                {type.avgDuration} min
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average Interview Duration</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant='outline'
                className='bg-orange-50 text-orange-800 border-orange-200'
              >
                <Users className='h-3 w-3 mr-1' />
                {type.candidatesPerWeek}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Average Candidates per Week</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant='outline'
                className='bg-teal-50 text-teal-800 border-teal-200'
              >
                <Calendar className='h-3 w-3 mr-1' />
                {type.upcomingSlots}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of Upcoming Available Slots</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant='outline'
                className='bg-yellow-50 text-yellow-800 border-yellow-200'
              >
                <Star className='h-3 w-3 mr-1' />
                {type.passRate}%
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Candidate Pass Rate</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant='outline'
                className='bg-indigo-50 text-indigo-800 border-indigo-200'
              >
                <Briefcase className='h-3 w-3 mr-1' />
                {type.openPositions}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of Open Positions</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell>
        <UIButton
          variant='ghost'
          size='sm'
          className='text-gray-600 hover:text-gray-900'
        >
          <ArrowRight className='h-4 w-4' />
        </UIButton>
      </TableCell>
    </TableRow>
  );
};
