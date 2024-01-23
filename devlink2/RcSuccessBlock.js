import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './RcSuccessBlock.module.css';

export function RcSuccessBlock({
  as: _Component = _Builtin.Block,
  message = 'Team Invitations Sent Successfully!',
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'sl-success-wrapper')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-success-icon-block')}
        tag='div'
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, 'svg-icon')}
          value='%3Csvg%20width%3D%2268%22%20height%3D%2268%22%20viewbox%3D%220%200%2068%2068%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M33.9998%200.666992C15.6109%200.666992%200.666504%2015.6114%200.666504%2034.0003C0.666504%2052.3892%2015.6109%2067.3337%2033.9998%2067.3337C52.3887%2067.3337%2067.3332%2052.3892%2067.3332%2034.0003C67.3332%2015.6114%2052.3887%200.666992%2033.9998%200.666992ZM53.1103%2028.1108L33.6659%2047.5552C32.9992%2048.2219%2032.1103%2048.5552%2031.2214%2048.5552C30.3325%2048.5552%2029.4436%2048.2219%2028.777%2047.5552L17.6659%2036.4441C16.3325%2035.1108%2016.3325%2032.8886%2017.6659%2031.5552C18.9992%2030.2219%2021.2214%2030.2219%2022.5547%2031.5552L31.2214%2040.2219L48.2214%2023.2219C49.5547%2021.8886%2051.777%2021.8886%2053.1103%2023.2219C54.4992%2024.5552%2054.4992%2026.7775%2053.1103%2028.1108Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E'
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-success-main')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            'text-lg',
            'fw-semibold',
            'text-grey-600',
          )}
          tag='div'
        >
          {message}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, 'fw-semibold')} tag='div'>
          {'Kickstart your hiring journey by posting your first job now.'}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'margin-top-14')}
          tag='div'
        >
          {slotButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
