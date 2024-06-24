"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./IntegrationModal.module.css";

export function IntegrationModal({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  onClickContinue = {},
  slotSearch,
  slotApiKey,
  slotLogo,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "lever-step-1-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "lever-1-header-wraps")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotLogo ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653a4250bbd9309fc9bb0b62_lever_rgb_logo_standard%201.svg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "lever-close-button")}
          tag="div"
          {...onClickClose}
        >
          <GlobalIcon iconName="close" size="4" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "im-slot-ats-job")}
        tag="div"
      >
        {slotApiKey ?? <SlotComp componentName="LoadingJobAts" />}
      </_Builtin.Block>
    </_Component>
  );
}
