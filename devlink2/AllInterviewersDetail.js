import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AllInterviewersDetail.module.css";

export function AllInterviewersDetail({
  as: _Component = _Builtin.Block,
  onClickPauseModules = {},
  onClickRemoveModules = {},
  slotSchedule,
  slotModule,
  slotTimeZone,
  textModuleDescription = "Raimon is present in these modules",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "all-interviewers-info")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1149")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1151")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Modules"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textModuleDescription}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1152")}
          tag="div"
        >
          {slotModule}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1154")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1153", "cursor-pointer")}
            tag="div"
            {...onClickPauseModules}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.375%201.5H4.125C4.4375%201.51563%204.70312%201.625%204.92188%201.82812C5.125%202.04687%205.23438%202.3125%205.25%202.625V9.375C5.23438%209.6875%205.125%209.95312%204.92188%2010.1719C4.70312%2010.375%204.4375%2010.4844%204.125%2010.5H3.375C3.0625%2010.4844%202.79688%2010.375%202.57812%2010.1719C2.375%209.95312%202.26562%209.6875%202.25%209.375V2.625C2.26562%202.3125%202.375%202.04687%202.57812%201.82812C2.79688%201.625%203.0625%201.51563%203.375%201.5ZM7.875%201.5H8.625C8.9375%201.51563%209.20312%201.625%209.42188%201.82812C9.625%202.04687%209.73438%202.3125%209.75%202.625V9.375C9.73438%209.6875%209.625%209.95312%209.42188%2010.1719C9.20312%2010.375%208.9375%2010.4844%208.625%2010.5H7.875C7.5625%2010.4844%207.29688%2010.375%207.07812%2010.1719C6.875%209.95312%206.76562%209.6875%206.75%209.375V2.625C6.76562%202.3125%206.875%202.04687%207.07812%201.82812C7.29688%201.625%207.5625%201.51563%207.875%201.5Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-600")}
              tag="div"
            >
              {"Pause from all modules"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1153", "cursor-pointer")}
            tag="div"
            {...onClickRemoveModules}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.91406%200.421875C4.05469%200.15625%204.28125%200.015625%204.59375%200H7.40625C7.71875%200.015625%207.94531%200.15625%208.08594%200.421875L8.25%200.75H10.5C10.7188%200.75%2010.8984%200.820312%2011.0391%200.960938C11.1797%201.10156%2011.25%201.28125%2011.25%201.5C11.25%201.71875%2011.1797%201.89844%2011.0391%202.03906C10.8984%202.17969%2010.7188%202.25%2010.5%202.25H1.5C1.28125%202.25%201.10156%202.17969%200.960938%202.03906C0.820312%201.89844%200.75%201.71875%200.75%201.5C0.75%201.28125%200.820312%201.10156%200.960938%200.960938C1.10156%200.820312%201.28125%200.75%201.5%200.75H3.75L3.91406%200.421875ZM10.5%203L10.0078%2010.9453C9.97656%2011.2422%209.85938%2011.4922%209.65625%2011.6953C9.4375%2011.8984%209.17969%2012%208.88281%2012H3.11719C2.82031%2012%202.5625%2011.8984%202.34375%2011.6953C2.14062%2011.4922%202.02344%2011.2422%201.99219%2010.9453L1.5%203H10.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-red-500")}
              tag="div"
            >
              {"Remove from all modules"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1156")}
          tag="div"
        >
          {slotTimeZone}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1148")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Schedules of Raimon"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1150")}
          tag="div"
        >
          {slotSchedule}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
