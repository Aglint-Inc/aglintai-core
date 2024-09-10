/* eslint-disable security/detect-object-injection */
import { type schedulingSettingType } from '@aglint/shared-types';
import { Switch } from '@components/ui/switch';
import { Attendee } from '@devlink2/Attendee';
import React, { type Dispatch, type SetStateAction } from 'react';

import { capitalizeAll } from '@/utils/text/textUtils';

type MembersMeta = schedulingSettingType['debrief_defaults'];

type DebriefDefaultsProps = {
  value: MembersMeta;
  setValue: Dispatch<SetStateAction<MembersMeta>>;
};

const DebriefDefaults = ({ value, setValue }: DebriefDefaultsProps) => {
  return <Toggles setValue={setValue} value={value} />;
};

const Toggles = ({ value, setValue }: DebriefDefaultsProps) => {
  const {
    hiring_manager,
    previous_interviewers,
    recruiter,
    recruiting_coordinator,
    sourcer,
  } = Object.entries(value).reduce(
    (acc, [key, value]) => {
      acc[key] = (
        <Attendee
          key={key}
          textRole={capitalizeAll(key)}
          slotToggle={
            <Switch
              checked={value}
              onCheckedChange={() =>
                setValue((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
          }
          slotSelectedMemberPill={<></>}
        />
      );
      return acc;
    },
    // eslint-disable-next-line no-unused-vars
    {} as { [_id in keyof DebriefDefaultsProps['value']]: React.JSX.Element },
  );
  return (
    <div className='flex flex-col gap-2'>
      {hiring_manager}
      {recruiter}
      {recruiting_coordinator}
      {sourcer}
      {previous_interviewers}
    </div>
  );
};
export default DebriefDefaults;
