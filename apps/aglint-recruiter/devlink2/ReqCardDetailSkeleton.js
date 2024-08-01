"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./ReqCardDetailSkeleton.module.css";

export function ReqCardDetailSkeleton({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "req-card-detail-skeleton-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "req-card-detail-skeleton-left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-skeleton-btn")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "req-card-skeklton-btn-1")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-card-skeleton-btn2")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-skeleton-detail")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-skeleton-detail")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-card-skeleton-right")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-skeleton-rite-detail")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-card-skeleton-right-detail")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
