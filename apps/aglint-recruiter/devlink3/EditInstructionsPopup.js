"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./EditInstructionsPopup.module.css";

export function EditInstructionsPopup({
  as: _Component = _Builtin.Block,
  slotrichtext,
  onClickUpdate = {},
  onClickCancel = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "editinstruction_popup")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex-2")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.1641%203.05469C12.0078%202.91406%2011.8281%202.84375%2011.625%202.84375C11.4219%202.84375%2011.2422%202.91406%2011.0859%203.05469L10.4766%203.6875L11.8125%205.02344L12.4453%204.41406C12.5859%204.25781%2012.6562%204.07812%2012.6562%203.875C12.6562%203.67187%2012.5859%203.49219%2012.4453%203.33594L12.1641%203.05469ZM5.92969%208.23438C5.83594%208.32812%205.77344%208.44531%205.74219%208.58594L5.36719%2010.1328L6.91406%209.78125C7.05469%209.73438%207.17188%209.66406%207.26562%209.57031L11.2734%205.5625L9.9375%204.22656L5.92969%208.23438ZM10.5703%202.53906C10.8828%202.24219%2011.2344%202.09375%2011.625%202.09375C12.0312%202.09375%2012.3828%202.24219%2012.6797%202.53906L12.9609%202.82031C13.2578%203.13281%2013.4062%203.48437%2013.4062%203.875C13.4062%204.28125%2013.2578%204.63281%2012.9609%204.92969L7.80469%2010.1094C7.60156%2010.3125%207.35938%2010.4453%207.07812%2010.5078L4.96875%2011C4.82812%2011.0156%204.71094%2010.9766%204.61719%2010.8828C4.52344%2010.7891%204.48438%2010.6797%204.5%2010.5547L4.99219%208.42188C5.05469%208.14062%205.1875%207.89844%205.39062%207.69531L10.5703%202.53906ZM3.375%203.5H6.375C6.60938%203.51563%206.73438%203.64062%206.75%203.875C6.73438%204.10938%206.60938%204.23438%206.375%204.25H3.375C3.0625%204.26562%202.79688%204.375%202.57812%204.57812C2.375%204.79688%202.26562%205.0625%202.25%205.375V12.125C2.26562%2012.4375%202.375%2012.7031%202.57812%2012.9219C2.79688%2013.125%203.0625%2013.2344%203.375%2013.25H10.125C10.4375%2013.2344%2010.7031%2013.125%2010.9219%2012.9219C11.125%2012.7031%2011.2344%2012.4375%2011.25%2012.125V9.125C11.2656%208.89062%2011.3906%208.76562%2011.625%208.75C11.8594%208.76562%2011.9844%208.89062%2012%209.125V12.125C11.9844%2012.6562%2011.8047%2013.1016%2011.4609%2013.4609C11.1016%2013.8047%2010.6562%2013.9844%2010.125%2014H3.375C2.84375%2013.9844%202.39844%2013.8047%202.03906%2013.4609C1.69531%2013.1016%201.51562%2012.6562%201.5%2012.125V5.375C1.51562%204.84375%201.69531%204.39844%202.03906%204.03906C2.39844%203.69531%202.84375%203.51563%203.375%203.5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <Text weight="medium" content="" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_close")}
          tag="div"
          {...onClickCancel}
        >
          <GlobalIcon iconName="close" weight="thin" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "slot_widget")} tag="div">
          {slotrichtext}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-pop-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button")}
          tag="div"
          {...onClickCancel}
        >
          <ButtonSoft textButton="Cancel" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button")}
          id={_utils.cx(
            _styles,
            "w-node-_80fef4dd-d402-6d10-5047-a5e3e5933a82-e5933a72"
          )}
          tag="div"
          {...onClickUpdate}
        >
          <ButtonSolid textButton="Save" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
