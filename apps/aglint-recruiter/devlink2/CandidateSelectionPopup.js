"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
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
        <Text content={textHeader} weight="medium" color="neutral-12" />
        <_Builtin.Block
          className={_utils.cx(_styles, "cansel-popup-close-btn", "clickable")}
          tag="div"
          {...onclickClose}
        >
          <IconButtonSoft
            iconName="close"
            color="neutral"
            iconWeight="thin"
            size="1"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cansel-popup-body")}
        tag="div"
      >
        <Text content={textDescription} weight="" color="neutral" />
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
              className={_utils.cx(_styles, "cansel-pop-checkbox-block-copy")}
              tag="div"
              {...onclickCheck}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%20fill-opacity%3D%220.9%22%2F%3E%0A%3Cpath%20d%3D%22M3%200.5H13C14.3807%200.5%2015.5%201.61929%2015.5%203V13C15.5%2014.3807%2014.3807%2015.5%2013%2015.5H3C1.61929%2015.5%200.5%2014.3807%200.5%2013V3C0.5%201.61929%201.61929%200.5%203%200.5Z%22%20stroke%3D%22%23191400%22%20stroke-opacity%3D%220.207843%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              {isChecked ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex", "is_absolute")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_4108_19906)%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.2314%203.97546C12.5395%204.17695%2012.626%204.59011%2012.4245%204.89827L7.89119%2011.8316C7.78435%2011.995%207.61126%2012.1033%207.41762%2012.1281C7.22396%2012.1528%207.02921%2012.0914%206.88475%2011.9601L3.95142%209.2934C3.67898%209.04573%203.65891%208.6241%203.90658%208.35166C4.15425%208.07922%204.57588%208.05914%204.84832%208.30682L7.20311%2010.4475L11.3086%204.16861C11.5101%203.86045%2011.9232%203.77397%2012.2314%203.97546Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3CclipPath%20id%3D%22clip0_4108_19906%22%3E%0A%3Cpath%20d%3D%22M0%203C0%201.34315%201.34315%200%203%200H13C14.6569%200%2016%201.34315%2016%203V13C16%2014.6569%2014.6569%2016%2013%2016H3C1.34315%2016%200%2014.6569%200%2013V3Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2FclipPath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
            <Text content={textCheck} weight="" color="neutral" />
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
