import React from "react";
import * as _Builtin from "./_Builtin";
import { TaskCard } from "./TaskCard";
import * as _utils from "./utils";
import _styles from "./Task.module.css";

export function Task({
  as: _Component = _Builtin.Block,
  slotSearchFilter,
  slotTaskCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task-wrap-outer")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1337")}
        tag="div"
      >
        {slotSearchFilter}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task-card-wrapper")}
        tag="div"
      >
        {slotTaskCard ?? <TaskCard />}
      </_Builtin.Block>
    </_Component>
  );
}
