"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StatusBadge } from "./StatusBadge";
import { InterviewScreenCard } from "./InterviewScreenCard";
import * as _utils from "./utils";
import _styles from "./ShadowSessionCard.module.css";

export function ShadowSessionCard({
  as: _Component = _Builtin.Block,
  slotInterviewScreenCard,
  isInterviewCardVisible = true,
  textSessionName = "First shadow session",
  propsOpacity = {},
  isLineVisible = true,
  isShadowIconVisible = true,
  isReverseShadowIconVisible = false,
  slotStatusBadge,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1201")}
        tag="div"
        {...propsOpacity}
      >
        <_Builtin.Block tag="div">
          {isShadowIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.357143%22%20y%3D%220.357143%22%20width%3D%2219.2857%22%20height%3D%2219.2857%22%20rx%3D%229.64286%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.357143%22%20y%3D%220.357143%22%20width%3D%2219.2857%22%20height%3D%2219.2857%22%20rx%3D%229.64286%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.714286%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.86%202.86%22%2F%3E%0A%3Cpath%20d%3D%22M9.96289%2015.4531C7.61914%2015.4531%206.00781%2014.3203%205.8125%2012.582H7.55078C7.83398%2013.4609%208.67383%2014.0371%2010.0215%2014.0371C11.4375%2014.0371%2012.4434%2013.3633%2012.4434%2012.4062V12.3867C12.4434%2011.6738%2011.9062%2011.1758%2010.6074%2010.8633L8.97656%2010.4727C7.00391%2010.0039%206.11523%209.14453%206.11523%207.63086V7.62109C6.11523%205.87305%207.79492%204.55469%2010.0312%204.55469C12.2383%204.55469%2013.7715%205.6582%2014.0059%207.37695H12.3359C12.1113%206.54688%2011.291%205.9707%2010.0215%205.9707C8.77148%205.9707%207.85352%206.61523%207.85352%207.54297V7.5625C7.85352%208.27539%208.38086%208.72461%209.62109%209.02734L11.2422%209.41797C13.2246%209.89648%2014.1816%2010.7559%2014.1816%2012.2598V12.2793C14.1816%2014.1543%2012.3555%2015.4531%209.96289%2015.4531Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isReverseShadowIconVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20rx%3D%227.25%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.75%22%20y%3D%220.75%22%20width%3D%2214.5%22%20height%3D%2214.5%22%20rx%3D%227.25%22%20stroke%3D%22%23F5FCFC%22%20stroke-width%3D%220.5%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M5.41016%2011.5421V4.45703H8.11554C9.48051%204.45703%2010.3741%205.29172%2010.3741%206.5634V6.57322C10.3741%207.55521%209.83893%208.32116%208.95023%208.60103L10.5902%2011.5421H9.55416L8.03698%208.73851H6.29395V11.5421H5.41016ZM6.29395%207.95292H8.03698C8.94532%207.95292%209.46087%207.46683%209.46087%206.60268V6.59286C9.46087%205.74835%208.91095%205.24262%207.9977%205.24262H6.29395V7.95292Z%22%20fill%3D%22%23F5FCFC%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1271")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-first-cap")}
            tag="div"
          >
            {textSessionName}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotStatusBadge ?? <StatusBadge />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isInterviewCardVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1204")}
          tag="div"
        >
          {isLineVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1205")}
              tag="div"
            />
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1206")}
            tag="div"
          >
            {slotInterviewScreenCard ?? <InterviewScreenCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
