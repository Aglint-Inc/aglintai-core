"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FeedbackEmpty.module.css";

export function FeedbackEmpty({
  as: _Component = _Builtin.Block,
  onClickSubmit = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1292")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1293")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"You haven’t submitted any feedback"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickSubmit}
          >
            {"Submit Feedback"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
