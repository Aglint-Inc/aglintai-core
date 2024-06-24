"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./AgentFollowUp.module.css";

export function AgentFollowUp({
  as: _Component = _Builtin.Block,
  isPhoneAgentIcon = true,
  isEmailAgentIcon = true,
  textFollowup = "It's been a day since the candidate replied to this email.",
  isNoBorder = false,
  isMakeAPhoneCall = true,
  isSendFollowupEmail = true,
  isConactViaEmail = true,
  isCallAgain = true,
  onClickMakeAPhoneCall = {},
  onClickSendFollowupEmail = {},
  onClickContactViaEmail = {},
  onClickCallAgain = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "agentfollowup_block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "relative_2")} tag="div">
        {textFollowup}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "action_block")} tag="div">
        {isMakeAPhoneCall ? (
          <_Builtin.Block tag="div">
            <ButtonSolid
              onClickButton={onClickMakeAPhoneCall}
              size="1"
              textButton="Make a Followup Call"
            />
          </_Builtin.Block>
        ) : null}
        {isSendFollowupEmail ? (
          <_Builtin.Block tag="div">
            <ButtonSoft
              onClickButton={onClickSendFollowupEmail}
              size="1"
              color="neutral"
              highContrast="false"
              textButton="Send Followup Email"
            />
          </_Builtin.Block>
        ) : null}
        {isConactViaEmail ? (
          <_Builtin.Block tag="div">
            <ButtonSolid
              onClickButton={onClickContactViaEmail}
              size="1"
              textButton="Email the Link"
            />
          </_Builtin.Block>
        ) : null}
        {isCallAgain ? (
          <_Builtin.Block tag="div">
            <ButtonSoft
              onClickButton={onClickCallAgain}
              size="1"
              color="neutral"
              highContrast="false"
              textButton="Call Again"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isNoBorder ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "noborder_block")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
