import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonWide } from "./ButtonWide";
import * as _utils from "./utils";
import _styles from "./DuplicateAssessmentPopup.module.css";

export function DuplicateAssessmentPopup({
  as: _Component = _Builtin.Block,
  slotInput,
  slotButton,
  onClickClose = {},
  slotLoaderLottie,
  isLoading = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%207.875C9.98438%207.85938%2010.1094%207.73438%2010.125%207.5V2.71875L8.53125%201.125H5.25C5.01562%201.14063%204.89062%201.26562%204.875%201.5V7.5C4.89062%207.73438%205.01562%207.85938%205.25%207.875H9.75ZM5.25%209C4.82812%208.98438%204.47656%208.83594%204.19531%208.55469C3.91406%208.27344%203.76562%207.92188%203.75%207.5V1.5C3.76562%201.07812%203.91406%200.726562%204.19531%200.445312C4.47656%200.164062%204.82812%200.015625%205.25%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H5.25ZM2.25%203H3V4.125H2.25C2.01562%204.14062%201.89062%204.26562%201.875%204.5V10.5C1.89062%2010.7344%202.01562%2010.8594%202.25%2010.875H6.75C6.98438%2010.8594%207.10938%2010.7344%207.125%2010.5V9.75H8.25V10.5C8.23438%2010.9219%208.08594%2011.2734%207.80469%2011.5547C7.52344%2011.8359%207.17188%2011.9844%206.75%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Duplicate Assessment"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "po-up_close")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7188%204.71875L7.40625%208L10.7188%2011.2812C10.9062%2011.4896%2011%2011.7292%2011%2012C11%2012.2708%2010.9062%2012.5104%2010.7188%2012.7188C10.5104%2012.9062%2010.2708%2013%2010%2013C9.72917%2013%209.48958%2012.9062%209.28125%2012.7188L6%209.40625L2.71875%2012.7188C2.51042%2012.9062%202.27083%2013%202%2013C1.72917%2013%201.48958%2012.9062%201.28125%2012.7188C1.09375%2012.5104%201%2012.2708%201%2012C1%2011.7292%201.09375%2011.4896%201.28125%2011.2812L4.59375%208L1.28125%204.71875C1.09375%204.51042%201%204.27083%201%204C1%203.72917%201.09375%203.48958%201.28125%203.28125C1.48958%203.09375%201.72917%203%202%203C2.27083%203%202.51042%203.09375%202.71875%203.28125L6%206.59375L9.28125%203.28125C9.48958%203.09375%209.72917%203%2010%203C10.2708%203%2010.5104%203.09375%2010.7188%203.28125C10.9062%203.48958%2011%203.72917%2011%204C11%204.27083%2010.9062%204.51042%2010.7188%204.71875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {
            "This assessment Questions, Level, Type will be duplicated in the new assessment."
          }
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotButton ?? <ButtonWide />}</_Builtin.Block>
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "popup_loader")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_lottie")}
            tag="div"
          >
            {slotLoaderLottie}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Duplicating Assessment..."}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
