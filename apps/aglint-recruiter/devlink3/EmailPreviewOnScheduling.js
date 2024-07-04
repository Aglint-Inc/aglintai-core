"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./EmailPreviewOnScheduling.module.css";

export function EmailPreviewOnScheduling({
  as: _Component = _Builtin.Block,
  textSlotCount = "You have selected 10 slots across 2 days.",
  textEmailPreview = "To proceed to self scheduling please click on the button below. Upon doing so, an email containing the following message will be sent to the candidate:",
  slotEmailPreview,
  slotSelectedScheduleOptions,
  slotButton,
  showSelectedSchedules = false,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "emailpreview_schedule")}
        tag="div"
      >
        {showSelectedSchedules ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_schedules")}
            tag="div"
          >
            <Text content={textSlotCount} weight="medium" />
            <_Builtin.Block
              className={_utils.cx(_styles, "selcted_schedule_comps")}
              tag="div"
            >
              {slotSelectedScheduleOptions ?? <SlotComp componentNeme="" />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "email_preview")}
          tag="div"
        >
          <Text content={textEmailPreview} weight="regular" />
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_email_preview")}
            tag="div"
          >
            {slotEmailPreview ?? (
              <_Builtin.Image
                className={_utils.cx(_styles, "dummy_template")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/668532b98e9b4ae1b293a8bc_email%20template.svg"
              />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidedrawer_bottom_bar")}
        tag="div"
      >
        {slotButton ?? (
          <>
            <ButtonSoft
              color="neutral"
              textButton="Back"
              onClickButton={{}}
              size="2"
            />
            <ButtonSolid
              textButton="Send to candidate"
              isDisabled={false}
              isLoading={false}
              onClickButton={{}}
              size="2"
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
