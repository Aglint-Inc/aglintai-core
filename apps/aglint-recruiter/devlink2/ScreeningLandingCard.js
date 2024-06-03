"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScreeningLandingCard.module.css";

export function ScreeningLandingCard({
  as: _Component = _Builtin.Block,
  textTitle = "Screening for front end engineer",
  textQuestionCount = "17 Questions",
  onClickCard = {},
  isActive = false,
  isChange = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1012")}
      id={_utils.cx(
        _styles,
        "w-node-_40c5256d-4659-c0c1-dc54-95a455fc1442-55fc1442"
      )}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-981")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "relative_2")}
          tag="div"
        >
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "relative-1")}
          tag="div"
        >
          {textQuestionCount}
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1013")}
          tag="div"
        />
      ) : null}
      {isChange ? (
        <_Builtin.Block className={_utils.cx(_styles, "change_icon")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.46875%2010.5C2.17708%2010.4583%202.02083%2010.2812%202%209.96875V9.71875C2.125%208.21875%202.69792%206.97917%203.71875%206C4.73958%205.04167%206%204.54167%207.5%204.5H12V3.125C12%202.875%2012.0833%202.66667%2012.25%202.5C12.4167%202.33333%2012.625%202.25%2012.875%202.25C13.0833%202.25%2013.2708%202.32292%2013.4375%202.46875L15.8438%204.625C15.9479%204.72917%2016%204.85417%2016%205C16%205.14583%2015.9479%205.27083%2015.8438%205.375L13.4375%207.53125C13.2708%207.67708%2013.0833%207.75%2012.875%207.75C12.625%207.75%2012.4167%207.66667%2012.25%207.5C12.0833%207.33333%2012%207.125%2012%206.875V5.5H7.5C6.27083%205.52083%205.23958%205.9375%204.40625%206.75C3.57292%207.54167%203.10417%208.55208%203%209.78125V10.0312C2.95833%2010.3229%202.78125%2010.4792%202.46875%2010.5ZM13%206.59375L14.75%205L13%203.4375V6.5625V6.59375ZM17.5312%209.5C17.8229%209.54167%2017.9792%209.71875%2018%2010.0312V10.2812C17.875%2011.7812%2017.3021%2013.0208%2016.2812%2014C15.2604%2014.9583%2014%2015.4583%2012.5%2015.5H8V16.875C8%2017.125%207.91667%2017.3333%207.75%2017.5C7.58333%2017.6667%207.375%2017.75%207.125%2017.75C6.91667%2017.75%206.72917%2017.6771%206.5625%2017.5312L4.15625%2015.375C4.05208%2015.2708%204%2015.1458%204%2015C4%2014.8542%204.05208%2014.7292%204.15625%2014.625L6.5625%2012.4688C6.72917%2012.3229%206.91667%2012.25%207.125%2012.25C7.375%2012.25%207.58333%2012.3333%207.75%2012.5C7.91667%2012.6667%208%2012.875%208%2013.125V14.5H12.5C13.7292%2014.4792%2014.7604%2014.0625%2015.5938%2013.25C16.4271%2012.4583%2016.8958%2011.4479%2017%2010.2188V9.96875C17.0417%209.67708%2017.2188%209.52083%2017.5312%209.5ZM7%2013.4375L5.25%2015L7%2016.5938V13.4375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
