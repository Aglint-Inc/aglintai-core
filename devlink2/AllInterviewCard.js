import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AllInterviewCard.module.css";

export function AllInterviewCard({
  as: _Component = _Builtin.Block,
  textName = "Westly Snedger",
  slotCandidateImage,
  textStatus = "Pending",
  colorPropsText = {},
  colorPropsBg = {},
  textMeeting = "In Person Meeting",
  slotMeetingIcon,
  textTimeDate = "2024 Feb 20 at 09:30 AM",
  textDuration = "1 hour",
  slotPanelImage,
  textInterviewPanel = "This is some text inside of a div block.",
  textRelatedJob = "Product Designer",
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
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-839")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-838")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotMeetingIcon}</_Builtin.Block>
            <_Builtin.Block tag="div">{textMeeting}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm-3", "text-grey-600")}
            tag="div"
          >
            {textTimeDate}
          </_Builtin.Block>
        </_Builtin.Block>
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
    </_Component>
  );
}
