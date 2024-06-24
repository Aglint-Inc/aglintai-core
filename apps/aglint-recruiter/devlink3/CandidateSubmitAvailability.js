"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./CandidateSubmitAvailability.module.css";

export function CandidateSubmitAvailability({
  as: _Component = _Builtin.Block,
  slotList,
  onClickSchedule = {},
  onClickReReq = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "csa-wrapper")} tag="div">
      <Text content="??" weight="" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "csa-date-slots")}
        tag="div"
      >
        {slotList ?? <SlotComp componentNeme="DateOption" />}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "csa-btn-slots")} tag="div">
        <ButtonSolid
          onClickButton={onClickSchedule}
          size="1"
          textButton="Schedule Now"
        />
        <ButtonSoft
          onClickButton={onClickReReq}
          size="1"
          textButton="Request Availability Again"
          color="neutral"
        />
      </_Builtin.Block>
    </_Component>
  );
}
