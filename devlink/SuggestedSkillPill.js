import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SuggestedSkillPill.module.css";

export function SuggestedSkillPill({
  as: _Component = _Builtin.Block,
  textSkill = "HTML",
  onClickAdd = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cj-suggested-skill-block")}
      tag="div"
      {...onClickAdd}
    >
      <_Builtin.Block tag="div">{textSkill}</_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "frame-1091")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "vectors-wrapper-37")}
          loading="lazy"
          width={10}
          height={10}
          src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504162c0e20c3617cb43447_Vectors-Wrapper.svg"
        />
      </_Builtin.Block>
    </_Component>
  );
}
