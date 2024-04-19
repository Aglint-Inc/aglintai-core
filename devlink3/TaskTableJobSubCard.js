"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AssignedToTask } from "./AssignedToTask";
import * as _utils from "./utils";
import _styles from "./TaskTableJobSubCard.module.css";

export function TaskTableJobSubCard({
  as: _Component = _Builtin.Block,
  slotCheckbox,
  slotStatus,
  textTask = "Agent with Watsapp and text messages",
  slotAssignedTo,
  isCardActive = false,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1434", "height-53", "job-cand")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1536")}
        id={_utils.cx(
          _styles,
          "w-node-_0e231740-1f41-abbd-f750-e11545d38298-1d499d6e"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrap-task")}
          id={_utils.cx(
            _styles,
            "w-node-f9fb816c-f256-bc7d-a704-0fc71d499d6f-1d499d6e"
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
          "w-node-f9fb816c-f256-bc7d-a704-0fc71d499d70-1d499d6e"
        )}
        tag="div"
      >
        {slotStatus}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1435")}
        id={_utils.cx(
          _styles,
          "w-node-f9fb816c-f256-bc7d-a704-0fc71d499d71-1d499d6e"
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
          "w-node-f9fb816c-f256-bc7d-a704-0fc71d499d74-1d499d6e"
        )}
        tag="div"
        {...onClickCard}
      >
        {slotAssignedTo ?? <AssignedToTask />}
      </_Builtin.Block>
      {isCardActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1449")}
          id={_utils.cx(
            _styles,
            "w-node-f9fb816c-f256-bc7d-a704-0fc71d499d7e-1d499d6e"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
