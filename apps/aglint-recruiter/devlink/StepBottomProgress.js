import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./StepBottomProgress.module.css";

export function StepBottomProgress({
  as: _Component = _Builtin.Block,
  onClickBack = {},
  onClickContinue = {},
  slotProgressBar,
  textStepCount = "Step 1 of 5",
  onClickSkip = {},
  isSkipButtonVisible = false,
  isBackVisible = true,
  slotSaveStatus,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cj-bottom-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-form-overlay")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-bottom-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-controls-wrapper")}
          tag="div"
        >
          {isBackVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-back-btn")}
              tag="div"
              {...onClickBack}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.79724%2013.8128C6.06169%2013.5566%206.06839%2013.1346%205.8122%2012.8701C5.8122%2012.8701%203.56876%2010.5544%202.38633%209.33398H15.3334C15.7016%209.33398%2016%209.03551%2016%208.66732C16%208.29913%2015.7016%208.00065%2015.3334%208.00065H2.27618L5.80478%204.47206C6.06513%204.21171%206.06513%203.7896%205.80478%203.52925C5.54443%203.2689%205.12232%203.2689%204.86197%203.52925L0.728636%207.66258C0.20162%208.1896%200.20162%209.01171%200.728636%209.53872L4.85455%2013.7978C5.11073%2014.0623%205.53279%2014.069%205.79724%2013.8128Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "continue-draft-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "save-draft")}
              tag="div"
            >
              {slotSaveStatus}
            </_Builtin.Block>
            {isSkipButtonVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "skip-text")}
                tag="div"
                {...onClickSkip}
              >
                {"Skip"}
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-continue-btn")}
              tag="div"
              {...onClickContinue}
            >
              <ButtonPrimaryRegular textLabel="Continue" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-progress-bar-wrapper")}
          tag="div"
        >
          {slotProgressBar}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-steps-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
            tag="div"
          >
            {textStepCount}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
