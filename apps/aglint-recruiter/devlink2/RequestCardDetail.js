"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RequestCardDetail.module.css";

export function RequestCardDetail({
  as: _Component = _Builtin.Block,
  slotButton,
  slotRightText,
  slotTextWithIconDetail,
  slotBody,
  isBodyVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-card-details-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "request-card-drop-details")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-details-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-card-left-sec")}
            tag="div"
          >
            {slotTextWithIconDetail}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-text-card-right")}
          tag="div"
        >
          {slotRightText}
        </_Builtin.Block>
      </_Builtin.Block>
      {isBodyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-req-card-detaisl-body")}
          tag="div"
        >
          {slotBody}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
