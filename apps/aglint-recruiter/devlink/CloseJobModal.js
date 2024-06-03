"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CloseJobModal.module.css";

export function CloseJobModal({
  as: _Component = _Builtin.Block,
  textJobTitle = "QA Analyist",
  textLocation = "This is some text inside of a div block.",
  slotInput,
  onClickCloseJob = {},
  onClickCancel = {},
  slotButton,
  isDisabled = false,
  textWarning = "Closing this job will permanently stop all activities, including tasks and scheduled interviews. It will also remove the job from the company page and prevent any new applications or candidate imports.",
  textPopupTitle = "Close Job Confirmation",
  textButton = "Close Job",
}) {
  return (
    <_Component className={_utils.cx(_styles, "close-job-modal-pop")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {textPopupTitle}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-data-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textJobTitle}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-600")}
          tag="div"
        >
          {textLocation}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Paragraph>{textWarning}</_Builtin.Paragraph>
      <_Builtin.Block
        className={_utils.cx(_styles, "confirm-close-job-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "text-grow")} tag="div">
          {"Confirm by typing the job title"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-red-500", "text-grow")}
          tag="div"
        >
          {textJobTitle}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"below."}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot-input")} tag="div">
        {slotInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-job-btn-modal")}
        tag="div"
        {...onClickCancel}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4818_948%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4818_948)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "buttn_flex")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "greay_btn")}
            tag="div"
            {...onClickCancel}
          >
            <_Builtin.Block tag="div">{"Cancel"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "danger")}
            tag="div"
            {...onClickCloseJob}
          >
            <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
          </_Builtin.Block>
          {isDisabled ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary", "is_disabled")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
