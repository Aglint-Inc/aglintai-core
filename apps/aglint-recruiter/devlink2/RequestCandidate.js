"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { EmailTemplateHolder } from "./EmailTemplateHolder";
import * as _utils from "./utils";
import _styles from "./RequestCandidate.module.css";

export function RequestCandidate({
  as: _Component = _Builtin.Block,
  slotStartDateInput,
  slotEndDateInput,
  slotMinNumberDays,
  slotMinNumberSlot,
  slotEmailTemplateHolder,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-avail-body-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "req-avail-form-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-avail-label-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-ea7b77d6-f86d-5e3e-22f0-c9932b9d5afd-2b9d5afb"
          )}
          tag="div"
        >
          <Text content="Start Date" weight="medium" />
          <_Builtin.Block tag="div">{slotStartDateInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-avail-label-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-ea7b77d6-f86d-5e3e-22f0-c9932b9d5b01-2b9d5afb"
          )}
          tag="div"
        >
          <Text content="End Date" weight="medium" />
          <_Builtin.Block tag="div">{slotEndDateInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-avail-label-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-ea7b77d6-f86d-5e3e-22f0-c9932b9d5b05-2b9d5afb"
          )}
          tag="div"
        >
          <Text
            content="Minimum number of days should be selected"
            weight="medium"
          />
          <_Builtin.Block tag="div">{slotMinNumberDays}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-avail-label-wrap")}
          id={_utils.cx(
            _styles,
            "w-node-ea7b77d6-f86d-5e3e-22f0-c9932b9d5b09-2b9d5afb"
          )}
          tag="div"
        >
          <Text
            content="Minimum number of slots selected per each day"
            weight="medium"
          />
          <_Builtin.Block tag="div">{slotMinNumberSlot}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-avail-emial-wrap")}
        tag="div"
      >
        <Text content="To proceed with requesting the candidate’s availability, please click on the button below. Upon doing so, an email containing the following message will be sent to the candidate:" />
        <_Builtin.Block tag="div">
          {slotEmailTemplateHolder ?? <EmailTemplateHolder />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
