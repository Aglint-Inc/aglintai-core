import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./ResumeScoreSetting.module.css";

export function ResumeScoreSetting({
  as: _Component = _Builtin.Block,
  slotScore,
  isProceedDisable = true,
  onClickProceed = {},
  isJobAdd = true,
  onClickDone = {},
  slotButtonPrimaryRegular,
  onClickSaveDraft = {},
  slotBasicButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "cj-step-1")}
      tag="div"
    >
      {isJobAdd ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-507")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Resume Score Settings"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {
              "Resume score will be calculated based on the following criteria. Adjust values to your needs."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-job-form-step-2")}
          tag="div"
        >
          {slotScore}
        </_Builtin.Block>
      </_Builtin.Block>
      {isJobAdd ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "job-details-button-wrappers", "hide")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "proceed-to-apply")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "blue-process-button")}
              tag="div"
              {...onClickProceed}
            >
              <_Builtin.Block tag="div">
                {"Proceed to screening questions"}
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isProceedDisable ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "grey-disable-process-button")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Proceed to screening questions"}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.1464%202.24645C9.95118%202.44171%209.95118%202.75829%2010.1464%202.95355L14.1929%207L0.499999%207C0.223857%207%20-5.04966e-07%207.22386%20-4.80825e-07%207.5C-4.56684e-07%207.77614%200.223857%208%200.5%208L14.2929%208L10.1464%2012.1464C9.95118%2012.3417%209.95118%2012.6583%2010.1464%2012.8536C10.3417%2013.0488%2010.6583%2013.0488%2010.8536%2012.8536L15.4536%208.25355C15.8488%207.85829%2015.8488%207.24171%2015.4536%206.84645L10.8536%202.24645C10.6583%202.05119%2010.3417%202.05119%2010.1464%202.24645Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isJobAdd ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "publish-email-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div" {...onClickDone}>
            {slotButtonPrimaryRegular ?? (
              <ButtonPrimaryRegular textLabel="Publish Job" />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-basic-button")}
            tag="div"
            {...onClickSaveDraft}
          >
            {slotBasicButton}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
