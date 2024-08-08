"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./TeamInvite.module.css";

export function TeamInvite({
  as: _Component = _Builtin.Block,
  slotForm,
  slotButtons,
  onClickClose = {},
  slotInviteTeamCard,
  isInviteTeamCardVisible = true,
  isInviteSentVisible = true,
  textTitle = "Invite Member",
  isFixedButtonVisible = false,
  slotPrimaryButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cs-invite-members")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "team-invite-header")}
        tag="div"
      >
        <Text content={textTitle} weight="medium" />
        <IconButtonSoft
          onClickButton={onClickClose}
          iconName="close"
          color="neutral"
          size="1"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "ti-body-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "im-form-block")}
          tag="div"
        >
          {slotForm}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "im-buttons-wrapper")}
          tag="div"
        >
          {slotButtons}
        </_Builtin.Block>
      </_Builtin.Block>
      {isInviteSentVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "button-bottom-team")}
          tag="div"
        >
          {isInviteSentVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "ti-invite-sent-wrap")}
              tag="div"
            >
              <Text content="Invite Sent" />
            </_Builtin.Block>
          ) : null}
          {isInviteTeamCardVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "ti-slot-team-card")}
              tag="div"
            >
              {slotInviteTeamCard ?? (
                <SlotComp componentName="InviteTeamCard" />
              )}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
