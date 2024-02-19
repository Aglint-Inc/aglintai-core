import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleInfoBlock } from "./ScheduleInfoBlock";
import * as _utils from "./utils";
import _styles from "./AllInterviewCard.module.css";

export function AllInterviewCard({
  as: _Component = _Builtin.Block,
  textName = "Westly Snedger",
  slotCandidateImage,
  textStatus = "Pending",
  colorPropsText = {},
  colorPropsBg = {},
  textDuration = "1 hour",
  slotPanelImage,
  textInterviewPanel = "This is some text inside of a div block.",
  textRelatedJob = "Product Designer",
  slotScheduleInfo,
  isSchedulerTable = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "allinterview_row_-candidate")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834")}
          tag="div"
        >
          {slotCandidateImage}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "status_pill")}
          tag="div"
          {...colorPropsBg}
        >
          <_Builtin.Block tag="div" {...colorPropsText}>
            {textStatus}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        {slotScheduleInfo ?? <ScheduleInfoBlock />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-840")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotPanelImage}</_Builtin.Block>
          <_Builtin.Block tag="div">{textInterviewPanel}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSchedulerTable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-840")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textRelatedJob}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
