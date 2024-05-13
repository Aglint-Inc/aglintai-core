"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDetailInterview.module.css";

export function JobDetailInterview({
  as: _Component = _Builtin.Block,
  slotNewInterviewPlanCard,
  onClickViewScheduler = {},
  textButton = "View in scheduler",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-972")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-973")} tag="div">
        {slotNewInterviewPlanCard}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-975")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-974", "cursor-pointer")}
          tag="div"
          {...onClickViewScheduler}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {textButton}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.6875%204.25C11.0312%204.28125%2011.2188%204.46875%2011.25%204.8125V10.4375C11.2188%2010.7812%2011.0312%2010.9688%2010.6875%2011C10.3438%2010.9688%2010.1562%2010.7812%2010.125%2010.4375V6.17188L4.71094%2011.5859C4.44531%2011.8047%204.17969%2011.8047%203.91406%2011.5859C3.69531%2011.3203%203.69531%2011.0547%203.91406%2010.7891L9.32812%205.375H5.0625C4.71875%205.34375%204.53125%205.15625%204.5%204.8125C4.53125%204.46875%204.71875%204.28125%205.0625%204.25H10.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
