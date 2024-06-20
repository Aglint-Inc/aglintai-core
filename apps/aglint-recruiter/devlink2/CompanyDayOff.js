'use client';
import React from 'react';
import * as _Builtin from './_Builtin';
import { Text } from './Text';
import { SlotComp } from './SlotComp';
import { GlobalIcon } from './GlobalIcon';
import { DayoffList } from './DayoffList';
import * as _utils from './utils';
import _styles from './CompanyDayOff.module.css';

export function CompanyDayOff({
  as: _Component = _Builtin.Block,
  slotDayoffList,
  slotAddButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'cdo-wrap')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'setting_wrap', 'p-b-40')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cdo-top-wrap')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'setting_title')}
            tag='div'
          >
            <Text content='Standard Days Off' color='neutral-12' />
            <Text
              content='List company holidays to exclude them from scheduling.'
              weight=''
              color='neutral'
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'cdo-top-btn')}
            tag='div'
          >
            <_Builtin.Block tag='div'>
              {slotAddButton ?? (
                <ButtonSolid
                  size='2'
                  textButton='Add day off'
                  isLeftIcon={true}
                  isRightIcon={false}
                  iconName='add'
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cdo-table-wrap')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'cdo-table-header')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'dol-item-wrap')}
              tag='div'
            >
              <GlobalIcon iconName='weekend' size='5' weight='thin' />
              <_Builtin.Block tag='div'>{'Day Off'}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'dol-item-wrap')}
              tag='div'
            >
              <GlobalIcon iconName='calendar_today' size='5' weight='thin' />
              <_Builtin.Block tag='div'>{'Date'}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'dol-item-wrap')}
              tag='div'
            >
              <GlobalIcon iconName='pin_drop' size='5' weight='thin' />
              <_Builtin.Block tag='div'>{'Locations'}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'cdo-table-body-slot')}
            tag='div'
          >
            {slotDayoffList ?? <DayoffList />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
