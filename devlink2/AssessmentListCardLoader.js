import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./AssessmentListCardLoader.module.css";

export function AssessmentListCardLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1053-copy")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1054")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1057", "relative")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1059")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text_md_line", "_70")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1055")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_20")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_20")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
