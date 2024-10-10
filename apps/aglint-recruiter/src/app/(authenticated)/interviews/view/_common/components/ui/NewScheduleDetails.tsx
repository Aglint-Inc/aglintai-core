'use client';
import Typography from '@components/typography';
import { Clock, Hourglass } from 'lucide-react';

type MeetingDetails = {
  slotCandidateList?: React.ReactNode;
  slotCandidateButton?: React.ReactNode;
  isCandidateButtonVisible?: boolean;
  slotInterviewerList: React.ReactNode;
  slotInterviewerButton?: React.ReactNode;
  isInterviewerButtonVisible?: boolean;
  slotOrganizerList: React.ReactNode;
  slotHiringTeamList: React.ReactNode;
  slotInterviewTypeButton: React.ReactNode;
  textMonth?: string;
  textDate?: string;
  textDay?: string;
  textPanelName?: string;
  slotStatusBadge: React.ReactNode;
  textTime?: string;
  textDuration?: string;
  textMeetingPlatform?: string;
  textMeetingLink?: string;
  slotPanelIcon: React.ReactNode;
  slotMeetingIcon: React.ReactNode;
  slotJoinMeeting: React.ReactNode;
  textInterviewerCount?: string;
  isMeetingLinkVisible?: boolean;
  isTimingVisible?: boolean;
  isDateCardVisible?: boolean;
  textInterviewer?: string;
};

export function NewScheduleDetail({
  slotCandidateList,
  slotCandidateButton,
  isCandidateButtonVisible = true,
  slotInterviewerList,
  slotInterviewerButton,
  isInterviewerButtonVisible = true,
  slotOrganizerList,
  slotHiringTeamList,
  slotInterviewTypeButton,
  textMonth = 'Feb',
  textDate = '24',
  textDay = 'Friday',
  textPanelName = 'This is a global text component',
  slotStatusBadge,
  textTime = 'This is a global text component',
  textDuration = 'This is a global text component',
  textMeetingPlatform = 'This is a global text component',
  textMeetingLink = 'this is link',
  slotPanelIcon,
  slotMeetingIcon,
  slotJoinMeeting,
  textInterviewerCount = '(4)',
  isMeetingLinkVisible = true,
  isTimingVisible = true,
  isDateCardVisible = true,
  textInterviewer = 'Interviewers',
}: MeetingDetails) {
  return (
    <div className='flex w-full flex-col gap-6 rounded-lg border-none bg-white'>
      <div className='flex items-start justify-between'>
        <div className='flex items-start gap-4'>
          {isDateCardVisible && (
            <div className='rounded-md bg-muted flex h-20 w-20 flex-col items-center justify-center'>
              <Typography
                variant='p'
                type='small'
                className='text-xs text-muted-foreground'
              >
                {textMonth}
              </Typography>
              <Typography
                variant='p'
                type='large'
                className='text-2xl font-medium'
              >
                {textDate}
              </Typography>
              <Typography
                variant='p'
                type='extraSmall'
                className='text-xs text-muted-foreground'
              >
                {textDay}
              </Typography>
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='hidden'>{slotPanelIcon}</div>
              <Typography
                variant='p'
                type='medium'
                className='text-md font-medium'
              >
                {textPanelName}
              </Typography>
              <div>{slotStatusBadge}</div>
            </div>
            <div className='flex items-center gap-3 text-sm text-muted-foreground'>
              {isTimingVisible && (
                <div className='flex items-center gap-1'>
                  <div className='hidden'>{slotMeetingIcon}</div>
                  <Clock className='h-4 w-4' />
                  <Typography variant='p' type='small'>
                    {textTime}
                  </Typography>
                </div>
              )}
              <Typography
                variant='p'
                type='small'
                className='flex flex-row items-center gap-1'
              >
                <Hourglass className='h-4 w-4' />
                {textDuration}
              </Typography>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <Typography
                variant='p'
                type='small'
                className='text-muted-foreground'
              >
                {textMeetingPlatform}:
              </Typography>
              {isMeetingLinkVisible && (
                <div className='flex items-center gap-1'>
                  <Typography
                    variant='p'
                    type='small'
                    className='hidden text-primary'
                  >
                    {textMeetingLink}
                  </Typography>
                  <div>{slotJoinMeeting}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-full w-full items-stretch justify-start gap-12'>
        <div className='flex h-full w-2/3 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <Typography
              variant='h3'
              type='medium'
              className='text-sm text-muted-foreground'
            >
              Candidate
            </Typography>
            <div className='flex flex-col gap-2'>{slotCandidateList}</div>
            {isCandidateButtonVisible && <div>{slotCandidateButton}</div>}
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-1'>
              <Typography
                variant='h3'
                type='medium'
                className='text-sm text-muted-foreground'
              >
                {textInterviewer}
              </Typography>
              <Typography
                variant='p'
                type='small'
                className='text-sm text-muted-foreground'
              >
                {textInterviewerCount}
              </Typography>
            </div>
            <div className='flex flex-col gap-4'>{slotInterviewerList}</div>
            {isInterviewerButtonVisible && <div>{slotInterviewerButton}</div>}
          </div>
        </div>
        <div className='flex w-1/3 flex-col gap-6'>
          <div className='flex flex-col gap-4'>
            <Typography
              variant='h3'
              type='medium'
              className='text-sm text-muted-foreground'
            >
              Interview Type
            </Typography>
            <div>{slotInterviewTypeButton}</div>
          </div>
          <div className='flex flex-col gap-4'>
            <Typography
              variant='h3'
              type='medium'
              className='text-sm text-muted-foreground'
            >
              Organizer & Hiring Team
            </Typography>
            <div className='flex flex-col gap-4'>
              {slotOrganizerList}
              {slotHiringTeamList}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
