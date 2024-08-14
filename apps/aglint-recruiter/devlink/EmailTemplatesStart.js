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
  currentModule,
  isSearchFilterVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "et_wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "email-template-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "email-template-left-wrap")}
          tag="div"
          data-dynamic-height={currentModule}
        >
          {isWarningVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-email-temp-warning")}
              tag="div"
            >
              {slotWarning}
            </_Builtin.Block>
          ) : null}
          {isSearchFilterVisible ? (
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
                <EmailTemplateCards isActive={true} />
                <EmailTemplateCards isActive={true} />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "email-template-right-wrap")}
          tag="div"
          data-dynamic-height={currentModule}
        >
          {slotEmailDetails ?? <EditEmail />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bdata-dynamic-height%3D%22jobs%22%5D%7B%0A%09height%3A%20calc(100vh%20-%2048px)!important%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
