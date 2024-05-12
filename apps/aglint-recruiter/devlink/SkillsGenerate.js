import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonGenerate } from "./ButtonGenerate";
import { AddSkillPIll } from "./AddSkillPIll";
import * as _utils from "./utils";
import _styles from "./SkillsGenerate.module.css";

export function SkillsGenerate({
  as: _Component = _Builtin.Block,
  slotGenerateSkill,
  textDescription = "Click on ‘Generate’ button to get suggested job titles",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "generate-suggested-skills")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "generate-skill-wrap-header")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Suggested job titles"}</_Builtin.Block>
        <_Builtin.Image
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/656043bc23e3f519765bfd34_glitter.svg"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-sm", "color-grey-600")}
        tag="div"
      >
        {textDescription}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "generate-btn-wrap")}
        tag="div"
      >
        {slotGenerateSkill ?? (
          <>
            <ButtonGenerate />
            <AddSkillPIll />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
