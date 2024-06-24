"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSurface } from "./ButtonSurface";
import * as _utils from "./utils";
import _styles from "./TaskNotRespond.module.css";

export function TaskNotRespond({
  as: _Component = _Builtin.Block,
  onClickReqPhone = {},
  onClickResendInvite = {},
  onClickCopyInvite = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "task-not-respond-wrap")}
      tag="div"
    >
      <Text weight="" content="" />
      <_Builtin.Block className={_utils.cx(_styles, "tnr-btn-wrap")} tag="div">
        <ButtonSolid
          onClickButton={onClickReqPhone}
          size="1"
          textButton="Make a phone call"
        />
        <ButtonSoft
          onClickButton={onClickResendInvite}
          size="1"
          textButton="Resend Invite"
          color="neutral"
        />
        <ButtonSurface
          onClickButton={onClickCopyInvite}
          isLeftIcon={false}
          isRightIcon={false}
          color="neutral"
          size="1"
          textButton="Copy Invite link"
        />
      </_Builtin.Block>
    </_Component>
  );
}
