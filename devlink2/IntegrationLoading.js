import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./IntegrationLoading.module.css";

export function IntegrationLoading({
  as: _Component = _Builtin.Block,
  slotLoaderIcon,
  textLoader = "Connecting to Lever",
  isText = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1253")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1254")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotLoaderIcon}</_Builtin.Block>
        {isText ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textLoader}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
