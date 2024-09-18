import { Card } from '@components/ui/card';
import { Coffee } from 'lucide-react';
import React from 'react';

import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITypography from '@/components/Common/UITypography';
import { type StageWithSessions } from '@/queries/application';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { breakDurations } from '@/utils/scheduling/const';

function BreakCard({
  session,
  onChange,
}: {
  session: StageWithSessions[0]['sessions'][0];
  onChange: (_session_id: string, _value: string) => void;
}) {
  return (
    <Card className='p-2'>
      <div className='bg- flex flex-row items-center gap-8 rounded-md p-2'>
        <div className='flex flex-row items-center gap-2'>
          <Coffee size={16} />
          <UITypography type='small' fontBold='normal'>
            Break
          </UITypography>
        </div>
        <UISelectDropDown
          className='w-[150px]'
          fullWidth
          fieldSize='medium'
          menuOptions={breakDurations.map((ele) => ({
            name: getBreakLabel(ele),
            value: ele.toString(),
          }))}
          value={session.interview_session.break_duration.toString()}
          onValueChange={(value) => {
            onChange(session.interview_session.id, value);
          }}
        />
      </div>
    </Card>
  );
}

export default BreakCard;
