"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AtsCard.module.css";

export function AtsCard({
  as: _Component = _Builtin.Block,
  textStatus = "This is some text inside of a div block.",
  textRole = "Strategic Solutions Architect",
  textWorktypeLocation = "On-site, Full Time, San Jose, CA",
  propsTextColor = {},
  onClickCheck = {},
  isChecked = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "lever-card-map")}
      tag="div"
      {...onClickCheck}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "relative-1", "pt-2")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "final-check-box")}
          tag="div"
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-right-wrappers-text")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-526")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-first-capital")}
              tag="div"
              {...propsTextColor}
            >
              {textStatus}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {textWorktypeLocation}
        </_Builtin.Block>
      </_Builtin.Block>
      {isChecked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "overlay-blue-checked")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
