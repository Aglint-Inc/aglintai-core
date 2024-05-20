/* eslint-disable security/detect-object-injection */
import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { SidedrawerBodyBreak } from '@/devlink2/SidedrawerBodyBreak';
import { UpdateInterviewSession } from '@/src/queries/interview-plans';
import { InterviewSessionType } from '@/src/queries/interview-plans/types';

import { DropDown } from './sessionForms';
import { getBreakLabel } from './utils';

type BreakFormProps = Pick<InterviewSessionType, 'break_duration'>;

type BreakFormFields = {
  [key in keyof BreakFormProps]: {
    value: BreakFormProps[key];
    error: boolean;
    helper: string;
  };
};

export const getBreakFields = (props: BreakFormProps): BreakFormFields => {
  return Object.entries(props).reduce((acc, [key, value]) => {
    acc[key] = {
      value,
      error: false,
      helper: `${getLabel(key as keyof BreakFormProps)} cannot be empty`,
    } as BreakFormFields['break_duration'];
    return acc;
  }, {} as BreakFormFields);
};

const getLabel = (key: keyof BreakFormProps) => {
  switch (key) {
    case 'break_duration':
      return 'Break duration';
  }
};
export const initialBreakFields: BreakFormProps = {
  break_duration: 30,
};

type HandleChange = <T extends keyof BreakFormProps>(
  // eslint-disable-next-line no-unused-vars
  key: T,
  // eslint-disable-next-line no-unused-vars
  value: BreakFormProps[T],
) => void;

const BreakForms = ({
  fields,
  setFields,
}: {
  fields: BreakFormFields;
  setFields: Dispatch<SetStateAction<BreakFormFields>>;
}) => {
  const { break_duration } = fields;

  const handleChange: HandleChange = useCallback((key, value) => {
    setFields((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        error: false,
        value,
      },
    }));
  }, []);

  // const handleBreakDuration: ChangeEventHandler<
  //   HTMLInputElement | HTMLTextAreaElement
  // > = useCallback((e) => {
  //   const entry = e.target.value as any;
  //   const safeEntry = +entry;
  //   if (entry === null || entry === '') handleChange('break_duration', null);
  //   else if (safeEntry < 0) handleChange('break_duration', 0);
  //   else handleChange('break_duration', safeEntry);
  // }, []);

  const sessionDurationField = useMemo(
    () => (
      <SessionDurationField
        value={break_duration.value}
        handleChange={handleChange}
      />
      // <UITextField
      //   name={'break_duration'}
      //   type='number'
      //   placeholder={'Break duration'}
      //   value={break_duration.value}
      //   error={break_duration.error}
      //   helperText={break_duration.helper}
      //   onChange={handleBreakDuration}
      // />
    ),
    [break_duration],
  );

  return <SidedrawerBodyBreak slotDurationDropdown={sessionDurationField} />;
};

export default BreakForms;

export const validateBreakSessionFields = (fields: BreakFormFields) => {
  const safeFields = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc.newFields[key] = structuredClone(value);
      const safeKey = key as keyof BreakFormFields;
      switch (safeKey) {
        case 'break_duration':
          {
            const safeValue = value as BreakFormFields['break_duration'];
            if ((safeValue?.value ?? 0) <= 0) {
              acc.error = true;
              acc.newFields[safeKey].error = true;
            }
          }
          break;
      }
      return acc;
    },
    {
      error: false,
      newFields: {} as BreakFormFields,
    },
  );
  return safeFields;
};

const SessionDurationField = ({
  value,
  handleChange,
}: {
  value: BreakFormProps['break_duration'];
  handleChange: HandleChange;
}) => {
  const options = [30, 45, 60, 120, 1440, 2880, 4320].reduce(
    (acc, curr) => {
      acc.push({ name: getBreakLabel(curr), value: curr });
      return acc;
    },
    [] as { name: string; value: number }[],
  );
  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    if ((e?.target?.value ?? null) && typeof e.target.value === 'number')
      handleChange('break_duration', e.target.value);
  }, []);

  return (
    <DropDown
      placeholder='Select break duration'
      showIcons={false}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};

export const getBreakSessionPayload = (
  fields: BreakFormFields,
  session_id: string,
): UpdateInterviewSession => {
  const { break_duration } = Object.entries(fields).reduce(
    (acc, [key, value]) => {
      acc[key] = value.value;
      return acc;
    },
    {} as { [key in keyof BreakFormFields]: BreakFormFields[key]['value'] },
  );
  return {
    session: { break_duration },
    session_id,
  };
};
