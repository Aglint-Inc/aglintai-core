import React from "react";
import * as _Builtin from "./_Builtin";
import { ScoreCard } from "./ScoreCard";
import * as _utils from "./utils";
import _styles from "./ScoreSetting.module.css";

export function ScoreSetting({
  as: _Component = _Builtin.Block,
  slotScoreCardDetails,
  slotBanner,
}) {
  return (
    <_Component className={_utils.cx(_styles, "score-setting-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-713")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Profile Score"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {
            "Setup scoring criteria encompassing experience, skills, and education. Specify necessary criteria in each section, and our system will generate a candidate score by comparing it with the details provided in their resume."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-934")} tag="div">
        {slotBanner}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-661")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "blue-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Must have"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "indicate-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "indicator-box", "grey-200")}
            tag="div"
          />
          <_Builtin.Block tag="div">{"Nice to have"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "score-outer-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "left-score-wrap")}
            tag="div"
          >
            {slotScoreCardDetails ?? <ScoreCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
