"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Instructions.module.css";

export function Instructions({
  as: _Component = _Builtin.Block,
  slotToggleButton,
  slotInstructions,
  onClickGotit = {},
  onClickClose = {},
  slotButton,
  isHowWorkVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1274")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1364")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1275")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Instructions"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.7812%208.28125L13.0625%2012L16.7812%2015.7188C17.0729%2016.0729%2017.0729%2016.4271%2016.7812%2016.7812C16.4271%2017.0729%2016.0729%2017.0729%2015.7188%2016.7812L12%2013.0625L8.28125%2016.7812C7.92708%2017.0729%207.57292%2017.0729%207.21875%2016.7812C6.92708%2016.4271%206.92708%2016.0729%207.21875%2015.7188L10.9375%2012L7.21875%208.28125C6.92708%207.92708%206.92708%207.57292%207.21875%207.21875C7.57292%206.92708%207.92708%206.92708%208.28125%207.21875L12%2010.9375L15.7188%207.21875C16.0729%206.92708%2016.4271%206.92708%2016.7812%207.21875C17.0729%207.57292%2017.0729%207.92708%2016.7812%208.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block tag="div">
            {
              "Enter instructions that will assist interviewers in navigating the interview process efficiently and fairly."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1278")}
          tag="div"
        >
          {isHowWorkVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1276", "hide")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1277")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.875%209H4.125C3.85938%208.26562%203.47656%207.59375%202.97656%206.98438C2.97656%206.98438%202.97656%206.97656%202.97656%206.96094C2.85156%206.80469%202.72656%206.64062%202.60156%206.46875C2.13281%205.79688%201.89062%205.01562%201.875%204.125C1.90625%202.95312%202.3125%201.98438%203.09375%201.21875C3.85938%200.4375%204.82812%200.03125%206%200C7.17188%200.03125%208.14062%200.4375%208.90625%201.21875C9.6875%201.98438%2010.0938%202.95312%2010.125%204.125C10.1094%205.01562%209.86719%205.79688%209.39844%206.46875C9.27344%206.64062%209.14844%206.8125%209.02344%206.98438C9.02344%206.98438%209.02344%206.99219%209.02344%207.00781C8.52344%207.61719%208.14062%208.28125%207.875%209ZM6%2012C5.46875%2011.9844%205.02344%2011.8047%204.66406%2011.4609C4.32031%2011.1016%204.14062%2010.6562%204.125%2010.125V9.75H7.875V10.125C7.85938%2010.6562%207.67969%2011.1016%207.33594%2011.4609C6.97656%2011.8047%206.53125%2011.9844%206%2012ZM4.125%204.125C4.14062%203.59375%204.32031%203.14844%204.66406%202.78906C5.02344%202.44531%205.46875%202.26563%206%202.25C6.23438%202.23437%206.35938%202.10938%206.375%201.875C6.35938%201.64062%206.23438%201.51563%206%201.5C5.25%201.51563%204.63281%201.77344%204.14844%202.27344C3.64844%202.75781%203.39062%203.375%203.375%204.125C3.39062%204.35938%203.51562%204.48438%203.75%204.5C3.98438%204.48438%204.10938%204.35938%204.125%204.125Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block tag="div">{"How it works"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey_600")}
                tag="div"
              >
                {
                  "Additional instructions will be displayed to interviewers from this module when scheduling an interview using this module. These instructions will assist the interviewer in understanding the expectations set by the hiring manager for the interview."
                }
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-blue-500",
                    "text-underline"
                  )}
                  tag="div"
                  {...onClickGotit}
                >
                  {"Ok got it"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">
            {slotInstructions ?? <SlotComp componentNeme="Instruction" />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1280", "no-absolute")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
