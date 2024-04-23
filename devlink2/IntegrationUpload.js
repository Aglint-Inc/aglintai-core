import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntegrationUpload.module.css";

export function IntegrationUpload({
  as: _Component = _Builtin.Block,
  onClickDragUpload = {},
  onClickGetJson = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1263")} tag="div">
      <_Builtin.Block tag="div">{"Upload service.json"}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1264")}
        tag="div"
        {...onClickDragUpload}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grag-color")}
          tag="div"
        >
          {"Drag file here or click to upload"}
        </_Builtin.Block>
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
