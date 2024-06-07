"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonSolid } from "./ButtonSolid";
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
      <_Builtin.Block
        className={_utils.cx(_styles, "text-yellow-800")}
        tag="div"
      >
        {"Candidate didn’t responded to the request"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1759")}
        tag="div"
      >
        <ButtonSolid onClickButton={onClickReqPhone} size="1" textButton="" />
        <ButtonSurface
          onClickButton={onClickResendInvite}
          isLeftIcon={false}
          isRightIcon={false}
          color="accent"
          size="1"
          textButton=""
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
