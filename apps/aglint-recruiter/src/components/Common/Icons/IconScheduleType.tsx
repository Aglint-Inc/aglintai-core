import { type DB } from '@aglint/shared-types';
import { MapPin, PhoneOutgoing, Video } from 'lucide-react';

function IconScheduleType({
  type,
  size = 16,
}: {
  type: DB['public']['Enums']['interview_schedule_type'] | null;
  size?: number;
}) {
  return (
    <>
      {type === 'in_person_meeting' ? (
        <MapPin size={size} className='text-muted-foreground' />
      ) : type === 'phone_call' ? (
        <PhoneOutgoing size={size} className='text-muted-foreground' />
      ) : type === 'google_meet' || type === 'zoom' ? (
        <Video size={size} className='text-muted-foreground' />
      ) : null}
    </>
  );
}

export default IconScheduleType;
