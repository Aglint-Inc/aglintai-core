import React from "react";
import * as _Builtin from "./_Builtin";
import { ScorePillNice } from "./ScorePillNice";
import { ScorePillMust } from "./ScorePillMust";
import { AddButton } from "./AddButton";
import * as _utils from "./utils";
import _styles from "./ScoreCard.module.css";

export function ScoreCard({
  as: _Component = _Builtin.Block,
  slotScorePills,
  onClickAdd = {},
  textAddButton = "Add required skills",
  textHeading = "Skills",
  colorPropsHeading = {},
  slotAddCard,
  slotAddButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "score-card-detail-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fw-semibold")}
        tag="div"
        {...colorPropsHeading}
      >
        {textHeading}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skills-wrap-details")}
        tag="div"
      >
        {slotScorePills ?? (
          <>
            <ScorePillNice />
            <ScorePillMust />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "add-skill-required")}
        tag="div"
      >
        {slotAddCard}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-701")} tag="div">
        {slotAddButton ?? <AddButton />}
      </_Builtin.Block>
    </_Component>
  );
}
