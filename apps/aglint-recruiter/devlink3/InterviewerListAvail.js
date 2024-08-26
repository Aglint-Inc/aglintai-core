"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewerListAvail.module.css";

export function InterviewerListAvail({
  as: _Component = _Builtin.Block,
  slotImage,
  textName = "Floyd Miles",
  textRole = "Software developer",
  slotDay1,
  slotDay2,
  slotDay3,
  slotDay4,
  slotDay5,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "interviewer-avail-body-list-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-avail-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9be-a572f9bd"
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
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9c5-a572f9bd"
        )}
        tag="div"
      >
        {slotDay1}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9c6-a572f9bd"
        )}
        tag="div"
      >
        {slotDay2}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9c7-a572f9bd"
        )}
        tag="div"
      >
        {slotDay3}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9c8-a572f9bd"
        )}
        tag="div"
      >
        {slotDay4}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-ia-body-item")}
        id={_utils.cx(
          _styles,
          "w-node-_497e388a-b58b-2afe-eaea-ea4ea572f9c9-a572f9bd"
        )}
        tag="div"
      >
        {slotDay5}
      </_Builtin.Block>
    </_Component>
  );
}
