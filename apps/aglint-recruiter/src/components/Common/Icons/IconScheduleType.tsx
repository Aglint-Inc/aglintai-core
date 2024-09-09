import { type DB } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { MapPin, PhoneOutgoing, Video } from 'lucide-react';

import { ShowCode } from '../ShowCode';

function IconScheduleType({
  type,
  size = 16,
}: {
  type: DB['public']['Enums']['interview_schedule_type'];
  size?: number;
}) {
  return (
    <Stack height={'100%'} justifyContent={'center'} alignItems={'center'}>
      <ShowCode>
        <ShowCode.When isTrue={type === 'in_person_meeting'}>
          <MapPin size={size} />
        </ShowCode.When>
        <ShowCode.When isTrue={type == 'phone_call'}>
          <PhoneOutgoing size={size} />
        </ShowCode.When>
        <ShowCode.When isTrue={type == 'google_meet' || type === 'zoom'}>
          <Video size={size} />
        </ShowCode.When>
      </ShowCode>
    </Stack>
  );
}

export default IconScheduleType;
