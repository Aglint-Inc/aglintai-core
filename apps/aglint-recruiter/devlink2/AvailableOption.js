import React from "react";
import * as _Builtin from "./_Builtin";
import { OptionAvailableCard } from "./OptionAvailableCard";
import * as _utils from "./utils";
import _styles from "./AvailableOption.module.css";

export function AvailableOption({
  as: _Component = _Builtin.Block,
  slotOptionAvailableCard,
  slotSendCandidatesButton,
  slotTimeFixer,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "avaialble-option-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "available-option-header")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "aoh-left")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Available options"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {
              "These are the available options for the interview. Choose multiple options to send the options to the candidate. Interview will be confirmed once the candidate chooses a option."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotSendCandidatesButton}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1262")}
        tag="div"
      >
        {slotTimeFixer}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1103")}
        tag="div"
      >
        {slotOptionAvailableCard ?? <OptionAvailableCard />}
      </_Builtin.Block>
    </_Component>
  );
}
