import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedDangerSmall } from "./ButtonOutlinedDangerSmall";
import { InterviewTimer } from "./InterviewTimer";
import * as _utils from "./utils";
import _styles from "./InterviewNav.module.css";

export function InterviewNav({ as: _Component = _Builtin.Block, slotButton }) {
  return (
    <_Component
      className={_utils.cx(_styles, "interview-screen-nav")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "interview-logo-screen")}
          loading="eager"
          width="135"
          height="auto"
          alt="__wf_reserved_inherit"
          src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901c2_Frame%202%20(2).svg"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-button-wrapper")}
        tag="div"
      >
        {slotButton ?? (
          <>
            <ButtonOutlinedDangerSmall />
            <InterviewTimer />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
