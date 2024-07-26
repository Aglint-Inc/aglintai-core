"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ModuleSetting.module.css";

export function ModuleSetting({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotModuleNameInput,
  slotRequiresTrainingToggle,
  slotInputNoOfShadow,
  slotInputNoOfReverse,
  slotCheckbox,
  isApprovalDoneVisible = false,
  slotApprovalDoneInput,
  isRequireTrainingVisible = false,
  slotButtonPrimary,
  slotToggleRequireTraining,
  isDisable = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "module-setting-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "modulesettings")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ms-slot-wrapper")}
          tag="div"
        >
          {isRequireTrainingVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1184")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1186")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1185")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.5%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222%202%22%2F%3E%0A%3Cpath%20d%3D%22M6.97559%2010.8164C5.33496%2010.8164%204.20703%2010.0234%204.07031%208.80664H5.28711C5.48535%209.42188%206.07324%209.8252%207.0166%209.8252C8.00781%209.8252%208.71191%209.35352%208.71191%208.68359V8.66992C8.71191%208.1709%208.33594%207.82227%207.42676%207.60352L6.28516%207.33008C4.9043%207.00195%204.28223%206.40039%204.28223%205.34082V5.33398C4.28223%204.11035%205.45801%203.1875%207.02344%203.1875C8.56836%203.1875%209.6416%203.95996%209.80566%205.16309H8.63672C8.47949%204.58203%207.90527%204.17871%207.0166%204.17871C6.1416%204.17871%205.49902%204.62988%205.49902%205.2793V5.29297C5.49902%205.79199%205.86816%206.10645%206.73633%206.31836L7.87109%206.5918C9.25879%206.92676%209.92871%207.52832%209.92871%208.58105V8.59473C9.92871%209.90723%208.65039%2010.8164%206.97559%2010.8164Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"No of shadows"}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">{slotInputNoOfShadow}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1186")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1185")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2213.5%22%20height%3D%2213.5%22%20rx%3D%226.75%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.5%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221%201%22%2F%3E%0A%3Cpath%20d%3D%22M4.41016%2010.546V3.46094H7.11554C8.48051%203.46094%209.37412%204.29563%209.37412%205.56731V5.57713C9.37412%206.55912%208.83893%207.32507%207.95023%207.60494L9.59016%2010.546H8.55416L7.03698%207.74242H5.29395V10.546H4.41016ZM5.29395%206.95682H7.03698C7.94532%206.95682%208.46087%206.47074%208.46087%205.60659V5.59677C8.46087%204.75226%207.91095%204.24653%206.9977%204.24653H5.29395V6.95682Z%22%20fill%3D%22%23F5FCFC%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"No of reverse shadows"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {slotInputNoOfReverse}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1187")}
                tag="div"
              >
                <_Builtin.Block tag="div">{slotCheckbox}</_Builtin.Block>
                <_Builtin.Block tag="div">
                  {"Require approval before moving to Qualified"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isApprovalDoneVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1188")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Approvers:"}</_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {slotApprovalDoneInput}
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "modulesettingactions")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1703")}
            tag="div"
          >
            {slotButtonPrimary}
          </_Builtin.Block>
        </_Builtin.Block>
        {isDisable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1711")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
