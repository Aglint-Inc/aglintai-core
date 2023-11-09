import React from "react";
import * as _Builtin from "./_Builtin";
import { RcFormRadio } from "./RcFormRadio";
import * as _utils from "./utils";
import _styles from "./LoginAtsInfo.module.css";

export function LoginAtsInfo({
  as: _Component = _Builtin.Block,
  slotRadioButtons,
  slotAdditionalInfo,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sl-ats-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "fw-semibold")}
        tag="div"
      >
        {"Are you currently using any ATS system?"}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-388")} tag="div">
        {slotRadioButtons ?? (
          <>
            <RcFormRadio isImageAvailabe={true} />
            <RcFormRadio isImageAvailabe={true} name="Ashby" />
            <RcFormRadio isImageAvailabe={true} name="Greenhouse" />
            <RcFormRadio isImageAvailabe={true} name="Indeed" />
            <RcFormRadio name="Other" />
            <RcFormRadio name="I do not use any ATS system" />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-389")} tag="div">
        {slotAdditionalInfo}
      </_Builtin.Block>
    </_Component>
  );
}
