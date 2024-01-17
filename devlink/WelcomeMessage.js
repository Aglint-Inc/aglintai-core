import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningQuestionCard } from "./ScreeningQuestionCard";
import * as _utils from "./utils";
import _styles from "./WelcomeMessage.module.css";

export function WelcomeMessage({
  as: _Component = _Builtin.Block,
  slotWelcomeMessage,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-562")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "new-screen-welcome")}
          tag="div"
          id="welcome"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Welcome Message"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "mt-8")}
            tag="div"
          >
            {
              "The candidate will be informed of this at the beginning of the assessment before the first question."
            }
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-555")}
            tag="div"
          >
            {slotWelcomeMessage ?? <ScreeningQuestionCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
