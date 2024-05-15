"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SessionAndTime } from "./SessionAndTime";
import * as _utils from "./utils";
import _styles from "./SelectedDateAndTime.module.css";

export function SelectedDateAndTime({
  as: _Component = _Builtin.Block,
  textMonth = "February",
  textDate = "27",
  textDay = "FRIDAY",
  slotSessionAndTime,
}) {
  return (
    <_Component className={_utils.cx(_styles, "selected_date")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "date_block")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
          {textMonth}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "text_date")} tag="div">
          {textDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "text-capitalize")}
          tag="div"
        >
          {textDay}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sessionandtime_wrap")}
        id={_utils.cx(
          _styles,
          "w-node-ba87f1ee-4c77-6f18-8d77-cf169d93bb05-9d93bafd"
        )}
        tag="div"
      >
        {slotSessionAndTime ?? (
          <>
            <SessionAndTime />
            <SessionAndTime textSessionName="C++ Coading" />
            <SessionAndTime
              textSessionName={
                <>
                  {"Company Introduction"}
                  <br />
                </>
              }
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
