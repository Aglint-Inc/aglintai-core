import { type DB } from '@aglint/shared-types';
import { MapPin, PhoneOutgoing, Video } from 'lucide-react';

function IconScheduleType({
  type,
  size = 16,
}: {
  type: DB['public']['Enums']['interview_schedule_type'];
  size?: number;
}) {
  return (
    <>
      {type === 'in_person_meeting' ? (
        <MapPin size={size} className='text-neutral-600' />
      ) : type === 'phone_call' ? (
        <PhoneOutgoing size={size} className='text-neutral-600' />
      ) : type === 'google_meet' || type === 'zoom' ? (
        <Video size={size} className='text-neutral-600' />
      ) : null}
    </>
  );
}

export default IconScheduleType;
