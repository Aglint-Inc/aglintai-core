"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CompanyDayOff.module.css";

export function CompanyDayOff({
  as: _Component = _Builtin.Block,
  slotDayOff,
  onClickAddDate = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "schedule_settings")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "setting_wrap", "p-b-40")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "setting_title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            <_Builtin.Strong>{"Standard Days Off"}</_Builtin.Strong>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-500")}
            tag="div"
          >
            {"List company holidays to exclude them from scheduling."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "days_off_wrap")}
          tag="div"
        >
          {slotDayOff ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "days_off_empty")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-400")}
                tag="div"
              >
                {"No days added"}
              </_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "link_button", "is_blue")}
          tag="div"
          {...onClickAddDate}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.375%200C3.60938%200.015625%203.73438%200.140625%203.75%200.375V1.5H8.25V0.375C8.26562%200.140625%208.39062%200.015625%208.625%200C8.85938%200.015625%208.98438%200.140625%209%200.375V1.5H9.75C10.1719%201.51563%2010.5234%201.66406%2010.8047%201.94531C11.0859%202.22656%2011.2344%202.57812%2011.25%203V3.75V4.5V10.5C11.2344%2010.9219%2011.0859%2011.2734%2010.8047%2011.5547C10.5234%2011.8359%2010.1719%2011.9844%209.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5V3.75V3C0.765625%202.57812%200.914062%202.22656%201.19531%201.94531C1.47656%201.66406%201.82812%201.51563%202.25%201.5H3V0.375C3.01562%200.140625%203.14062%200.015625%203.375%200ZM10.5%204.5H1.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H9.75C9.96875%2011.25%2010.1484%2011.1797%2010.2891%2011.0391C10.4297%2010.8984%2010.5%2010.7188%2010.5%2010.5V4.5ZM9.75%202.25H2.25C2.03125%202.25%201.85156%202.32031%201.71094%202.46094C1.57031%202.60156%201.5%202.78125%201.5%203V3.75H10.5V3C10.5%202.78125%2010.4297%202.60156%2010.2891%202.46094C10.1484%202.32031%209.96875%202.25%209.75%202.25Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Add"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
