import { dayjsLocal } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { type EventContentArg } from '@fullcalendar/core';

import InterviewerAcceptDeclineIcon from '../Icons/InterviewerAcceptDeclineIcon';
import { type EventCalendar } from './types';

function RenderEventContent(eventInfo: EventContentArg) {
  const { title, start, end } = eventInfo.event;

  const {
    color,
    attendees,
    conferenceData,
    isLoading,
    isSelected,
    session_id,
  } = eventInfo.event.extendedProps as EventCalendar['extendedProps'];

  return (
    <>
      {isLoading ? (
        <div className='skeleton-item h-full w-full'></div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              id={session_id}
              className={`h-full w-full rounded-md p-[4px_10px] ${
                isSelected
                  ? 'border border-dashed border-amber-400 bg-amber-100'
                  : ''
              }`}
              style={{
                backgroundColor: isSelected ? undefined : color,
                borderColor: isSelected ? undefined : color,
              }}
            >
              <p
                className={`truncate text-xs ${
                  isSelected ? 'text-amber-600' : 'text-white'
                }`}
              >
                {title}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {title && (
              <div className='space-y-1 p-1'>
                <p className='text-neutral-12 text-base font-semibold'>
                  {title}
                </p>
                <div className='flex flex-row space-x-1'>
                  <p className='text-xs'>
                    {start && end
                      ? `${dayjsLocal(new Date(start)).format('dddd MMMM, hh:mm A')} - ${dayjsLocal(new Date(end)).format('hh:mm A')}`
                      : ''}
                  </p>
                </div>

                {conferenceData && (
                  <div className='flex flex-row items-center space-x-1'>
                    {conferenceData.iconUri && (
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src={conferenceData.iconUri} alt='' />
                        <AvatarFallback>
                          {conferenceData.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <p className='text-xs'>{conferenceData.name}</p>
                  </div>
                )}

                {attendees && (
                  <div className='space-y-0.5'>
                    <p className='text-sm font-semibold'>
                      Attendees ({attendees.length})
                    </p>
                    {attendees.map((attendee) => (
                      <div
                        key={attendee.email}
                        className='flex flex-row items-center space-x-0.5'
                      >
                        <p>{attendee.email}</p>
                        <InterviewerAcceptDeclineIcon
                          type={
                            attendee.responseStatus === 'accepted'
                              ? 'accepted'
                              : attendee.responseStatus === 'declined'
                                ? 'declined'
                                : 'waiting'
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default RenderEventContent;
