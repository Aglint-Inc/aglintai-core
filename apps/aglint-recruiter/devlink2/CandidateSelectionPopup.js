"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateSelectionPopup.module.css";

export function CandidateSelectionPopup({
  as: _Component = _Builtin.Block,
  textHeader = "Move to Assessment",
  textDescription = "Move 1 Candidate to Assessment Stage",
  isChecked = false,
  slotButtons,
  onclickClose = {},
  textCheck = "Proceed to send an assessment invitation email to the candidate.",
  onclickCheck = {},
  isCheckVisible = true,
  textWarning = "By clicking 'Delete,' candidate will be removed from this job, and it cannot be undone.",
  isWarningVisible = false,
  slotMoveAssessment,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-selection-popup")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cansel-popup-header")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeader}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cansel-popup-close-btn", "clickable")}
          tag="div"
          {...onclickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4828_642%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4828_642)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cansel-popup-body")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textDescription}</_Builtin.Block>
        {isWarningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "delete_warning")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewbox%3D%220%200%2048%2048%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M24%2010C24.9583%2010.0417%2025.6875%2010.4583%2026.1875%2011.25L39.6875%2034.25C40.1042%2035.0833%2040.1042%2035.9167%2039.6875%2036.75C39.1875%2037.5417%2038.4583%2037.9583%2037.5%2038H10.5C9.54167%2037.9583%208.8125%2037.5417%208.3125%2036.75C7.89583%2035.9167%207.89583%2035.0833%208.3125%2034.25L21.875%2011.25C22.375%2010.4583%2023.0833%2010.0417%2024%2010ZM24%2018C23.0833%2018.0833%2022.5833%2018.5833%2022.5%2019.5V26.5C22.5833%2027.4167%2023.0833%2027.9167%2024%2028C24.9167%2027.9167%2025.4167%2027.4167%2025.5%2026.5V19.5C25.4167%2018.5833%2024.9167%2018.0833%2024%2018ZM26%2032C26%2031.4167%2025.8125%2030.9375%2025.4375%2030.5625C25.0625%2030.1875%2024.5833%2030%2024%2030C23.4167%2030%2022.9375%2030.1875%2022.5625%2030.5625C22.1875%2030.9375%2022%2031.4167%2022%2032C22%2032.5833%2022.1875%2033.0625%2022.5625%2033.4375C22.9375%2033.8125%2023.4167%2034%2024%2034C24.5833%2034%2025.0625%2033.8125%2025.4375%2033.4375C25.8125%2033.0625%2026%2032.5833%2026%2032Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{textWarning}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isCheckVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cansel-popup-check")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cansel-pop-checkbox-block")}
              tag="div"
              {...onclickCheck}
            >
              {isChecked ? (
                <_Builtin.Image
                  className={_utils.cx(_styles, "cansel-checkbox-image")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{textCheck}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">
          {slotMoveAssessment ?? <SlotComp componentName="MoveAssesment" />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cansel-buttons-wrapper")}
          tag="div"
        >
          {slotButtons ?? <SlotComp componentName="Buton" />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
