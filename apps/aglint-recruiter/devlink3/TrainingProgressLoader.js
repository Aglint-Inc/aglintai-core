"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TrainingProgressLoader.module.css";

export function TrainingProgressLoader({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "module_row", "progress")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_1afaeed1-885e-000a-4785-54489de70490-9de7048f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-profile-wrap", "loder")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-name-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1602")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1602", "big")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_1afaeed1-885e-000a-4785-54489de70497-9de7048f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1602", "big")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sd_table_header_cell", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_1afaeed1-885e-000a-4785-54489de7049a-9de7048f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tpl-history-pill-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1602", "bigger")}
              tag="div"
            >
              {slotSkeleton}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
