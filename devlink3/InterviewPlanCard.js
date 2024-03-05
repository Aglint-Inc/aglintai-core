import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewPlanCard.module.css";

export function InterviewPlanCard({
  as: _Component = _Builtin.Block,
  slotInterviewModuleInput,
  slotDurationInput,
  slotMemberList,
  slotSearchMemberInput,
  slotInputSelected,
  onClickCancel = {},
  onClickDone = {},
  isInterviewModuleVisible = true,
  isMemberVisible = true,
  isMemberSelectionVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-745")} tag="div">
      {isInterviewModuleVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Interview Module"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotInterviewModuleInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-746")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Duration"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDurationInput}</_Builtin.Block>
      </_Builtin.Block>
      {isMemberVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-746")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Members"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-747")}
            tag="div"
          >
            {slotMemberList}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotSearchMemberInput}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isMemberSelectionVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-748")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Member selection Criteria"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-749")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Include"}</_Builtin.Block>
            <_Builtin.Block tag="div">{slotInputSelected}</_Builtin.Block>
            <_Builtin.Block tag="div">
              {"of the selected members"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-750")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600", "cursor-pointer")}
          tag="div"
          {...onClickCancel}
        >
          {"Cancel"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickDone}
          >
            <_Builtin.Block tag="div">{"Done"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
