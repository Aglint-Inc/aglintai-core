"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./RequestCardSkeleton.module.css";

export function RequestCardSkeleton({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "req-sekelton-card")} tag="div">
      <Skeleton />
    </_Component>
  );
}
