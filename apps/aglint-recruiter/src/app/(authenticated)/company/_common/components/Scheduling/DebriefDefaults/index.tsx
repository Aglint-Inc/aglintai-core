/* eslint-disable security/detect-object-injection */
import { type SchedulingSettingType } from '@aglint/shared-types';
import React, { type Dispatch, type SetStateAction } from 'react';

import { UISwitch } from '@/components/Common/UISwitch';
import UITypography from '@/components/Common/UITypography';
import { capitalizeAll } from '@/utils/text/textUtils';

type MembersMeta = SchedulingSettingType['debrief_defaults'];

type DebriefDefaultsProps = {
  value: MembersMeta;
  setValue: Dispatch<SetStateAction<MembersMeta>>;
};

const DebriefDefaults = ({ value, setValue }: DebriefDefaultsProps) => {
  return (
    <>
      <Toggles setValue={setValue} value={value} />
    </>
  );
};

const Toggles = ({ value, setValue }: DebriefDefaultsProps) => {
  const {
    hiring_manager,
    previous_interviewers,
    recruiter,
    recruiting_coordinator,
    sourcer,
  } = Object.entries(value).reduce(
    (acc, [tempKey, value]) => {
      const key = tempKey as keyof MembersMeta;
      acc[key] = (
        <>
          <div className='flex items-center gap-3'>
            <UISwitch
              size='sm'
              checked={value}
              onCheckedChange={() =>
                setValue((prev) => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
            <UITypography className='text-sm'>
              {capitalizeAll(key)}
            </UITypography>
          </div>
        </>
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
