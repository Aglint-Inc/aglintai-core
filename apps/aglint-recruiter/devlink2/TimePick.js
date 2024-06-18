"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotPicker } from "./SlotPicker";
import * as _utils from "./utils";
import _styles from "./TimePick.module.css";

export function TimePick({
  as: _Component = _Builtin.Block,
  slotSlotPicker,
  onClickPrev = {},
  onClickNext = {},
  styleScrollProps = {},
  isArrowVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1725")} tag="div">
      {isArrowVisible ? (
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2224%22%20viewbox%3D%220%200%2015%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.984375%2012.5156C0.671875%2012.1719%200.671875%2011.8281%200.984375%2011.4844L9.98438%202.48438C10.3281%202.17188%2010.6719%202.17188%2011.0156%202.48438C11.3281%202.82812%2011.3281%203.17188%2011.0156%203.51562L2.57813%2012L11.0156%2020.4844C11.3281%2020.8281%2011.3281%2021.1719%2011.0156%2021.5156C10.6719%2021.8281%2010.3281%2021.8281%209.98438%2021.5156L0.984375%2012.5156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickPrev}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1721")}
        tag="div"
        {...styleScrollProps}
      >
        {slotSlotPicker ?? (
          <>
            <SlotPicker />
            <SlotPicker />
            <SlotPicker />
            <SlotPicker />
          </>
        )}
      </_Builtin.Block>
      {isArrowVisible ? (
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2224%22%20viewbox%3D%220%200%2015%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.0156%2011.4844C14.3281%2011.8281%2014.3281%2012.1719%2014.0156%2012.5156L5.01562%2021.5156C4.67188%2021.8281%204.32812%2021.8281%203.98438%2021.5156C3.67188%2021.1719%203.67188%2020.8281%203.98438%2020.4844L12.4219%2012L3.98438%203.51562C3.67188%203.17188%203.67188%202.82812%203.98438%202.48438C4.32812%202.17187%204.67188%202.17187%205.01562%202.48438L14.0156%2011.4844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickNext}
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
