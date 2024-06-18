"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./IntegrationUpload.module.css";

export function IntegrationUpload({
  as: _Component = _Builtin.Block,
  onClickDragUpload = {},
  onClickGetJson = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "integration-upload-wrap")}
      tag="div"
    >
      <Text weight="" content="" />
      <_Builtin.Block
        className={_utils.cx(_styles, "upload-area")}
        tag="div"
        {...onClickDragUpload}
      >
        <Text color="a" content="Drag file here or click to upload" weight="" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-blue-500",
          "text-underline",
          "cursor-pointer",
          "hide"
        )}
        tag="div"
        {...onClickGetJson}
      >
        {"how to get service.json"}
      </_Builtin.Block>
    </_Component>
  );
}
