import { dayjsLocal } from '@aglint/shared-utils';
import { Stack, Typography } from '@mui/material';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import InterviewerAcceptDeclineIcon from '../Icons/InterviewerAcceptDeclineIcon';
import MuiAvatar from '../MuiAvatar';
import { type Event } from './types';

function RenderEventContent(eventInfo) {
  const { title, start, end } = eventInfo.event as {
    title: string;
    start: string;
    end: string;
    id: string;
  };

  const {
    color,
    attendees,
    conferenceData,
    isLoading,
    isSelected,
    session_id,
  } = eventInfo.event.extendedProps as Event['extendedProps'];

  return (
    <>
      {isLoading ? (
        <Stack height={'100%'} width={'100%'} className='skeleton-item'></Stack>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Stack
                id={session_id}
                sx={{
                  padding: '4px 10px',
                  width: '100%',
                  borderRadius: '4px',
                  bgcolor: isSelected ? 'var(--accent-2)' : color,
                  color: 'white',
                  height: '100%',
                  border: isSelected ? '1px dashed' : '1px solid',
                  borderColor: isSelected ? 'var(--accent-6)' : color,
                }}
              >
                <Typography
                  fontSize={'12px'}
                  color={isSelected ? 'var(--accent-12)' : 'white'}
                  className='one-line-clamp'
                >
                  {title}
                </Typography>
              </Stack>
            </TooltipTrigger>
            <TooltipContent>
              {title && (
                <Stack spacing={1} p={1}>
                  <Typography
                    variant='body1'
                    fontWeight={600}
                    color={'var(--neutral-12)'}
                  >
                    {title}
                  </Typography>
                  <Stack direction={'row'} spacing={1}>
                    <Typography variant='caption'>
                      {dayjsLocal(new Date(start)).format('dddd MMMM')}
                      {' , '}
                      {dayjsLocal(new Date(start)).format('hh:mm A')} -{' '}
                      {dayjsLocal(new Date(end)).format('hh:mm A')}
                    </Typography>
                  </Stack>

                  {conferenceData && (
                    <Stack direction={'row'} spacing={1}>
                      {conferenceData.iconUri && (
                        <MuiAvatar
                          src={conferenceData.iconUri}
                          level=''
                          variant='square'
                          height='20px'
                          width='20px'
                        />
                      )}
                      <Typography variant='caption'>
                        {conferenceData.name}
                      </Typography>
                    </Stack>
                  )}

                  {attendees && (
                    <Stack spacing={0.5}>
                      <Typography variant='body2' fontWeight={600}>
                        Attendees ({attendees.length})
                      </Typography>
                      {attendees.map((attendee) => (
                        <Stack
                          direction={'row'}
                          spacing={0.5}
                          key={attendee.email}
                          alignItems={'center'}
                        >
                          <Typography key={attendee.email}>
                            {attendee.email}
                          </Typography>
                          <InterviewerAcceptDeclineIcon
                            type={
                              attendee.responseStatus === 'accepted'
                                ? 'accepted'
                                : attendee.responseStatus === 'declined'
                                  ? 'declined'
                                  : 'waiting'
                            }
                          />
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Stack>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
}

export default RenderEventContent;
