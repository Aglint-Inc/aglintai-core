"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { HistoryPill } from "./HistoryPill";
import * as _utils from "./utils";
import _styles from "./TrainingProgressList.module.css";

export function TrainingProgressList({
  as: _Component = _Builtin.Block,
  slotInterviewerImage,
  textName = "Floyd Miles",
  textRole = "Interior Designer",
  textInterviewModule = "C++ coding",
  slotHistoryPill,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_row", "progress")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_562385f8-7e74-6fdc-7bbc-3d880fc090d1-0fc090d0"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-profile-wrap")}
          tag="div"
        >
          {slotInterviewerImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-name-wrap")}
          tag="div"
        >
          <Text content={textName} weight="medium" />
          <Text content={textRole} weight="" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_562385f8-7e74-6fdc-7bbc-3d880fc090d8-0fc090d0"
        )}
        tag="div"
      >
        <Text content={textInterviewModule} weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_562385f8-7e74-6fdc-7bbc-3d880fc090db-0fc090d0"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-history-pill-wrap")}
          tag="div"
        >
          {slotHistoryPill ?? <HistoryPill />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
