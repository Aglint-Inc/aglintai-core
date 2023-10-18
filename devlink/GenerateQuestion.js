import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GenerateQuestion.module.css";

export function GenerateQuestion({
  as: _Component = _Builtin.Block,
  onClickGenerate = {},
  isGenerateButtonDisable = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "generate-question-4")} tag="div">
      <_Builtin.Block tag="div">{"Generate more questions."}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-relative")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-questio-2")}
          tag="div"
          {...onClickGenerate}
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
          />
          <_Builtin.Block tag="div">{"Generate"}</_Builtin.Block>
        </_Builtin.Block>
        {isGenerateButtonDisable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-questio-2", "disable")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "image-37")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
            />
            <_Builtin.Block tag="div">{"Generate"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
