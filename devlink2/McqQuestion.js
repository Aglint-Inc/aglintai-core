import React from "react";
import * as _Builtin from "./_Builtin";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./McqQuestion.module.css";

export function McqQuestion({
  as: _Component = _Builtin.Block,
  onClcikAddOption = {},
  slotQuestionInput,
  slotOptions,
  slotToggleAndTextarea,
  slotDurationInput,
}) {
  return (
    <_Component className={_utils.cx(_styles, "mcq")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Question"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot")}
          tag="div"
        >
          {slotQuestionInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Options"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot")}
          tag="div"
        >
          {slotOptions}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "button_text")}
          tag="div"
          {...onClcikAddOption}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%204.875V8.25H13.125C13.3438%208.25%2013.5234%208.32031%2013.6641%208.46094C13.8047%208.60156%2013.875%208.78125%2013.875%209C13.875%209.21875%2013.8047%209.39844%2013.6641%209.53906C13.5234%209.67969%2013.3438%209.75%2013.125%209.75H9.75V13.125C9.75%2013.3438%209.67969%2013.5234%209.53906%2013.6641C9.39844%2013.8047%209.21875%2013.875%209%2013.875C8.78125%2013.875%208.60156%2013.8047%208.46094%2013.6641C8.32031%2013.5234%208.25%2013.3438%208.25%2013.125V9.75H4.875C4.65625%209.75%204.47656%209.67969%204.33594%209.53906C4.19531%209.39844%204.125%209.21875%204.125%209C4.125%208.78125%204.19531%208.60156%204.33594%208.46094C4.47656%208.32031%204.65625%208.25%204.875%208.25H8.25V4.875C8.25%204.65625%208.32031%204.47656%208.46094%204.33594C8.60156%204.19531%208.78125%204.125%209%204.125C9.21875%204.125%209.39844%204.19531%209.53906%204.33594C9.67969%204.47656%209.75%204.65625%209.75%204.875Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Add Option"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Description"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot", "is_flex")}
          tag="div"
        >
          {slotToggleAndTextarea}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Duration"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot")}
          tag="div"
        >
          {slotDurationInput}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <RcCheckbox />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"If marked as required, candidates must answer this question."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
