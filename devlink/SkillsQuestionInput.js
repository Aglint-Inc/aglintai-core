import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SkillsQuestionInput.module.css";

export function SkillsQuestionInput({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickSave = {},
  onClickCancel = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "skill-question-input-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-skills-question-input")}
        tag="div"
      >
        {slotInput}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "skills-question-button")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skills-correct-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "save-skills-wrappers")}
            tag="div"
            {...onClickSave}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%209.29289L10.6464%202.64645C10.8417%202.45118%2011.1583%202.45118%2011.3536%202.64645C11.5488%202.84171%2011.5488%203.15829%2011.3536%203.35355L4.35355%2010.3536C4.15829%2010.5488%203.84171%2010.5488%203.64645%2010.3536L0.646447%207.35355C0.451184%207.15829%200.451184%206.84171%200.646447%206.64645C0.841709%206.45118%201.15829%206.45118%201.35355%206.64645L4%209.29289Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "save-skills-wrappers")}
            tag="div"
            {...onClickCancel}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%209.35355C2.84171%209.54882%203.15829%209.54882%203.35355%209.35355L6%206.70711L8.64645%209.35355C8.84171%209.54882%209.15829%209.54882%209.35355%209.35355C9.54882%209.15829%209.54882%208.84171%209.35355%208.64645L6.70711%206L9.35355%203.35355C9.54882%203.15829%209.54882%202.84171%209.35355%202.64645C9.15829%202.45118%208.84171%202.45118%208.64645%202.64645L6%205.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L5.29289%206L2.64645%208.64645C2.45118%208.84171%202.45118%209.15829%202.64645%209.35355Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
