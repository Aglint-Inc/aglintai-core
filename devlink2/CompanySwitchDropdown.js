import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './CompanySwitchDropdown.module.css';

export function CompanySwitchDropdown({
  as: _Component = _Builtin.Block,
  slotCurrentCompany,
  onclickDropdown = {},
  isDropdownBodyVisible = true,
  slotCompanyList,
  onclickAddButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'comp-switch-dropdown')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'cs-dropdown-trigger')}
        tag='div'
        {...onclickDropdown}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cs-dropdown-trigger-image')}
          tag='div'
        >
          {slotCurrentCompany}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cs-trigger-bg')}
          tag='div'
        />
        <_Builtin.Block
          className={_utils.cx(_styles, 'cs-trigger-bg', 'bg-2')}
          tag='div'
        />
      </_Builtin.Block>
    </_Component>
  );
}
