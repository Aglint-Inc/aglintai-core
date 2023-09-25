import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobGenerateAi.module.css";

export function JobGenerateAi({
  as: _Component = _Builtin.Block,
  onClickGenerate = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cj-rt-generate-block")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "text-kale-800")} tag="div">
        {"Generate job description with AI"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-rt-generate-btn")}
        tag="div"
        {...onClickGenerate}
      >
        <_Builtin.Block className={_utils.cx(_styles, "content-4")} tag="div">
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-35")}
            loading="lazy"
            width="auto"
            height="auto"
            alt="__wf_reserved_inherit"
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890239_glitter.svg"
          />
          <_Builtin.Block className={_utils.cx(_styles, "label-5")} tag="div">
            {"Generate "}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
