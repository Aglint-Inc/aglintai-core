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
            <RcFormRadio
              isImageAvailabe={true}
              image="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/654a2aaca44e557a045695c5_lever_rgb_logo_standard%201.svg"
            />
            <RcFormRadio
              isImageAvailabe={true}
              image="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/654a2aacc1320de4422af271_Frame.svg"
              name="Ashby"
            />
            <RcFormRadio
              isImageAvailabe={true}
              image="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/654a2aac333d39933d91c93c_SVGmix-zQZODX-greenhouse%201.svg"
              name="Greenhouse"
            />
            <RcFormRadio
              isImageAvailabe={true}
              image="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/654a2aacdd6a70e426274b17_SVGmix-XJma8a-indeed-member%201.svg"
              name="Indeed"
            />
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
