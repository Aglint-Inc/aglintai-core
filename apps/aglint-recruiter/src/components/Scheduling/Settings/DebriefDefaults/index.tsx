/* eslint-disable security/detect-object-injection */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { Attendee } from '@/devlink2/Attendee';
import { DebriefDefaults as DebriefDefaultsDev } from '@/devlink3/DebriefDefaults';
import { AntSwitch } from '@/src/components/NewAssessment/AssessmentPage/editor';
import { capitalizeAll } from '@/src/utils/text/textUtils';

type MembersMeta = DatabaseTable['interview_session']['members_meta'];

type DebriefDefaultsProps = {
  value: MembersMeta;
  setValue: Dispatch<SetStateAction<MembersMeta>>;
};

const DebriefDefaults = ({ value, setValue }: DebriefDefaultsProps) => {
  return (
    <DebriefDefaultsDev
      slotSidedrawerBodyDebrief={<Toggles setValue={setValue} value={value} />}
    />
  );
};

const Toggles = ({ value, setValue }: DebriefDefaultsProps) => {
  const toggles = Object.entries(value).map(([key, value]) => (
    <Attendee
      key={key}
      textRole={capitalizeAll(key)}
      slotToggle={
        <AntSwitch
          checked={value}
          onClick={() =>
            setValue((prev) => ({
              ...prev,
              [key]: !prev[key],
            }))
          }
        />
      }
      slotSelectedMemberPill={<></>}
    />
  ));
  return <Stack gap={2}>{toggles}</Stack>;
};
export default DebriefDefaults;
