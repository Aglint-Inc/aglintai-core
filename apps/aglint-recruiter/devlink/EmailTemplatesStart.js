"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./EmailTemplatesStart.module.css";

export function EmailTemplatesStart({
  as: _Component = _Builtin.Block,
  onClickApplicationRecieved = {},
  onClickInterviewInvite = {},
  onClickFollowInterview = {},
  onClickDisqualified = {},
  slotEmailTemplateCards,
  isProceedDisable = true,
  onClickProceed = {},
  isAddJob = true,
  onClickDone = {},
  onClickSaveDraft = {},
  slotButtonPrimaryRegular,
  slotBasicButton,
  slotWarning,
  isWarningVisible = true,
  slotEmailDetails,
}) {
  return (
    <_Component className={_utils.cx(_styles, "email-template-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "email-template-left-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "email-template-left-head")}
          tag="div"
        >
          <Text content="Email Templates" weight="medium" />
          <Text
            content="Emails will be triggered in mentioned events."
            color="neutral"
          />
        </_Builtin.Block>
        {isWarningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-email-temp-warning")}
            tag="div"
          >
            {slotWarning}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "email-start-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-_7a13e008-ea54-7273-6b2d-06ecde60cc59-adb6be91"
          )}
          tag="div"
        >
          {slotEmailTemplateCards ?? (
            <>
              <SlotComp componentName="EmailTemplateCards" />
              <SlotComp componentName="EmailTemplateCards" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "email-template-right-wrap")}
        tag="div"
      >
        {slotEmailDetails ?? <SlotComp componentName="EditEmail" />}
      </_Builtin.Block>
    </_Component>
  );
}
