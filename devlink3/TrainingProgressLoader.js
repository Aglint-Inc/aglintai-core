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
      className={_utils.cx(_styles, "div-block-1507", "progress")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1508", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_1afaeed1-885e-000a-4785-54489de70490-9de7048f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1520", "loder")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1521")}
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
        className={_utils.cx(_styles, "div-block-1508", "progress")}
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
        className={_utils.cx(_styles, "div-block-1508", "progress")}
        id={_utils.cx(
          _styles,
          "w-node-_1afaeed1-885e-000a-4785-54489de7049a-9de7048f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1522")}
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
