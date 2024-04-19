"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PriorityPill } from "./PriorityPill";
import * as _utils from "./utils";
import _styles from "./TaskTableCard.module.css";

export function TaskTableCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotStatus,
  textTask = "Agent with Watsapp and text messages",
  isEmailAgentVisible = true,
  isPhoneAgentVisible = false,
  isAssignedtoVisible = false,
  slotAvatarWithName,
  textJob = "Architect",
  slotCandidate,
  isActiveCard = false,
  slotAssignedToCard,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1434", "height-53", "pointer")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1535")}
        id={_utils.cx(
          _styles,
          "w-node-_64cd7013-b477-21b7-5d99-36b360482539-f9aebf0d"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrap-task")}
          id={_utils.cx(
            _styles,
            "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0e-f9aebf0d"
          )}
          tag="div"
        >
          {slotCheckbox}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf0f-f9aebf0d"
        )}
        tag="div"
      >
        {slotStatus}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf10-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textTask}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_11278828-2b21-6637-8526-f1ac7659ccbf-f9aebf0d"
        )}
        tag="div"
      >
        <PriorityPill />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf13-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotAssignedToCard}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf1d-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "one-line-clamp")}
          tag="div"
        >
          {textJob}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-_577b6da5-5053-c3a6-5b02-37d3f9aebf20-f9aebf0d"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotCandidate}
      </_Builtin.Block>
      {isActiveCard ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1449")}
          id={_utils.cx(
            _styles,
            "w-node-_5835e3c5-e90c-dac6-4a0a-13a054034032-f9aebf0d"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
