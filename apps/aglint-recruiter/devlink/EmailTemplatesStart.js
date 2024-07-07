"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { EmailTemplateCards } from "./EmailTemplateCards";
import { EditEmail } from "./EditEmail";
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
  isWarningVisible = false,
  slotEmailDetails,
  slotNewTabPill,
  slotSearchFilter,
  showTabs = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "et_wrapper")} tag="div">
      {showTabs ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_newtabpill-copy")}
          tag="div"
        >
          {slotNewTabPill}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "email-template-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "email-template-left-wrap")}
          tag="div"
        >
          {isWarningVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-email-temp-warning")}
              tag="div"
            >
              {slotWarning}
            </_Builtin.Block>
          ) : null}
          {showTabs ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_search_and_filter")}
              tag="div"
            >
              {slotSearchFilter}
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
                <EmailTemplateCards />
                <EmailTemplateCards />
                <EmailTemplateCards />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "email-template-right-wrap")}
          tag="div"
        >
          {slotEmailDetails ?? <EditEmail />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
