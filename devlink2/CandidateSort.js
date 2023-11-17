import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateSort.module.css";

export function CandidateSort({
  as: _Component = _Builtin.Block,
  isSortCountVisible = false,
  sortCount = "1",
  isResetVisible = false,
  isDescending = false,
  isAscending = false,
  onclickDescending = {},
  onclickAscending = {},
  onclickApply = {},
  slotInput,
  isSortBodyVisible = false,
  sortBodyProps = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "cl-filters")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filters-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filters-top")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-trigger", "clickable")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.95006%201.25702L2.85355%204.35352C2.65829%204.54878%202.34171%204.54878%202.14645%204.35352C1.95118%204.15826%201.95118%203.84168%202.14645%203.64641L5.24645%200.546414C5.64171%200.151152%206.25829%200.151152%206.6479%200.540847L9.8479%203.64085C10.0462%203.83299%2010.0513%204.14953%209.85912%204.34786C9.66698%204.5462%209.35044%204.55123%209.1521%204.35909L5.95006%201.25702ZM9.1521%207.64085C9.35044%207.44871%209.66698%207.45373%209.85912%207.65207C10.0513%207.85041%2010.0462%208.16695%209.8479%208.35909L6.65355%2011.4535C6.25829%2011.8488%205.64171%2011.8488%205.24645%2011.4535L2.14645%208.35352C1.95118%208.15826%201.95118%207.84168%202.14645%207.64641C2.34171%207.45115%202.65829%207.45115%202.85355%207.64641L5.95017%2010.743C5.95067%2010.7424%209.1521%207.64085%209.1521%207.64085Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Sort"}</_Builtin.Block>
          </_Builtin.Block>
          {isSortCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-filters-count")}
              tag="div"
            >
              {sortCount}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isSortBodyVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filters-content", "sort")}
            tag="div"
            {...sortBodyProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cl-filters-content-inner", "sort")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {"Choose Sort option"}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-sort-option-wrapper")}
                tag="div"
                {...onclickAscending}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cl-sort-option")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64088%204.3479C1.83302%204.54623%202.14956%204.55126%202.3479%204.35912C2.3479%204.35912%204.08468%202.67654%205%201.78972L5%2011.5C5%2011.7761%205.22386%2012%205.5%2012C5.77614%2012%206%2011.7761%206%2011.5L6%201.70711L8.64645%204.35355C8.84171%204.54882%209.15829%204.54882%209.35355%204.35355C9.54882%204.15829%209.54882%203.84171%209.35355%203.64645L6.25355%200.546447C5.85829%200.151184%205.24171%200.151184%204.84645%200.546447L1.6521%203.64088C1.45377%203.83302%201.44874%204.14956%201.64088%204.3479Z%22%20fill%3AcurrentColor%3B%20fill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{"Ascending"}</_Builtin.Block>
                </_Builtin.Block>
                {isAscending ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cl-sort-option-bg")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cl-sort-option")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "icon-block")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.64088%204.3479C1.83302%204.54623%202.14956%204.55126%202.3479%204.35912C2.3479%204.35912%204.08468%202.67654%205%201.78972L5%2011.5C5%2011.7761%205.22386%2012%205.5%2012C5.77614%2012%206%2011.7761%206%2011.5L6%201.70711L8.64645%204.35355C8.84171%204.54882%209.15829%204.54882%209.35355%204.35355C9.54882%204.15829%209.54882%203.84171%209.35355%203.64645L6.25355%200.546447C5.85829%200.151184%205.24171%200.151184%204.84645%200.546447L1.6521%203.64088C1.45377%203.83302%201.44874%204.14956%201.64088%204.3479Z%22%20fill%3AcurrentColor%3B%20fill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Ascending"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-sort-option-wrapper")}
                tag="div"
                {...onclickDescending}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cl-sort-option")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icon-embed")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3591%207.6521C10.167%207.45377%209.85044%207.44874%209.6521%207.64088C9.6521%207.64088%207.91532%209.32346%207%2010.2103L7%200.5C7%200.223858%206.77614%200%206.5%200C6.22386%200%206%200.223858%206%200.5L6%2010.2929L3.35355%207.64645C3.15829%207.45118%202.84171%207.45118%202.64645%207.64645C2.45118%207.84171%202.45118%208.15829%202.64645%208.35355L5.74645%2011.4536C6.14171%2011.8488%206.75829%2011.8488%207.15355%2011.4536L10.3479%208.35912C10.5462%208.16698%2010.5513%207.85044%2010.3591%207.6521Z%22%20fill%3DcurrentColor%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{"Descending"}</_Builtin.Block>
                </_Builtin.Block>
                {isDescending ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cl-sort-option-bg")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cl-sort-option")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "icon-block")}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3591%207.6521C10.167%207.45377%209.85044%207.44874%209.6521%207.64088C9.6521%207.64088%207.91532%209.32346%207%2010.2103L7%200.5C7%200.223858%206.77614%200%206.5%200C6.22386%200%206%200.223858%206%200.5L6%2010.2929L3.35355%207.64645C3.15829%207.45118%202.84171%207.45118%202.64645%207.64645C2.45118%207.84171%202.45118%208.15829%202.64645%208.35355L5.74645%2011.4536C6.14171%2011.8488%206.75829%2011.8488%207.15355%2011.4536L10.3479%208.35912C10.5462%208.16698%2010.5513%207.85044%2010.3591%207.6521Z%22%20fill%3DcurrentColor%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">{"Descending"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cl-sort-apply-btn")}
                tag="div"
                {...onclickApply}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-color-white")}
                  tag="div"
                >
                  {"Apply Sort"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isResetVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-reset", "clickable")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.3335%204.23684V1.99992C13.3335%201.63173%2013.632%201.33325%2014.0002%201.33325C14.3684%201.33325%2014.6668%201.63173%2014.6668%201.99992V5.33325C14.6668%206.10144%2014.1017%206.66658%2013.3335%206.66658H10.0002C9.63197%206.66658%209.3335%206.36811%209.3335%205.99992C9.3335%205.63173%209.63197%205.33325%2010.0002%205.33325H12.5007C11.1182%203.54433%209.79812%202.66659%207.86683%202.66659C4.93207%202.66659%202.66683%205.00374%202.66683%207.99992C2.66683%2010.9465%205.01684%2013.3333%207.86683%2013.3333C9.34895%2013.3333%2010.7856%2012.6628%2011.7686%2011.557C12.0132%2011.2818%2012.4346%2011.257%2012.7097%2011.5016C12.9849%2011.7463%2013.0097%2012.1676%2012.7651%2012.4428C11.5337%2013.8282%209.73709%2014.6666%207.86683%2014.6666C4.27579%2014.6666%201.3335%2011.6783%201.3335%207.99992C1.3335%204.27652%204.1862%201.33325%207.86683%201.33325C10.1912%201.33325%2011.7904%202.33118%2013.3335%204.23684Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600")}
            tag="div"
          >
            {"Reset"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
