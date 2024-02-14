import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ConfirmSlotPop.module.css";

export function ConfirmSlotPop({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  textDate = "27",
  textDay = "FRIDAY",
  textMonth = "THU",
  textTitle = "Phase -1 Interview for Senior Software Engineer",
  textTime = "09:30 - 10:00 PM",
  slotPlatformLogo,
  textPlatformName = "Google Meet",
  onClickConfirm = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "confirm-slot-pop")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-896")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Conform your slot"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cursor-pointer")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20viewBox%3D%220%200%2025%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.6562%2016.8438L12.5%2012.7188L8.375%2016.8438C8.125%2017.0312%207.88542%2017.0312%207.65625%2016.8438C7.46875%2016.6146%207.46875%2016.3854%207.65625%2016.1562L11.7812%2012L7.65625%207.875C7.46875%207.625%207.46875%207.38542%207.65625%207.15625C7.88542%206.96875%208.125%206.96875%208.375%207.15625L12.5%2011.2812L16.6562%207.15625C16.8854%206.96875%2017.1146%206.96875%2017.3438%207.15625C17.5312%207.38542%2017.5312%207.625%2017.3438%207.875L13.2188%2012L17.3438%2016.1562C17.5312%2016.3854%2017.5312%2016.6146%2017.3438%2016.8438C17.1146%2017.0312%2016.8854%2017.0312%2016.6562%2016.8438Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "text-grey-600")}
        tag="div"
      >
        {
          "Before we finalize your schedule, please take a moment to confirm the chosen time. Your interview is crucial, and we want to ensure it aligns perfectly with your availability."
        }
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-897")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-898")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-899")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
              {textMonth}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-40")} tag="div">
              {textDate}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
              {textDay}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-900")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
            {textTitle}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-901")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotPlatformLogo}</_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
              {textPlatformName}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-902")}
        tag="div"
        {...onClickConfirm}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Confirm"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
