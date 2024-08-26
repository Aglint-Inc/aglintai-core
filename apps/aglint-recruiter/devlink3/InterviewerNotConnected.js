"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./InterviewerNotConnected.module.css";

export function InterviewerNotConnected({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Floyd Miles",
  textRole = "Software developer",
  onClickSendReminder = {},
  textDescription = "Teresa web not connected the calender.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-avail-body-list")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_00a7f18b-a30e-795d-bcca-7ab9198adfe2-198adfe1"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ia-profile-image")}
          tag="div"
        >
          {slotImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <Text content={textName} weight="regular" />
          <Text content={textRole} weight="regular" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_00a7f18b-a30e-795d-bcca-7ab9198adfe9-198adfe1"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "notconnected--metric")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "not-connect-error")}
            tag="div"
          >
            <GlobalIcon iconName="warning" />
          </_Builtin.Block>
          <Text content={textDescription} weight="regular" color="neutral" />
          <_Builtin.Block
            className={_utils.cx(_styles, "sedn-remind-metric")}
            tag="div"
            {...onClickSendReminder}
          >
            <Text weight="regular" content="Send Reminder" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
