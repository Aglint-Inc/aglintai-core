"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AiTaskBanner.module.css";

export function AiTaskBanner({ as: _Component = _Builtin.Block, slotButton }) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner", "info_short-ai")}
      id={_utils.cx(
        _styles,
        "w-node-_8215894a-6082-c4a3-c9a0-de6edc55f8ce-dc55f8ce"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "info_main_block")}
        tag="div"
      >
        <Text
          color="accent"
          content="Click “Proceed,” to perform the below tasks with Ai"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button_wrapper")}
        id={_utils.cx(
          _styles,
          "w-node-_8215894a-6082-c4a3-c9a0-de6edc55f8d2-dc55f8ce"
        )}
        tag="div"
      >
        {slotButton}
      </_Builtin.Block>
    </_Component>
  );
}
