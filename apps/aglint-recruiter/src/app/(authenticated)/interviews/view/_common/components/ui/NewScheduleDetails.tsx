'use client';
import { Clock, Hourglass } from 'lucide-react';

import UITypography from '@/components/Common/UITypography';

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
    <div className='flex w-full flex-col gap-6 rounded-lg border bg-white p-4'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-6'>
          {isDateCardVisible && (
            <div className='flex h-24 w-24 flex-col gap-1 items-center justify-center rounded-md bg-neutral-100'>
              <UITypography
                variant='p'
                type='small'
                className='text-xs text-neutral-600'
              >
                {textMonth}
              </UITypography>
              <UITypography
                variant='p'
                type='large'
                className='text-2xl font-medium text-neutral-800'
              >
                {textDate}
              </UITypography>
              <UITypography
                variant='p'
                type='extraSmall'
                className='text-xs text-neutral-600'
              >
                {textDay}
              </UITypography>
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <div className='hidden'>{slotPanelIcon}</div>
              <UITypography
                variant='h2'
                type='medium'
                className='text-xl font-medium'
              >
                {textPanelName}
              </UITypography>
              <div>{slotStatusBadge}</div>
            </div>
            <div className='flex items-center gap-4 text-sm text-neutral-600'>
              {isTimingVisible && (
                <div className='flex items-center gap-1'>
                  <div className='hidden'>{slotMeetingIcon}</div>
                  <Clock className='w-4 h-4'/>
                  <UITypography variant='p' type='small'>
                    {textTime}
                  </UITypography>
                </div>
              )}
              <UITypography variant='p' type='small' className='flex items-center gap-2 text-sm'>
                <Hourglass className='w-4 h-4'/>
                {textDuration}
              </UITypography>
            </div>
            <div className='flex items-center gap-2 text-sm' style={{marginTop:'-10px'}} >
              <UITypography
                variant='p'
                type='small'
                className='text-sm font-medium'
              >
                {textMeetingPlatform} :
              </UITypography>
              {isMeetingLinkVisible && (
                <div className='flex items-center gap-1'>
                  <UITypography
                    variant='p'
                    type='small'
                    className='text-primary hidden'
                  >
                    {textMeetingLink}
                  </UITypography>
                  <div> {slotJoinMeeting}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex h-full w-full items-stretch justify-start gap-12'>
        <div className='flex h-full w-2/3 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <UITypography
              variant='h3'
              type='medium'
              className='text-sm font-normal text-muted-foreground'
            >
              Candidate
            </UITypography>
            <div className='flex flex-col gap-2'>{slotCandidateList}</div>
            {isCandidateButtonVisible && <div>{slotCandidateButton}</div>}
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-1'>
              <UITypography
                variant='h3'
                type='medium'
                className='text-sm font-normal text-muted-foreground'
              >
                {textInterviewer}
              </UITypography>
              <UITypography
                variant='p'
                type='small'
                className='text-sm font-normal text-muted-foreground'
              >
                {textInterviewerCount}
              </UITypography>
            </div>
            <div className='flex flex-col gap-4'>{slotInterviewerList}</div>
            {isInterviewerButtonVisible && <div>{slotInterviewerButton}</div>}
          </div>
        </div>
        <div className='flex w-1/3 flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <UITypography
              variant='h3'
              type='medium'
              className='text-sm font-normal text-muted-foreground'
            >
              Interview Type
            </UITypography>
            <div>{slotInterviewTypeButton}</div>
          </div>
          <div className='flex flex-col gap-2'>
            <UITypography
              variant='h3'
              type='medium'
              className='text-sm font-normal text-muted-foreground'
            >
              Organizer & Hiring Team
            </UITypography>
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
