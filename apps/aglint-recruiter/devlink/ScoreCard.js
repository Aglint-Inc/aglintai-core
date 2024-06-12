"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { AddButton } from "./AddButton";
import * as _utils from "./utils";
import _styles from "./ScoreCard.module.css";

export function ScoreCard({
  as: _Component = _Builtin.Block,
  slotScorePills,
  textHeading = "Skills",
  colorPropsHeading = {},
  slotAddButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "score-card-detail-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "score-card-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "score-card-head-icon")}
          tag="div"
          {...colorPropsHeading}
        />
        <Text content={textHeading} weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skills-wrap-details")}
        tag="div"
      >
        {slotScorePills ?? (
          <>
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
            <SlotComp componentName="ScorePillMust" />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sc-add-btn-wrap")}
        tag="div"
      >
        {slotAddButton ?? <AddButton />}
      </_Builtin.Block>
    </_Component>
  );
}
