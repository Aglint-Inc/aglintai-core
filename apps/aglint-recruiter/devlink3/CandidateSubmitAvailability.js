"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { DateOption } from "./DateOption";
import * as _utils from "./utils";
import _styles from "./CandidateSubmitAvailability.module.css";

export function CandidateSubmitAvailability({
  as: _Component = _Builtin.Block,
  slotList,
  onClickSchedule = {},
  onClickReReq = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1768")} tag="div">
      <Text content="" weight="" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1771")}
        tag="div"
      >
        {slotList ?? <DateOption />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1770")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1769", "cursor-pointer")}
          tag="div"
          {...onClickSchedule}
        >
          <_Builtin.Block tag="div">{"Schedule"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "div-block-1769",
            "grey",
            "cursor-pointer"
          )}
          tag="div"
          {...onClickReReq}
        >
          <_Builtin.Block tag="div">{"Re-Request Availability"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
