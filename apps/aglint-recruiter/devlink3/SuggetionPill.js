import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SuggetionPill.module.css";

export function SuggetionPill({
  as: _Component = _Builtin.Block,
  textSuggetion = "Specific areas of expertise or technical skills that seem to be in high demand among the new applicants.",
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "suggetion_card", "isfixed")}
      id={_utils.cx(
        _styles,
        "w-node-_0052dafe-d3a4-ba83-2f58-9655afd51276-afd51276"
      )}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "four_line_clamp")}
        tag="div"
      >
        {textSuggetion}
      </_Builtin.Block>
    </_Component>
  );
}
