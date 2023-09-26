import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GenerateQuestionAi.module.css";

export function GenerateQuestionAi({
  as: _Component = _Builtin.Block,
  onClickGenerate = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "generate-question-2")} tag="div">
      <_Builtin.Block tag="div">{"Generate more questions."}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-questio-2")}
        tag="div"
        {...onClickGenerate}
      >
        <_Builtin.Image
          loading="lazy"
          width="auto"
          height="auto"
          alt="__wf_reserved_inherit"
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
        />
        <_Builtin.Block tag="div">{"Generate"}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
