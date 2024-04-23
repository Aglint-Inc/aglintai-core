import React from "react";
import * as _Builtin from "./_Builtin";
import { OptionInput } from "./OptionInput";
import { LinkButton } from "./LinkButton";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./McqQuestion.module.css";

export function McqQuestion({
  as: _Component = _Builtin.Block,
  onClcikAddOption = {},
  slotQuestionInput,
  slotOptions,
  slotTextarea,
  slotDurationInput,
  slotToggle,
  slotRcCheckbox,
  isHint = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "question_block")} tag="div">
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
      <_Builtin.Block
        className={_utils.cx(_styles, "ps_row", "is_left_fles")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-955")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Options"}
          </_Builtin.Block>
          {isHint ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"Check the correct answer."}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot", "option_flex")}
          tag="div"
        >
          {slotOptions ?? (
            <>
              <OptionInput />
              <LinkButton />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Description"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "toggle_flex")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_toggle")}
            tag="div"
          >
            {slotToggle}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Show Description"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ps_input_slot", "is_flex")}
          tag="div"
        >
          {slotTextarea}
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
          className={_utils.cx(_styles, "input_relative")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ps_input_slot")}
            tag="div"
          >
            {slotDurationInput}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "input_absolute")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"Minutes"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
        <_Builtin.Block tag="div">
          {slotRcCheckbox ?? <RcCheckbox />}
        </_Builtin.Block>
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
