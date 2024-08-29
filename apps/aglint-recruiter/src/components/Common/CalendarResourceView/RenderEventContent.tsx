import { CalendarEvent } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { Stack, Typography } from '@mui/material';

import InterviewerAcceptDeclineIcon from '../Icons/InterviewerAcceptDeclineIcon';
import MuiAvatar from '../MuiAvatar';
import { CustomTooltip } from '../Tooltip';
import { Event } from './types';

function RenderEventContent(eventInfo) {
  const { title, start, end } = eventInfo.event as {
    title: string;
    start: string;
    end: string;
  };

  const { color, attendees, conferenceData } = eventInfo.event
    .extendedProps as Event['extendedProps'];

  return (
    <CustomTooltip
      title={
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
              <Typography variant='caption'>{conferenceData.name}</Typography>
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
                  <Typography key={attendee.email}>{attendee.email}</Typography>
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
      }
    >
      <Stack
        sx={{
          padding: '4px 10px',
          width: '100%',
          borderRadius: '4px',
          bgcolor: color,
          color: 'white',
          height: '100%',
        }}
      >
        <Typography
          fontSize={'12px'}
          color={'white'}
          className='one-line-clamp'
        >
          {title}
        </Typography>
      </Stack>
    </CustomTooltip>
  );
}

export default RenderEventContent;
