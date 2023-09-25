import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./NoCompletedInterviews.module.css";

export function NoCompletedInterviews({
  as: _Component = _Builtin.Block,
  onClickStart = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "history-empty-state")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "width-img")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "history-empty-image")}
          loading="lazy"
          width="auto"
          height="auto"
          alt="__wf_reserved_inherit"
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901bd_Interview%20Prep.png"
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {"No Completed Interveiws. "}
        <_Builtin.Span
          className={_utils.cx(_styles, "start-interview")}
          {...onClickStart}
        >
          {"Click here to start an Interview"}
        </_Builtin.Span>
      </_Builtin.Block>
    </_Component>
  );
}
