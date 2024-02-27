import React from "react";
import * as _Builtin from "./_Builtin";
import { InviteStatus } from "./InviteStatus";
import { ResponseCard } from "./ResponseCard";
import * as _utils from "./utils";
import _styles from "./SubmittedCard.module.css";

export function SubmittedCard({
  as: _Component = _Builtin.Block,
  textTitle = "Screening for front end engineer",
  textQuestionCount = "17 Questions",
  slotInviteStatus,
  slotResponseCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1022")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1020")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1021")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textQuestionCount}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotInviteStatus ?? <InviteStatus />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1025")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Response"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotResponseCard ?? <ResponseCard />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
