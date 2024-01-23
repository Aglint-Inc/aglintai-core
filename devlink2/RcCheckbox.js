import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './RcCheckbox.module.css';

export function RcCheckbox({
  as: _Component = _Builtin.Block,
  isChecked = false,
  text = 'This is some text inside of a div block.',
  onclickCheck = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, 'sl-checkbox-block')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'sl-checkbox')}
        tag='div'
        {...onclickCheck}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sl-checkbox-inner')}
          tag='div'
        />
        {isChecked ? (
          <_Builtin.Image
            className={_utils.cx(_styles, 'sl-checkbox-inner', 'inner')}
            loading='lazy'
            width='auto'
            height='auto'
            alt=''
            src='https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png'
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block tag='div'>{text}</_Builtin.Block>
    </_Component>
  );
}
