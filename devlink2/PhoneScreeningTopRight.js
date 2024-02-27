import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PhoneScreeningTopRight.module.css";

export function PhoneScreeningTopRight({
  as: _Component = _Builtin.Block,
  slotSearchInput,
  onClickAllCandidates = {},
  onClickNewScreening = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "phonescreeening_top_right")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slot_search")} tag="div">
        {slotSearchInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_primary", "is_grey")}
        tag="div"
        {...onClickAllCandidates}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.375%202.25C9.60938%202.26563%209.73438%202.39062%209.75%202.625V7.875C9.73438%208.10938%209.60938%208.23438%209.375%208.25C9.14062%208.23438%209.01562%208.10938%209%207.875V3.53906L2.88281%209.63281C2.71094%209.78906%202.53906%209.78906%202.36719%209.63281C2.21094%209.46094%202.21094%209.28906%202.36719%209.11719L8.46094%203H4.125C3.89062%202.98437%203.76562%202.85938%203.75%202.625C3.76562%202.39062%203.89062%202.26563%204.125%202.25H9.375Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"All Candidates"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_primary")}
        tag="div"
        {...onClickNewScreening}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.375%201.5V5.625H10.5C10.7344%205.64062%2010.8594%205.76562%2010.875%206C10.8594%206.23438%2010.7344%206.35938%2010.5%206.375H6.375V10.5C6.35938%2010.7344%206.23438%2010.8594%206%2010.875C5.76562%2010.8594%205.64062%2010.7344%205.625%2010.5V6.375H1.5C1.26562%206.35938%201.14062%206.23438%201.125%206C1.14062%205.76562%201.26562%205.64062%201.5%205.625H5.625V1.5C5.64062%201.26562%205.76562%201.14063%206%201.125C6.23438%201.14063%206.35938%201.26562%206.375%201.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"New Screening"}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
