import React from "react";
import * as _Builtin from "./_Builtin";
import { InviteStatus } from "./InviteStatus";
import * as _utils from "./utils";
import _styles from "./ScreeningCards.module.css";

export function ScreeningCards({
  as: _Component = _Builtin.Block,
  slotImage,
  isCheckboxVisible = false,
  slotCheckbox,
  textName = "Westly Snedger",
  slotInviteStatus,
  textScreeningName = "Screening for front end engineer",
  textRelatedJob = "Financial Analyst",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "screening-candi-card")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        {isCheckboxVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-958")}
            tag="div"
          >
            {slotCheckbox}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        {slotInviteStatus ?? <InviteStatus />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textScreeningName}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textRelatedJob}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
