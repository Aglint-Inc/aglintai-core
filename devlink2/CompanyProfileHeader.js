import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './CompanyProfileHeader.module.css';

export function CompanyProfileHeader({
  as: _Component = _Builtin.Block,
  slotLogo,
  companyName = 'Unknown Company',
  onclickCompany = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'cs-option', 'profile-info')}
      tag='div'
      {...onclickCompany}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, 'hide')}
        value='%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E'
      />
      <_Builtin.Block
        className={_utils.cx(_styles, 'cs-company-image')}
        tag='div'
      >
        {slotLogo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'fw-semibold', 'line-clamp-1')}
        tag='div'
      >
        {companyName}
      </_Builtin.Block>
    </_Component>
  );
}
