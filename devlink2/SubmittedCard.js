import React from "react";
import * as _Builtin from "./_Builtin";
import { ResponseCard } from "./ResponseCard";
import * as _utils from "./utils";
import _styles from "./SubmittedCard.module.css";

export function SubmittedCard({
  as: _Component = _Builtin.Block,
  textTitle = "Screening for front end engineer",
  textQuestionCount = "17 Questions",
  slotInviteStatus,
  slotResponseCard,
  isResponseVisible = true,
  slotInvitedCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1022")} tag="div">
      <_Builtin.Block tag="div">{slotInvitedCard}</_Builtin.Block>
      {isResponseVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1025")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Response"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotResponseCard ?? <ResponseCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
