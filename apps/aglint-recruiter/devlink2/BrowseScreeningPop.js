"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningLandingCard } from "./ScreeningLandingCard";
import * as _utils from "./utils";
import _styles from "./BrowseScreeningPop.module.css";

export function BrowseScreeningPop({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotBrowseScreeningCard,
  slotAddScreeningButton,
  isAddScreeenButtonVisible = false,
  isEmpty = false,
  isNotEmpty = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "browse-screening-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1008")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Browse Screening"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1009")}
          tag="div"
        />
        <_Builtin.HtmlEmbed
          className={_utils.cx(
            _styles,
            "icons",
            "relative-1",
            "cursor-pointer"
          )}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewbox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7188%204.71875L7.40625%208L10.7188%2011.2812C10.9062%2011.4896%2011%2011.7292%2011%2012C11%2012.2708%2010.9062%2012.5104%2010.7188%2012.7188C10.5104%2012.9062%2010.2708%2013%2010%2013C9.72917%2013%209.48958%2012.9062%209.28125%2012.7188L6%209.40625L2.71875%2012.7188C2.51042%2012.9062%202.27083%2013%202%2013C1.72917%2013%201.48958%2012.9062%201.28125%2012.7188C1.09375%2012.5104%201%2012.2708%201%2012C1%2011.7292%201.09375%2011.4896%201.28125%2011.2812L4.59375%208L1.28125%204.71875C1.09375%204.51042%201%204.27083%201%204C1%203.72917%201.09375%203.48958%201.28125%203.28125C1.48958%203.09375%201.72917%203%202%203C2.27083%203%202.51042%203.09375%202.71875%203.28125L6%206.59375L9.28125%203.28125C9.48958%203.09375%209.72917%203%2010%203C10.2708%203%2010.5104%203.09375%2010.7188%203.28125C10.9062%203.48958%2011%203.72917%2011%204C11%204.27083%2010.9062%204.51042%2010.7188%204.71875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      {isNotEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1010-copy")}
          tag="div"
        >
          {slotBrowseScreeningCard ?? (
            <>
              <ScreeningLandingCard />
              <ScreeningLandingCard />
              <ScreeningLandingCard />
              <ScreeningLandingCard />
              <ScreeningLandingCard />
              <ScreeningLandingCard />
            </>
          )}
        </_Builtin.Block>
      ) : null}
      {isAddScreeenButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1011")}
          tag="div"
        >
          {slotAddScreeningButton}
        </_Builtin.Block>
      ) : null}
      {isAddScreeenButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1014")}
          tag="div"
        />
      ) : null}
      {isEmpty ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1017")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-995")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewbox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14%206C13.4167%206%2012.9375%206.1875%2012.5625%206.5625C12.1875%206.9375%2012%207.41667%2012%208V32C12%2032.5833%2012.1875%2033.0625%2012.5625%2033.4375C12.9375%2033.8125%2013.4167%2034%2014%2034H26C26.5833%2034%2027.0625%2033.8125%2027.4375%2033.4375C27.8125%2033.0625%2028%2032.5833%2028%2032V8C28%207.41667%2027.8125%206.9375%2027.4375%206.5625C27.0625%206.1875%2026.5833%206%2026%206H14ZM10%208C10.0417%206.875%2010.4375%205.9375%2011.1875%205.1875C11.9375%204.4375%2012.875%204.04167%2014%204H26C27.125%204.04167%2028.0625%204.4375%2028.8125%205.1875C29.5625%205.9375%2029.9583%206.875%2030%208V32C29.9583%2033.125%2029.5625%2034.0625%2028.8125%2034.8125C28.0625%2035.5625%2027.125%2035.9583%2026%2036H14C12.875%2035.9583%2011.9375%2035.5625%2011.1875%2034.8125C10.4375%2034.0625%2010.0417%2033.125%2010%2032V8ZM18%2029H22C22.625%2029.0417%2022.9583%2029.375%2023%2030C22.9583%2030.625%2022.625%2030.9583%2022%2031H18C17.375%2030.9583%2017.0417%2030.625%2017%2030C17.0417%2029.375%2017.375%2029.0417%2018%2029Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"No Screening Found"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
