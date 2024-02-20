import React from 'react';
import * as _Builtin from './_Builtin';
import * as _utils from './utils';
import _styles from './JobDetailsSortOption.module.css';

export function JobDetailsSortOption({
  as: _Component = _Builtin.Block,
  title = 'Resume Score',
  onclickAscending = {},
  onclickDescending = {},
  isAscending = false,
  isDescending = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'jdet-filter-option', 'flex-h')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'jdet-filter-header-block')}
        tag='div'
      >
        <_Builtin.Block tag='div'>{title}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'jdet-sort-icons-wrapper')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sort-option-icon-block')}
          tag='div'
          {...onclickAscending}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'sort-option-icon')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'svg-icon')}
              value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64088%204.3479C1.83302%204.54623%202.14956%204.55126%202.3479%204.35912C2.3479%204.35912%204.08468%202.67654%205%201.78972L5%2011.5C5%2011.7761%205.22386%2012%205.5%2012C5.77614%2012%206%2011.7761%206%2011.5L6%201.70711L8.64645%204.35355C8.84171%204.54882%209.15829%204.54882%209.35355%204.35355C9.54882%204.15829%209.54882%203.84171%209.35355%203.64645L6.25355%200.546447C5.85829%200.151184%205.24171%200.151184%204.84645%200.546447L1.6521%203.64088C1.45377%203.83302%201.44874%204.14956%201.64088%204.3479Z%22%20fill%3D%22currentColor%3B%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          {isAscending ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'sort-option-icon', 'selected')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64088%204.3479C1.83302%204.54623%202.14956%204.55126%202.3479%204.35912C2.3479%204.35912%204.08468%202.67654%205%201.78972L5%2011.5C5%2011.7761%205.22386%2012%205.5%2012C5.77614%2012%206%2011.7761%206%2011.5L6%201.70711L8.64645%204.35355C8.84171%204.54882%209.15829%204.54882%209.35355%204.35355C9.54882%204.15829%209.54882%203.84171%209.35355%203.64645L6.25355%200.546447C5.85829%200.151184%205.24171%200.151184%204.84645%200.546447L1.6521%203.64088C1.45377%203.83302%201.44874%204.14956%201.64088%204.3479Z%22%20fill%3D%22currentColor%3B%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'sort-option-icon-block')}
          tag='div'
          {...onclickDescending}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'sort-option-icon')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'svg-icon')}
              value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3591%207.6521C10.167%207.45377%209.85044%207.44874%209.6521%207.64088C9.6521%207.64088%207.91532%209.32346%207%2010.2103L7%200.5C7%200.223858%206.77614%200%206.5%200C6.22386%200%206%200.223858%206%200.5L6%2010.2929L3.35355%207.64645C3.15829%207.45118%202.84171%207.45118%202.64645%207.64645C2.45118%207.84171%202.45118%208.15829%202.64645%208.35355L5.74645%2011.4536C6.14171%2011.8488%206.75829%2011.8488%207.15355%2011.4536L10.3479%208.35912C10.5462%208.16698%2010.5513%207.85044%2010.3591%207.6521Z%22%20fill%3D%22currentColor%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          {isDescending ? (
            <_Builtin.Block
              className={_utils.cx(_styles, 'sort-option-icon', 'selected')}
              tag='div'
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, 'svg-icon')}
                value='%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3591%207.6521C10.167%207.45377%209.85044%207.44874%209.6521%207.64088C9.6521%207.64088%207.91532%209.32346%207%2010.2103L7%200.5C7%200.223858%206.77614%200%206.5%200C6.22386%200%206%200.223858%206%200.5L6%2010.2929L3.35355%207.64645C3.15829%207.45118%202.84171%207.45118%202.64645%207.64645C2.45118%207.84171%202.45118%208.15829%202.64645%208.35355L5.74645%2011.4536C6.14171%2011.8488%206.75829%2011.8488%207.15355%2011.4536L10.3479%208.35912C10.5462%208.16698%2010.5513%207.85044%2010.3591%207.6521Z%22%20fill%3D%22currentColor%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E'
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
