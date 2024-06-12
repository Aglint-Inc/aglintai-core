"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonGhost } from "./ButtonGhost";
import { ButtonSolid } from "./ButtonSolid";
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
      <Text content={textPopupTitle} weight="bold" />
      <_Builtin.Block
        className={_utils.cx(_styles, "close-data-wrap")}
        tag="div"
      >
        <Text content={textJobTitle} />
        <Text content={textLocation} size="1" color="neutral" />
      </_Builtin.Block>
      <Text content={textWarning} color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "confirm-close-job-wrap")}
        tag="div"
      >
        <Text content="Confirm by typing the job title" />
        <Text content={textJobTitle} color="error" />
        <Text content="below." />
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-job-btn-modal")}
        tag="div"
        {...onClickCancel}
      >
        <_Builtin.Block
          tag="div"
          icon-size="md"
          icon-color="neutral-a11"
          icon-weight="regular"
        >
          {"close"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "buttn_flex")} tag="div">
        <_Builtin.Block tag="div" {...onClickCancel}>
          <ButtonGhost
            isLeftIcon={false}
            isRightIcon={false}
            textButton="Cancel"
            size="2"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block tag="div" {...onClickCloseJob}>
            <ButtonSolid
              textButton={textButton}
              color="error"
              isLeftIcon={false}
              isRightIcon={false}
              size="2"
            />
          </_Builtin.Block>
          {isDisabled ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "disable-wrap")}
              tag="div"
            >
              <ButtonSolid
                textButton={textButton}
                color="error"
                isLeftIcon={false}
                isRightIcon={false}
                isDisabled={true}
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
