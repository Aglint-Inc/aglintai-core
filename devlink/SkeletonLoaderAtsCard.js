import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SkeletonLoaderAtsCard.module.css";

export function SkeletonLoaderAtsCard({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "skeleton-loader-wrapper-ats-card")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-534")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-533")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-width-20")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-width-10")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-item")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-width-40")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-item")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
