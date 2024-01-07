import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateStart.module.css";

export function CandidateStart({
  as: _Component = _Builtin.Block,
  slotStartButton,
  slotLogo,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "canddiate-first-start")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "logo-start-cand")}
        tag="div"
      >
        {slotLogo ?? (
          <_Builtin.Image
            className={_utils.cx(_styles, "cand-start-image")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6597ea46e4106b361142c6cf_shield-darkest-blue%201.svg"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
        tag="div"
      >
        {
          "Welcome to the candidate application form.Please fill out the following information"
        }
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotStartButton}</_Builtin.Block>
    </_Component>
  );
}
