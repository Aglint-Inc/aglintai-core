import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DurationPop.module.css";

export function DurationPop({
  as: _Component = _Builtin.Block,
  slotStartTime,
  slotEndTime,
  isStartEndVisible = true,
  onClick30Min = {},
  onClick1Hour = {},
  onClick2Hour = {},
  onClickCustom = {},
  is30MinActive = true,
  is1HourActive = false,
  is2HourActive = false,
  isCustomActive = false,
  slotCustomDurationInput,
  isCustomDurationVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-967")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-968")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-969")}
          tag="div"
          {...onClick30Min}
        >
          {is30MinActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-970")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "relative")}
            tag="div"
          >
            {"30 Minitues"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-969")}
          tag="div"
          {...onClick1Hour}
        >
          {is1HourActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-970")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "relative")}
            tag="div"
          >
            {"1 Hour"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-969")}
          tag="div"
          {...onClick2Hour}
        >
          {is2HourActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-970")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "relative")}
            tag="div"
          >
            {"2 Hour"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-969")}
          tag="div"
          {...onClickCustom}
        >
          {isCustomActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-970")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "relative")}
            tag="div"
          >
            {"Custom"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isCustomDurationVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1003")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
            {"Custom Duration"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotCustomDurationInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isStartEndVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-972")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-971")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Start Time"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotStartTime}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-971")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"End Time"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotEndTime}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
