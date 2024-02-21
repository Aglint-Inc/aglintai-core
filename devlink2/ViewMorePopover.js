import React from 'react';
import * as _Builtin from './_Builtin';
import { TimeRangeAvailable } from './TimeRangeAvailable';
import * as _utils from './utils';
import _styles from './ViewMorePopover.module.css';

export function ViewMorePopover({
  as: _Component = _Builtin.Block,
  textdate = '17 Mon',
  onClickClose = {},
  slotTimeRage,
}) {
  return (
    <_Component className={_utils.cx(_styles, 'viewmore_wrapper')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scroll_gradient_top')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-gray-800', 'fw-semibold')}
          tag='div'
        >
          {textdate}
        </_Builtin.Block>
        <_Builtin.Block tag='div' {...onClickClose}>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'embed_flex')}
            value='%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1408%2012.7602L8.4002%209.04766L4.6877%2012.7602C4.4627%2012.9289%204.24707%2012.9289%204.04082%2012.7602C3.87207%2012.5539%203.87207%2012.3477%204.04082%2012.1414L7.75332%208.40078L4.04082%204.68828C3.87207%204.46328%203.87207%204.24766%204.04082%204.04141C4.24707%203.87266%204.4627%203.87266%204.6877%204.04141L8.4002%207.75391L12.1408%204.04141C12.3471%203.87266%2012.5533%203.87266%2012.7596%204.04141C12.9283%204.24766%2012.9283%204.46328%2012.7596%204.68828L9.04707%208.40078L12.7596%2012.1414C12.9283%2012.3477%2012.9283%2012.5539%2012.7596%2012.7602C12.5533%2012.9289%2012.3471%2012.9289%2012.1408%2012.7602Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Grid
        className={_utils.cx(_styles, 'slot_timeranges')}
        tag='div'
      >
        {slotTimeRage ?? (
          <>
            <TimeRangeAvailable
              id={_utils.cx(
                _styles,
                'w-node-de800a28-525d-c62c-ce9d-ce1feda9c89e-eda9c898',
              )}
            />
            <TimeRangeAvailable
              id={_utils.cx(
                _styles,
                'w-node-de800a28-525d-c62c-ce9d-ce1feda9c89f-eda9c898',
              )}
            />
          </>
        )}
      </_Builtin.Grid>
    </_Component>
  );
}
