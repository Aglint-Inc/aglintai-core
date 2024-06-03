"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconCheck } from "./IconCheck";
import { JobDetailLeft } from "./JobDetailLeft";
import { ShareVia } from "./ShareVia";
import * as _utils from "./utils";
import _styles from "./JobDetail.module.css";

export function JobDetail({
  as: _Component = _Builtin.Block,
  slotJobDetail,
  slotShareJob,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-tab-content-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-285")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Job Detail"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-287")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-286")}
              tag="div"
            >
              <IconCheck />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-green-800")}
              tag="div"
            >
              {"Published"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-content-main")}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-e7cca4a0-1b1d-4648-e312-a527b4fb6bdd-b4fb6bd2"
          )}
          tag="div"
        >
          {slotJobDetail ?? <JobDetailLeft />}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotShareJob ?? <ShareVia />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
