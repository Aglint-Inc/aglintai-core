"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssisstantSettings.module.css";

export function AssisstantSettings({
  as: _Component = _Builtin.Block,
  slotNameInput,
  slotInstructionsInput,
  slotButtons,
  slotCode,
  onclickCopy = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cb-assisstant-settings-wrapper", "pl-20")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cb-as-main")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Assistant"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cb-as-main-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-as-main-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cb-as-main-top-content")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Assistant Name"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Choose a name for your assistant. This will be displayed as the assistant's name, for example, 'Company's Bot'."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotNameInput}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-as-main-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cb-as-main-top-content")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"Assistant Instructions"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "These instructions will guide the behavior of your company's assistant."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotInstructionsInput}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cb-as-main-bottons-wrapper")}
          tag="div"
        >
          {slotButtons}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cb-as-main-block", "hide")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cb-as-main-top-content")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Add assistant to your website"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {
              "Add the assistant to your website by inserting the following code snippet inside the "
            }
            <_Builtin.Span className={_utils.cx(_styles, "text-blue-500")}>
              {"<head>"}
            </_Builtin.Span>
            {" tag of your project."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cb-as-code-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-as-code-block")}
            tag="div"
          >
            {slotCode}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cb-as-code-copy-btn")}
            tag="div"
            {...onclickCopy}
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%2010C4%209.63181%203.70152%209.33333%203.33333%209.33333H1.33333V1.33333H9.33333V3.33333C9.33333%203.70152%209.63181%204%2010%204C10.3682%204%2010.6667%203.70152%2010.6667%203.33333V1.33333C10.6667%200.596954%2010.0697%200%209.33333%200H1.33333C0.596954%200%200%200.596954%200%201.33333V9.33333C0%2010.0697%200.596954%2010.6667%201.33333%2010.6667H3.33333C3.70152%2010.6667%204%2010.3682%204%2010ZM14.6667%205.33333H6.66667C5.93029%205.33333%205.33333%205.93029%205.33333%206.66667V14.6667C5.33333%2015.403%205.93029%2016%206.66667%2016H14.6667C15.403%2016%2016%2015.403%2016%2014.6667V6.66667C16%205.93029%2015.403%205.33333%2014.6667%205.33333ZM6.66667%2014.6667V6.66667H14.6667V14.6667H6.66667Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cmask%20id%3D%22mask0_5661_814%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2216%22%20height%3D%2216%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%2010C4%209.63181%203.70152%209.33333%203.33333%209.33333H1.33333V1.33333H9.33333V3.33333C9.33333%203.70152%209.63181%204%2010%204C10.3682%204%2010.6667%203.70152%2010.6667%203.33333V1.33333C10.6667%200.596954%2010.0697%200%209.33333%200H1.33333C0.596954%200%200%200.596954%200%201.33333V9.33333C0%2010.0697%200.596954%2010.6667%201.33333%2010.6667H3.33333C3.70152%2010.6667%204%2010.3682%204%2010ZM14.6667%205.33333H6.66667C5.93029%205.33333%205.33333%205.93029%205.33333%206.66667V14.6667C5.33333%2015.403%205.93029%2016%206.66667%2016H14.6667C15.403%2016%2016%2015.403%2016%2014.6667V6.66667C16%205.93029%2015.403%205.33333%2014.6667%205.33333ZM6.66667%2014.6667V6.66667H14.6667V14.6667H6.66667Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_5661_814)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Copy"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
