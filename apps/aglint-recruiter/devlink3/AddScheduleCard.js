"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AddScheduleOption } from "./AddScheduleOption";
import * as _utils from "./utils";
import _styles from "./AddScheduleCard.module.css";

export function AddScheduleCard({
  as: _Component = _Builtin.Block,
  isAddSessionOptionVisible = false,
  slotAddScheduleOption,
}) {
  return (
    <_Component className={_utils.cx(_styles, "add_plan")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "orange_line")} tag="div" />
      <_Builtin.Block
        className={_utils.cx(_styles, "add_divider_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "add-icon-module")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_7479_75054)%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016ZM7.25%2010.75C7.29167%2011.2083%207.54167%2011.4583%208%2011.5C8.45833%2011.4583%208.70833%2011.2083%208.75%2010.75V8.75H10.75C11.2083%208.70833%2011.4583%208.45833%2011.5%208C11.4583%207.54167%2011.2083%207.29167%2010.75%207.25H8.75V5.25C8.70833%204.79167%208.45833%204.54167%208%204.5C7.54167%204.54167%207.29167%204.79167%207.25%205.25V7.25H5.25C4.79167%207.29167%204.54167%207.54167%204.5%208C4.54167%208.45833%204.79167%208.70833%205.25%208.75H7.25V10.75Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_7479_75054%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%228%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
          />
          {isAddSessionOptionVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-add-icon-options")}
              tag="div"
            >
              {slotAddScheduleOption ?? <AddScheduleOption />}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
